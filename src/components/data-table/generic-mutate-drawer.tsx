import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export interface Field {
  name: string
  label: string
  type: 'text' | 'select' | 'radio' | 'date'
  options?: { label: string; value: string }[]
}

interface GenericMutateDrawerProps<T> {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentData?: T
  fields: Field[]
  title: string
  description: string
  onSubmit: (data: T) => void
}

export function GenericMutateDrawer<T>({
  open,
  onOpenChange,
  currentData,
  fields,
  title,
  description,
  onSubmit,
}: GenericMutateDrawerProps<T>) {
  const formSchema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = z.string().min(1, `${field.label} is required.`)
      return acc
    }, {} as Record<string, z.ZodString>)
  )

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentData as FormData || {},
  })

  const handleSubmit = (data: FormData) => {
    onSubmit(data as T)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === 'text' && (
                        <Input {...formField} />
                      )}
                      {field.type === 'select' && (
                        <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${field.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {field.type === 'radio' && (
                        <RadioGroup onValueChange={formField.onChange} defaultValue={formField.value}>
                          {field.options?.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={option.value} />
                              <label htmlFor={option.value}>{option.label}</label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                      {field.type === 'date' && (
                        <Input {...formField} type="date" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit">Save</Button>
          </form>
        </Form>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}


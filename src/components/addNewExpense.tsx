import { getBalance, getTotalExpenses } from '@/functions/balanceAndExpenses'
import { handleCreateExpense } from '@/functions/expenseAndBalanceHandlers'
import type { ExpenseData } from '@/types/Types'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CircleDollarSign } from 'lucide-react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const createUserFormSchema = z.object({
  local: z
    .string()
    .nonempty('O campo local é obrigatório')
    .regex(/^[a-zA-ZÀ-ÿ\s\.,'-]+$/, 'Apenas letras são permitidas'),
  expense: z
    .string()
    .nonempty('O campo valor é obrigatório')
    .regex(
      /^-?\d+([.,]\d+)?$/,
      'Deve ser um número válido e sem letras, exemplo: 333,33'
    ),
  tag: z.string().nonempty('O campo tag é obrigatório'),
  paymentMethod: z.enum(['crédito', 'débito', 'dinheiro']),
  paymentDate: z.string().nonempty('O campo data é obrigatório'),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

interface AddNewExpenseProps {
  setExpense: React.Dispatch<React.SetStateAction<ExpenseData[]>>
  updateBalance: (newExpense: number) => void
  addNewExpense: (newExpense: createUserFormData) => void
}

export function AddNewExpense({
  updateBalance,
  setExpense,
  addNewExpense,
}: AddNewExpenseProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })
  const [startDate, setStartDate] = useState<Date | null>(null)
  const onSubmit = (data: createUserFormData) => {
    const balance = getBalance()
    const expense = Number.parseFloat(data.expense.replace(',', '.'))

    switch (data.paymentMethod) {
      case 'crédito':
        toast.success('Novo gasto foi adicionado!')

        break
      case 'débito':
        if (expense >= balance) {
          toast.error('Não foi possivel finalizar a compra por falta de saldo.')
          return 0
        }
        updateBalance(expense)
        toast.success('Novo gasto foi adicionado!')

        break
      case 'dinheiro':
        if (expense >= balance) {
          toast.error('Não foi possivel finalizar a compra por falta de saldo.')
          return 0
        }
        updateBalance(expense)
        break
    }

    handleCreateExpense(
      data.tag,
      data.expense,
      data.local,
      data.paymentMethod,
      data.paymentDate
    )

    const newTotal = getTotalExpenses()
    setExpense(newTotal)

    addNewExpense(data)

    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'link'}
          className="text-sm md:text-lg flex flex-col gap-2 transition-all"
        >
          <CircleDollarSign
            size={34}
            className="text-rose-700 hover:text-rose-300 hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo gasto</DialogTitle>
          <DialogDescription>
            Adicione um novo gasto para ser gerenciado.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-4"
        >
          <div className="flex flex-col w-full items-center gap-4">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="local" className="font-medium">
                Com o que gastou?
              </label>
              <input
                className="rounded-lg p-2 w-full text-black"
                type="text"
                placeholder="Digite com o que gastou..."
                {...register('local')}
              />
              {errors.local && (
                <span className="text-red-600">{errors.local.message}</span>
              )}
            </div>
            <Controller
              name="tag"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="rounded-lg bg-white p-2 w-full text-black">
                    <SelectValue placeholder="-- Selecione uma tag --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tags</SelectLabel>
                      <SelectItem value="alimentação">alimentação</SelectItem>
                      <SelectItem value="cosméticos">cosméticos</SelectItem>
                      <SelectItem value="transporte">transporte</SelectItem>
                      <SelectItem value="assinatura">assinatura</SelectItem>
                      <SelectItem value="eletrônicos">eletrônicos</SelectItem>
                      <SelectItem value="jogos">jogos</SelectItem>
                      <SelectItem value="emergências">emergências</SelectItem>
                      <SelectItem value="consultas">
                        consultas de saúde
                      </SelectItem>
                      <SelectItem value="lazer">lazer</SelectItem>
                      <SelectItem value="outros">outros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tag && (
              <span className="text-red-600">{errors.tag.message}</span>
            )}

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="expense" className="font-medium">
                Quanto gastou?
              </label>
              <input
                className="rounded-lg p-2 w-full text-black"
                type="text"
                placeholder="Digite quanto gastou..."
                {...register('expense')}
              />
              {errors.expense && (
                <span className="text-red-600">{errors.expense.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <span className="font-medium">Forma de pagamento</span>
              <Controller
                name="paymentMethod"
                control={control}
                defaultValue="débito"
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    className="flex justify-center"
                    onValueChange={value => field.onChange(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="débito"
                        id="debit"
                        className="text-cyan-900"
                      />
                      <label htmlFor="debit">Débito</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="crédito"
                        id="credit"
                        className="text-indigo-900"
                      />
                      <label htmlFor="credit">Crédito</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="dinheiro"
                        id="cash"
                        className="text-emerald-900"
                      />
                      <label htmlFor="cash">Dinheiro</label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.paymentMethod && (
                <span className="text-red-600">
                  {errors.paymentMethod.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="date" className="font-medium">
                Data do pagamento
              </label>
              <Controller
                {...register('paymentDate')}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="text-black rounded-lg p-2 w-full"
                    id="date"
                    selected={startDate}
                    onChange={(date: Date | null) => {
                      setStartDate(date)
                      field.onChange(date ? format(date, 'dd/MM/yyyy') : '')
                    }}
                    dateFormat="dd/MM/yyyy"
                  />
                )}
              />
              {errors.paymentDate && (
                <span className="text-red-600">
                  {errors.paymentDate.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-color-card text-color-accent rounded-lg p-2 w-full border border-color-secondary"
            >
              Adicionar novo gasto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

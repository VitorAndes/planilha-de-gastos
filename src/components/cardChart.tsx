import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { getAllExpenses } from '@/functions/balanceAndExpenses'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import { LoadingSpinner } from './isLoading'

interface TotalsType {
  [tag: string]: number
}

const REFRESH_INTERVAL = 5000

const formatExpenseValue = (expense: string): number => {
  return Number.parseFloat(expense.replace(',', '.'))
}

const chartConfig: ChartConfig = {
  expense: { label: 'total gasto - ' },
  alimentação: { label: 'alimentação' },
  transporte: { label: 'transporte' },
  lazer: { label: 'lazer' },
  assinatura: { label: 'assinatura' },
  eletrônicos: { label: 'eletrônicos' },
  jogos: { label: 'jogos' },
  emergências: { label: 'emergências' },
  consultas_de_saúde: { label: 'consultas' },
  outros: { label: 'outros' },
} as const

export function CardChart() {
  const [totals, setTotals] = useState<TotalsType>({})
  const [isLoading, setIsLoading] = useState(true)

  const processExpenseData = useCallback(
    (chartData: ReturnType<typeof getAllExpenses>) => {
      const expenseData = chartData.reduce<TotalsType>((acc, product) => {
        const expense = formatExpenseValue(product.expense)
        return {
          // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
          ...acc,
          [product.tag]: (acc[product.tag] || 0) + expense,
        }
      }, {})

      return Object.fromEntries(
        Object.entries(expenseData).map(([tag, value]) => [
          tag,
          Number.parseFloat(value.toFixed(2)),
        ])
      )
    },
    []
  )

  const updateExpenseData = useCallback(() => {
    try {
      const chartData = getAllExpenses()
      const processedData = processExpenseData(chartData)
      setTotals(processedData)
      setIsLoading(false)
    } catch (error) {
      console.error('Error updating expense data:', error)
      setIsLoading(false)
    }
  }, [processExpenseData])

  useEffect(() => {
    updateExpenseData()

    const interval = setInterval(updateExpenseData, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [updateExpenseData])

  const chartData = useMemo(
    () =>
      Object.entries(totals).map(([tag, expense]) => ({
        tag,
        expense,
      })),
    [totals]
  )

  return (
    <Card className="h-full p-4 ">
      <CardHeader>
        <CardTitle>Lugares gastos</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="tag"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                style={{ fontSize: '13' }}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                stroke="#0E0E11"
                strokeWidth={2}
                dataKey="expense"
                fill="#701bee"
                radius={8}
              >
                <LabelList position="top" offset={12} fontSize={16} />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

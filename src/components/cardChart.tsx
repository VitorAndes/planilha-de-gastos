import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAllExpenses } from "@/functions/getBalanceAndExpense";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./isLoading";

interface TotalsType {
  [tag: string]: number;
}

export function CardChart() {
  const [totals, setTotals] = useState<TotalsType>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const chartData = getAllExpenses();

      const expenseData = chartData.reduce<TotalsType>((acc, product) => {
        const formattedExpense = product.expense.replace(",", ".");
        const expense = Number.parseFloat(formattedExpense);

        if (acc[product.tag]) {
          acc[product.tag] += expense;
        } else {
          acc[product.tag] = expense;
        }
        return acc;
      }, {});

      for (const tag in expenseData) {
        expenseData[tag] = Number.parseFloat(expenseData[tag].toFixed(2));
      }
      setIsLoading(false);
      setTotals(expenseData);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = Object.entries(totals).map(([tag, expense]) => ({
    tag,
    expense,
  }));

  const chartConfig = {
    expense: {
      label: "total gasto - ",
    },
    alimentação: {
      label: "alimentação",
    },
    transporte: {
      label: "transporte",
    },
    lazer: {
      label: "lazer",
    },
    assinatura: {
      label: "assinatura",
    },
    eletrônicos: {
      label: "eletrônicos",
    },
    jogos: {
      label: "jogos",
    },
    emergências: {
      label: "emergências",
    },
    consultas_de_saúde: {
      label: "consultas",
    },
    outros: {
      label: "outros",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex gap-4 flex-col flex-1 bg-[#0A1626]/70 py-4 text-zinc-100 shadow-white md:h-full">
      <CardHeader className="items-center py-0">
        <CardTitle className="text-lg font-bold">Total de gastos</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] md:h-full md:w-full p-0">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 60,
              }}
            >
              <YAxis
                dataKey="tag"
                type="category"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
              />
              <XAxis dataKey="expense" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="expense" fill="white" radius={10}>
                <LabelList
                  position="center"
                  fontSize={17}
                  style={{ fill: "black" }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

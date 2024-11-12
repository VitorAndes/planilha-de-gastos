import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAllExpenses } from "@/functions/balanceAndExpenses";
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
    <Card className="flex gap-4 p-4 flex-col bg-gradient-to-b from-text-secondary to-my-tertiary text-primary h-full shadow-md shadow-black">
      <CardHeader className="text-center pt-0">
        <CardTitle className="text-lg font-bold -tracking-tighter">
          Lugares gastos
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full w-full p-0">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-full">
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
                style={{ fill: "black", fontSize: "13" }}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="expense" fill="white" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={16}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

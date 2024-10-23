"use client";

import {
  Bar,
  BarChart,
  LabelList,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAllExpenses } from "@/functions/getBalanceAndExpense";
import { useEffect, useState } from "react";

interface TotalsType {
  [tag: string]: number;
}

export function CardChart() {
  const [totals, setTotals] = useState<TotalsType>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const chartData = getAllExpenses();

      const totals = chartData.reduce<TotalsType>((acc, item) => {
        const expense = Number.parseFloat(item.expense.replace(",", "."));

        if (acc[item.tag]) {
          acc[item.tag] += expense;
        } else {
          acc[item.tag] = expense;
        }
        return acc;
      }, {});
      setTotals(totals);
    }, 4000);
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
    <Card className="flex gap-4 p-4 flex-col bg-zinc-950/60 py-4 border border-zinc-500 text-zinc-100 shadow-white h-full">
      <CardHeader className="items-center py-0">
        <CardTitle>Total de gastos</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 40,
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
            <Bar dataKey="expense" fill="white" radius={20}>
              <LabelList
                position="center"
                fontSize={18}
                style={{ fill: "black" }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

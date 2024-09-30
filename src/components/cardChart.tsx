"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
    const chartData = getAllExpenses();

    const totals = chartData.reduce<TotalsType>((acc, item) => {
      const expense = Number(item.expense);
      if (acc[item.tag]) {
        acc[item.tag] += expense;
      } else {
        acc[item.tag] = expense;
      }
      return acc;
    }, {});

    setTotals(totals);
  }, []);

  const chartData = Object.entries(totals).map(([tag, expense]) => ({
    tag,
    expense,
  }));

  const chartConfig = {
    expense: {
      label: "total gasto",
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
    outros: {
      label: "outros",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-1 flex-col bg-zinc-950 p-4 border border-zinc-500 text-zinc-100">
      <CardHeader className="items-center p-0">
        <CardTitle>Total de gastos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-0 h-full justify-center">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 25,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="tag"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="expense" fill="#f1f5f9" radius={8}>
              <LabelList position="top" offset={12} fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

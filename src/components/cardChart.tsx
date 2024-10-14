"use client";

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
      label: "total gasto-",
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
    <Card className="flex flex-1 gap-2 flex-col bg-zinc-950 p-4 border border-zinc-500 text-zinc-100 shadow-white">
      <CardHeader className="items-center p-0">
        <CardTitle>Total de gastos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-0 h-full justify-center ">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 80,
            }}
          >
            <YAxis
              dataKey="tag"
              type="category"
              tickLine={false}
              tickMargin={20}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 4)}
            />
            <XAxis dataKey="expense" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="expense" fill="white" radius={8}>
              <LabelList position="right" offset={12} fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

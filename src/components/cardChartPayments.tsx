import { getTotalExpenses } from "@/functions/getBalanceAndExpense";
import type { chartDataType } from "@/types/Types";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import { LoadingSpinner } from "./isLoading";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  crédito: {
    label: "crédito",
    color: "hsl(var(--chart-1))",
  },
  débito: {
    label: "débito",
    color: "hsl(var(--chart-2))",
  },
  dinheiro: {
    label: "dinheiro",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function CardChartPayments() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<chartDataType[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const chartData = getTotalExpenses();

      const getColor = (paymentMethod: string) => {
        if (paymentMethod === "débito") {
          return "#C2D2F2";
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else if (paymentMethod === "crédito") {
          return "#203359";
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          return "#79F297";
        }
      };

      const formattedChartData = chartData.map((item) => ({
        ...item,
        expense: Number.parseFloat(item.expense.replace(",", ".")),
        fill: getColor(item.paymentMethod),
      }));

      setIsLoading(false);
      setChartData(formattedChartData);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex flex-col flex-shrink-0 bg-[#0A1626]/70 py-4 text-zinc-100 shadow-white shadow ">
      <CardHeader className="text-center py-0">
        <CardTitle className="text-lg font-bold">
          Métodos de pagamento
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center p-1 h-full w-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[250px] w-full p-0"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent nameKey="paymentMethod" hideLabel />
                }
              />
              <Pie
                data={chartData}
                dataKey="expense"
                labelLine={false}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="white"
                    >
                      {payload.paymentMethod}
                    </text>
                  );
                }}
                nameKey="paymentMethod"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

import { getTotalExpenses } from "@/functions/balanceAndExpenses";
import type { chartDataType } from "@/types/Types";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import { LoadingSpinner } from "./isLoading";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
          return "#164e63";
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else if (paymentMethod === "crédito") {
          return "#4f46e5";
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          return "#059669";
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
    <Card className="flex flex-col flex-1 justify-center p-10 gap-2 bg-gradient-to-b from-text-secondary to-my-tertiary text-primary h-96 shadow-md shadow-white">
      <CardHeader className="text-center pt-0">
        <CardTitle className="text-lg font-bold -tracking-tighter">
          Métodos de pagamento
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full p-0">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-full p-0">
            <PieChart style={{ fontSize: 24 }}>
              <Pie
                data={chartData}
                dataKey="expense"
                nameKey="paymentMethod"
                outerRadius={100}
                innerRadius={74}
                labelLine={false}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="paymentMethod" />}
                className="flex items-center flex-wrap"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

import { getTotalExpenses } from "@/functions/balanceAndExpenses";
import type { chartDataType } from "@/types/Types";
import { useCallback, useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import { LoadingSpinner } from "./isLoading";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "./ui/chart";

const REFRESH_INTERVAL = 5000;

const PAYMENT_COLORS = {
  débito: "#0891b2",
  crédito: "#4f46e5",
  dinheiro: "#059669",
} as const;

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

const getPaymentColor = (
  paymentMethod: keyof typeof PAYMENT_COLORS
): string => {
  return PAYMENT_COLORS[paymentMethod] || PAYMENT_COLORS.dinheiro;
};

const formatExpenseValue = (expense: string): number => {
  return Number.parseFloat(expense.replace(",", "."));
};

export function CardChartPayments() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<chartDataType[]>([]);

  const processChartData = useCallback(
    (rawData: ReturnType<typeof getTotalExpenses>) => {
      return rawData.map((item) => ({
        ...item,
        expense: formatExpenseValue(item.expense),
        fill: getPaymentColor(
          item.paymentMethod as keyof typeof PAYMENT_COLORS
        ),
      }));
    },
    []
  );

  const updateChartData = useCallback(() => {
    try {
      const rawData = getTotalExpenses();
      const formattedData = processChartData(rawData);
      setChartData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating payment data:", error);
      setIsLoading(false);
    }
  }, [processChartData]);

  useEffect(() => {
    updateChartData();

    const interval = setInterval(updateChartData, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [updateChartData]);

  return (
    <Card className="h-full p-4">
      <CardHeader>
        <CardTitle>Métodos de pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ChartContainer config={chartConfig}>
            <PieChart style={{ fontSize: 24 }}>
              <Pie
                data={chartData}
                dataKey="expense"
                nameKey="paymentMethod"
                stroke="#0E0E11"
                strokeWidth={5}
                outerRadius={80}
                innerRadius={50}
                labelLine={false}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="paymentMethod" />}
                className="truncate"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

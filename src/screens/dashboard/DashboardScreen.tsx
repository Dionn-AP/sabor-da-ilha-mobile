import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { styles, chartConfig } from "./styles";
import { Dimensions } from "react-native";
import { api } from "../../services/api";
import { theme } from "../../constants/theme";
import { formatCurrencyBR, formatDateBR } from "../../utils/formatter";

const screenWidth = Dimensions.get("window").width;

type OrderStatusReport = {
  status: string;
  count: string;
  totalAmount: string;
};

type OrderReportResponse = {
  byStatus: OrderStatusReport[];
  totals: {
    totalOrders: number;
    totalRevenue: number;
  };
};

export const DashboardScreen = () => {
  const [reportData, setReportData] = useState<OrderReportResponse | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get("/orders/report");
        setReportData(response.data);
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!reportData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subTitle}>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  const barChartData: { label: string; value: number }[] =
    reportData?.byStatus?.map((item: any) => ({
      label: item.status,
      value: parseFloat(item.totalAmount),
    })) || [];

  const pieChartData: { name: string; count: number }[] =
    reportData?.byStatus?.map((item: any) => ({
      name: item.status,
      count: parseInt(item.count),
    })) || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subTitle}>
        Total de Pedidos: {reportData.totals.totalOrders}
      </Text>
      <Text style={styles.subTitle}>
        Receita Total: {formatCurrencyBR(reportData.totals.totalRevenue)}
      </Text>

      <Text style={styles.chartTitle}>Receita por Status (R$)</Text>
      <BarChart
        data={{
          labels: barChartData.map((item) => item.label),
          datasets: [{ data: barChartData.map((item) => item.value) }],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix=" "
        fromZero
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1, index?: number) => {
            let status: string | undefined;

            if (
              typeof index === "number" &&
              index >= 0 &&
              index < barChartData.length
            ) {
              status = barChartData[index].label;
            }

            if (status === "preparando") return theme.colors.warning;
            if (status === "pronto") return theme.colors.success;
            if (status === "entregue") return theme.colors.primary;

            return theme.colors.primary;
          },
          barPercentage: 0.9,
        }}
        verticalLabelRotation={0}
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Distribuição de Pedidos</Text>
      <PieChart
        data={pieChartData.map((item) => ({
          name: item.name,
          population: item.count,
          color:
            item.name === "preparando"
              ? theme.colors.warning
              : item.name === "pronto"
              ? theme.colors.success
              : item.name === "entregue"
              ? theme.colors.primary
              : theme.colors.accent,
          legendFontColor: theme.colors.text,
          legendFontSize: 12,
        }))}
        width={screenWidth - 32}
        height={220}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        chartConfig={chartConfig}
        absolute
      />
    </ScrollView>
  );
};

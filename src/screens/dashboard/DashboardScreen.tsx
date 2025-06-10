// src/screens/dashboard/DashboardScreen.tsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { styles, chartConfig } from "./styles";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const DashboardScreen = () => {
  const [filter, setFilter] = useState("month");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receitas e Despesas</Text>

      <LineChart
        data={{
          labels: ["1", "8", "15", "22", "30"],
          datasets: [
            {
              data: [500, 1200, 800, 1500, 1100],
              color: () => "#2EC4B6",
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
      />

      {/* Filtro futuro: dia/semana/mês/ano */}
    </View>
  );
};

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { useWallet } from "@razorlabs/razorkit";
import { useAccountBalance } from "@razorlabs/razorkit";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const barChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3, 9],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

const lineChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Users",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export default function Home() {
  const wallet = useWallet();
  console.log(wallet);
  const { error, loading, balance } = useAccountBalance();

  return (
    <div className="p-4 space-y-4">
      <span className="text-2xl font-bold">
        Chain - {wallet?.chain?.name}, Balance: {String(balance) ?? "0"}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barChartData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

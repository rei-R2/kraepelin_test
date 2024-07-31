import {
  Chart,
  ChartConfiguration,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js";
import { useRef, useEffect } from "react";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
);

export default function ResultTest({
  result,
  dataChart,
  lableTimeDataChart,
}: {
  result: boolean[];
  dataChart: number[];
  lableTimeDataChart: string[];
}) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance: Chart | null = null;

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Konfigurasi Chart
        const config: ChartConfiguration = {
          type: "line", // tipe chart
          data: {
            labels: lableTimeDataChart,
            datasets: [
              {
                label: "Result Test",
                data:
                  dataChart.length > 0
                    ? dataChart
                    : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                pointBorderColor: "#d4d4d4",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
        };

        // Membuat Chart
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chartInstance = new Chart(ctx, config);
      }
    }

    return () => {
      // Cleanup chart instance
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [dataChart]);

  return (
    <div className="mx-auto w-full md:w-1/2">
      <div className="mb-10 mt-5">
        <table className="mx-auto border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="w-24 text-base font-normal text-gray-500 lg:text-lg">
                Correct
              </th>
              <th className="w-24 text-base font-normal text-gray-500 lg:text-lg">
                Incorrect
              </th>
              <th className="w-24 text-base font-normal text-gray-500 lg:text-lg">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center text-2xl text-teal-500 lg:text-3xl">
                {result.filter((correct) => correct).length}
              </td>
              <td className="text-center text-2xl text-red-500 lg:text-3xl">
                {result.filter((correct) => !correct).length}
              </td>
              <td className="text-center text-2xl text-gray-800 lg:text-3xl">
                {result.length}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
}

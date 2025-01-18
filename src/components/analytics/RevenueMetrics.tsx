    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import {
      ResponsiveContainer,
      BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
    } from 'recharts';

    interface RevenueMetricsProps {
      totalRevenue: number;
      revenueGrowthRate: number;
      barColor?: string;
    }

    export function RevenueMetrics({ totalRevenue, revenueGrowthRate }: RevenueMetricsProps) {
      const chartData = [
        { name: 'Revenue', value: totalRevenue },
      ];

      return (
        <Card>
          <CardHeader>
            <CardTitle>Revenue Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <p>Total Revenue</p>
              <p>₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Revenue Growth Rate</p>
              <p>{(revenueGrowthRate * 100).toFixed(2)}%</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    }

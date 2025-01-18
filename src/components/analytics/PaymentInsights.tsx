import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import {
      ResponsiveContainer,
      PieChart,
      Pie,
      Cell,
      Tooltip,
    } from 'recharts';

    interface PaymentInsightsProps {
      paymentBreakdown: { [key: string]: number };
      refundsAndChargebacks: number;
    }

    export function PaymentInsights({ paymentBreakdown, refundsAndChargebacks }: PaymentInsightsProps) {
      const chartData = Object.entries(paymentBreakdown).map(([name, value]) => ({
        name,
        value,
      }));

      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

      return (
        <Card>
          <CardHeader>
            <CardTitle>Payment Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Payment Breakdown</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between">
              <p>Refunds and Chargebacks</p>
              <p>₹{refundsAndChargebacks.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      );
    }

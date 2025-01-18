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

    interface CustomerInsightsProps {
      topCustomers: { name: string; spending: number }[];
      retentionRate: number;
      barColor?: string;
    }

    export function CustomerInsights({ topCustomers, retentionRate }: CustomerInsightsProps) {
      const chartData = topCustomers.map((customer) => ({
        name: customer.name,
        value: customer.spending,
      }));

      return (
        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Top Customers (Spending)</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between">
              <p>Retention Rate</p>
              <p>{(retentionRate * 100).toFixed(2)}%</p>
            </div>
          </CardContent>
        </Card>
      );
    }

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import {
      ResponsiveContainer,
      PieChart,
      Pie,
      Cell,
      Tooltip,
    } from 'recharts';

    interface CustomerSatisfactionProps {
      netPromoterScore: number;
      feedbackTrends: string;
    }

    export function CustomerSatisfaction({ netPromoterScore, feedbackTrends }: CustomerSatisfactionProps) {
      const chartData = [{ name: 'NPS', value: netPromoterScore }];
      const COLORS = ['#22c55e'];

      return (
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <p>Net Promoter Score (NPS)</p>
              <p>{netPromoterScore}</p>
            </div>
            <div className="flex justify-between">
              <p>Feedback Trends</p>
              <p>{feedbackTrends}</p>
            </div>
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
          </CardContent>
        </Card>
      );
    }

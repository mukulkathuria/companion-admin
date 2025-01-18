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

    interface OperationalMetricsProps {
      fixedCosts: number;
      variableCosts: number;
      profitMargins: number;
      barColor?: string;
    }

    export function OperationalMetrics({ fixedCosts, variableCosts, profitMargins}: OperationalMetricsProps) {
      const chartData = [
        { name: 'Fixed Costs', value: fixedCosts },
        { name: 'Variable Costs', value: variableCosts },
        { name: 'Profit Margins', value: profitMargins * 100 },
      ];

      return (
        <Card>
          <CardHeader>
            <CardTitle>Operational Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <p>Fixed Costs</p>
              <p>₹{fixedCosts.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Variable Costs</p>
              <p>₹{variableCosts.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Profit Margins</p>
              <p>{(profitMargins * 100).toFixed(2)}%</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                 <Tooltip 
                  formatter={(value, name) => 
                    name === 'Profit Margins' 
                      ? typeof value === 'number' 
                        ? `${value.toFixed(2)}%` 
                        : value 
                      : `₹${value.toLocaleString()}` 
                  } 
                />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    }

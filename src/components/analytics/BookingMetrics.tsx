import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import {
      ResponsiveContainer,
      PieChart,
      Pie,
      Cell,
      Tooltip,
    } from 'recharts';

    interface BookingMetricsProps {
      totalBookings: number;
      bookingValueDistribution: { [key: string]: number };
    }

    export function BookingMetrics({ totalBookings, bookingValueDistribution }: BookingMetricsProps) {
      const chartData = Object.entries(bookingValueDistribution).map(([name, value]) => ({
        name,
        value,
      }));

      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

      return (
        <Card>
          <CardHeader>
            <CardTitle>Booking Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <p>Total Bookings</p>
              <p>{totalBookings}</p>
            </div>
            <div>
              <p className="font-medium">Booking Value Distribution</p>
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
          </CardContent>
        </Card>
      );
    }

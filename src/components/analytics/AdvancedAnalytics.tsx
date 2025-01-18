import { useState } from 'react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import {
      ResponsiveContainer,
      LineChart,
      Line,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      PieChart,
      Pie,
      Cell,
    } from 'recharts';
    import { Button } from '@/components/ui/button';

    interface AdvancedAnalyticsProps {
      predictiveDemandTrends: string;
      churnAnalysis: string;
      bookingTrends: { date: string; bookings: number }[];
      weekendWeekdayBookings: { weekend: number; weekday: number };
      churnRate: number;
      previousChurnRate: number;
    }

    const COLORS = ['#0088FE', '#00C49F'];

    export function AdvancedAnalytics({
      predictiveDemandTrends,
      churnAnalysis,
      bookingTrends,
      weekendWeekdayBookings,
      churnRate,
      previousChurnRate,
    }: AdvancedAnalyticsProps) {
      const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly'>('daily');

      const totalBookings = weekendWeekdayBookings.weekday + weekendWeekdayBookings.weekend;
      const weekendPercentage = (weekendWeekdayBookings.weekend / totalBookings) * 100;
      const weekdayPercentage = (weekendWeekdayBookings.weekday / totalBookings) * 100;

      const churnData = [{ name: 'Churn Rate', value: churnRate * 100 }, { name: 'Remaining', value: (1 - churnRate) * 100 }];

      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Demand Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium">Booking Trends</p>
                <div className="space-x-2">
                  <Button
                    size="sm"
                    variant={timePeriod === 'daily' ? 'default' : 'outline'}
                    onClick={() => setTimePeriod('daily')}
                  >
                    Daily
                  </Button>
                  <Button
                    size="sm"
                    variant={timePeriod === 'weekly' ? 'default' : 'outline'}
                    onClick={() => setTimePeriod('weekly')}
                  >
                    Weekly
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Total Bookings (Weekends vs Weekdays)</p>
                  <p className="text-2xl font-bold">
                    Weekends: {weekendWeekdayBookings.weekend} ({weekendPercentage.toFixed(2)}%)
                  </p>
                  <p className="text-2xl font-bold">
                    Weekdays: {weekendWeekdayBookings.weekday} ({weekdayPercentage.toFixed(2)}%)
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Percentage Increase in Weekend Bookings</p>
                  <p className="text-2xl font-bold">
                    {predictiveDemandTrends}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Churn Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium">Churn Rate</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={churnData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {churnData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Current Churn Rate</p>
                  <p className="text-2xl font-bold">{(churnRate * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Comparison with Previous Period</p>
                  <p className="text-2xl font-bold">
                    {churnAnalysis} ({(previousChurnRate * 100).toFixed(2)}%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

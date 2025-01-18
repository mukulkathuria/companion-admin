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

interface SocietyAnalyticsProps {
  societyData: {
    [city: string]: {
      [society: string]: {
        revenue: number | undefined;
        bookings: number | undefined;
      };
    };
  };
  city?: 'delhi' | 'lucknow';
  barColor?: string;
}

const vibrantColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#a45de2', '#d042ff'];

export function SocietyAnalytics({ societyData, city, barColor }: SocietyAnalyticsProps) {
  // Flatten the data for the chart
  const chartData = Object.entries(societyData).flatMap(([city, societies]) =>
    Object.entries(societies).map(([society, data]) => ({
      name: `${city} - ${society}`, // Combine city and society for the name
      revenue: data.revenue || 0,
      bookings: data.bookings || 0,
    }))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Society Analytics {city ? `(${city})` : ''}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill={barColor || vibrantColors[0]} name="Revenue" />
            <Bar dataKey="bookings" fill={barColor || vibrantColors[1]} name="Bookings" />
          </BarChart>
        </ResponsiveContainer>

        {/* List of societies */}
        <ul className="list-disc list-inside">
          {Object.entries(societyData).map(([city, societies]) => (
            <li key={city}>
              <p className="font-medium">{city}</p>
              <ul className="ml-4">
                {Object.entries(societies).map(([society, data]) => (
                  <li key={society}>
                    <p className="font-medium">{society}</p>
                    <ul className="ml-4">
                      <li>Revenue: ₹{data.revenue?.toLocaleString() || 'N/A'}</li>
                      <li>Bookings: {data.bookings || 'N/A'}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

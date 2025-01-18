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

    interface GeographicInsightsProps {
      revenueByLocation: { [key: string]: number };
      topRevenueZones: string[];
      barColor?: string;
    }

    const shortenName = (name: string, maxLength: number) => {
      if (name.length <= maxLength) {
        return name;
      }
      const parts = name.split(' ');
      if (parts.length > 1) {
        return `${parts[0]} ${parts[1][0]}.`;
      }
      return `${name.substring(0, maxLength)}...`;
    };

    export function GeographicInsights({ revenueByLocation, topRevenueZones}: GeographicInsightsProps) {
      const chartData = Object.entries(revenueByLocation).map(([name, value]) => ({
        name,
        shortName: shortenName(name, 15),
        value,
      }));

      return (
        <Card>
          <CardHeader>
            <CardTitle>Geographic Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Revenue by Location</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="shortName"
                    tick={{
                      fontSize: 10,
                      textAnchor: 'middle',
                      width: 100,
                      
                    }}
                    height={80}
                    
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="font-medium">Top Revenue Zones</p>
              <ul className="list-disc list-inside">
                {topRevenueZones.map((zone) => (
                  <li key={zone}>{zone}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      );
    }

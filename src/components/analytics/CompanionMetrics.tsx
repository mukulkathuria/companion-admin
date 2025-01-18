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

    interface CompanionMetricsProps {
      earningsByCompanion: { [key: string]: number };
      utilizationRates: { [key: string]: number };
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

    export function CompanionMetrics({ earningsByCompanion, utilizationRates}: CompanionMetricsProps) {
      const earningsData = Object.entries(earningsByCompanion).map(([name, value]) => ({
        name,
        shortName: shortenName(name, 15),
        value,
      }));

      const utilizationData = Object.entries(utilizationRates).map(([name, value]) => ({
        name,
        shortName: shortenName(name, 15),
        value: value * 100,
      }));

      return (
        <Card>
          <CardHeader>
            <CardTitle>Companion Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Earnings by Companion</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={earningsData}>
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
                  <Tooltip formatter={(value, _name, entry) => [`${entry.payload.name}: ₹${value.toLocaleString()}`]} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="font-medium">Utilization Rates</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={utilizationData}>
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
                  <Tooltip
                     formatter={(value, _name, entry) => {
                       if (typeof value === 'number') {
                         return `${entry.payload.name}: ${value.toFixed(2)}%`;
                       } else {
                         return `${entry.payload.name}: ${value}`; 
                       }
                     }}
                   />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      );
    }

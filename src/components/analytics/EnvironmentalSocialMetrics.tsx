import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Progress } from '@/components/ui/progress';
    import {
      ResponsiveContainer,
      PieChart,
      Pie,
      Cell,
      Tooltip,
    } from 'recharts';
    import { Button } from '@/components/ui/button';

    interface EnvironmentalSocialMetricsProps {
      sustainabilityEfforts: string;
      communityImpact: string;
      ecoFriendlySuppliers: { total: number; ecoFriendly: number };
      donationData: { totalProfits: number; amountDonated: number; charitiesSupported: number };
    }

    const COLORS = ['#00C49F', '#FFBB28'];

    export function EnvironmentalSocialMetrics({
      sustainabilityEfforts,
      communityImpact,
      ecoFriendlySuppliers,
      donationData,
    }: EnvironmentalSocialMetricsProps) {
      const ecoFriendlyPercentage = (ecoFriendlySuppliers.ecoFriendly / ecoFriendlySuppliers.total) * 100;
      const donationPercentage = (donationData.amountDonated / donationData.totalProfits) * 100;
      const donationChartData = [{ name: 'Donated', value: donationPercentage }, { name: 'Remaining', value: 100 - donationPercentage }];

      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Efforts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium">Eco-Friendly Suppliers</p>
              </div>
              <Progress value={ecoFriendlyPercentage} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Total Eco-Friendly Suppliers</p>
                  <p className="text-2xl font-bold">{ecoFriendlySuppliers.ecoFriendly}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Percentage of Eco-Friendly Suppliers</p>
                  <p className="text-2xl font-bold">{ecoFriendlyPercentage.toFixed(2)}%</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {sustainabilityEfforts}
                </p>
              </div>
              <div className="mt-4">
                <Button variant="link">View More Details</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium">Donation of Profits</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={donationChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {donationChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => 
                     typeof value === 'number' 
                       ? `${value.toFixed(2)}%` 
                       : value 
                   } />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Total Amount Donated</p>
                  <p className="text-2xl font-bold">₹{donationData.amountDonated.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Number of Charities Supported</p>
                  <p className="text-2xl font-bold">{donationData.charitiesSupported}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {communityImpact}
                </p>
              </div>
              <div className="mt-4">
                <Button variant="link">View More Details</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

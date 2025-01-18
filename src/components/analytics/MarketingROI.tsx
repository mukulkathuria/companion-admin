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

    interface MarketingROIProps {
      sourceOfAcquisition: { [key: string]: number };
      socialMediaEngagement: { likes: number; shares: number; comments: number };
      barColor?: string;
    }

    export function MarketingROI({ sourceOfAcquisition, socialMediaEngagement }: MarketingROIProps) {
      const acquisitionData = Object.entries(sourceOfAcquisition).map(([name, value]) => ({
        name,
        value,
      }));

      const engagementData = [
        { name: 'Likes', value: socialMediaEngagement.likes },
        { name: 'Shares', value: socialMediaEngagement.shares },
        { name: 'Comments', value: socialMediaEngagement.comments },
      ];

      return (
        <Card>
          <CardHeader>
            <CardTitle>Marketing ROI Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Source of Acquisition</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={acquisitionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="font-medium">Social Media Engagement</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      );
    }

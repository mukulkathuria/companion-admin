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
    import { Badge } from '@/components/ui/badge';
    import { Table, TableBody,  TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { useState, useMemo } from 'react';

    interface SecurityComplianceProps {
      breachData?: { date: string; breaches: number }[];
      complianceLogs?: { name: string; status: string; lastChecked: string }[];
    }

    export function SecurityCompliance({ breachData = [], complianceLogs = [] }: SecurityComplianceProps) {
      const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

      const handleSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      };

      const sortedComplianceLogs = useMemo(() => {
        if (!sortConfig || !Array.isArray(complianceLogs)) return [];
        return [...complianceLogs].sort((a, b) => {
          const aValue = a[sortConfig.key as keyof typeof a];
          const bValue = b[sortConfig.key as keyof typeof b];
          if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }, [complianceLogs, sortConfig]);

      const totalBreaches = breachData.reduce((sum, item) => sum + item.breaches, 0);
      const resolvedBreaches = breachData.filter(item => item.breaches === 0).length;
      const pendingBreaches = totalBreaches - resolvedBreaches;

      const passedChecks = Array.isArray(complianceLogs) ? complianceLogs.filter(log => log.status === 'Passed').length : 0;
      const failedChecks = Array.isArray(complianceLogs) ? complianceLogs.filter(log => log.status === 'Failed').length : 0;
      const pendingChecks = Array.isArray(complianceLogs) ? complianceLogs.filter(log => log.status === 'Pending').length : 0;

      const getBadgeColor = (status: string) => {
        switch (status) {
          case 'Passed':
            return 'bg-green-100 text-green-800';
          case 'Failed':
            return 'bg-red-100 text-red-800';
          case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };

      const formatDate = (dateString: string) => {
        try {
          const date = new Date(dateString);
          const day = date.getDate();
          const month = date.toLocaleString('default', { month: 'short' });
          return `${day} ${month}`;
        } catch (error) {
          return dateString;
        }
      };

      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Breach Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Total Breaches Detected</p>
                  <p className="text-2xl font-bold">{totalBreaches}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Resolved Breaches</p>
                  <p className="text-2xl font-bold">{resolvedBreaches}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Pending Breaches</p>
                  <p className="text-2xl font-bold">{pendingBreaches}</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={breachData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="breaches" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Logs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Total Checks Passed</p>
                  <p className="text-2xl font-bold">{passedChecks}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Total Checks Failed</p>
                  <p className="text-2xl font-bold">{failedChecks}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">Total Checks Pending</p>
                  <p className="text-2xl font-bold">{pendingChecks}</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                        Compliance Check Name
                      </TableHead>
                      <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                        Status
                      </TableHead>
                      <TableHead onClick={() => handleSort('lastChecked')} className="cursor-pointer">
                        Last Checked Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedComplianceLogs?.map((log) => (
                      <TableRow key={log.name}>
                        <TableCell>{log.name}</TableCell>
                        <TableCell>
                          <Badge className={getBadgeColor(log.status)}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(log.lastChecked)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

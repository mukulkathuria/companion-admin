import { useState, useEffect } from 'react';
    import { RevenueMetrics } from './analytics/RevenueMetrics';
    import { BookingMetrics } from './analytics/BookingMetrics';
    import { GeographicInsights } from './analytics/GeographicInsights';
    import { PaymentInsights } from './analytics/PaymentInsights';
    import { CompanionMetrics } from './analytics/CompanionMetrics';
    import { OperationalMetrics } from './analytics/OperationalMetrics';
    import { CustomerInsights } from './analytics/CustomerInsights';
    import { MarketingROI } from './analytics/MarketingROI';
    import { SecurityCompliance } from './analytics/SecurityCompliance';
    import { AdvancedAnalytics } from './analytics/AdvancedAnalytics';
    import { EnvironmentalSocialMetrics } from './analytics/EnvironmentalSocialMetrics';
    import { CustomerSatisfaction } from './analytics/CustomerSatisfaction';
    import { SocietyAnalytics } from './analytics/SocietyAnalytics';
    import { dummyGeneralAnalytics } from '@/data/analytics/general';
    import { dummyDelhiAnalytics } from '@/data/analytics/delhi';
    import { dummyLucknowAnalytics } from '@/data/analytics/lucknow';
    import { dummySocietiesData } from '@/data/analytics/societies';
    import { StateMap } from './analytics/StateMap';
    import { Card, CardContent } from './ui/card';

    type CityTab = 'delhi' | 'lucknow';

    interface StateData {
      name: string;
      activeUsers: number;
      activeCompanions: number;
    }

    const dummyStateData: { [state: string]: StateData } = {
      'Andhra Pradesh': { name: 'Andhra Pradesh', activeUsers: 10, activeCompanions: 5 },
      'Arunachal Pradesh': { name: 'Arunachal Pradesh', activeUsers: 5, activeCompanions: 2 },
      'Assam': { name: 'Assam', activeUsers: 8, activeCompanions: 3 },
      'Bihar': { name: 'Bihar', activeUsers: 12, activeCompanions: 6 },
      'Chhattisgarh': { name: 'Chhattisgarh', activeUsers: 7, activeCompanions: 4 },
      'Goa': { name: 'Goa', activeUsers: 15, activeCompanions: 8 },
      'Gujarat': { name: 'Gujarat', activeUsers: 20, activeCompanions: 10 },
      'Haryana': { name: 'Haryana', activeUsers: 18, activeCompanions: 9 },
      'Himachal Pradesh': { name: 'Himachal Pradesh', activeUsers: 6, activeCompanions: 3 },
      'Jharkhand': { name: 'Jharkhand', activeUsers: 9, activeCompanions: 5 },
      'Karnataka': { name: 'Karnataka', activeUsers: 25, activeCompanions: 12 },
      'Kerala': { name: 'Kerala', activeUsers: 22, activeCompanions: 11 },
      'Madhya Pradesh': { name: 'Madhya Pradesh', activeUsers: 14, activeCompanions: 7 },
      'Maharashtra': { name: 'Maharashtra', activeUsers: 30, activeCompanions: 15 },
      'Manipur': { name: 'Manipur', activeUsers: 4, activeCompanions: 2 },
      'Meghalaya': { name: 'Meghalaya', activeUsers: 7, activeCompanions: 3 },
      'Mizoram': { name: 'Mizoram', activeUsers: 3, activeCompanions: 1 },
      'Nagaland': { name: 'Nagaland', activeUsers: 5, activeCompanions: 2 },
      'Odisha': { name: 'Odisha', activeUsers: 11, activeCompanions: 6 },
      'Punjab': { name: 'Punjab', activeUsers: 16, activeCompanions: 8 },
      'Rajasthan': { name: 'Rajasthan', activeUsers: 19, activeCompanions: 9 },
      'Sikkim': { name: 'Sikkim', activeUsers: 2, activeCompanions: 1 },
      'Tamil Nadu': { name: 'Tamil Nadu', activeUsers: 28, activeCompanions: 14 },
      'Telangana': { name: 'Telangana', activeUsers: 24, activeCompanions: 12 },
      'Tripura': { name: 'Tripura', activeUsers: 6, activeCompanions: 3 },
      'Uttar Pradesh': { name: 'Uttar Pradesh', activeUsers: 35, activeCompanions: 18 },
      'Uttarakhand': { name: 'Uttarakhand', activeUsers: 10, activeCompanions: 5 },
      'West Bengal': { name: 'West Bengal', activeUsers: 27, activeCompanions: 13 },
    };

    export function Analytics() {
      const [activeCityTab, setActiveCityTab] = useState<CityTab>('delhi');
      const [selectedState, setSelectedState] = useState<StateData | null>(null);
      const [stateData, setStateData] = useState<{ [state: string]: StateData }>(dummyStateData);

      const tabs = [
        { id: 'delhi' as const, label: 'Delhi' },
        { id: 'lucknow' as const, label: 'Lucknow' },
      ];

      const renderCityAnalytics = () => {
        switch (activeCityTab) {
          case 'delhi':
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RevenueMetrics
                  totalRevenue={dummyDelhiAnalytics.revenue.totalRevenue}
                  revenueGrowthRate={dummyDelhiAnalytics.revenue.revenueGrowthRate}
                  barColor="var(--chart-1)"
                />
                <BookingMetrics
                  totalBookings={dummyDelhiAnalytics.bookings.totalBookings}
                  bookingValueDistribution={dummyDelhiAnalytics.bookings.bookingValueDistribution}
                />
                <GeographicInsights
                  revenueByLocation={dummyDelhiAnalytics.geographic.revenueByColony}
                  topRevenueZones={dummyDelhiAnalytics.geographic.topRevenueZones}
                  barColor="var(--chart-2)"
                />
                <PaymentInsights
                  paymentBreakdown={dummyDelhiAnalytics.payment.paymentBreakdown}
                  refundsAndChargebacks={dummyDelhiAnalytics.payment.refundsAndChargebacks}
                />
                <CompanionMetrics
                  earningsByCompanion={dummyDelhiAnalytics.companion.earningsByCompanion}
                  utilizationRates={dummyDelhiAnalytics.companion.utilizationRates}
                  barColor="var(--chart-3)"
                />
                <CustomerInsights
                  topCustomers={dummyDelhiAnalytics.customer.topCustomers}
                  retentionRate={dummyDelhiAnalytics.customer.retentionRate}
                  barColor="var(--chart-4)"
                />
                <SocietyAnalytics societyData={dummySocietiesData.delhi} city="delhi" barColor="var(--chart-5)" />
              </div>
            );
          case 'lucknow':
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RevenueMetrics
                  totalRevenue={dummyLucknowAnalytics.revenue.totalRevenue}
                  revenueGrowthRate={dummyLucknowAnalytics.revenue.revenueGrowthRate}
                  barColor="var(--chart-1)"
                />
                <BookingMetrics
                  totalBookings={dummyLucknowAnalytics.bookings.totalBookings}
                  bookingValueDistribution={dummyLucknowAnalytics.bookings.bookingValueDistribution}
                />
                <GeographicInsights
                  revenueByLocation={dummyLucknowAnalytics.geographic.revenueByColony}
                  topRevenueZones={dummyLucknowAnalytics.geographic.topRevenueZones}
                  barColor="var(--chart-2)"
                />
                <PaymentInsights
                  paymentBreakdown={dummyLucknowAnalytics.payment.paymentBreakdown}
                  refundsAndChargebacks={dummyLucknowAnalytics.payment.refundsAndChargebacks}
                />
                <CompanionMetrics
                  earningsByCompanion={dummyLucknowAnalytics.companion.earningsByCompanion}
                  utilizationRates={dummyLucknowAnalytics.companion.utilizationRates}
                  barColor="var(--chart-3)"
                />
                <CustomerInsights
                  topCustomers={dummyLucknowAnalytics.customer.topCustomers}
                  retentionRate={dummyLucknowAnalytics.customer.retentionRate}
                  barColor="var(--chart-4)"
                />
                <SocietyAnalytics societyData={dummySocietiesData.lucknow} city="lucknow" barColor="var(--chart-5)" />
              </div>
            );
          default:
            return null;
        }
      };

      const handleSelectState = (state: StateData) => {
        setSelectedState(state);
      };

      const fetchStateData = async () => {
        try {
          // Simulate an API call
          const response = await new Promise<{ [state: string]: StateData }>((resolve) =>
            setTimeout(() => resolve(dummyStateData), 1000) // Mocked delay
          );
      
          // Update stateData
          setStateData(response);
        } catch (error) {
          console.error("Error fetching state data:", error);
      
          // Optionally, handle fallback data
          setStateData(dummyStateData);
        }
      };
      

      useEffect(() => {
        fetchStateData();
      }, []);

      return (
        <div className="space-y-6">
          <div className="flex space-x-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCityTab(tab.id)}
                className={`py-2 px-4 border-b-2 ${
                  activeCityTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div> 
          <StateMap
            stateData={stateData}
            onSelectState={handleSelectState}
          />
          {selectedState && (
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 10,
              }}
            >
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{selectedState.name}</h3>
                  <p>Active Users: {selectedState.activeUsers}</p>
                  <p>Active Companions: {selectedState.activeCompanions}</p>
                  <button onClick={() => setSelectedState(null)} className="mt-2 text-sm text-primary">Close</button>
                </CardContent>
              </Card>
            </div>
          )}
          {renderCityAnalytics()}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RevenueMetrics
              totalRevenue={dummyGeneralAnalytics.revenue.totalRevenue}
              revenueGrowthRate={dummyGeneralAnalytics.revenue.revenueGrowthRate}
              barColor="var(--chart-1)"
            />
            <BookingMetrics
              totalBookings={dummyGeneralAnalytics.bookings.totalBookings}
              bookingValueDistribution={dummyGeneralAnalytics.bookings.bookingValueDistribution}
            />
            <PaymentInsights
              paymentBreakdown={dummyGeneralAnalytics.payment.paymentBreakdown}
              refundsAndChargebacks={dummyGeneralAnalytics.payment.refundsAndChargebacks}
            />
            <OperationalMetrics
              fixedCosts={dummyGeneralAnalytics.operational.fixedCosts}
              variableCosts={dummyGeneralAnalytics.operational.variableCosts}
              profitMargins={dummyGeneralAnalytics.operational.profitMargins}
              barColor="var(--chart-2)"
            />
            <CustomerInsights
              topCustomers={dummyGeneralAnalytics.customer.topCustomers}
              retentionRate={dummyGeneralAnalytics.customer.retentionRate}
              barColor="var(--chart-3)"
            />
            <MarketingROI
              sourceOfAcquisition={dummyGeneralAnalytics.marketing.sourceOfAcquisition}
              socialMediaEngagement={dummyGeneralAnalytics.marketing.socialMediaEngagement}
              barColor="var(--chart-4)"
            />
            <SecurityCompliance
              breachData={dummyGeneralAnalytics.security.dataBreachMonitoring}
              complianceLogs={dummyGeneralAnalytics.security.complianceLogs}
            />
            <AdvancedAnalytics
              predictiveDemandTrends={dummyGeneralAnalytics.advanced.predictiveDemandTrends}
              churnAnalysis={dummyGeneralAnalytics.advanced.churnAnalysis}
              bookingTrends={dummyGeneralAnalytics.advanced.bookingTrends}
              weekendWeekdayBookings={dummyGeneralAnalytics.advanced.weekendWeekdayBookings}
              churnRate={dummyGeneralAnalytics.advanced.churnRate}
              previousChurnRate={dummyGeneralAnalytics.advanced.previousChurnRate}
            />
            <EnvironmentalSocialMetrics
              sustainabilityEfforts={dummyGeneralAnalytics.environmental.sustainabilityEfforts}
              communityImpact={dummyGeneralAnalytics.environmental.communityImpact}
              ecoFriendlySuppliers={dummyGeneralAnalytics.environmental.ecoFriendlySuppliers}
              donationData={dummyGeneralAnalytics.environmental.donationData}
            />
            <CustomerSatisfaction
              netPromoterScore={dummyGeneralAnalytics.satisfaction.netPromoterScore}
              feedbackTrends={dummyGeneralAnalytics.satisfaction.feedbackTrends}
            />
          </div>
        </div>
      );
    }

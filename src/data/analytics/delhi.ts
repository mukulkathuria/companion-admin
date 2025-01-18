export const dummyDelhiAnalytics = {
      revenue: {
        totalRevenue: 70000,
        revenueGrowthRate: 0.10,
      },
      bookings: {
        totalBookings: 150,
        bookingValueDistribution: {
          '0-1000': 20,
          '1000-3000': 80,
          '3000+': 50,
        },
      },
      geographic: {
        revenueByColony: {
          'CP Colony': 20000,
          'Hauz Khas': 15000,
          'South Delhi': 35000,
        },
        topRevenueZones: ['South Delhi', 'CP Colony', 'Hauz Khas'],
      },
      payment: {
        paymentBreakdown: {
          creditCard: 40000,
          upi: 20000,
          netBanking: 10000,
        },
        refundsAndChargebacks: 500,
      },
      companion: {
        earningsByCompanion: {
          'James Brown': 15000,
          'Priya Sharma': 20000,
          'Rohan Das': 10000,
        },
        utilizationRates: {
          'James Brown': 0.8,
          'Priya Sharma': 0.9,
          'Rohan Das': 0.7,
        },
      },
      customer: {
        topCustomers: [
          { name: 'John Doe', spending: 5000 },
          { name: 'Jane Smith', spending: 4000 },
          { name: 'Mike Brown', spending: 3000 },
        ],
        retentionRate: 0.70,
      },
    };

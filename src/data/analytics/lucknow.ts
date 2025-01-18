export const dummyLucknowAnalytics = {
      revenue: {
        totalRevenue: 80000,
        revenueGrowthRate: 0.20,
      },
      bookings: {
        totalBookings: 150,
        bookingValueDistribution: {
          '0-1000': 30,
          '1000-3000': 70,
          '3000+': 50,
        },
      },
      geographic: {
        revenueByColony: {
          'Hazratganj': 30000,
          'Gomti Nagar': 25000,
          'Aliganj': 25000,
        },
        topRevenueZones: ['Hazratganj', 'Gomti Nagar', 'Aliganj'],
      },
      payment: {
        paymentBreakdown: {
          creditCard: 50000,
          upi: 20000,
          netBanking: 10000,
        },
        refundsAndChargebacks: 500,
      },
      companion: {
        earningsByCompanion: {
          'Emma Davis': 20000,
          'Arjun Reddy': 25000,
          'Rohan Das': 15000,
        },
        utilizationRates: {
          'Emma Davis': 0.9,
          'Arjun Reddy': 0.8,
          'Rohan Das': 0.7,
        },
      },
      customer: {
        topCustomers: [
          { name: 'Emily White', spending: 5000 },
          { name: 'David Lee', spending: 4000 },
          { name: 'Sarah Wilson', spending: 3000 },
        ],
        retentionRate: 0.80,
      },
    };

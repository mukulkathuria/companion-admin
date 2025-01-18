interface StateData {
      name: string;
      activeUsers: number;
      activeCompanions: number;
    }

    export const dummyStateData: { [state: string]: StateData } = {
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

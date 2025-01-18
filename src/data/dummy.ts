export const dummySlotRequests = [
  {
    id: 1,
    username: 'John Doe',
    email: 'john@example.com',
    location: 'Mumbai',
    gender: 'Male',
    age: 28,
    companionName: 'Sarah Wilson',
    purpose: 'Dinner Date',
    area: 'Bandra',
    bookingTime: '2024-03-20T19:00:00',
    meetupLocation: 'The Taj Mahal Palace',
  },
  {
    id: 2,
    username: 'Alice Smith',
    email: 'alice@example.com',
    location: 'Delhi',
    gender: 'Female',
    age: 25,
    companionName: 'James Brown',
    purpose: 'City Tour',
    area: 'Connaught Place',
    bookingTime: '2024-03-21T10:00:00',
    meetupLocation: 'India Gate',
  },
  {
    id: 3,
    username: 'Bob Johnson',
    email: 'bob@example.com',
    location: 'Chennai',
    gender: 'Male',
    age: 32,
    companionName: 'Priya Sharma',
    purpose: 'Movie Night',
    area: 'Nungambakkam',
    bookingTime: '2024-03-23T20:00:00',
    meetupLocation: 'Express Avenue Mall',
  },
  {
    id: 4,
    username: 'Emily White',
    email: 'emily@example.com',
    location: 'Kolkata',
    gender: 'Female',
    age: 29,
    companionName: 'Rohan Das',
    purpose: 'Shopping Trip',
    area: 'Park Street',
    bookingTime: '2024-03-24T11:00:00',
    meetupLocation: 'South City Mall',
  },
];

export const dummyExtensionRequests = [
  {
    id: 1,
    username: 'Michael Johnson',
    email: 'michael@example.com',
    location: 'Bangalore',
    gender: 'Male',
    age: 30,
    companionName: 'Emma Davis',
    area: 'Indiranagar',
    bookingTime: '2024-03-22T14:00:00',
    meetupLocation: 'UB City Mall',
    extensionDuration: 2, // hours
  },
  {
    id: 2,
    username: 'Olivia Brown',
    email: 'olivia@example.com',
    location: 'Hyderabad',
    gender: 'Female',
    age: 26,
    companionName: 'Arjun Reddy',
    area: 'Jubilee Hills',
    bookingTime: '2024-03-25T16:00:00',
    meetupLocation: 'GVK One Mall',
    extensionDuration: 3, // hours
  },
];

export const dummyCancellationRequests = [
  {
    id: 1,
    username: 'Sarah Wilson',
    gender: 'Female',
    cancellationTime: '2024-03-19T10:00:00',
    bookingTime: '2024-03-20T15:00:00',
    type: 'Before 24 hours',
  },
  {
    id: 2,
    username: 'David Lee',
    gender: 'Male',
    cancellationTime: '2024-03-23T14:00:00',
    bookingTime: '2024-03-24T18:00:00',
    type: 'Within 24 hours',
  },
];

export const dummyCompanionCancellations = [
  {
    id: 1,
    companionName: 'Emma Davis',
    clientName: 'Michael Johnson',
    gender: 'Female',
    reason: 'Emergency medical appointment',
    bookingTime: '2024-03-22T14:00:00',
    cancellationTime: '2024-03-21T09:00:00',
  },
  {
    id: 2,
    companionName: 'Arjun Reddy',
    clientName: 'Olivia Brown',
    gender: 'Male',
    reason: 'Family emergency',
    bookingTime: '2024-03-25T16:00:00',
    cancellationTime: '2024-03-24T12:00:00',
  },
];

interface Companion {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'Male' | 'Female' | 'OTHER'; // Update this line
  skinTone: 'Fair' | 'Brown' | 'Dark';
  bodyType: string;
  eatingHabits: string;
  smokingHabit: string;
  drinkingHabit: string;
  location: string;
  email: string;
  bookingRate: number;
  description: string[];
  password?: string;
  height: number;
}

interface UpdateRequest {
  id: number;
  companionId: number;
  oldProfile: Companion;
  newProfile: Partial<Companion>;
  status: 'pending' | 'approved' | 'rejected';
}

export const dummyUpdateRequests: UpdateRequest[] = [
  {
    id: 1,
    companionId: 1,
    oldProfile: {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Wilson',
      age: 24,
      gender: 'Female',
      skinTone: 'Fair',
      bodyType: 'Hourglass',
      eatingHabits: 'Non-Veg',
      smokingHabit: 'Non-Smoker',
      drinkingHabit: 'Occasionally',
      location: 'Mumbai',
      email: 'sarah@example.com',
      bookingRate: 50,
      description: ['MOVIES', 'TRAVEL_BUDDY'], // Updated to array
      height: 165,
    },
    newProfile: {
      location: 'Pune',
      bookingRate: 55,
      description: ['MOVIES', 'TRAVEL_BUDDY', 'FITNESS_PARTNER'], // Updated to array
    },
    status: 'pending',
  },
  {
    id: 2,
    companionId: 2,
    oldProfile: {
      id: 2,
      firstName: 'James',
      lastName: 'Brown',
      age: 28,
      gender: 'Male',
      skinTone: 'Brown',
      bodyType: 'Muscular',
      eatingHabits: 'Non-Veg',
      smokingHabit: 'Non-Smoker',
      drinkingHabit: 'Drinker',
      location: 'Delhi',
      email: 'james@example.com',
      bookingRate: 60,
      description: ['MOVIES', 'TRAVEL_BUDDY', 'FITNESS_PARTNER'], 
      height: 180,
    },
    newProfile: {
      bookingRate: 65,
      description: ['MOVIES', 'ROAD_TRIPS', 'FITNESS_PARTNER'],
    },
    status: 'pending',
  },
];

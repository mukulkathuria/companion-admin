import { CompanionFormDto, CompanionSkinToneEnum, GenderEnum } from "@/data/dto/companion.data.dto";
import { BookingDto } from "@/utils/dto/booking.dto";

export const requestTableColumns = [
  { id: 1, label: "User" },
  { id: 2, label: "Location" },
  { id: 3, label: "Gender" },
  { id: 4, label: "Booking Time" },
];

export const cancellationTableColumns = [
  { id: 1, label: "User" },
  { id: 3, label: "Gender" },
  { id: 4, label: "Booking Time" },
]


export const ExtensionTableColumns = [
  { id: 1, label: "User" },
  { id: 3, label: "Gender" },
  { id: 4, label: "Booking Time" },
  { id: 5, label: 'Last Updated' }
]

export const dummySlotRequests = [
  {
    id: 1,
    username: "John Doe",
    email: "john@example.com",
    city: "Mumbai",
    gender: "Male",
    age: 28,
    companionName: "Sarah Wilson",
    purpose: "Dinner Date",
    area: "Bandra",
    bookingTime: "2024-03-20T19:00:00",
    meetupcity: "The Taj Mahal Palace",
  },
  {
    id: 2,
    username: "Alice Smith",
    email: "alice@example.com",
    city: "Delhi",
    gender: "Female",
    age: 25,
    companionName: "James Brown",
    purpose: "City Tour",
    area: "Connaught Place",
    bookingTime: "2024-03-21T10:00:00",
    meetupcity: "India Gate",
  },
  {
    id: 3,
    username: "Bob Johnson",
    email: "bob@example.com",
    city: "Chennai",
    gender: "Male",
    age: 32,
    companionName: "Priya Sharma",
    purpose: "Movie Night",
    area: "Nungambakkam",
    bookingTime: "2024-03-23T20:00:00",
    meetupcity: "Express Avenue Mall",
  },
  {
    id: 4,
    username: "Emily White",
    email: "emily@example.com",
    city: "Kolkata",
    gender: "Female",
    age: 29,
    companionName: "Rohan Das",
    purpose: "Shopping Trip",
    area: "Park Street",
    bookingTime: "2024-03-24T11:00:00",
    meetupcity: "South City Mall",
  },
];

export const dummyExtensionRequests = [
  {
    id: 1,
    username: "Michael Johnson",
    email: "michael@example.com",
    city: "Bangalore",
    gender: "Male",
    age: 30,
    companionName: "Emma Davis",
    area: "Indiranagar",
    bookingTime: "2024-03-22T14:00:00",
    meetupcity: "UB City Mall",
    extensionDuration: 2, // hours
  },
  {
    id: 2,
    username: "Olivia Brown",
    email: "olivia@example.com",
    city: "Hyderabad",
    gender: "Female",
    age: 26,
    companionName: "Arjun Reddy",
    area: "Jubilee Hills",
    bookingTime: "2024-03-25T16:00:00",
    meetupcity: "GVK One Mall",
    extensionDuration: 3, // hours
  },
];

export const dummyCancellationRequests = [
  {
    id: 1,
    username: "Sarah Wilson",
    gender: "Female",
    cancellationTime: "2024-03-19T10:00:00",
    bookingTime: "2024-03-20T15:00:00",
    type: "Before 24 hours",
  },
  {
    id: 2,
    username: "David Lee",
    gender: "Male",
    cancellationTime: "2024-03-23T14:00:00",
    bookingTime: "2024-03-24T18:00:00",
    type: "Within 24 hours",
  },
];

export const dummyCompanionCancellations = [
  {
    id: 1,
    companionName: "Emma Davis",
    clientName: "Michael Johnson",
    gender: "Female",
    reason: "Emergency medical appointment",
    bookingTime: "2024-03-22T14:00:00",
    cancellationTime: "2024-03-21T09:00:00",
  },
  {
    id: 2,
    companionName: "Arjun Reddy",
    clientName: "Olivia Brown",
    gender: "Male",
    reason: "Family emergency",
    bookingTime: "2024-03-25T16:00:00",
    cancellationTime: "2024-03-24T12:00:00",
  },
];

interface UpdateRequest {
  id: number;
  companionId: number;
  oldProfile: CompanionFormDto;
  newProfile: Partial<CompanionFormDto>;
  status: "pending" | "approved" | "rejected";
}

export const dummyUpdateRequests: UpdateRequest[] = [
  {
    id: 1,
    companionId: 1,
    oldProfile: {
      id: 1,
      images: null,
      firstname: "Sarah",
      lastname: "Wilson",
      age: 24,
      phoneno: "9876543210",
      state: "Maharashtra",
      gender: GenderEnum.FEMALE,
      skintone: CompanionSkinToneEnum.FAIR,
      bodytype: "Hourglass",
      eatinghabits: "Non-Veg",
      smokinghabits: "Non-Smoker",
      drinkinghabits: "Occasionally",
      city: "Mumbai",
      email: "sarah@example.com",
      bookingrate: 50,
      description: ["MOVIES", "TRAVEL_BUDDY"], // Updated to array
      height: 165,
    },
    newProfile: {
      city: "Pune",
      bookingrate: 55,
      description: ["MOVIES", "TRAVEL_BUDDY", "FITNESS_PARTNER"], // Updated to array
    },
    status: "pending",
  },
];

export const dummyBookings: BookingDto[] = [
  {
    id: 1,
    username: "John Doe",
    companionName: "Sarah Wilson",
    bookingDate: "2024-03-20",
    bookingTime: "19:00",
    status: "Completed",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    companionImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    companionId: "COMP001",
    purpose: "Dinner Date",
    city: "The Taj Mahal Palace",
    transactionId: "TXN123456",
    amountPaid: 5000,
    userReview: "Great company, very professional",
    companionReview: "Respectful and punctual client",
  },
  {
    id: 2,
    username: "Alice Smith",
    companionName: "James Brown",
    bookingDate: "2024-03-21",
    bookingTime: "10:00",
    status: "Failed",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    companionImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    companionId: "COMP002",
    purpose: "City Tour",
    city: "India Gate",
    canceledBy: "Companion",
    cancellationTime: "2024-03-20T20:00:00",
    cancellationReason: "Emergency medical appointment",
    transactionId: "TXN123457",
    amountPaid: 3000,
  },
];

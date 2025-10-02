// Type definitions for the actual API response structure
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  age: number;
  Images: string[];
  gender: string;
  userpaymentmethods: UserPaymentMethod[];
}

interface GoogleExtra {
  photo: string;
  place_id: string;
  placeType?: string[];
  placetype?: string[];
}

interface BaseLocation {
  city: string;
  state: string;
  formattedaddress: string;
  name: string;
  userInput: string;
  lat: number;
  lng: number;
  googleextra: GoogleExtra;
}

interface UserPaymentMethod {
  id: string;
  companionrequestid?: number;
  userid?: string;
  nickname: string;
  type: string;
  isVerified: boolean;
  accountHolderName: string | null;
  accountNumber: string | null;
  ifscCode: string | null;
  bankName: string | null;
  branchName: string | null;
  accountType: string | null;
  upiId: string | null;
  upiProvider: string | null;
  walletProvider: string | null;
  walletIdentifier: string | null;
  recipientName: string | null;
  isDefault: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CompanionDetails {
  User: User;
  bookingrate: number;
  description: string[];
  Skintone: string;
  height: number;
  bodytype: string;
  eatinghabits: string;
  drinkinghabits: string;
  smokinghabits: string;
  account: string;
  baselocation: BaseLocation[];
}

// Main API Response structure
interface CompanionRequestApiResponse {
  id: number;
  companionid: string;
  firstname: string;
  lastname: string;
  Images: string[];
  age: string;
  phoneno: string;
  height: string;
  description: string[];
  skintone: string;
  bodytype: string;
  eatinghabits: string;
  drinkinghabits: string;
  smokinghabits: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  companiondetails: CompanionDetails;
  baselocations: BaseLocation[];
  paymentmethods: UserPaymentMethod[];
}

// Formatted output type
interface FormattedCompanionData {
  // Request level data
  requestId: number;
  companionId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  
  // User data
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  age: number;
  gender: string;
  images: string[];
  
  // Companion details
  bookingrate: number;
  description: string[];
  skintone: string;
  height: number;
  bodytype: string;
  eatinghabits: string;
  drinkinghabits: string;
  smokinghabits: string;
  account: string;
  
  // Locations and payments
  baselocations: BaseLocation[];
  paymentmethods: UserPaymentMethod[];
}

// Main formatter function
export function formatApiResponse(
  apiResponse: CompanionRequestApiResponse
): FormattedCompanionData | null {
  // Check if required data exists
  if (!apiResponse?.companiondetails?.User) {
    console.warn('Missing required companion details or user data');
    return null;
  }

  const { companiondetails, paymentmethods, baselocations } = apiResponse;
  const { User } = companiondetails;

  const formattedData: FormattedCompanionData = {
    // Request level data
    requestId: apiResponse.id,
    companionId: apiResponse.companionid,
    status: apiResponse.status,
    createdAt: apiResponse.createdAt,
    updatedAt: apiResponse.updatedAt,
    
    // User data from nested companiondetails.User
    userId: User.id,
    firstname: User.firstname,
    lastname: User.lastname,
    email: User.email,
    phoneno: User.phoneno,
    age: User.age,
    gender: User.gender,
    images: User.Images || [],
    
    // Companion details from nested companiondetails
    bookingrate: companiondetails.bookingrate,
    description: companiondetails.description || [],
    skintone: companiondetails.Skintone,
    height: companiondetails.height,
    bodytype: companiondetails.bodytype,
    eatinghabits: companiondetails.eatinghabits,
    drinkinghabits: companiondetails.drinkinghabits,
    smokinghabits: companiondetails.smokinghabits,
    account: companiondetails.account,
    
    // Use root level arrays (they're the same as nested ones)
    baselocations: baselocations || [],
    paymentmethods: paymentmethods || []
  };

  return formattedData;
}

// Helper to format just the editable fields for form

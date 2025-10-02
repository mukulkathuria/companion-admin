// Type definitions for User Companion API response
interface GoogleExtra {
  photo: string;
  place_id: string;
  placetype: string[];
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
  userid: string;
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
}

interface CompanionItem {
  id: string;
  bookingrateunit: string;
  description: string[];
  Skintone: string;
  height: number;
  bodytype: string;
  eatinghabits: string;
  bookingrate: number;
  drinkinghabits: string;
  smokinghabits: string;
  baselocation: BaseLocation[];
}

interface UserCompanionApiResponse {
  phoneno: string;
  email: string;
  Images: string[];
  age: number;
  firstname: string;
  lastname: string;
  gender: string;
  userpaymentmethods: UserPaymentMethod[];
  Companion: CompanionItem[];
}

// Formatted output type (matching the first API formatter output)
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

// Main formatter for User Companion API
export function formatApiResponseSecond(
  apiResponse: UserCompanionApiResponse
): FormattedCompanionData | null {
  // Check if companion data exists
  if (!apiResponse?.Companion || apiResponse.Companion.length === 0) {
    console.warn('No companion data found in API response');
    return null;
  }

  const companion = apiResponse.Companion[0]; // Get first companion

  // Map to the same output format
  const formattedData: FormattedCompanionData = {
    // Generate placeholder request data (since this API doesn't have it)
    requestId: 0,
    companionId: companion.id,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // User data from root level
    userId: companion.id,
    firstname: apiResponse.firstname,
    lastname: apiResponse.lastname,
    email: apiResponse.email,
    phoneno: apiResponse.phoneno,
    age: apiResponse.age,
    gender: apiResponse.gender,
    images: apiResponse.Images || [],
    
    // Companion details from Companion array
    bookingrate: companion.bookingrate,
    description: companion.description || [],
    skintone: companion.Skintone,
    height: companion.height,
    bodytype: companion.bodytype,
    eatinghabits: companion.eatinghabits,
    drinkinghabits: companion.drinkinghabits,
    smokinghabits: companion.smokinghabits,
    account: 'ACCEPTED',
    
    // Locations and payments
    baselocations: companion.baselocation || [],
    paymentmethods: apiResponse.userpaymentmethods || []
  };

  return formattedData;
}







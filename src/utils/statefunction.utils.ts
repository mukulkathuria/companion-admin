
interface CompanionDetails {
  id: number;
  companionid: string;
  firstname: string;
  lastname: string;
  Images: string[];
  age: string;
  phoneno: string;
  description: string[];
  skintone: string;
  city: string;
  state: string;
  zipcode: string | null;
  lat: string;
  lng: string;
  height: string;
  bodytype: string;
  eatinghabits: string;
  drinkinghabits: string;
  smokinghabits: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  companiondetails: {
    User: {
      firstname: string;
      lastname: string;
      email: string;
      phoneno: string;
      age: number;
      Images: string[];
      gender: string;
    };
    bookingrate: number;
    description: string[];
    Skintone: string;
    height: number;
    bodytype: string;
    eatinghabits: string;
    drinkinghabits: string;
    smokinghabits: string;
    account: string;
  };
}

export function formatCompanionRequestData(companionDetails: CompanionDetails) {
  const oldcompaniondetails = {
    firstname: companionDetails.companiondetails.User.firstname,
    lastname: companionDetails.companiondetails.User.lastname,
    email: companionDetails.companiondetails.User.email,
    phoneno: companionDetails.companiondetails.User.phoneno,
    age: companionDetails.companiondetails.User.age,
    gender: companionDetails.companiondetails.User.gender,
    images: companionDetails.companiondetails.User.Images,
    bookingrate: companionDetails.companiondetails.bookingrate,
    description: companionDetails.companiondetails.description,
    Skintone: companionDetails.companiondetails.Skintone,
    height: companionDetails.companiondetails.height,
    bodytype: companionDetails.companiondetails.bodytype,
    eatinghabits: companionDetails.companiondetails.eatinghabits,
    drinkinghabits: companionDetails.companiondetails.drinkinghabits,
    smokinghabits: companionDetails.companiondetails.smokinghabits,
    account: companionDetails.companiondetails.account,
  };
  const newcompaniondetails = {
    id: companionDetails.id,
    companionid: companionDetails.companionid,
    firstname: companionDetails.firstname,
    lastname: companionDetails.lastname,
    images: companionDetails.Images,
    gender: companionDetails.companiondetails.User.gender,
    age: companionDetails.age,
    email: companionDetails.companiondetails.User.email,
    phoneno: companionDetails.phoneno,
    description: companionDetails.description,
    skintone: companionDetails.skintone,
    city: companionDetails.city,
    state: companionDetails.state,
    zipcode: companionDetails.zipcode,
    lat: companionDetails.lat,
    lng: companionDetails.lng,
    height: companionDetails.height,
    bodytype: companionDetails.bodytype,
    eatinghabits: companionDetails.eatinghabits,
    drinkinghabits: companionDetails.drinkinghabits,
    smokinghabits: companionDetails.smokinghabits,
    status: companionDetails.status,
  };
  return { oldcompaniondetails, newcompaniondetails };
}


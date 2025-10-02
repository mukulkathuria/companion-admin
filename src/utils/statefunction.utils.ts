import { BookingMeetingLocationDto } from "@/data/dto/companion.data.dto";
import { UserPaymentMethod } from "@/data/dto/companion.data.dto";

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
  baselocations: BookingMeetingLocationDto[];
  paymentmethods: UserPaymentMethod[]
  companiondetails: {
    User: {
      id: string;
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
    baselocation: BookingMeetingLocationDto[];
    paymentmethods: UserPaymentMethod[]
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
    baselocations: companionDetails.companiondetails.baselocation,
    paymentmethods: companionDetails.companiondetails.paymentmethods,
  };
  const newcompaniondetails = {
    id: companionDetails.companiondetails.User.id,
    firstname: companionDetails.firstname,
    lastname: companionDetails.lastname,
    images: companionDetails.Images,
    gender: companionDetails.companiondetails.User.gender,
    age: companionDetails.age,
    email: companionDetails.companiondetails.User.email,
    phoneno: companionDetails.phoneno,
    description: companionDetails.description,
    skintone: companionDetails.skintone,
    bookingrate: companionDetails.companiondetails.bookingrate,
    height: companionDetails.height,
    bodytype: companionDetails.bodytype,
    eatinghabits: companionDetails.eatinghabits,
    drinkinghabits: companionDetails.drinkinghabits,
    smokinghabits: companionDetails.smokinghabits,
    baselocations: companionDetails.baselocations,
    paymentmethods: companionDetails.paymentmethods

  };
  return { oldcompaniondetails, newcompaniondetails };
}


import {
  CompanionDescriptionEnum,
  CompanionDrinkingHabitEnum,
  CompanionEatingHabitsEnum,
  CompanionSkinToneEnum,
  CompanionSmokingHabitEnum,
  FemaleCompanionBodyTypeEnum,
  GenderEnum,
  MaleCompanionBodyTypeEnum,
} from "@/data/dto/companion.data.dto";

export const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const EmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const ItemName = /^[a-zA-Z ]*$/;

export type registerCompanionBodyDto = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  Images?: string[];
  gender: GenderEnum;
  age: string;
  description: CompanionDescriptionEnum[];
  skintone: CompanionSkinToneEnum;
  city: string;
  zipcode?: string;
  lat: string;
  lng: string;
  bookingrate: string;
  height: string;
  bodytype: MaleCompanionBodyTypeEnum | FemaleCompanionBodyTypeEnum;
  eatinghabits: CompanionEatingHabitsEnum;
  drinkinghabits: CompanionDrinkingHabitEnum;
  smokinghabits: CompanionSmokingHabitEnum;
};

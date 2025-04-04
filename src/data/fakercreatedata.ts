import { FemaleCompanionBodyTypeEnum, MaleCompanionBodyTypeEnum, OtherCompanionBodyTypeEnum } from "./dto/companion.data.dto";


export const BookingRateData = [
  1000, 800, 700, 900, 950, 1100, 1150, 1200, 1500, 2000,
];

export const GenderData = ["MALE", "FEMALE", "OTHER"];

export const descriptionData = [
  "CASUAL_COMPANIONSHIP",
  "COFFEEANDCONVERSATIONS",
  "MOVIES",
  "CITY_TOURS",
  "DINING_PARTNER",
  "ADVANTURE_COMPANIONSHIP",
  "HIKING_BUDDY",
  "BEACHANDWATER_SPORTS",
  "CAMPING_TRIPS",
  "ROAD_TRIPS",
  "SOCIAL_COMPANIONSHIP",
  "EVENT_PLUSONE",
  "PARTY_PARTNER",
  "BUSSINESS_NETWORKING",
  "CULTURAL_OUTINGS",
  "LIFESTYLE_COMPANIONSHIP",
  "FITNESS_PARTNER",
  "SHOPPING_BUDDY",
  "COOKING_COMPANION",
  "LANGUAGE_EXCHANGE",
  "PERSONALIZED_EXPERIENCE",
  "TRAVEL_BUDDY",
  "PET_LOVER_COMPANION",
  "UNIQUE_REQUESTS",
];

export const bodytypeData = [
  "RECTANGLE",
  "TRIANGLE",
  "SPOON",
  "HOURGLASS",
  "TOPHOURGLASS",
];

export const skinToneData = ["FAIR", "DARK", "BROWN"];

export const eatingHabitsData = [
  "VEG",
  "NONVEG",
  "JAIN",
  "EGGETERIAN",
  "VEGAN",
];

export const smokingHabitsData = [
  "PASSIVE_SMOKER",
  "ACTIVE_SMOKER",
  "NON_SMOKER",
  "OCCASIONALLY",
];

export const drinkingHabitsData = [
  "DAILY_DRINKER",
  "NON_DRINKER",
  "OCCASIONALLY",
];


export const getBodyTypes = (gender: "MALE" | "FEMALE" | "OTHER") => {
  switch (gender) {
    case "MALE":
      return Object.values(MaleCompanionBodyTypeEnum);
    case "FEMALE":
      return Object.values(FemaleCompanionBodyTypeEnum);
    case "OTHER":
      return Object.values(OtherCompanionBodyTypeEnum);
    default:
      return [];
  }
};

export interface CompanionForm {
    firstName: string;
    lastName: string;
    age: number;
    gender: "Male" | "Female" | "OTHER";
    skinTone: "Fair" | "Brown" | "Dark";
    bodyType: string;
    eatingHabits: string;
    smokingHabit: string;
    drinkingHabit: string;
    location: string;
    email: string;
    password?: string;
    description: string[];
    bookingRate: number;
    height: number;
  }
  

  export interface CreateCompanionProps {
    initialForm?: Partial<CompanionForm>;
    buttonText?: string;
  }
  
  export enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
  }
  
  export enum MaleCompanionBodyTypeEnum {
    ATHLETIC = "ATHLETIC",
    MUSCULAR = "MUSCULAR",
    SLIM = "SLIM",
  }
  
  export enum FemaleCompanionBodyTypeEnum {
    RECTANGLE = "RECTANGLE",
    TRIANGLE = "TRIANGLE",
    SPOON = "SPOON",
    HOURGLASS = "HOURGLASS",
    TOPHOURGLASS = "TOPHOURGLASS",
  }
  
  export enum OtherCompanionBodyTypeEnum {
    ATHLETIC = "ATHLETIC",
    MUSCULAR = "MUSCULAR",
    SLIM = "SLIM",
    RECTANGLE = "RECTANGLE",
    TRIANGLE = "TRIANGLE",
    SPOON = "SPOON",
    HOURGLASS = "HOURGLASS",
    TOPHOURGLASS = "TOPHOURGLASS",
  }
  
  export enum CompanionSkinToneEnum {
    FAIR = "FAIR",
    DARK = "DARK",
    BROWN = "BROWN",
  }
  
  export enum CompanionEatingHabitsEnum {
    VEG = "VEG",
    NONVEG = "NONVEG",
    JAIN = "JAIN",
    EGGETERIAN = "EGGETERIAN",
    VEGAN = "VEGAN",
  }
  
  export enum CompanionSmokingHabitEnum {
    PASSIVE_SMOKER = "PASSIVE_SMOKER",
    ACTIVE_SMOKER = "ACTIVE_SMOKER",
    NON_SMOKER = "NON_SMOKER",
    OCCASIONALLY = "OCCASIONALLY",
  }
  
  export enum CompanionDrinkingHabitEnum {
    DAILY_DRINKER = "DAILY_DRINKER",
    NON_DRINKER = "NON_DRINKER",
    OCCASIONALLY = "OCCASIONALLY",
  }
  
  export enum CompanionDescriptionEnum {
    CASUAL_COMPANIONSHIP = "CASUAL_COMPANIONSHIP",
    COFFEEANDCONVERSATIONS = "COFFEEANDCONVERSATIONS",
    MOVIES = "MOVIES",
    CITY_TOURS = "CITY_TOURS",
    DINING_PARTNER = "DINING_PARTNER",
    ADVANTURE_COMPANIONSHIP = "ADVANTURE_COMPANIONSHIP",
    HIKING_BUDDY = "HIKING_BUDDY",
    BEACHANDWATER_SPORTS = "BEACHANDWATER_SPORTS",
    CAMPING_TRIPS = "CAMPING_TRIPS",
    ROAD_TRIPS = "ROAD_TRIPS",
    SOCIAL_COMPANIONSHIP = "SOCIAL_COMPANIONSHIP",
    EVENT_PLUSONE = "EVENT_PLUSONE",
    PARTY_PARTNER = "PARTY_PARTNER",
    BUSSINESS_NETWORKING = "BUSSINESS_NETWORKING",
    CULTURAL_OUTINGS = "CULTURAL_OUTINGS",
    LIFESTYLE_COMPANIONSHIP = "LIFESTYLE_COMPANIONSHIP",
    FITNESS_PARTNER = "FITNESS_PARTNER",
    SHOPPING_BUDDY = "SHOPPING_BUDDY",
    COOKING_COMPANION = "COOKING_COMPANION",
    LANGUAGE_EXCHANGE = "LANGUAGE_EXCHANGE",
    PERSONALIZED_EXPERIENCE = "PERSONALIZED_EXPERIENCE",
    TRAVEL_BUDDY = "TRAVEL_BUDDY",
    PET_LOVER_COMPANION = "PET_LOVER_COMPANION",
    UNIQUE_REQUESTS = "UNIQUE_REQUESTS",
  }
  
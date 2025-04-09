import {
  FemaleCompanionBodyTypeEnum,
  MaleCompanionBodyTypeEnum,
  OtherCompanionBodyTypeEnum,
} from "./dto/companion.data.dto";

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

export const WalletBank = [
  { value: "PAYTM", label: "PayTM" },
  { value: "FREC", label: "Freecharge" },
  { value: "AMZPAY", label: "Amazon Pay" },
  { value: "AMON", label: "Airtel Money" },
  { value: "OXYCASH", label: "Oxigen" },
  { value: "OLAM", label: "Ola Money" },
  { value: "JIOM", label: "Jio Money" },
  { value: "ITZC", label: "ItzCash" },
  { value: "PAYZP", label: "HDFC PayZapp" },
  { value: "YESW", label: "Yes Bank" },
  { value: "mobikwik", label: "MobiKwik" },
  { value: "PHONEPE", label: "PhonePe" },
];

export const NetBankData = [
  { value: "AIRNB", label: "Airtel Payments Bank" },
  { value: "AUSFNB", label: "AU Small Finance Bank" },
  { value: "AUSFCNB", label: "AU Small Finance Bank - Corporate" },
  { value: "AXIB", label: "AXIS Bank" },
  { value: "AXISCNB", label: "Axis Corporate Netbanking" },
  { value: "BBRB", label: "Bank of Baroda" },
  { value: "BOIB", label: "Bank of India" },
  { value: "BOMB", label: "Bank of Maharashtra" },
  { value: "CABB", label: "Canara Bank" },
  { value: "SYNDB", label: "Canara Bank (Erstwhile - Syndicate Bank)" },
  { value: "CSFBC", label: "Capital Small Finance Bank Corporate" },
  { value: "CSFBR", label: "Capital Small Finance Bank Retail" },
  { value: "CSBN", label: "Catholic Syrian Bank" },
  { value: "CBIB", label: "Central Bank Of India" },
  { value: "CUBB", label: "City Union Bank" },
  { value: "CSMSNB", label: "Cosmos Bank" },
  { value: "DCBB", label: "DCB Bank" },
  { value: "DSHB", label: "Deutsche Bank" },
  { value: "DLNBCORP", label: "Dhanlaxmi Bank - Corporate" },
  { value: "DLSB", label: "Dhanlaxmi Bank - Retail" },
  { value: "FEDB", label: "Federal Bank" },
  { value: "FEDCORP", label: "Federal Bank Corporate" },
  { value: "HDFB", label: "HDFC Bank" },
  { value: "HDFCCONB", label: "HDFC Bank - Corporate Banking" },
  { value: "ICIB", label: "ICICI Bank" },
  { value: "ICICICNB", label: "ICICI Corporate Netbanking" },
  { value: "IDBB", label: "IDBI Bank" },
  { value: "IDBICORP", label: "IDBI Corp Netbanking" },
  { value: "IDFCNB", label: "IDFC FIRST Bank" },
  { value: "INDB", label: "Indian Bank" },
  { value: "ALLB", label: "Indian Bank (Erstwhile Allahabad Bank)" },
  { value: "INOB", label: "Indian Overseas Bank" },
  { value: "INIB", label: "IndusInd Bank" },
  { value: "JAKB", label: "Jammu & Kashmir Bank" },
  { value: "JANANB", label: "Jana Small Finance Bank" },
  { value: "JSBNB", label: "Janata Sahakari Bank Pune" },
  { value: "KRKB", label: "Karnataka Bank" },
  { value: "KRVBC", label: "Karur Vysya - Corporate Banking" },
  { value: "KRVB", label: "Karur Vysya Bank" },
  { value: "162B", label: "Kotak Mahindra Bank" },
  { value: "KTKBCORP", label: "Kotak Mahindra Bank - Corp Net Banking" },
  { value: "KVBNBTPV", label: "KVB NB TPV" },
  { value: "PAYTMNB", label: "Paytm Payments Bank" },
  { value: "OBCB", label: "PNB (Erstwhile -Oriental Bank of Commerce)" },
  { value: "UNIB", label: "PNB (Erstwhile-United Bank of India)" },
  { value: "INDPOST", label: "Post Office Savings Bank (POSB)" },
  { value: "PMEC", label: "Prime Co Op Bank Ltd" },
  { value: "PSBNB", label: "Punjab & Sind Bank" },
  { value: "PNBB", label: "Punjab National Bank" },
  { value: "CPNB", label: "Punjab National Bank - Corporate Banking" },
  { value: "RBLNB", label: "RBL Bank" },
  { value: "RBLCNB", label: "RBL Corporate Netbanking" },
  { value: "SRSWT", label: "Saraswat Bank" },
  { value: "SHIVANB", label: "Shivalik Small Finance Bank" },
  { value: "SOIB", label: "South Indian Bank" },
  { value: "SCBNB", label: "Standard Chartered Bank" },
  { value: "SBIB", label: "State Bank of India" },
  { value: "SBNCORP", label: "State Bank of India (Corporate)" },
  { value: "SVCNB", label: "SVC Co-operative Bank Ltd." },
  { value: "TMBB", label: "Tamilnad Mercantile Bank" },
  { value: "UCOB", label: "UCO Bank" },
  { value: "UCOCNB", label: "UCO Corporate" },
  { value: "UBIB", label: "Union Bank of India" },
  { value: "ADBB", label: "Union Bank of India (Erstwhile Andhra Bank)" },
  { value: "CRPB", label: "Union Bank of India (Erstwhile Corporation Bank)" },
  { value: "UBIBC", label: "Union Bank OLT - Corporate Banking" },
  { value: "YESB", label: "Yes Bank" },
];

export const CardTypeData = [
  { value: "VISA", label: "VISA" },
  { value: "MAST", label: "Mastercard" },
  { value: "AMEX", label: "AMEX" },
  { value: "SMAE", label: "SBI Maestro" },
  { value: "MAES", label: "Maestro" },
  { value: "DINR", label: "Diners" },
  { value: "JCB", label: "JCB" },
  { value: "RUPAY", label: "Rupay" },
  { value: "RUPAYCC", label: "Rupay Credit Card" },
];

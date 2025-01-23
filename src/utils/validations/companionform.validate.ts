import {
  CompanionDescriptionEnum,
  CompanionDrinkingHabitEnum,
  CompanionEatingHabitsEnum,
  CompanionFormDto,
  CompanionSkinToneEnum,
  CompanionSmokingHabitEnum,
  ErrorFormDto,
  FemaleCompanionBodyTypeEnum,
  GenderEnum,
  MaleCompanionBodyTypeEnum,
} from "@/data/dto/companion.data.dto";
import { EmailRegex, PasswordRegex } from "../dto/companiondata.dto";

export function validateregisterCompanion(userinfo: CompanionFormDto) {
  const { firstname, lastname, email, password, gender, age } = userinfo;
  const location = {
    city: userinfo?.city && userinfo.city.trim(),
    // zipcode: userinfo?.zipcode && userinfo?.zipcode.trim(),
    // lat: userinfo?.lat && userinfo.lat.trim(),
    // lng: userinfo?.lng && userinfo.lng.trim(),
  };
  try {
    if (userinfo.description) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tempdesc = JSON.parse(userinfo.description as any);
      userinfo["description"] = Array.isArray(tempdesc)
        ? tempdesc.map((l) => l.trim())
        : [];
    }
  } catch (error) {
    console.log("Error JSON in description", error, userinfo.description);
    return {
      error: { status: 422, message: "Companion description is not valid" },
    };
  }
  const companion = {
    Skintone: userinfo?.skintone && userinfo?.skintone.trim(),
    description: userinfo?.description,
    bookingrate: userinfo?.bookingrate,
    height: userinfo.height,
    bodytype: userinfo?.bodytype && userinfo?.bodytype.trim(),
    eatinghabits: userinfo?.eatinghabits && userinfo?.eatinghabits.trim(),
    drinkinghabits: userinfo?.drinkinghabits && userinfo?.drinkinghabits.trim(),
    smokinghabits: userinfo?.smokinghabits && userinfo?.smokinghabits.trim(),
  };
  if (!firstname || !firstname.trim().length) {
    return { error: { status: 422, message: "First name is required" } };
  } else if (!lastname || !lastname.trim().length) {
    return { error: { status: 422, message: "Last name is required" } };
  } else if (!email || !email.trim().length) {
    return { error: { status: 422, message: "Email is required" } };
  } else if (!EmailRegex.test(email)) {
    return { error: { status: 422, message: "Email is not valid" } };
  } else if (!password || !password.trim().length) {
    return { error: { status: 422, message: "Password is required" } };
  } else if (!PasswordRegex.test(password)) {
    return { error: { status: 422, message: "Password is not valid" } };
  } else if (!gender || !gender.trim().length) {
    return { error: { status: 422, message: "Gender is required" } };
  } else if (!age) {
    return { error: { status: 422, message: "Age is required" } };
  } else if (age && Number(age) < 18) {
    return { error: { status: 422, message: "Below 18 is not allowed" } };
  } else if (!GenderEnum[gender as keyof typeof GenderEnum]) {
    return { error: { status: 422, message: "Gender is not valid" } };
  } else if (!Object.values(location).some((l) => l)) {
    return { error: { status: 422, message: "Location is required" } };
  } else if (!companion.Skintone) {
    return {
      error: { status: 422, message: "Companion skintone is required" },
    };
  } else if (
    !CompanionSkinToneEnum[
      companion.Skintone as keyof typeof CompanionSkinToneEnum
    ]
  ) {
    return {
      error: { status: 422, message: "Companion skintone is not valid" },
    };
  } else if (!companion.eatinghabits) {
    return {
      error: { status: 422, message: "Companion eating habits is required" },
    };
  } else if (
    !CompanionEatingHabitsEnum[
      companion.eatinghabits as keyof typeof CompanionEatingHabitsEnum
    ]
  ) {
    return {
      error: { status: 422, message: "Companion eating habits is not valid" },
    };
  } else if (!companion.drinkinghabits) {
    return {
      error: { status: 422, message: "Companion drinking habits is required" },
    };
  } else if (
    !CompanionDrinkingHabitEnum[
      companion.drinkinghabits as keyof typeof CompanionDrinkingHabitEnum
    ]
  ) {
    return {
      error: { status: 422, message: "Companion drinking habits is not valid" },
    };
  } else if (!companion.smokinghabits) {
    return {
      error: { status: 422, message: "Companion smoking habits is required" },
    };
  } else if (
    !CompanionSmokingHabitEnum[
      companion.smokinghabits as keyof typeof CompanionSmokingHabitEnum
    ]
  ) {
    return {
      error: { status: 422, message: "Companion smoking habits is not valid" },
    };
  } else if (!companion.bodytype) {
    return {
      error: { status: 422, message: "Companion bodytype is required" },
    };
  } else if (
    (GenderEnum[userinfo.gender as keyof typeof GenderEnum] === "MALE" &&
      !MaleCompanionBodyTypeEnum[
        userinfo.bodytype as keyof typeof MaleCompanionBodyTypeEnum
      ]) ||
    (GenderEnum[userinfo.gender as keyof typeof GenderEnum] === "FEMALE" &&
      !FemaleCompanionBodyTypeEnum[
        userinfo.bodytype as keyof typeof FemaleCompanionBodyTypeEnum
      ]) ||
    (GenderEnum[userinfo.gender as keyof typeof GenderEnum] === "OTHER" &&
      (MaleCompanionBodyTypeEnum[
        userinfo.bodytype as keyof typeof MaleCompanionBodyTypeEnum
      ] ||
        FemaleCompanionBodyTypeEnum[
          userinfo.bodytype as keyof typeof FemaleCompanionBodyTypeEnum
        ]))
  ) {
    return {
      error: { status: 422, message: "Companion bodytype is not valid" },
    };
  } else if (!Array.isArray(companion.description)) {
    return {
      error: { status: 422, message: "Companion description is required" },
    };
  } else if (
    companion.description.length &&
    !companion.description.every(
      (l) =>
        CompanionDescriptionEnum[l as keyof typeof CompanionDescriptionEnum]
    )
  ) {
    console.log(
      "Error in valid description",
      companion.description,
      companion.description.every(
        (l) =>
          CompanionDescriptionEnum[l as keyof typeof CompanionDescriptionEnum]
      )
    );
    return {
      error: { status: 422, message: "Companion description is not valid" },
    };
  } else if (!companion.bookingrate) {
    return {
      error: { status: 422, message: "Companion bookingrate is required" },
    };
  } else if (!companion.height) {
    return {
      error: { status: 422, message: "Companion height is required" },
    };
  }
  return { user: userinfo };
}

export const validateRegisteration = (
  register: CompanionFormDto
): ErrorFormDto => {
  const errors: ErrorFormDto = {};

  if (!register.firstname.trim()) {
    errors.firstname = "First name is required";
  }

  if (!register.lastname.trim()) {
    errors.lastname = "Last name is required";
  }

  if (!register.email.trim() || !register.email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (
    register.password &&
    (!register.password.trim() || register.password.length < 8)
  ) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (!register.gender) {
    errors.gender = "Gender is required";
  }

  if (!register.age) {
    errors.age = "Age must be a valid number";
  }

  if (!register.description.length) {
    errors.description = "Description is required";
  }

  if (!register.skintone) {
    errors.skintone = "Skin tone is required";
  }

  if (!register.city.trim()) {
    errors.city = "City is required";
  }

  // if (register.zipcode && !register.zipcode.trim()) {
  //   errors.zipcode = 'Zipcode is required';
  // }

  // if (!register.lat.trim() || isNaN(Number(register.lat))) {
  //   errors.lat = 'Latitude must be a valid number';
  // }

  // if (!register.lng.trim() || isNaN(Number(register.lng))) {
  //   errors.lng = 'Longitude must be a valid number';
  // }

  if (!register.bookingrate) {
    errors.bookingrate = "Booking rate must be a valid number";
  }

  if (!register.height) {
    errors.height = "Height must be a valid number";
  }

  if (!register.bodytype) {
    errors.bodytype = "Body type is required";
  }

  if (!register.eatinghabits) {
    errors.eatinghabits = "Eating habits are required";
  }

  if (!register.drinkinghabits) {
    errors.drinkinghabits = "Drinking habits are required";
  }

  if (!register.smokinghabits) {
    errors.smokinghabits = "Smoking habits are required";
  }

  return errors ;
};

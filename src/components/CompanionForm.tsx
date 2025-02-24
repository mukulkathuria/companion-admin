import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import ImageUploader from "./ui/ImageUploader";
import {
  CompanionDescriptionEnum,
  CompanionFormDto,
  CompanionSkinToneEnum,
  ErrorFormDto,
  GenderEnum,
} from "@/data/dto/companion.data.dto";
import {
  drinkingHabitsData,
  eatingHabitsData,
  GenderData,
  getBodyTypes,
  skinToneData,
  smokingHabitsData,
} from "@/data/fakercreatedata";
import { toast } from "sonner";

// Dummy data for the original profile
const initialForm: CompanionFormDto = {
  images: null,
  firstname: "John",
  lastname: "Doe",
  age: 25,
  gender: GenderEnum.MALE,
  skintone: CompanionSkinToneEnum.FAIR,
  state: "New York",
  phoneno: "9876543210",
  bodytype: "Athletic",
  eatinghabits: "Non-Veg",
  smokinghabits: "Non-Smoker",
  drinkinghabits: "Occasionally",
  city: "New York",
  email: "johndoe@example.com",
  password: "",
  description: ["MOVIES", "TRAVEL_BUDDY", "FITNESS_PARTNER"], // Pre-selected descriptions
  bookingrate: 50,
  height: 180,
};

interface CompanionFormProps {
  initialForm?: Partial<CompanionFormDto>;
  buttonText?: string;
}

export function CompanionForm({
  initialForm: initialValues,
  buttonText = "Create Companion",
}: CompanionFormProps) {
  const [form, setForm] = useState<CompanionFormDto>(
    initialValues ? { ...initialForm, ...initialValues } : initialForm
  );
  const [error, setError] = useState<ErrorFormDto>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { validateRegisteration } = await import(
      "../utils/validations/companionform.validate"
    );

    const errors = validateRegisteration(form);
    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    if (
      Object.keys(errors).length ||
      !form.images?.length ||
      (form.images && form.images.length < 2)
    ) {
      setError(errors);
      if (!form.images?.length || (form.images && form.images.length < 2)) {
        toast.error("Minimum 2 image is required");
      } else {
        toast.error("Please fill all required before proceeding");
      }
      return;
    }
    const id = form.id;
    delete form.id;
    const userData = new FormData();
    const allkeys = Object.keys(form);
    for (let i = 0; i < allkeys.length; i += 1) {
      if (
        form[allkeys[i] as keyof CompanionFormDto] &&
        allkeys[i] !== "images" &&
        allkeys[i] !== "description"
      ) {
        userData.append(
          allkeys[i],
          String(form[allkeys[i] as keyof CompanionFormDto])
        );
      }
    }
    userData.append("description", JSON.stringify(form.description));
    const previousImages: string[] = [];
    form.images.forEach((l) => {
      if (typeof l === "object") {
        userData.append("images", l.file);
      } else {
        previousImages.push(l);
      }
    });
    if(previousImages.length) {
      userData.append("previousImages", JSON.stringify(previousImages));
    }
    // If all validations pass, proceed with form submission
    console.log("Form submitted:", form);
    for (const pair of userData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const { updateCompanionProfileService } = await import(
        "../services/companion/updatecompanion.service"
      );
      const { error } = await updateCompanionProfileService(userData, String(id));
      if (error) {
        toast.error(error);
      } else {
        toast.success("Companion Updated Successfully!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured Please Try again after sometime!!");
    }
  
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      description: checked
        ? [...prev.description, value]
        : prev.description.filter((d) => d !== value),
    }));
  };

  const getChangedFields = (
    initial: CompanionFormDto,
    current: CompanionFormDto
  ) => {
    const changes: { [key: string]: boolean } = {};
    for (const key in current) {
      if (
        // eslint-disable-next-line no-prototype-builtins
        current.hasOwnProperty(key) &&
        initial[key as keyof CompanionFormDto] !==
          current[key as keyof CompanionFormDto]
      ) {
        changes[key] = true;
      }
    }
    return changes;
  };

  const changedFields = initialValues
    ? getChangedFields(initialForm, form)
    : {};

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Update Details</h3>
          <ImageUploader
            images={form.images}
            onUpload={() => console.log("Uploading Pending")}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.firstname && "border-green-500"
                )}
                required
              />
              {error?.firstname && (
                <span className="errorMessage">{error.firstname}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.lastname && "border-green-500"
                )}
                required
              />
              {error?.lastname && (
                <span className="errorMessage">{error.lastname}</span>
              )}
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Appearance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.gender && "border-green-500"
                )}
              >
                {GenderData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {error?.gender && (
                <span className="errorMessage">{error.gender}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skin Tone
              </label>
              <select
                name="skintone"
                value={form.skintone}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.skintone && "border-green-500"
                )}
              >
                {skinToneData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {error?.skintone && (
                <span className="errorMessage">{error.skintone}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Body Type
              </label>
              <select
                name="bodytype"
                value={form.bodytype}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.bodytype && "border-green-500"
                )}
              >
                <option value="">Select Body Type</option>
                {getBodyTypes(form.gender).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {error?.bodytype && (
                <span className="errorMessage">{error.bodytype}</span>
              )}
            </div>
          </div>
        </div>

        {/* Habits Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Habits</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Eating Habits
              </label>
              <select
                name="eatinghabits"
                value={form.eatinghabits}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.eatinghabits && "border-green-500"
                )}
              >
                <option value="">Select Eating Habits</option>
                {eatingHabitsData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {error?.eatinghabits && (
                <span className="errorMessage">{error.eatinghabits}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Smoking Habit
              </label>
              <select
                name="smokinghabits"
                value={form.smokinghabits}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.smokinghabits && "border-green-500"
                )}
              >
                <option value="">Select Smoking Habit</option>
                {smokingHabitsData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {error?.smokinghabits && (
                <span className="errorMessage">{error.smokinghabits}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Drinking Habit
              </label>
              <select
                name="drinkinghabits"
                value={form.drinkinghabits}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.drinkinghabits && "border-green-500"
                )}
              >
                <option value="">Select Drinking Habit</option>
                {drinkingHabitsData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {error?.drinkinghabits && (
                <span className="errorMessage">{error.drinkinghabits}</span>
              )}
            </div>
          </div>
        </div>

        {/* Other Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Other Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.city}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.city && "border-green-500"
                )}
                required
              />
              {error?.city && (
                <span className="errorMessage">{error.city}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.email && "border-green-500"
                )}
                required
              />
              {error?.email && (
                <span className="errorMessage">{error.email}</span>
              )}
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password || ""}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.password && "border-green-500"
                )}
              />
              {error?.password && (
                <span className="errorMessage">{error.password}</span>
              )}
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Booking Rate (per hour)
              </label>
              <input
                type="number"
                name="bookingrate"
                value={form.bookingrate}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.bookingrate && "border-green-500"
                )}
                required
              />
              {error?.bookingrate && (
                <span className="errorMessage">{error.bookingrate}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                  changedFields.height && "border-green-500"
                )}
                required
              />
              {error?.height && (
                <span className="errorMessage">{error.height}</span>
              )}
            </div>
            <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
              <Label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Description (Select at least 2)
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.values(CompanionDescriptionEnum).map((desc) => (
                  <div
                    key={desc}
                    className="flex items-center bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <input
                      type="checkbox"
                      id={desc}
                      name="description"
                      value={desc}
                      checked={form.description.includes(desc)}
                      onChange={handleDescriptionChange}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label
                      htmlFor={desc}
                      className="ml-2 text-sm text-gray-700 cursor-pointer overflow-hidden text-ellipsis"
                    >
                      {desc.split("_").join(" ")}
                    </Label>
                  </div>
                ))}
                {error?.description && (
                  <span className="errorMessage">{error.description}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setForm(initialForm)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import ImageUploader from "./ui/ImageUploader";
import {
  CompanionDescriptionEnum,
  CompanionFormDto,
  ErrorFormDto,
} from "@/data/dto/companion.data.dto";

// Dummy data for the original profile
const initialForm: CompanionFormDto = {
  images: null,
  firstname: "John",
  lastname: "Doe",
  age: 25,
  gender: "Male",
  skintone: "Fair",
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
    // Validate all required fields
    const requiredFields: (keyof CompanionFormDto)[] = [
      "firstname",
      "lastname",
      "age",
      "gender",
      "skintone",
      "bodytype",
      "eatinghabits",
      "smokinghabits",
      "drinkinghabits",
      "city",
      "email",
      "bookingrate",
      "height",
    ];

    const missingFields = requiredFields.filter((field) => !form[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Password validation regex (only if password is provided)
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
    if (form.password && !passwordRegex.test(form.password)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)."
      );
      return;
    }

    // Validate age (minimum 18)
    if (form.age < 18) {
      alert("Age must be at least 18.");
      return;
    }

    // Validate height (minimum 100cm)
    if (form.height < 100) {
      alert("Height must be at least 100cm.");
      return;
    }

    // Validate at least 2 descriptions
    if (form.description.length < 2) {
      alert("Please select at least 2 descriptions.");
      return;
    }

    // If all validations pass, proceed with form submission
    console.log("Form submitted:", form);

    // Handle form submission (e.g., API call)
    // fetch('/api/companions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log('API response:', data))
    //   .catch((error) => console.error('API error:', error));
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

  const getBodyTypes = (gender: "Male" | "Female" | "OTHER") => {
    switch (gender) {
      case "Male":
        return ["Skinny", "Muscular", "Athletic"];
      case "Female":
        return [
          "Triangular",
          "Rectangular",
          "Spoon",
          "Hourglass",
          "Top Hourglass",
        ];
      case "OTHER":
        return [
          "Skinny",
          "Muscular",
          "Athletic",
          "Triangular",
          "Rectangular",
          "Spoon",
          "Hourglass",
          "Top Hourglass",
        ];
      default:
        return [];
    }
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="OTHER">Other</option>
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
                <option value="Fair">Fair</option>
                <option value="Brown">Brown</option>
                <option value="Dark">Dark</option>
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
                <option value="Veg">Veg</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Jain">Jain</option>
                <option value="Vegan">Vegan</option>
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
                <option value="Non-Smoker">Non-Smoker</option>
                <option value="Passive Smoking">Passive Smoking</option>
                <option value="Active Smoking">Active Smoking</option>
                <option value="Occasionally">Occasionally</option>
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
                <option value="Non-Drinker">Non-Drinker</option>
                <option value="Drinker">Drinker</option>
                <option value="Occasionally">Occasionally</option>
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
            <div>
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
            </div>
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

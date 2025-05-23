import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Locationaccess from "./Locationaccess";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  BookingMeetingLocationDto,
  CompanionDescriptionEnum,
  CompanionFormDto,
  CompanionSkinToneEnum,
  CreateCompanionProps,
  ErrorFormDto,
  GenderEnum,
} from "@/data/dto/companion.data.dto";
import { toast } from "sonner";
import ImageUploader from "./ui/ImageUploader";
import {
  drinkingHabitsData,
  eatingHabitsData,
  GenderData,
  getBodyTypes,
  skinToneData,
  smokingHabitsData,
} from "@/data/fakercreatedata";

const initialForm: CompanionFormDto = {
  images: null,
  firstname: "",
  lastname: "",
  age: 18,
  phoneno: "",
  gender: GenderEnum.MALE,
  skintone: CompanionSkinToneEnum.FAIR,
  bodytype: "",
  eatinghabits: "",
  smokinghabits: "",
  drinkinghabits: "",
  email: "",
  description: [],
  bookingrate: 0,
  height: 160,
  baselocations: [],
};

export function CreateCompanion({
  initialForm: initialValues,
  buttonText = "Create Companion",
}: CreateCompanionProps) {
  const [form, setForm] = useState<CompanionFormDto>(
    initialValues ? { ...initialForm, ...initialValues } : initialForm
  );
  const [error, setError] = useState<ErrorFormDto>({});
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { validateRegisteration } = await import(
      "../utils/validations/companionform.validate"
    );
    const errors = validateRegisteration(form);
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
    setisLoading(() => true);
    const userData = new FormData();
    const allkeys = Object.keys(form);
    for (let i = 0; i < allkeys.length; i += 1) {
      if (
        form[allkeys[i] as keyof CompanionFormDto] &&
        allkeys[i] !== "images" &&
        allkeys[i] !== "description" &&
        allkeys[i] !== "baselocations"
      ) {
        userData.append(
          allkeys[i],
          String(form[allkeys[i] as keyof CompanionFormDto])
        );
      }
    }
    userData.append("description", JSON.stringify(form.description));
    userData.append("baselocations", JSON.stringify(form.baselocations));
    form.images.forEach((l) => {
      if (typeof l === "object") {
        userData.append("images", l.file);
      }
    });
    try {
      const { registerUserService } = await import(
        "../services/auth/register.service"
      );
      const { error } = await registerUserService(userData);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Companion Created Successfully!!!");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured Please Try again after sometime!!");
    }finally{
      setisLoading(() => false);
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

  const setMapBaseLocation = (
    index: number,
    value: BookingMeetingLocationDto
  ) => {
    const baselocations = [...form.baselocations];
    baselocations[index] = value;
    setForm((l) => ({ ...l, baselocations: baselocations }));
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // handling Excel File
  };

  const changedFields = initialValues
    ? getChangedFields(initialForm, form)
    : {};

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            {buttonText === "Update Companion"
              ? "Update Companion"
              : "Create New Companion"}
          </CardTitle>
          <CardDescription>
            Fill in the details to create a new companion profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
          {/* Personal Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">
              Personal Details
            </h3>
            <div>
              <h1>profile picture</h1>
              <ImageUploader
                images={form.images}
                onUpload={(images) => {
                  setForm((l) => ({ ...l, images }));
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  className={cn(changedFields.firstname && "border-green-500")}
                  required
                />
                {error?.firstname && (
                  <span className="errorMessage">{error.firstname}</span>
                )}
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  className={cn(changedFields.lastname && "border-green-500")}
                  required
                />
                {error?.lastname && (
                  <span className="errorMessage">{error.lastname}</span>
                )}
              </div>
              <div>
                <Label htmlFor="lastname">Phone Number</Label>
                <Input
                  type="text"
                  name="phoneno"
                  value={form.phoneno}
                  onChange={handleChange}
                  className={cn(changedFields.phoneno && "border-green-500")}
                  required
                />
                {error?.phoneno && (
                  <span className="errorMessage">{error.phoneno}</span>
                )}
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Appearance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender</Label>
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
                <Label htmlFor="skintone">Skin Tone</Label>
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
                <Label htmlFor="bodytype">Body Type</Label>
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
                <Label htmlFor="eatinghabits">Eating Habits</Label>
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
                <Label htmlFor="smokinghabits">Smoking Habit</Label>
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
                <Label htmlFor="drinkinghabits">Drinking Habit</Label>
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
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={cn(changedFields.email && "border-green-500")}
                  required
                />
                {error?.email && (
                  <span className="errorMessage">{error.email}</span>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={form.password || ""}
                  onChange={handleChange}
                  className={cn(changedFields.password && "border-green-500")}
                />
                {error?.password && (
                  <span className="errorMessage">{error.password}</span>
                )}
              </div>
              <div>
                <Label htmlFor="bookingrate">Booking Rate (per hour)</Label>
                <Input
                  type="number"
                  name="bookingrate"
                  value={form.bookingrate}
                  onChange={handleChange}
                  className={cn(
                    changedFields.bookingrate && "border-green-500"
                  )}
                  required
                />
                {error?.bookingrate && (
                  <span className="errorMessage">{error.bookingrate}</span>
                )}
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  type="number"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  className={cn(changedFields.height && "border-green-500")}
                  required
                />
                {error?.height && (
                  <span className="errorMessage">{error.height}</span>
                )}
              </div>

              <div>
                <h1 className="text-sm">Baselocation1</h1>
                <Locationaccess
                  mapkey={0}
                  setLocation={(l) => setMapBaseLocation(0, l)}
                />
              </div>
              <br />
              <div>
                <h1 className="text-sm">Baselocation2</h1>
                <Locationaccess
                  mapkey={1}
                  setLocation={(l) => setMapBaseLocation(1, l)}
                />
              </div>
              <br />
              <div>
                <h1 className="text-sm">Baselocation3</h1>
                <Locationaccess
                  mapkey={2}
                  setLocation={(l) => setMapBaseLocation(2, l)}
                />
              </div>
              <br />
              <div>
                <h1 className="text-sm">Baselocation4</h1>
                <Locationaccess
                  mapkey={3}
                  setLocation={(l) => setMapBaseLocation(3, l)}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">
                  Description (Select at least 2)
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(CompanionDescriptionEnum).map((desc) => (
                    <div key={desc} className="flex items-center">
                      <input
                        type="checkbox"
                        id={desc}
                        name="description"
                        value={desc}
                        checked={form.description.includes(desc)}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          setForm((prev) => ({
                            ...prev,
                            description: checked
                              ? [...prev.description, value]
                              : prev.description.filter((d) => d !== value),
                          }));
                        }}
                        className="mr-2"
                      />
                      <Label htmlFor={desc}>{desc}</Label>
                    </div>
                  ))}
                  {error?.description && (
                    <span className="errorMessage">{error.description}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {/* Custom file input button */}
            <div className="relative">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleImportExcel}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center space-x-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Import Excel</span>
              </div>
            </div>

            {/* Reset button */}
            <button
              type="button"
              onClick={() => setForm(initialForm)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Reset
            </button>

            {/* Submit button */}
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting..' : buttonText}
            </button>
          </div>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>
  );
}

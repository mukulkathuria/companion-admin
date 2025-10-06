import { useEffect, useState } from "react";
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
  walletProviders,
  upiProviders,
} from "@/data/fakercreatedata";
import { toast } from "sonner";
import LeafLetMaps from "./ui/LeafletMaps";

// Dummy data for the original profile
const initialForm: CompanionFormDto = {
  images: null,
  firstname: "John",
  lastname: "Doe",
  age: 25,
  gender: GenderEnum.MALE,
  skintone: CompanionSkinToneEnum.FAIR,
  phoneno: "9876543210",
  bodytype: "Athletic",
  eatinghabits: "Non-Veg",
  smokinghabits: "Non-Smoker",
  drinkinghabits: "Occasionally",
  email: "johndoe@example.com",
  password: "",
  description: ["MOVIES", "TRAVEL_BUDDY", "FITNESS_PARTNER"], // Pre-selected descriptions
  bookingrate: 50,
  height: 180,
  baselocations: [],
  paymentmethods: [],
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
  const [isLoading, setisLoading] = useState(false);


useEffect(() => {
    if (initialValues && initialValues.paymentmethods) {
      console.log("initialValues.paymentmethods: ", initialValues.paymentmethods);
      
      setPaymentForms(
        initialValues.paymentmethods.map((pm: any) => ({
          type: pm.type ?? "",
          recipientName: pm.recipientName ?? "",
          nickname: pm.nickname ?? "",
          accountHolderName: pm.accountHolderName ?? "",
          accountNumber: pm.accountNumber ?? "",
          ifscCode: pm.ifscCode ?? "",
          bankName: pm.bankName ?? "",
          branchName: pm.branchName ?? "",
          accountType: pm.accountType ?? "",
          upiId: pm.upiId ?? "",
          upiProvider: pm.upiProvider ?? "",
          walletProvider: pm.walletProvider ?? "",
          walletIdentifier: pm.walletIdentifier ?? "",
          isDefault: pm.isDefault ?? false,
        }))
      );
    }
}, [initialValues]);

 

   const [paymentForms, setPaymentForms] = useState<PaymentForm[]>([
    {
      type: "",
      recipientName: "",
      nickname: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: "",
      accountType: "",
      upiId: "",
      upiProvider: "",
      walletProvider: "",
      walletIdentifier: "",
      isDefault: false,
    },
  ]);
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});

  const addPaymentMethod = () => {
    setPaymentForms((prev) => [
      ...prev,
      {
        type: "",
        recipientName: "",
        nickname: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
        accountType: "",
        upiId: "",
        upiProvider: "",
        walletProvider: "",
        walletIdentifier: "",
        isDefault: false,
      },
    ]);
  };

  const removePaymentMethod = (index: number) => {
    setPaymentForms((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePaymentChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPaymentForms((prev) => {
      const updated = [...prev];

      if (name === "type") {
        const currentForm = updated[index];

        const typeFields: Record<string, string[]> = {
          Bankmethod: [
            "accountHolderName",
            "accountNumber",
            "ifscCode",
            "bankName",
            "branchName",
            "accountType",
          ],
          UPI: ["upiId", "upiProvider"],
          WALLET: ["walletProvider", "walletIdentifier"],
        };

        const currentFields = typeFields[currentForm.type] || [];
        const hasFilledFields = currentFields.some(
          (field) =>
            (currentForm[field as keyof PaymentForm] as string)?.trim() !== ""
        );

        if (hasFilledFields && currentForm.type && currentForm.type !== value) {
          setPaymentErrors((prevErr) => ({
            ...prevErr,
            [index]: `Please clear all ${currentForm.type} fields before switching to ${value}`,
          }));
          return prev;
        } else {
          setPaymentErrors((prevErr) => {
            const newErr = { ...prevErr };
            delete newErr[index];
            return newErr;
          });
        }
      }

      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handlePrimaryChange = (index: number) => {
    setPaymentForms((prev) =>
      prev.map((form, i) => ({
        ...form,
        isDefault: i === index ? true : false,
      }))
    );
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
        allkeys[i] !== "description" &&
        allkeys[i] !== "baselocations" &&
        allkeys[i] !== "paymentmethods"
      ) {
        userData.append(
          allkeys[i],
          String(form[allkeys[i] as keyof CompanionFormDto])
        );
      }
    }
    userData.append("description", JSON.stringify(form.description));
    userData.append("baselocations", JSON.stringify(form.baselocations));
    console.log("paymentForms value:", paymentForms);
    userData.append("paymentmethods", JSON.stringify(paymentForms));
    const previousImages: string[] = [];
    form.images.forEach((l) => {
      if (typeof l === "object") {
        userData.append("images", l.file);
      } else {
        previousImages.push(l);
      }
    });
    if (previousImages.length) {
      userData.append("previousImages", JSON.stringify(previousImages));
    }
    // If all validations pass, proceed with form submission
    console.log("Form submitted:", form);
    for (const pair of userData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      setisLoading(() => true);
      const { updateCompanionProfileService } = await import(
        "../services/companion/updatecompanion.service"
      );
      const { error } = await updateCompanionProfileService(
        userData,
        String(id)
      );
      if (error) {
        toast.error(error);
      } else {
        toast.success("Companion Updated Successfully!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occured Please Try again after sometime!!");
    } finally {
      setisLoading(() => false);
    }
  };

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

            <div>
              {form.baselocations.map((l, i) => (
                <div className="mt-3" key={i * 200}>
                  <p>Base location {i + 1}</p>
                  <p>{l.formattedaddress}</p>
                  <LeafLetMaps city={l.city} lat={l.lat} lng={l.lng} />
                </div>
              ))}
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
            <div>
              <h1>payment info</h1>
            <div>
        {paymentForms.map((form, index) => (
          <div
            key={index}
            className="border p-4 my-4 rounded-lg shadow-sm bg-gray-50 w-96"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg mb-2">
                Payment Method {index + 1}
              </h3>

              {paymentForms.length > 1 && (
                <button
                  onClick={() => removePaymentMethod(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 my-2">
              <input
                type="radio"
                name="primaryPayment"
                checked={form.isDefault === true}
                onChange={() => handlePrimaryChange(index)}
              />
              <label className="text-sm">Set as Primary</label>
            </div>

            <div className="flex gap-5 flex-wrap">
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Select Payment Method Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="">Select Payment Method</option>
                  <option value="Bankmethod">Bank Method</option>
                  <option value="UPI">UPI</option>
                  <option value="WALLET">Wallet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={form.recipientName}
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Enter recipient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={form.nickname}
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Enter nickname"
                />
              </div>
            </div>
            {paymentErrors[index] && (
              <span className="text-xs text-red-500">
                {paymentErrors[index]}
              </span>
            )}

            {form.type === "Bankmethod" && (
              <div className="flex gap-5 flex-wrap my-3">
                <input
                  type="text"
                  name="accountHolderName"
                  value={form.accountHolderName}
                  onChange={(e) => handlePaymentChange(index, e)}
                  placeholder="Account Holder Name"
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={(e) => handlePaymentChange(index, e)}
                  placeholder="Account Number"
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <input
                  type="text"
                  name="ifscCode"
                  value={form.ifscCode}
                  onChange={(e) => handlePaymentChange(index, e)}
                  placeholder="IFSC Code"
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <input
                  type="text"
                  name="bankName"
                  value={form.bankName}
                  onChange={(e) => handlePaymentChange(index, e)}
                  placeholder="Bank Name"
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <input
                  type="text"
                  name="branchName"
                  value={form.branchName}
                  onChange={(e) => handlePaymentChange(index, e)}
                  placeholder="Branch Name"
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <select
                  name="accountType"
                  value={form.accountType}
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="">Select Account Type</option>
                  <option value="Saving">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>
            )}

            {form.type === "UPI" && (
              <div className="flex gap-5 flex-wrap my-3">
                <input
                  type="text"
                  name="upiId"
                  value={form.upiId || ""}
                  onChange={(e) => handlePaymentChange(index, e)}
                  placeholder="UPI ID"
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <select
                  name="upiProvider"
                  value={form.upiProvider}
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="">Select UPI Provider</option>
                  {upiProviders.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {form.type === "WALLET" && (
              <div className="flex gap-5 flex-wrap my-3">
                <select
                  name="walletProvider"
                  value={form.walletProvider}
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="">Select Wallet Provider</option>
                  {walletProviders.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="walletIdentifier"
                  value={form.walletIdentifier}
                  onChange={(e) => handlePaymentChange(index, e)}
                  placeholder="Wallet ID / Phone Number"
                  className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addPaymentMethod}
          className="mt-3 px-4 py-2 bg-red-400 text-white rounded-lg"
          type="button"
        >
          + Add More Payment Method
        </button>
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
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

interface PaymentForm {
  type: string;
  recipientName: string;
  nickname: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountType: string;
  upiId: string;
  upiProvider: string;
  walletProvider: string;
  walletIdentifier: string;
  isDefault: boolean;
}

interface PaymentErrors {
  [key: number]: string;
}



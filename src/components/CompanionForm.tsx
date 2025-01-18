import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';

interface CompanionForm {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'Male' | 'Female' | 'OTHER';
  skinTone: 'Fair' | 'Brown' | 'Dark';
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

// Dummy data for the original profile
const initialForm: CompanionForm = {
  firstName: 'John',
  lastName: 'Doe',
  age: 25,
  gender: 'Male',
  skinTone: 'Fair',
  bodyType: 'Athletic',
  eatingHabits: 'Non-Veg',
  smokingHabit: 'Non-Smoker',
  drinkingHabit: 'Occasionally',
  location: 'New York',
  email: 'johndoe@example.com',
  password: '',
  description: ['MOVIES', 'TRAVEL_BUDDY', 'FITNESS_PARTNER'], // Pre-selected descriptions
  bookingRate: 50,
  height: 180,
};

interface CompanionFormProps {
  initialForm?: Partial<CompanionForm>;
  buttonText?: string;
}

enum CompanionDescriptionEnum {
  CASUAL_COMPANIONSHIP = 'CASUAL_COMPANIONSHIP',
  COFFEEANDCONVERSATIONS = 'COFFEEANDCONVERSATIONS',
  MOVIES = 'MOVIES',
  CITY_TOURS = 'CITY_TOURS',
  DINING_PARTNER = 'DINING_PARTNER',
  ADVANTURE_COMPANIONSHIP = 'ADVANTURE_COMPANIONSHIP',
  HIKING_BUDDY = 'HIKING_BUDDY',
  BEACHANDWATER_SPORTS = 'BEACHANDWATER_SPORTS',
  CAMPING_TRIPS = 'CAMPING_TRIPS',
  ROAD_TRIPS = 'ROAD_TRIPS',
  SOCIAL_COMPANIONSHIP = 'SOCIAL_COMPANIONSHIP',
  EVENT_PLUSONE = 'EVENT_PLUSONE',
  PARTY_PARTNER = 'PARTY_PARTNER',
  BUSSINESS_NETWORKING = 'BUSSINESS_NETWORKING',
  CULTURAL_OUTINGS = 'CULTURAL_OUTINGS',
  LIFESTYLE_COMPANIONSHIP = 'LIFESTYLE_COMPANIONSHIP',
  FITNESS_PARTNER = 'FITNESS_PARTNER',
  SHOPPING_BUDDY = 'SHOPPING_BUDDY',
  COOKING_COMPANION = 'COOKING_COMPANION',
  LANGUAGE_EXCHANGE = 'LANGUAGE_EXCHANGE',
  PERSONALIZED_EXPERIENCE = 'PERSONALIZED_EXPERIENCE',
  TRAVEL_BUDDY = 'TRAVEL_BUDDY',
  PET_LOVER_COMPANION = 'PET_LOVER_COMPANION',
  UNIQUE_REQUESTS = 'UNIQUE_REQUESTS',
}

export function CompanionForm({
  initialForm: initialValues,
  buttonText = 'Create Companion',
}: CompanionFormProps) {
  const [form, setForm] = useState<CompanionForm>(
    initialValues ? { ...initialForm, ...initialValues } : initialForm
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields: (keyof CompanionForm)[] = [
      'firstName',
      'lastName',
      'age',
      'gender',
      'skinTone',
      'bodyType',
      'eatingHabits',
      'smokingHabit',
      'drinkingHabit',
      'location',
      'email',
      'bookingRate',
      'height',
    ];

    const missingFields = requiredFields.filter((field) => !form[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Password validation regex (only if password is provided)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
    if (form.password && !passwordRegex.test(form.password)) {
      alert(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-).'
      );
      return;
    }

    // Validate age (minimum 18)
    if (form.age < 18) {
      alert('Age must be at least 18.');
      return;
    }

    // Validate height (minimum 100cm)
    if (form.height < 100) {
      alert('Height must be at least 100cm.');
      return;
    }

    // Validate at least 2 descriptions
    if (form.description.length < 2) {
      alert('Please select at least 2 descriptions.');
      return;
    }

    // If all validations pass, proceed with form submission
    console.log('Form submitted:', form);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  const getBodyTypes = (gender: 'Male' | 'Female' | 'OTHER') => {
    switch (gender) {
      case 'Male':
        return ['Skinny', 'Muscular', 'Athletic'];
      case 'Female':
        return ['Triangular', 'Rectangular', 'Spoon', 'Hourglass', 'Top Hourglass'];
      case 'OTHER':
        return ['Skinny', 'Muscular', 'Athletic', 'Triangular', 'Rectangular', 'Spoon', 'Hourglass', 'Top Hourglass'];
      default:
        return [];
    }
  };

  const getChangedFields = (initial: CompanionForm, current: CompanionForm) => {
    const changes: { [key: string]: boolean } = {};
    for (const key in current) {
      if (current.hasOwnProperty(key) && initial[key as keyof CompanionForm] !== current[key as keyof CompanionForm]) {
        changes[key] = true;
      }
    }
    return changes;
  };

  const changedFields = initialValues ? getChangedFields(initialForm, form) : {};

  return (
<div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md"> 
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Personal Details Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Update Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.firstName && 'border-green-500'
            )}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.lastName && 'border-green-500'
            )}
            required
          />
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
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.gender && 'border-green-500'
            )}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skin Tone
          </label>
          <select
            name="skinTone"
            value={form.skinTone}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.skinTone && 'border-green-500'
            )}
          >
            <option value="Fair">Fair</option>
            <option value="Brown">Brown</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body Type
          </label>
          <select
            name="bodyType"
            value={form.bodyType}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.bodyType && 'border-green-500'
            )}
          >
            <option value="">Select Body Type</option>
            {getBodyTypes(form.gender).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
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
            name="eatingHabits"
            value={form.eatingHabits}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.eatingHabits && 'border-green-500'
            )}
          >
            <option value="">Select Eating Habits</option>
            <option value="Veg">Veg</option>
            <option value="Eggetarian">Eggetarian</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Jain">Jain</option>
            <option value="Vegan">Vegan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Smoking Habit
          </label>
          <select
            name="smokingHabit"
            value={form.smokingHabit}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.smokingHabit && 'border-green-500'
            )}
          >
            <option value="">Select Smoking Habit</option>
            <option value="Non-Smoker">Non-Smoker</option>
            <option value="Passive Smoking">Passive Smoking</option>
            <option value="Active Smoking">Active Smoking</option>
            <option value="Occasionally">Occasionally</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Drinking Habit
          </label>
          <select
            name="drinkingHabit"
            value={form.drinkingHabit}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.drinkingHabit && 'border-green-500'
            )}
          >
            <option value="">Select Drinking Habit</option>
            <option value="Non-Drinker">Non-Drinker</option>
            <option value="Drinker">Drinker</option>
            <option value="Occasionally">Occasionally</option>
          </select>
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
            value={form.location}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.location && 'border-green-500'
            )}
            required
          />
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
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.email && 'border-green-500'
            )}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password || ''}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.password && 'border-green-500'
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Booking Rate (per hour)
          </label>
          <input
            type="number"
            name="bookingRate"
            value={form.bookingRate}
            onChange={handleChange}
            className={cn(
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.bookingRate && 'border-green-500'
            )}
            required
          />
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
              'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
              changedFields.height && 'border-green-500'
            )}
            required
          />
        </div>
        <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
              <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-3">
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
                      {desc.split('_').join(' ')}
                    </Label>
                  </div>
                ))}
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
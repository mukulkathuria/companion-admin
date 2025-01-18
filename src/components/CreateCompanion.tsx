import { useState } from 'react';
    import { cn } from '@/lib/utils';
    import * as XLSX from 'xlsx';
    import { Input } from './ui/input';
    import { Label } from './ui/label';
    // import { Textarea } from './ui/textarea';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

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

    const initialForm: CompanionForm = {
      firstName: '',
      lastName: '',
      age: 18,
      gender: 'Male',
      skinTone: 'Fair',
      bodyType: '',
      eatingHabits: '',
      smokingHabit: '',
      drinkingHabit: '',
      location: '',
      email: '',
      description: [],
      bookingRate: 0,
      height: 160,
    };

    interface CreateCompanionProps {
      initialForm?: Partial<CompanionForm>;
      buttonText?: string;
    }

    enum GenderEnum {
      MALE = 'MALE',
      FEMALE = 'FEMALE',
      OTHER = 'OTHER',
    }

    enum MaleCompanionBodyTypeEnum {
      ATHLETIC = 'ATHLETIC',
      MUSCULAR = 'MUSCULAR',
      SLIM = 'SLIM',
    }

    enum FemaleCompanionBodyTypeEnum {
      RECTANGLE = 'RECTANGLE',
      TRIANGLE = 'TRIANGLE',
      SPOON = 'SPOON',
      HOURGLASS = 'HOURGLASS',
      TOPHOURGLASS = 'TOPHOURGLASS',
    }

    enum OtherCompanionBodyTypeEnum {
      ATHLETIC = 'ATHLETIC',
      MUSCULAR = 'MUSCULAR',
      SLIM = 'SLIM',
      RECTANGLE = 'RECTANGLE',
      TRIANGLE = 'TRIANGLE',
      SPOON = 'SPOON',
      HOURGLASS = 'HOURGLASS',
      TOPHOURGLASS = 'TOPHOURGLASS',
    }

    enum CompanionSkinToneEnum {
      FAIR = 'FAIR',
      DARK = 'DARK',
      BROWN = 'BROWN',
    }

    enum CompanionEatingHabitsEnum {
      VEG = 'VEG',
      NONVEG = 'NONVEG',
      JAIN = 'JAIN',
      EGGETERIAN = 'EGGETERIAN',
      VEGAN = 'VEGAN',
    }

    enum CompanionSmokingHabitEnum {
      PASSIVE_SMOKER = 'PASSIVE_SMOKER',
      ACTIVE_SMOKER = 'ACTIVE_SMOKER',
      NON_SMOKER = 'NON_SMOKER',
      OCCASIONALLY = 'OCCASIONALLY',
    }

    enum CompanionDrinkingHabitEnum {
      DAILY_DRINKER = 'DAILY_DRINKER',
      NON_DRINKER = 'NON_DRINKER',
      OCCASIONALLY = 'OCCASIONALLY',
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

    export function CreateCompanion({
      initialForm: initialValues,
      buttonText = 'Create Companion',
    }: CreateCompanionProps) {
      const [form, setForm] = useState<CompanionForm>(
        initialValues ? { ...initialForm, ...initialValues } : initialForm
      );

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        // Password validation regex
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
      
        // Validate password
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
      
        // Validate at least 2 descriptions
        if (form.description.length < 2) {
          alert('Please select at least 2 descriptions.');
          return;
        }

        if (form.height < 100) {
          alert('Height must be at least 100cm.');
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

      const getBodyTypes = (gender: 'Male' | 'Female' | 'OTHER') => {
        switch (gender) {
          case 'Male':
            return Object.values(MaleCompanionBodyTypeEnum);
          case 'Female':
            return Object.values(FemaleCompanionBodyTypeEnum);
          case 'OTHER':
            return Object.values(OtherCompanionBodyTypeEnum);
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

      const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const binaryStr = event.target?.result;
          if (typeof binaryStr === 'string') {
            try {
              const workbook = XLSX.read(binaryStr, { type: 'binary' });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const data = XLSX.utils.sheet_to_json(worksheet) as any[];
              console.log('Parsed Data:', data);
      
              if (data.length === 0) {
                alert('The Excel file is empty.');
                return;
              }
      
              // Check if all required columns are present
              const requiredColumns = [
                'firstname',
                'lastname',
                'email',
                'password',
                'gender',
                'age',
                'description',
                'skintone',
                'city',
                'bookingrate',
                'height',
                'bodytype',
                'eatinghabits',
                'drinkinghabits',
                'smokinghabits',
              ];
      
              const missingColumns = requiredColumns.filter(
                (column) => !data[0].hasOwnProperty(column)
              );
      
              if (missingColumns.length > 0) {
                alert(`Missing required columns: ${missingColumns.join(', ')}`);
                return;
              }
      
              // Validate and transform data
              const validatedData = [];
              const invalidRows = [];
      
              for (const row of data) {
                try {
                  // Validate numeric fields
                  const age = parseInt(row.age, 10);
                  const bookingRate = parseFloat(row.bookingrate);
                  const height = parseInt(row.height, 10);
      
                  if (isNaN(age) || age < 0) {
                    throw new Error(`Invalid age: ${row.age}`);
                  }
                  if (isNaN(bookingRate) || bookingRate < 0) {
                    throw new Error(`Invalid booking rate: ${row.bookingrate}`);
                  }
                  if (isNaN(height) || height < 0) {
                    throw new Error(`Invalid height: ${row.height}`);
                  }
      
                  // Validate enum fields
                  const gender = Object.values(GenderEnum).includes(row.gender)
                    ? row.gender
                    : null;
      
                  // Split description into an array and validate each value
                  const description = row.description
                    .split(',')
                    .map((d: string) => d.trim())
                    .filter((d: string) => {
                      // Check if the description is a valid enum value
                      return Object.values(CompanionDescriptionEnum).includes(d as CompanionDescriptionEnum);
                    });
      
                  if (description.length < 2) {
                    throw new Error('At least 2 valid descriptions are required');
                  }
      
                  const skinTone = Object.values(CompanionSkinToneEnum).includes(row.skintone)
                    ? row.skintone
                    : null;
      
                  // Validate body type based on gender
                  let bodyType = null;
                  if (gender === GenderEnum.MALE) {
                    bodyType = Object.values(MaleCompanionBodyTypeEnum).includes(row.bodytype)
                      ? row.bodytype
                      : null;
                  } else if (gender === GenderEnum.FEMALE) {
                    bodyType = Object.values(FemaleCompanionBodyTypeEnum).includes(row.bodytype)
                      ? row.bodytype
                      : null;
                  } else if (gender === GenderEnum.OTHER) {
                    bodyType = Object.values(OtherCompanionBodyTypeEnum).includes(row.bodytype)
                      ? row.bodytype
                      : null;
                  }
      
                  const eatingHabits = Object.values(CompanionEatingHabitsEnum).includes(
                    row.eatinghabits
                  )
                    ? row.eatinghabits
                    : null;
      
                  const drinkingHabit = Object.values(CompanionDrinkingHabitEnum).includes(
                    row.drinkinghabits
                  )
                    ? row.drinkinghabits
                    : null;
      
                  const smokingHabit = Object.values(CompanionSmokingHabitEnum).includes(
                    row.smokinghabits
                  )
                    ? row.smokinghabits
                    : null;
      
                  // Skip row if any enum field is invalid
                  if (
                    !gender ||
                    !skinTone ||
                    !bodyType ||
                    !eatingHabits ||
                    !drinkingHabit ||
                    !smokingHabit
                  ) {
                    throw new Error('Invalid enum value(s)');
                  }
      
                  // Add validated row to the result
                  validatedData.push({
                    firstName: row.firstname,
                    lastName: row.lastname,
                    email: row.email,
                    password: row.password,
                    gender,
                    age,
                    description: description as CompanionDescriptionEnum[], // Cast to enum array
                    skinTone,
                    location: row.city,
                    bookingRate,
                    height,
                    bodyType,
                    eatingHabits,
                    drinkingHabit,
                    smokingHabit,
                  });
                } catch (error) {
                  // Log invalid rows for debugging
                  invalidRows.push({ row, error: error instanceof Error ? error.message : 'Unknown error' });
                }
              }
      
              // Log invalid rows (for debugging)
              if (invalidRows.length > 0) {
                console.warn('Invalid rows skipped:', invalidRows);
              }
      
              // Simulate API call
              if (validatedData.length > 0) {
                alert(`${validatedData.length} companions added successfully!`);
                console.log('Validated Data:', validatedData);
      
                // Replace the alert with an actual API call
                // fetch('/api/companions', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(validatedData),
                // })
                //   .then((response) => response.json())
                //   .then((data) => console.log('API response:', data))
                //   .catch((error) => console.error('API error:', error));
              } else {
                alert('No valid rows found in the Excel file.');
              }
            } catch (error) {
              if (error instanceof Error) {
                alert(`Error processing Excel file: ${error.message}`);
                console.error(error);
              } else {
                alert('An unknown error occurred while processing the Excel file.');
                console.error(error);
              }
            }
          }
        };
        reader.readAsBinaryString(file);
      };

      const changedFields = initialValues ? getChangedFields(initialForm, form) : {};

      return (
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{buttonText === 'Update Companion' ? 'Update Companion' : 'Create New Companion'}</CardTitle>
              <CardDescription>Fill in the details to create a new companion profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className={cn(
                          changedFields.firstName && 'border-green-500'
                        )}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className={cn(
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
                      <Label htmlFor="gender">Gender</Label>
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
                      <Label htmlFor="skinTone">Skin Tone</Label>
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
                      <Label htmlFor="bodyType">Body Type</Label>
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
                      <Label htmlFor="eatingHabits">Eating Habits</Label>
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
                      <Label htmlFor="smokingHabit">Smoking Habit</Label>
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
                      <Label htmlFor="drinkingHabit">Drinking Habit</Label>
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
                      <Label htmlFor="location">Location</Label>
                      <Input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className={cn(
                          changedFields.location && 'border-green-500'
                        )}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={cn(
                          changedFields.email && 'border-green-500'
                        )}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={form.password || ''}
                        onChange={handleChange}
                        className={cn(
                          changedFields.password && 'border-green-500'
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bookingRate">Booking Rate (per hour)</Label>
                      <Input
                        type="number"
                        name="bookingRate"
                        value={form.bookingRate}
                        onChange={handleChange}
                        className={cn(
                          changedFields.bookingRate && 'border-green-500'
                        )}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        type="number"
                        name="height"
                        value={form.height}
                        onChange={handleChange}
                        className={cn(
                          changedFields.height && 'border-green-500'
                        )}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="description">Description (Select at least 2)</Label>
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
                  >
                    {buttonText}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }

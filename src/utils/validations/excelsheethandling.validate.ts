import {
  CompanionDescriptionEnum,
  CompanionDrinkingHabitEnum,
  CompanionEatingHabitsEnum,
  CompanionSkinToneEnum,
  CompanionSmokingHabitEnum,
  FemaleCompanionBodyTypeEnum,
  GenderEnum,
  MaleCompanionBodyTypeEnum,
  OtherCompanionBodyTypeEnum,
} from "@/data/dto/companion.data.dto";
import * as XLSX from "xlsx";

export const validateExcel = (file: File) => {
  if (!file) {
    return { error: "File not found" };
  }
  const reader = new FileReader();
  reader.onload = (event: ProgressEvent<FileReader>) => {
    const binaryStr = event.target?.result;
    if (typeof binaryStr === "string") {
      try {
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = XLSX.utils.sheet_to_json(worksheet) as any[];
        console.log("Parsed Data:", data);

        if (data.length === 0) {
          alert("The Excel file is empty.");
          return;
        }

        // Check if all required columns are present
        const requiredColumns = [
          "firstname",
          "lastname",
          "email",
          "password",
          "gender",
          "age",
          "description",
          "skintone",
          "city",
          "bookingrate",
          "height",
          "bodytype",
          "eatinghabits",
          "drinkinghabits",
          "smokinghabits",
        ];

        const missingColumns = requiredColumns.filter(
          // eslint-disable-next-line no-prototype-builtins
          (column) => !data[0].hasOwnProperty(column)
        );

        if (missingColumns.length > 0) {
          alert(`Missing required columns: ${missingColumns.join(", ")}`);
          return;
        }

        // Validate and transform data
        const validatedData = [];
        const invalidRows = [];

        for (const row of data) {
          try {
            // Validate numeric fields
            const age = parseInt(row.age, 10);
            const bookingrate = parseFloat(row.bookingrate);
            const height = parseInt(row.height, 10);

            if (isNaN(age) || age < 0) {
              throw new Error(`Invalid age: ${row.age}`);
            }
            if (isNaN(bookingrate) || bookingrate < 0) {
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
              .split(",")
              .map((d: string) => d.trim())
              .filter((d: string) => {
                // Check if the description is a valid enum value
                return Object.values(CompanionDescriptionEnum).includes(
                  d as CompanionDescriptionEnum
                );
              });

            if (description.length < 2) {
              throw new Error("At least 2 valid descriptions are required");
            }

            const skintone = Object.values(CompanionSkinToneEnum).includes(
              row.skintone
            )
              ? row.skintone
              : null;

            // Validate body type based on gender
            let bodytype = null;
            if (gender === GenderEnum.MALE) {
              bodytype = Object.values(MaleCompanionBodyTypeEnum).includes(
                row.bodytype
              )
                ? row.bodytype
                : null;
            } else if (gender === GenderEnum.FEMALE) {
              bodytype = Object.values(FemaleCompanionBodyTypeEnum).includes(
                row.bodytype
              )
                ? row.bodytype
                : null;
            } else if (gender === GenderEnum.OTHER) {
              bodytype = Object.values(OtherCompanionBodyTypeEnum).includes(
                row.bodytype
              )
                ? row.bodytype
                : null;
            }

            const eatinghabits = Object.values(
              CompanionEatingHabitsEnum
            ).includes(row.eatinghabits)
              ? row.eatinghabits
              : null;

            const drinkinghabits = Object.values(
              CompanionDrinkingHabitEnum
            ).includes(row.drinkinghabits)
              ? row.drinkinghabits
              : null;

            const smokinghabits = Object.values(
              CompanionSmokingHabitEnum
            ).includes(row.smokinghabits)
              ? row.smokinghabits
              : null;

            // Skip row if any enum field is invalid
            if (
              !gender ||
              !skintone ||
              !bodytype ||
              !eatinghabits ||
              !drinkinghabits ||
              !smokinghabits
            ) {
              throw new Error("Invalid enum value(s)");
            }

            // Add validated row to the result
            validatedData.push({
              firstname: row.firstname,
              lastname: row.lastname,
              email: row.email,
              password: row.password,
              gender,
              age,
              description: description as CompanionDescriptionEnum[], // Cast to enum array
              skintone,
              city: row.city,
              bookingrate,
              height,
              bodytype,
              eatinghabits,
              drinkinghabits,
              smokinghabits,
            });
          } catch (error) {
            // Log invalid rows for debugging
            invalidRows.push({
              row,
              error: error instanceof Error ? error.message : "Unknown error",
            });
          }
        }

        // Log invalid rows (for debugging)
        if (invalidRows.length > 0) {
          console.warn("Invalid rows skipped:", invalidRows);
        }

        // Simulate API call
        if (validatedData.length > 0) {
          alert(`${validatedData.length} companions added successfully!`);
          console.log("Validated Data:", validatedData);

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
          alert("No valid rows found in the Excel file.");
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(`Error processing Excel file: ${error.message}`);
          console.error(error);
        } else {
          alert("An unknown error occurred while processing the Excel file.");
          console.error(error);
        }
      }
    }
  };
  reader.readAsBinaryString(file);
};

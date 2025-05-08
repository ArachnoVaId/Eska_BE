import { CompetitionField } from "../configs/competition.config";

interface ValidationError {
  field: string;
  message: string;
}

export function validateFormData(
  competitionFields: CompetitionField[],
  reqBody: Record<string, unknown>,
  reqFiles?: Record<string, Express.Multer.File[]>
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of competitionFields) {
    const { name, type, label, required, validation } = field;

    const value = reqBody[name];
    const file = reqFiles?.[name]?.[0];

    if (required) {
      if (type === "file") {
        if (!file) {
          errors.push({ field: name, message: `${label} is required` });
          continue;
        }
      } else {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "")
        ) {
          errors.push({ field: name, message: `${label} is required` });
          continue;
        }
      }
    }

    if (type === "file" && file && validation) {
      const maxSize = (validation.fileSizeLimitMB ?? 10) * 1024 * 1024;

      if (file.size > maxSize) {
        errors.push({
          field: name,
          message: `${label} must be smaller than ${validation.fileSizeLimitMB}MB`
        });
      }

      if (
        validation.fileType &&
        !new RegExp(validation.fileType).test(file.mimetype)
      ) {
        errors.push({
          field: name,
          message: `${label} must be of type: ${validation.fileType}`
        });
      }
    }

    if (type !== "file" && typeof value === "string" && validation) {
      if (validation.minLength && value.length < validation.minLength) {
        errors.push({
          field: name,
          message: `${label} must be at least ${validation.minLength} characters`
        });
      }

      if (validation.pattern) {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(value)) {
          errors.push({
            field: name,
            message: validation.requiredMessage || `${label} format is invalid`
          });
        }
      }
    }
  }

  return errors;
}

// competition.config.ts

export type CompetitionFieldType = "text" | "email" | "tel" | "file" | "select" | "number";

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  requiredMessage?: string;
  fileSizeLimitMB?: number;
  fileType?: string; // MIME type(s), pipe-separated
}

export interface Options {
  name: string;
  label: string;
}

export interface CompetitionField {
  name: string;
  label: string;
  group?: string;
  type: CompetitionFieldType;
  required: boolean;
  options?: Options[]; // for select
  maxCount?: number; // for files
  accept?: string; // file type extension
  validation?: FieldValidation;
}

export interface CompetitionField {
  name: string;
  label: string;
  group?: string;
  type: CompetitionFieldType;
  required: boolean;
  maxCount?: number;
  accept?: string;
  validation?: FieldValidation;
}

export type Competition = "Presale";
export const competitionConfigs: Record<Competition, CompetitionField[]> = {
  "Presale": [
    {
      name: "name",
      label: "Nama Lengkap",
      type: "text",
      group: "DATA DIRI",
      required: true,
      validation: {
        minLength: 1,
        requiredMessage: "Full name is required",
      },
    },
    {
      name: "phone",
      label: "No Whatsapp",
      type: "tel",
      group: "DATA DIRI",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^08[0-9]{8,11}$",
        requiredMessage: "Phone number is invalid",
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      group: "DATA DIRI",
      required: true,
      validation: {
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "organization",
      label: "Asal Organisasi/Instansi",
      type: "text",
      group: "DATA DIRI",
      required: true,
      validation: {
        requiredMessage: "Organisasi is invalid",
      },
    },
    {
      name: "ticket",
      label: "Jumlah Tiket",
      type: "number",
      group: "DATA DIRI",
      required: true,
      validation: {
        requiredMessage: "Tiket is invalid",
      },
    },
    {
      name: "bank",
      label: "Nama Rekening Bank",
      type: "text",
      group: "DATA DIRI",
      required: true,
      validation: {
        requiredMessage: "Rekening is invalid",
      },
    },

    {
      name: "Bukti_Pembayaran",
      label: "Bukti Pembayar (.jpg or .jpeg or .png or .pdf)",
      type: "file",
      group: "Pembayaran",
      required: true,
      accept: ".jpg,.jpeg,.png,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 10,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
  ],
};

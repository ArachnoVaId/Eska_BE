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

export type Competition =
  | "Lean Canvas"
  | "Presale"
  | "GMBCC Individual National"
  | "GMBCC Individual International"
  | "GMBCC Team National"
  | "GMBCC Team International";
export const competitionConfigs: Record<Competition, CompetitionField[]> = {
  "GMBCC Team International": [
    {
      name: "team_name",
      label: "Team Name",
      type: "text",
      group: "TEAM PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Team name must only contain letters",
      },
    },
    {
      name: "team_leader_name",
      label: "Full Name",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Full name must only contain letters",
      },
    },
    {
      name: "team_leader_nationality",
      label: "Nationality",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Nationality must only contain letters",
      },
    },
    {
      name: "team_leader_university",
      label: "University (E.g. Universitas Gadjah Mada)",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.,&()\\-']+$",
        requiredMessage:
          "Please enter a valid university name using letters, numbers, and common symbols like commas, periods, or hyphens.",
      },
    },
    {
      name: "team_leader_faculty",
      label: "Faculty (E.g. Economics and Business)",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Faculty must only contain letters",
      },
    },
    {
      name: "team_leader_major",
      label: "Major (E.g. Management)",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Major must only contain letters",
      },
    },
    {
      name: "team_leader_domicile",
      label: "Domicile (E.g. Yogyakarta, DI Yogyakarta)",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.'()\\-&,]+(?:,\\s*[A-Za-z0-9\\s.'()\\-&]+)?$",
        requiredMessage:
          "Use only letters, numbers, and symbols like commas, periods, and parentheses in the domicile field.",
      },
    },
    {
      name: "team_leader_email",
      label: "Active Email",
      type: "email",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "team_leader_whatsapp_number",
      label: "WhatsApp Number - With Country Code",
      type: "tel",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^\\+?[0-9]{10,}$",
        requiredMessage: "WhatsApp number is invalid",
      },
    },
    {
      name: "team_leader_linkedin",
      label: "LinkedIn Profile Link",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        pattern: "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.+$",
        requiredMessage:
          "LinkedIn profile link must be in a valid format (e.g. www.linkedin.com/in/yourprofile)",
      },
    },
    {
      name: "team_leader_cv",
      label: "Curriculum Vitae (CV) (.pdf)",
      type: "file",
      group: "TEAM LEADER PROFILE",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "member_1_name",
      label: "Full Name",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Full name must only contain letters",
      },
    },
    {
      name: "member_1_nationality",
      label: "Nationality",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Nationality is required",
      },
    },
    {
      name: "member_1_university",
      label: "University (E.g. Universitas Gadjah Mada)",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.,&()\\-']+$",
        requiredMessage:
          "Please enter a valid university name using letters, numbers, and common symbols like commas, periods, or hyphens.",
      },
    },
    {
      name: "member_1_faculty",
      label: "Faculty (E.g. Economics and Business)",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Faculty must only contain letters",
      },
    },
    {
      name: "member_1_major",
      label: "Major (E.g. Management)",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Major must only contain letters",
      },
    },
    {
      name: "member_1_domicile",
      label: "Domicile (E.g. Yogyakarta, DI Yogyakarta)",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.'()\\-&,]+(?:,\\s*[A-Za-z0-9\\s.'()\\-&]+)?$",
        requiredMessage:
          "Use only letters, numbers, and symbols like commas, periods, and parentheses in the domicile field.",
      },
    },
    {
      name: "member_1_email",
      label: "Active Email",
      type: "email",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "member_1_whatsapp_number",
      label: "WhatsApp Number - With Country Code",
      type: "tel",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^\\+?[0-9]{10,}$",
        requiredMessage: "WhatsApp number is invalid",
      },
    },
    {
      name: "member_1_linkedin",
      label: "LinkedIn Profile Link",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        pattern: "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.+$",
        requiredMessage:
          "LinkedIn profile link must be in a valid format (e.g. www.linkedin.com/in/yourprofile)",
      },
    },
    {
      name: "member_1_cv",
      label: "Curriculum Vitae (CV) (.pdf)",
      type: "file",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "member_2_name",
      label: "Full Name",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Full name must only contain letters",
      },
    },
    {
      name: "member_2_nationality",
      label: "Nationality",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Nationality is required",
      },
    },
    {
      name: "member_2_university",
      label: "University (E.g. Universitas Gadjah Mada)",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.,&()\\-']+$",
        requiredMessage:
          "Please enter a valid university name using letters, numbers, and common symbols like commas, periods, or hyphens.",
      },
    },
    {
      name: "member_2_faculty",
      label: "Faculty (E.g. Economics and Business)",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Faculty must only contain letters",
      },
    },
    {
      name: "member_2_major",
      label: "Major (E.g. Management)",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Major must only contain letters",
      },
    },
    {
      name: "member_2_domicile",
      label: "Domicile (E.g. Yogyakarta, DI Yogyakarta)",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.'()\\-&,]+(?:,\\s*[A-Za-z0-9\\s.'()\\-&]+)?$",
        requiredMessage:
          "Use only letters, numbers, and symbols like commas, periods, and parentheses in the domicile field.",
      },
    },
    {
      name: "member_2_email",
      label: "Active Email",
      type: "email",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "member_2_whatsapp_number",
      label: "WhatsApp Number - With Country Code",
      type: "tel",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^\\+?[0-9]{10,}$",
        requiredMessage: "WhatsApp number is invalid",
      },
    },
    {
      name: "member_2_linkedin",
      label: "LinkedIn Profile Link",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        pattern: "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.+$",
        requiredMessage:
          "LinkedIn profile link must be in a valid format (e.g. www.linkedin.com/in/yourprofile)",
      },
    },
    {
      name: "member_2_cv",
      label: "Curriculum Vitae (CV) (.pdf)",
      type: "file",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "ktm",
      label: "Upload Proof of an Active Student ID (.pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "proof_follow",
      label:
        "Screenshot of Following @gmbcc_ugm on Instagram (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "twibbon",
      label:
        "Screenshot of the GMBCC Twibbon upload on Participant's Instagram Account (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "poster",
      label:
        "Screenshot of the GMBCC Poster Uploaded in the Instagram Story from Participant. (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "payment_proof",
      label: "Payment Proof (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Payment",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
  ],
  "GMBCC Team National": [
    {
      name: "team_name",
      label: "Team Name",
      type: "text",
      group: "TEAM PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Team name must only contain letters",
      },
    },
    {
      name: "name",
      label: "Full Name",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Full name must only contain letters",
      },
    },
    {
      name: "team_leader_nationality",
      label: "Nationality",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Nationality must only contain letters",
      },
    },
    {
      name: "team_leader_university",
      label: "University (E.g. Universitas Gadjah Mada)",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.,&()\\-']+$",
        requiredMessage:
          "Please enter a valid university name using letters, numbers, and common symbols like commas, periods, or hyphens.",
      },
    },
    {
      name: "team_leader_faculty",
      label: "Faculty (E.g. Economics and Business)",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Faculty must only contain letters",
      },
    },
    {
      name: "team_leader_major",
      label: "Major (E.g. Management)",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Major must only contain letters",
      },
    },
    {
      name: "team_leader_domicile",
      label: "Domicile (E.g. Yogyakarta, DI Yogyakarta)",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.'()\\-&,]+(?:,\\s*[A-Za-z0-9\\s.'()\\-&]+)?$",
        requiredMessage:
          "Use only letters, numbers, and symbols like commas, periods, and parentheses in the domicile field.",
      },
    },
    {
      name: "email",
      label: "Active Email",
      type: "email",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "phone",
      label: "WhatsApp Number - With Country Code",
      type: "tel",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^\\+?[0-9]{10,}$",
        requiredMessage: "WhatsApp number is invalid",
      },
    },
    {
      name: "team_leader_linkedin",
      label: "LinkedIn Profile Link",
      type: "text",
      group: "TEAM LEADER PROFILE",
      required: true,
      validation: {
        pattern: "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.+$",
        requiredMessage:
          "LinkedIn profile link must be in a valid format (e.g. www.linkedin.com/in/yourprofile)",
      },
    },
    {
      name: "team_leader_cv",
      label: "Curriculum Vitae (CV) (.pdf)",
      type: "file",
      group: "TEAM LEADER PROFILE",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "member_1_name",
      label: "Full Name",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Full name must only contain letters",
      },
    },
    {
      name: "member_1_nationality",
      label: "Nationality",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Nationality must only contain letters",
      },
    },
    {
      name: "member_1_university",
      label: "University (E.g. Universitas Gadjah Mada)",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.,&()\\-']+$",
        requiredMessage:
          "Please enter a valid university name using letters, numbers, and common symbols like commas, periods, or hyphens.",
      },
    },
    {
      name: "member_1_faculty",
      label: "Faculty (E.g. Economics and Business)",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Faculty must only contain letters",
      },
    },
    {
      name: "member_1_major",
      label: "Major (E.g. Management)",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Major must only contain letters",
      },
    },
    {
      name: "member_1_domicile",
      label: "Domicile (E.g. Yogyakarta, DI Yogyakarta)",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.'()\\-&,]+(?:,\\s*[A-Za-z0-9\\s.'()\\-&]+)?$",
        requiredMessage:
          "Use only letters, numbers, and symbols like commas, periods, and parentheses in the domicile field.",
      },
    },
    {
      name: "member_1_email",
      label: "Active Email",
      type: "email",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "member_1_whatsapp_number",
      label: "WhatsApp Number - With Country Code",
      type: "tel",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^\\+?[0-9]{10,}$",
        requiredMessage: "WhatsApp number is invalid",
      },
    },
    {
      name: "member_1_linkedin",
      label: "LinkedIn Profile Link",
      type: "text",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      validation: {
        pattern: "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.+$",
        requiredMessage:
          "LinkedIn profile link must be in a valid format (e.g. www.linkedin.com/in/yourprofile)",
      },
    },
    {
      name: "member_1_cv",
      label: "Curriculum Vitae (CV) (.pdf)",
      type: "file",
      group: "TEAM MEMBER 1 PROFILE",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "member_2_name",
      label: "Full Name",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Full name must only contain letters",
      },
    },
    {
      name: "member_2_nationality",
      label: "Nationality",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Nationality must only contain letters",
      },
    },
    {
      name: "member_2_university",
      label: "University (E.g. Universitas Gadjah Mada)",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.,&()\\-']+$",
        requiredMessage:
          "Please enter a valid university name using letters, numbers, and common symbols like commas, periods, or hyphens.",
      },
    },
    {
      name: "member_2_faculty",
      label: "Faculty (E.g. Economics and Business)",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Faculty must only contain letters",
      },
    },
    {
      name: "member_2_major",
      label: "Major (E.g. Management)",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Major must only contain letters",
      },
    },
    {
      name: "member_2_domicile",
      label: "Domicile (E.g. Yogyakarta, DI Yogyakarta)",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.'()\\-&,]+(?:,\\s*[A-Za-z0-9\\s.'()\\-&]+)?$",
        requiredMessage:
          "Use only letters, numbers, and symbols like commas, periods, and parentheses in the domicile field.",
      },
    },
    {
      name: "member_2_email",
      label: "Active Email",
      type: "email",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "member_2_whatsapp_number",
      label: "WhatsApp Number - With Country Code",
      type: "tel",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^\\+?[0-9]{10,}$",
        requiredMessage: "WhatsApp number is invalid",
      },
    },
    {
      name: "member_2_linkedin",
      label: "LinkedIn Profile Link",
      type: "text",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      validation: {
        pattern: "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.+$",
        requiredMessage:
          "LinkedIn profile link must be in a valid format (e.g. www.linkedin.com/in/yourprofile)",
      },
    },
    {
      name: "member_2_cv",
      label: "Curriculum Vitae (CV) (.pdf)",
      type: "file",
      group: "TEAM MEMBER 2 PROFILE",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "ktm",
      label: "Upload Proof of an Active Student ID (.pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "proof_follow",
      label:
        "Screenshot of Following @gmbcc_ugm on Instagram (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "twibbon",
      label:
        "Screenshot of the GMBCC Twibbon upload on Participant's Instagram Account (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "poster",
      label:
        "Screenshot of the GMBCC Poster Uploaded in the Instagram Story from Participant. (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "novagate_coupon_code_from_form",
      label: "Coupon (optional)",
      type: "text",
      group: "COUPON",
      required: false,
    },
  ],
  "GMBCC Individual International": [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Full name must only contain letters",
      },
    },
    {
      name: "nationality",
      label: "Nationality",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Nationality must only contain letters",
      },
    },
    {
      name: "university",
      label: "University (E.g. Universitas Gadjah Mada)",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.,&()\\-']+$",
        requiredMessage:
          "Please enter a valid university name using letters, numbers, and common symbols like commas, periods, or hyphens.",
      },
    },
    {
      name: "faculty",
      label: "Faculty (E.g. Economics and Business)",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Faculty must only contain letters",
      },
    },
    {
      name: "major",
      label: "Major (E.g. Management)",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Major must only contain letters",
      },
    },
    {
      name: "domicile",
      label: "Domicile (E.g. Yogyakarta)",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.'()\\-&,]+(?:,\\s*[A-Za-z0-9\\s.'()\\-&]+)?$",
        requiredMessage:
          "Use only letters, numbers, and symbols like commas, periods, and parentheses in the domicile field.",
      },
    },
    {
      name: "email",
      label: "Active Email",
      type: "email",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "phone",
      label: "WhatsApp Number - With Country Code",
      type: "tel",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^\\+?[0-9]{10,}$",
        requiredMessage: "WhatsApp number is invalid",
      },
    },
    {
      name: "linkedin",
      label: "LinkedIn Profile Link",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        pattern: "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.+$",
        requiredMessage:
          "LinkedIn profile link must be in a valid format (e.g. www.linkedin.com/in/yourprofile)",
      },
    },
    {
      name: "cv",
      label: "Curriculum Vitae (CV) (.pdf)",
      type: "file",
      group: "PARTICIPANT PROFILE",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "ktm",
      label: "Upload Proof of an Active Student ID (.pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "proof_follow",
      label:
        "Screenshot of Following @gmbcc_ugm on Instagram (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "twibbon",
      label:
        "Screenshot of the GMBCC Twibbon upload on Participant's Instagram Account (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "poster",
      label:
        "Screenshot of the GMBCC Poster Uploaded in the Instagram Story from Participant. (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "proof_payment",
      label: "Proof of Payment (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Payments",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
  ],
  "GMBCC Individual National": [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Full name must only contain letters",
      },
    },
    {
      name: "nationality",
      label: "Nationality",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Nationality must only contain letters",
      },
    },
    {
      name: "university",
      label: "University (E.g. Universitas Gadjah Mada)",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.,&()\\-']+$",
        requiredMessage:
          "Please enter a valid university name using letters, numbers, and common symbols like commas, periods, or hyphens.",
      },
    },
    {
      name: "faculty",
      label: "Faculty (E.g. Economics and Business)",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Faculty must only contain letters",
      },
    },
    {
      name: "major",
      label: "Major (E.g. Management)",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Major must only contain letters",
      },
    },
    {
      name: "domicile",
      label: "Domicile (E.g. Yogyakarta)",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z0-9\\s.'()\\-&,]+(?:,\\s*[A-Za-z0-9\\s.'()\\-&]+)?$",
        requiredMessage:
          "Use only letters, numbers, and symbols like commas, periods, and parentheses in the domicile field.",
      },
    },
    {
      name: "email",
      label: "Active Email",
      type: "email",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Email is invalid",
      },
    },
    {
      name: "phone",
      label: "WhatsApp Number - With Country Code",
      type: "tel",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^\\+?[0-9]{10,}$",
        requiredMessage: "WhatsApp number is invalid",
      },
    },
    {
      name: "linkedin",
      label: "LinkedIn Profile Link",
      type: "text",
      group: "PARTICIPANT PROFILE",
      required: true,
      validation: {
        pattern: "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/.+$",
        requiredMessage:
          "LinkedIn profile link must be in a valid format (e.g. www.linkedin.com/in/yourprofile)",
      },
    },
    {
      name: "cv",
      label: "Curriculum Vitae (CV) (.pdf)",
      type: "file",
      group: "PARTICIPANT PROFILE",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "ktm",
      label: "Upload Proof of an Active Student ID (.pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "application/pdf",
      },
    },
    {
      name: "proof_follow",
      label:
        "Screenshot of Following @gmbcc_ugm on Instagram (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "twibbon",
      label:
        "Screenshot of the GMBCC Twibbon upload on Participant's Instagram Account (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "poster",
      label:
        "Screenshot of the GMBCC Poster Uploaded in the Instagram Story from Participant. (.png or .jpg or .jpeg or .pdf)",
      type: "file",
      group: "Upload Documents",
      required: true,
      accept: ".png,.jpg,.jpeg,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 5,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },
    {
      name: "novagate_coupon_code_from_form",
      label: "Coupon (optional)",
      type: "text",
      group: "COUPON",
      required: false,
    },
  ],
  "Lean Canvas": [
    {
      name: "team_name",
      label: "Nama Tim",
      type: "text",
      group: "DATA KETUA",
      required: true,
      validation: {
        minLength: 1,
        pattern: "^[A-Za-z\\s]+$",
        requiredMessage: "Team name must only contain letters",
      },
    },
    {
      name: "name",
      label: "Nama Lengkap Ketua",
      type: "text",
      group: "DATA KETUA",
      required: true,
      validation: {
        minLength: 1,
        requiredMessage: "Captain full name is required",
      },
    },
    {
      name: "captain_instance",
      label: "Asal Instansi Ketua",
      type: "text",
      group: "DATA KETUA",
      required: true,
      validation: {
        minLength: 1,
        requiredMessage: "Captain instance is required",
      },
    },
    {
      name: "phone",
      label: "No HP Ketua",
      type: "tel",
      group: "DATA KETUA",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^08[0-9]{8,11}$",
        requiredMessage: "Captain phone number is invalid",
      },
    },
    {
      name: "email",
      label: "Email Ketua",
      type: "email",
      group: "DATA KETUA",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Captain email is invalid",
      },
    },
    {
      name: "captain_twibbon",
      label: "Link Twibbon Ketua (Link Instagram)",
      type: "text",
      group: "DATA KETUA",
      required: true,
      validation: {
        pattern:
          "^(https?:\\/\\/)?(www\\.)?(instagram\\.com|twibbon\\.com)\\/.+$",
        requiredMessage:
          "Captain Twibbon must be in a valid Instagram URL format (e.g. www.instagram.com/thisismytwibbonlink)",
      },
    },
    {
      name: "captain_id",
      label: "KTM Ketua (.jpg or .jpeg or .png or .pdf)",
      type: "file",
      group: "DATA KETUA",
      required: true,
      accept: ".jpg,.jpeg,.png,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 10,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },

    // Member 1
    {
      name: "member_1_name",
      label: "Nama Lengkap Anggota 1",
      type: "text",
      group: "DATA ANGGOTA 1",
      required: true,
      validation: {
        minLength: 1,
        requiredMessage: "Member 1 full name is required",
      },
    },
    {
      name: "member_1_instance",
      label: "Asal Instansi Anggota 1",
      type: "text",
      group: "DATA ANGGOTA 1",
      required: true,
      validation: {
        minLength: 1,
        requiredMessage: "Member 1 instance is required",
      },
    },
    {
      name: "member_1_phone",
      label: "No HP Anggota 1",
      type: "tel",
      group: "DATA ANGGOTA 1",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^08[0-9]{8,11}$",
        requiredMessage: "Member 1 phone number is invalid",
      },
    },
    {
      name: "member_1_email",
      label: "Email Anggota 1",
      type: "email",
      group: "DATA ANGGOTA 1",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Member 1 email is invalid",
      },
    },
    {
      name: "member_1_twibbon",
      label: "Link Twibbon Anggota 1 (Link Instagram)",
      type: "text",
      group: "DATA ANGGOTA 1",
      required: true,
      validation: {
        pattern:
          "^(https?:\\/\\/)?(www\\.)?(instagram\\.com|twibbon\\.com)\\/.+$",
        requiredMessage:
          "Member 1 Twibbon must be in a valid Instagram URL format (e.g. www.instagram.com/thisismytwibbonlink)",
      },
    },
    {
      name: "member_1_id",
      label: "KTM Anggota 1 (.jpg or .jpeg or .png or .pdf)",
      type: "file",
      group: "DATA ANGGOTA 1",
      required: true,
      accept: ".jpg,.jpeg,.png,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 10,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },

    // Member 2
    {
      name: "member_2_name",
      label: "Nama Lengkap Anggota 2",
      type: "text",
      group: "DATA ANGGOTA 2",
      required: true,
      validation: {
        minLength: 1,
        requiredMessage: "Member 2 full name is required",
      },
    },
    {
      name: "member_2_instance",
      label: "Asal Instansi Anggota 2",
      type: "text",
      group: "DATA ANGGOTA 2",
      required: true,
      validation: {
        minLength: 1,
        requiredMessage: "Member 2 instance is required",
      },
    },
    {
      name: "member_2_phone",
      label: "No HP Anggota 2",
      type: "tel",
      group: "DATA ANGGOTA 2",
      required: true,
      validation: {
        minLength: 10,
        pattern: "^08[0-9]{8,11}$",
        requiredMessage: "Member 2 phone number is invalid",
      },
    },
    {
      name: "member_2_email",
      label: "Email Anggota 2",
      type: "email",
      group: "DATA ANGGOTA 2",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        requiredMessage: "Member 2 email is invalid",
      },
    },
    {
      name: "member_2_twibbon",
      label: "Link Twibbon Anggota 2 (Link Instagram)",
      type: "text",
      group: "DATA ANGGOTA 2",
      required: true,
      validation: {
        pattern:
          "^(https?:\\/\\/)?(www\\.)?(instagram\\.com|twibbon\\.com)\\/.+$",
        requiredMessage:
          "Member 2 Twibbon must be in a valid Instagram URL format (e.g. www.instagram.com/thisismytwibbonlink)",
      },
    },
    {
      name: "member_2_id",
      label: "KTM Anggota 2 (.jpg or .jpeg or .png or .pdf)",
      type: "file",
      group: "DATA ANGGOTA 2",
      required: true,
      accept: ".jpg,.jpeg,.png,.pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 10,
        fileType: "image/jpeg|image/png|application/pdf",
      },
    },

    // Mandatory
    {
      name: "screenshot_sg",
      label: "Screenshot Snapgram Poster IDEAS & Seluruh Anggota (.pdf)",
      type: "file",
      group: "DATA WAJIB",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 10,
        fileType: "application/pdf",
      },
    },
    {
      name: "screenshot_follow",
      label:
        "Screenshot Follow Instagram @ideas_ugm Ketua & Seluruh Anggota (.pdf)",
      type: "file",
      group: "DATA WAJIB",
      required: true,
      accept: ".pdf",
      maxCount: 1,
      validation: {
        fileSizeLimitMB: 10,
        fileType: "application/pdf",
      },
    },
  ],
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

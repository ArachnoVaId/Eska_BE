import { Competition, competitionConfigs } from "../configs/competition.config";
import { OrderItem } from "./midtrans.type";

export type Origin = "national" | "international";

// Shared fields you want to include regardless of config
type SharedFields = {
  name: string;
  email: string;
  phone: string;
  orderId: string;
  order_items: OrderItem[];
};

// Extract field names by `type` from `fields[]`
type FieldNamesByType<C extends Competition, T extends string> = Extract<
  (typeof competitionConfigs)[C][number],
  { type: T }
>["name"];

// File and text field name types
type FileFields<C extends Competition> = FieldNamesByType<C, "file">;

type TextFields<C extends Competition> = Exclude<
  FieldNamesByType<C, "text" | "email" | "phone" | "select">,
  keyof SharedFields
>;

// Final dynamic form data type
export type FormDataFromConfig<C extends Competition> = SharedFields &
  Record<FileFields<C>, File> &
  Record<TextFields<C>, string>;

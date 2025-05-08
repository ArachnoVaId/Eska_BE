export type CancelPaymentBody = {
  order_id: string;
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export const midtransBaseObject = {
  transaction_type: null,
  transaction_time: "",
  transaction_status: "",
  transaction_id: "",
  status_message: "",
  status_code: "",
  signature_key: "",
  settlement_time: null,
  payment_type: "",
  order_id: "",
  merchant_id: "",
  gross_amount: "",
  fraud_status: "",
  currency: "",
  expiry_time: null,
  issuer: null,
  acquirer: null
} as const;

export const midtransBaseObjectKeys = Object.keys(
  midtransBaseObject
) as (keyof typeof midtransBaseObject)[];

export type MidtransLogEntry = {
  [K in keyof typeof midtransBaseObject]: string | null | undefined;
};

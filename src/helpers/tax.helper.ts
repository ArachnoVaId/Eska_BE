// Tax config structure
export type TaxObject = {
  name: string;
  percentage: number;
  type: "parallel" | "cumulative";
};

// Individual tax breakdown per item
export interface TaxBreakdown {
  name: string;
  type: "parallel" | "cumulative";
  percentage: number;
  base: number;
  amount: number;
}

// Return structure from taxCounter
export interface TaxCounterResult {
  initialTotal: number;
  tax: number;
  total: number;
  breakdown: TaxBreakdown[];
}

const taxObjects: TaxObject[] = [
  {
    name: "Service Fee",
    percentage: 3.3,
    type: "parallel"
  },
  {
    name: "Tax",
    percentage: 0.71,
    type: "cumulative"
  }
];

export const taxCounter = (initialTotal: number): TaxCounterResult => {
  let runningTotal = initialTotal;
  let totalTax = 0;

  const breakdown: TaxBreakdown[] = taxObjects.map((taxObj) => {
    const base = taxObj.type === "parallel" ? initialTotal : runningTotal;
    const taxAmount = Math.ceil((base * taxObj.percentage) / 100);

    totalTax += taxAmount;
    runningTotal += taxAmount;

    return {
      name: taxObj.name,
      type: taxObj.type,
      percentage: taxObj.percentage,
      base,
      amount: taxAmount
    };
  });

  return {
    initialTotal,
    tax: totalTax,
    total: runningTotal,
    breakdown
  };
};

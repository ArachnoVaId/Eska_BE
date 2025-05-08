type CouponCode = {
  code: string;
  discount: number;
  type: "fixed" | "percentage";
};

const minimumPrice = 1; // Minimum price after discount

const validCouponCodes: CouponCode[] = [
  {
    code: "ALEE23",
    discount: 10,
    type: "percentage",
  },
  {
    code: "ELVA25",
    discount: 10,
    type: "percentage",
  },
  {
    code: "NIMA01",
    discount: 10,
    type: "percentage",
  },
  {
    code: "VYAN01",
    discount: 10,
    type: "percentage",
  },
  {
    code: "OKD3N1",
    discount: 10,
    type: "percentage",
  },
  {
    code: "MDPR25",
    discount: 10,
    type: "percentage",
  },
  {
    code: "ABCC25",
    discount: 10,
    type: "percentage",
  },
];

export const validateCouponCode = (couponCode: string): CouponCode | null => {
  const coupon = validCouponCodes.find((c) => c.code === couponCode);
  return coupon || null;
};

export const calculateDiscountedPrice = (
  originalPrice: number,
  coupon: CouponCode | null,
): number => {
  if (!coupon) {
    return originalPrice;
  }

  if (coupon.type === "fixed") {
    return Math.max(originalPrice - coupon.discount, minimumPrice);
  } else if (coupon.type === "percentage") {
    return Math.max(
      originalPrice - (originalPrice * coupon.discount) / 100,
      minimumPrice,
    );
  }

  return originalPrice; // Fallback to original price
};

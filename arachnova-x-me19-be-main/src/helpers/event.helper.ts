import { Competition } from "../configs/competition.config";
import { OrderItem } from "../types/midtrans.type";

const gmbccPriceData = {
  individual: {
    earlyBird: 89000,
    normal: 109000,
    extended: 109000
  },
  team: {
    earlyBird: 229000,
    normal: 249000,
    extended: 249000
  }
};

const deadlines = {
  earlyBirdEnd: new Date("2025-04-20T23:59:59+07:00"),
  normalEnd: new Date("2025-05-11T23:59:59+07:00")
};

function getWIBDate(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 7 * 60 * 60000); // Convert to WIB
}

function getCurrentPhase(): "earlyBird" | "normal" | "extended" {
  const now = getWIBDate();
  if (now <= deadlines.earlyBirdEnd) return "earlyBird";
  if (now <= deadlines.normalEnd) return "normal";
  return "extended";
}

export const getCompetitionPrices = (competition: Competition): number => {
  switch (competition) {
    case "Presale":
      return 0;
    default:
      return 0;
  }
};

export const getDefaultCompetitionOrderItems = (
  competition: Competition
): OrderItem[] => {
  switch (competition) {
    case "Presale":
      return [
        {
          id: "Presale",
          name: "Presale",
          quantity: 1,
          price: getCompetitionPrices(competition)
        }
      ];
    default:
      return [
        {
          id: "default_item",
          name: "Default Item",
          quantity: 1,
          price: 0
        }
      ];
  }
};

export const getProductInformation = (orderItem: OrderItem): OrderItem => {
  const itemId = orderItem.id;
  const buyingQuantity = orderItem.quantity;

  // DB Dummy
  const productInfo: OrderItem[] = [
    {
      id: "ABC",
      name: "ABC",
      quantity: buyingQuantity,
      price: 10000
    },
    {
      id: "XYZ",
      name: "XYZ",
      quantity: buyingQuantity,
      price: 20000
    }
  ];

  const product = productInfo.find((item) => item.id === itemId);
  if (product) {
    return product;
  } else {
    throw new Error(`Product with ID ${itemId} not found.`);
  }
};

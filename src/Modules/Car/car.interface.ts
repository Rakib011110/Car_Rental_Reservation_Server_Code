export type CarStatus = "available" | "unavailable";

export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: CarStatus;
  features: string[];
  pricePerHour: number;
  photoUrl: string;
  isDeleted: boolean;
};

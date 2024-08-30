import { TCar } from "./car.interface";
import Car from "./car.model";

export const createCarInDB = async (payload: TCar): Promise<TCar> => {
  const result = await Car.create(payload);
  return result;
};
export const getAllCarsFromDB = async (): Promise<TCar[]> => {
  const result = await Car.find({ isDeleted: false });
  return result;
};

export const getSingCarFromDB = async (id: string): Promise<TCar | null> => {
  const result = await Car.findById(id);
  return result;
};

export const updateCarInDB = async (
  id: string,
  payload: Partial<TCar>
): Promise<TCar | null> => {
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const deleteCarInDB = async (id: string): Promise<TCar | null> => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const CarServices = {
  createCarInDB,
  getAllCarsFromDB,
  getSingCarFromDB,
  updateCarInDB,
  deleteCarInDB,
};

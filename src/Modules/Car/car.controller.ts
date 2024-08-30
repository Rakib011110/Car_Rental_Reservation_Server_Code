/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { TCar } from "./car.interface";
import { CarServices, createCarInDB } from "./car.service";

export const createCar = async (req: Request, res: Response) => {
  try {
    const carData: TCar = req.body;
    const newCar = await createCarInDB(carData);
    res.status(201).json(newCar);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllCars = async (_req: Request, res: Response) => {
  try {
    const cars = await CarServices.getAllCarsFromDB();
    res.status(200).json(cars);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const car = await CarServices.getSingCarFromDB(carId);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const carData: Partial<TCar> = req.body;
    const updatedCar = await CarServices.updateCarInDB(carId, carData);
    if (updatedCar) {
      res.status(200).json(updatedCar);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const deletedCar = await CarServices.deleteCarInDB(carId);
    if (deletedCar) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car Deleted successfully",
        deletedCar,
      });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const CarController = {
  createCar,
  getAllCars,
  updateCar,
  deleteCar,
};

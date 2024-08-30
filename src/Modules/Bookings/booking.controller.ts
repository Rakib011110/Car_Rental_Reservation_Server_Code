/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from "express";
import { BookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";
import Booking from "./booking.model";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      date,
      carId,
      startTime,
      endTime,
      totalCost,
      fullName,
      email,
      nidOrPassport,
      drivingLicense,
      pickUpDate,
      insurance,
      gps,
      childSeat,
    } = req.body;

    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate required fields
    if (
      !date ||
      !startTime ||
      !fullName ||
      !nidOrPassport ||
      !drivingLicense ||
      !pickUpDate
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const bookingData = {
      date,
      user: userId,
      car: carId,
      startTime,
      endTime: endTime || null,
      totalCost: totalCost || 0,
      fullName,
      email,
      nidOrPassport,
      drivingLicense,
      pickUpDate,
      insurance: insurance || false,
      gps: gps || false,
      childSeat: childSeat || false,
    };

    const newBooking = new Booking(bookingData);
    await (await (await newBooking.save()).populate("car")).populate("user");

    return res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// export const createBooking = async (req: Request, res: Response) => {
//   try {
//     const { carId, date, startTime } = req.body;
//     const userId = req?.user?.id;
//     // console.log(req?.user?.id);

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const bookingData = {
//       date,
//       user: userId,
//       car: carId,
//       startTime,
//       endTime: null,
//       totalCost: 0,
//     };

//     const newBooking = await BookingServices.createBookingInDB(bookingData);
//     res.status(200).json({
//       success: true,
//       statusCode: 200,
//       message: "Car booked successfully",
//       data: newBooking,
//     });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAllBookings = async (req: Request, res: Response) => {
//   try {
//     const { carId, date } = req.query;

//     if (!carId || !date) {
//       return res
//         .status(400)
//         .json({ message: "carId and date are required query parameters" });
//     }

//     const bookings = await BookingServices.getAllBookingsFromDB(
//       carId as string,
//       date as string
//     );
//     res.status(200).json({
//       success: true,
//       statusCode: 200,
//       message: "Bookings retrieved successfully",
//       data: bookings,
//     });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    // Fetch all bookings without any filters
    const bookings = await BookingServices.getAllBookingsFromDB();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const bookings = await BookingServices.getUserBookingsFromDB(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "My Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const returnCar = async (req: Request, res: Response) => {
  try {
    const { bookingId, endTime } = req.body;
    const updatedBooking = await BookingServices.returnCarInDB(
      bookingId,
      endTime
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Car returned successfully",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const modifyBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body;

    const updatedBooking = await BookingServices.modifyBookingInDB(
      bookingId,
      updateData
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const isDeleted = await BookingServices.deleteBookingInDB(bookingId);

    if (!isDeleted) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
  returnCar,
  modifyBooking,
  deleteBooking,
};

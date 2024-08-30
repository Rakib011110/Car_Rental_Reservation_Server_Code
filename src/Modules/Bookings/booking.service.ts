/* eslint-disable @typescript-eslint/no-explicit-any */
import Car from "../Car/car.model";
import Booking from "./booking.model";

export const createBookingInDB = async (bookingData: any) => {
  const newBooking = new Booking(bookingData);
  await (await (await newBooking.save()).populate("user")).populate("car");
  return newBooking;
};

// export const createBookingInDB = async (bookingData: TBooking) => {
//   const newBooking = new Booking(bookingData);
//   await newBooking.save();
//   return newBooking;
// };

// export const getAllBookingsFromDB = async (carId: string, date: string) => {
//   const bookings = await Booking.find({ car: carId, date })
//     .populate("user")
//     .populate("car");
//   return bookings;
// };

export const getAllBookingsFromDB = async () => {
  // Retrieve all bookings from the database and populate user and car details
  const bookings = await Booking.find({}).populate("user").populate("car");

  return bookings;
};

export const getUserBookingsFromDB = async (userId: string) => {
  const bookings = await Booking.find({ user: userId }).populate("car");
  return bookings;
};

export const returnCarInDB = async (bookingId: string, endTime: string) => {
  const booking = await Booking.findById(bookingId).populate("car");
  if (booking) {
    booking.endTime = endTime;
    const startTime = new Date(`1970-01-01T${booking.startTime}:00Z`);
    const endTimeDate = new Date(`1970-01-01T${endTime}:00Z`);
    const durationHours =
      (endTimeDate.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    booking.totalCost = durationHours * (booking.car as any).pricePerHour;
    await booking.save();
    await Car.updateOne({ _id: booking.car }, { status: "available" });
    return booking;
  }
  return null;
};

export const modifyBookingInDB = async (bookingId: string, updateData: any) => {
  const booking = await Booking.findByIdAndUpdate(bookingId, updateData, {
    new: true,
  })
    .populate("car")
    .populate("user");
  return booking;
};

export const deleteBookingInDB = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);
  if (booking) {
    await Booking.findByIdAndDelete(bookingId);
    await Car.updateOne({ _id: booking.car }, { status: "available" });
    return true;
  }
  return false;
};

export const BookingServices = {
  createBookingInDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  returnCarInDB,
  modifyBookingInDB,
  deleteBookingInDB,
};

import { isAdmin, isAuthenticated } from "../../app/auth/auth";
import { BookingController } from "./booking.controller";
import express from "express";

const router = express.Router();
router.post("/", isAuthenticated, BookingController.createBooking);
router.get("/", isAuthenticated, BookingController.getAllBookings);
router.get("/my-bookings", isAuthenticated, BookingController.getUserBookings);
router.put(
  "/cars/return",
  isAuthenticated,

  BookingController.returnCar
);
router.put("/:id", isAuthenticated, BookingController.modifyBooking);
router.delete("/:id", isAuthenticated, BookingController.deleteBooking);

export const BookingRoute = router;

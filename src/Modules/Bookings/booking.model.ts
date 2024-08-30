// import { Schema, model } from "mongoose";
// import { TBooking } from "./booking.interface";

// // const bookingSchema = new Schema<TBooking>(
// //   {
// //     date: { type: Date, required: true },
// //     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
// //     carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
// //     startTime: { type: String, required: true },
// //     endTime: { type: String },
// //     totalCost: { type: Number, default: 0 },
// //   },
// //   { timestamps: true }
// // );

// const bookingSchema = new Schema<TBooking>(
//   {
//     date: { type: Date, required: true },
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
//     startTime: { type: String, required: true },
//     endTime: { type: String },
//     totalCost: { type: Number, default: 0 },
//     fullName: { type: String, required: true }, // Added field
//     nidOrPassport: { type: String, required: true }, // Added field
//     drivingLicense: { type: String, required: true }, // Added field
//     pickUpDate: { type: Date, required: true }, // Added field
//     insurance: { type: Boolean, default: false }, // Added field
//     gps: { type: Boolean, default: false }, // Added field
//     childSeat: { type: Boolean, default: false }, // Added field
//   },
//   { timestamps: true }
// );

// const Booking = model<TBooking>("Booking", bookingSchema);
// export default Booking;

// // export const BookingACar = model<TACarBooking>(
// //   "BookingACar",
// //   bookingACarSchema
// // );
import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    totalCost: { type: Number, default: 0 },
    fullName: { type: String, required: true },
    nidOrPassport: { type: String, required: true },
    drivingLicense: { type: String, required: true },
    pickUpDate: { type: Date, required: true },
    insurance: { type: Boolean, default: false },
    gps: { type: Boolean, default: false },
    childSeat: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["approve", "cancel"],
    },
  },
  { timestamps: true }
);

const Booking = model<TBooking>("Booking", bookingSchema);
export default Booking;

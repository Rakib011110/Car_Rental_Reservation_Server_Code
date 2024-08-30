// import { Schema, Document } from "mongoose";

// // export interface TBooking extends Document {
// //   date: Date;
// //   user: Schema.Types.ObjectId;
// //   carId: Schema.Types.ObjectId;
// //   startTime: string;
// //   endTime: string;
// //   totalCost: number;
// // }

// // export type TACarBooking = {
// //   carId: Schema.Types.ObjectId;
// //   date: Date;
// //   startTime: string;
// // };
// // import { Document, Schema } from "mongoose";

// export interface TBooking extends Document {
//   date: Date;
//   user: Schema.Types.ObjectId;
//   car: Schema.Types.ObjectId;
//   startTime: string;
//   endTime: string;
//   totalCost: number;
//   fullName: string; // Added field
//   nidOrPassport: string; // Added field
//   drivingLicense: string; // Added field
//   pickUpDate: Date; // Added field
//   insurance: boolean; // Added field
//   gps: boolean; // Added field
//   childSeat: boolean; // Added field
// }

import { Document, Schema } from "mongoose";

export interface TBooking extends Document {
  date: Date;
  user: Schema.Types.ObjectId;
  car: Schema.Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
  fullName: string;
  nidOrPassport: string;
  drivingLicense: string;
  pickUpDate: Date;
  insurance: boolean;
  gps: boolean;
  childSeat: boolean;
  status?: "approve" | "cancel";
}

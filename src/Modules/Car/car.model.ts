import mongoose, { Schema } from "mongoose";
import { TCar } from "./car.interface";

const carSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    photoUrl: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Car = mongoose.model<TCar>("Car", carSchema);
export default Car;

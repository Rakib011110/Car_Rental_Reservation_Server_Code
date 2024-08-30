import { Router } from "express";
import { UserRoutes } from "../Modules/Users/user.router";
import { CarRoutes } from "../Modules/Car/car.router";
import { BookingRoute } from "../Modules/Bookings/booking.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
router.use("/users", UserRoutes);
export default router;

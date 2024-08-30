import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import catchAsynce from "../../utils/catchAsynce";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export const isAuthenticated = catchAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
);

export const isAdmin = catchAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
);

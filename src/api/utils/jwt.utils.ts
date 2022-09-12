import { sign } from "jsonwebtoken";

/**
 *
 * @param id the user Id
 * @returns JWT Token as string
 */
const generateTokenSecret = (id: string): string =>
  sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export { generateTokenSecret };

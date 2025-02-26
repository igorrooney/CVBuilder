import "server-only";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
  throw new Error("Missing JWT_SECRET_KEY environment variable.");
}

const encodedKey = new TextEncoder().encode(secretKey);

interface SessionPayload {
  [key: string]: unknown;
}

// Encrypt (sign) a JWT
export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// Decrypt (verify) a JWT
export async function decrypt(session: string | undefined) {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session", error);
    return null; // or throw error
  }
}

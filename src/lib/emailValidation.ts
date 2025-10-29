/**
 * Email validation utilities for domain-based access control
 */

export const MONDragon_DOMAIN = "mondragonmexico.edu.mx";

/**
 * Check if an email belongs to Mondragon University
 */
export function isMondragonEmail(email: string): boolean {
  if (!email) return false;
  // Client-side override for development/demo
  // Use NEXT_PUBLIC_ALLOW_ALL_EMAILS=true to bypass domain checks on the client
  // This should not be enabled in production
  if (typeof process !== "undefined" && (process as any).env?.NEXT_PUBLIC_ALLOW_ALL_EMAILS === 'true') {
    return true;
  }
  const emailLower = email.toLowerCase();
  return emailLower.endsWith("@mondragonmexico.edu.mx") || 
         emailLower.endsWith("@mondragon.edu.mx");
}

/**
 * Check if an email is allowed to access Microcredential app
 * Only Mondragon emails are allowed
 */
export function canAccessMicrocredential(email: string): boolean {
  return isMondragonEmail(email);
}

/**
 * Check if an email is allowed to access BIZEN app
 * Any email is allowed for BIZEN
 */
export function canAccessBIZEN(email: string): boolean {
  return !!email; // Any valid email
}

/**
 * Get the allowed apps for an email
 */
export function getAllowedApps(email: string): {
  microcredential: boolean;
  bizen: boolean;
} {
  const isMondragon = isMondragonEmail(email);
  return {
    microcredential: isMondragon,
    bizen: true, // Everyone can access BIZEN
  };
}

/**
 * Get user type based on email
 */
export function getUserType(email: string): "mondragon" | "public" {
  return isMondragonEmail(email) ? "mondragon" : "public";
}


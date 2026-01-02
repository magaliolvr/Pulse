/**
 * Extracts initials from a full name
 * 
 * @param name - Full name string
 * @param maxLength - Maximum number of initials to return (default: 2)
 * @returns Uppercase initials string
 * 
 * @example
 * getInitials("John Doe") // "JD"
 * getInitials("Maria Silva Santos") // "MS"
 */
export function getInitials(name: string, maxLength: number = 2): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, maxLength);
}

/**
 * Safely parses a string to integer with default fallback
 * 
 * @param value - String value to parse
 * @param defaultValue - Default value if parsing fails (default: 0)
 * @returns Parsed integer or default value
 */
export function parseIntSafe(value: string, defaultValue: number = 0): number {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Safely parses a string to float with default fallback
 * 
 * @param value - String value to parse
 * @param defaultValue - Default value if parsing fails (default: 0)
 * @returns Parsed float or default value
 */
export function parseFloatSafe(value: string, defaultValue: number = 0): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}


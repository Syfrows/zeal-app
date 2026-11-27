const namePattern = new RegExp("^\\p{L}[\\p{L}\\p{M}]*(?:[ .’'\\-]+[\\p{L}\\p{M}]+)*\\.?$", "u");

export function validName(value: string) {
  return namePattern.test(value.trim());
}

export function indianMobile(value: string) {
  const number = value.trim().replace(/[ ()-]/g, "").replace(/^\+91/, "");
  return /^[6-9]\d{9}$/.test(number) ? number : "";
}

export function validEmail(value: string) {
  return /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value.trim());
}

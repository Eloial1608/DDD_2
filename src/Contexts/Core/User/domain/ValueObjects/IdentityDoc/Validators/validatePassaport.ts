export function validatePassport(passport: string): void {
  if (!/^[A-Z0-9]{6,9}$/.test(passport)) {
    throw new Error('Invalid passport format');
  }
}
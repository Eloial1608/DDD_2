export function validateCif(cif: string): void {
  if (!/^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/.test(cif)) {
    throw new Error('Invalid CIF format');
  }

  const letter = cif.charAt(0);
  const numbers = cif.substring(1, 8);
  const control = cif.charAt(8);

  let sumEven = 0;
  let sumOdd = 0;

  for (let i = 0; i < numbers.length; i++) {
    const n = parseInt(numbers.charAt(i));

    if (i % 2 === 0) {
      const doubled = n * 2;
      sumOdd += Math.floor(doubled / 10) + (doubled % 10);
    } else {
      sumEven += n;
    }
  }

  const total = sumEven + sumOdd;
  const controlDigit = (10 - (total % 10)) % 10;
  const controlLetter = 'JABCDEFGHI'[controlDigit];

  const requiresDigit = 'ABEH'.includes(letter);
  const requiresLetter = 'KPQS'.includes(letter);

  if (
    (requiresDigit && control !== controlDigit.toString()) ||
    (requiresLetter && control !== controlLetter) ||
    (!requiresDigit &&
      !requiresLetter &&
      control !== controlDigit.toString() &&
      control !== controlLetter)
  ) {
    throw new Error('Invalid CIF checksum');
  }
}
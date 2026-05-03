const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';

export function validateNie(nie: string): void {
  if (!/^[XYZ]\d{7}[A-Z]$/.test(nie)) {
    throw new Error('Invalid NIE format');
  }

  const map: Record<string, string> = {
    X: '0',
    Y: '1',
    Z: '2',
  };

  const numericNie = map[nie.charAt(0)] + nie.substring(1, 8);

  const number = parseInt(numericNie);
  const letter = nie.charAt(8);

  const expectedLetter = DNI_LETTERS[number % 23];

  if (letter !== expectedLetter) {
    throw new Error('Invalid NIE checksum');
  }
}
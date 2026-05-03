import { InvalidDNIchecksum } from "@Core/User/domain/Errors/InvalidDNIchecksum";
import { InvalidDNIFormat } from "@Core/User/domain/Errors/InvalidDNIFormat";

const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';

export function validateDni(dni: string): void {

  
  if (!/^\d{8}[A-Z]$/.test(dni)) {
    throw new InvalidDNIFormat('Invalid DNI format');
  }

  const number = parseInt(dni.substring(0, 8));
  const letter = dni.charAt(8);

  const expectedLetter = DNI_LETTERS[number % 23];

  if (letter !== expectedLetter) {
    
    throw new InvalidDNIchecksum("Invalid Dni checksum");
  }

}
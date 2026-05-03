import { validateCif } from "./validateCif";
import { validateDni } from "./validateDni";
import { validateNie } from "./validateNie";
import { validatePassport } from "./validatePassaport";

type Validator = (value: string) => void;

export const identityDocValidators: Record<
  string,
  Validator
> = {
  dni: validateDni,
  nie: validateNie,
  cif: validateCif,
  passport: validatePassport,
};
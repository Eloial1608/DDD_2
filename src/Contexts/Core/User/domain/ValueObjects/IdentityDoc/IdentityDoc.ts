import { IdentityDocNumber } from "./IdentityDocNumber"
import { IdentityDocType } from "./IdentityDocType"
import { identityDocValidators } from "./Validators/identityDocValidatos";

export class IdentityDoc {
    constructor(
        readonly number: IdentityDocNumber,
        readonly type: IdentityDocType) {

            if (!number || !type) return;

            const normalized = IdentityDoc.normalize(type.valueOf());
            const validator = identityDocValidators[normalized];
            
            validator(number.valueOf());
        }

        private static normalize(value: string): string {
            return value.trim().toLowerCase();
        }
}
import { EnumValueObject } from "@Shared/domain/ValueObjects/EnumValueObject";

export enum Type {
    DNI = "dni",
    CIF = "cif",
    PASSPORT = "passport",
    NIE = "nie"
}

export class IdentityDocType extends EnumValueObject<Type> {
    constructor(value: Type) {
        console.log( value)
        super(value, Object.values(Type))
    }

    protected throwErrorForInvalidValue(value: Type): void {
        throw new Error("Method not implemented.");
    }

}
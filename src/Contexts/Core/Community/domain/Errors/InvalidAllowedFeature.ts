import { DomainError } from "@Shared/domain/Errors/DomainError";
import { AllowedFeature } from "../ValueObjects/AllowedFeatures";

export class InvalidAllowedFeature extends DomainError {
    protected code = 'invalid-allowed-feature'
    protected message

    constructor(feature: AllowedFeature) {
        super()
        this.message = `The feature ${feature.valueOf()} isn't valid`
    }
}
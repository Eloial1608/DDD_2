import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'

export class LayoutSection extends StringValueObject {}

export class Layout {
  constructor (
    readonly header: LayoutSection,
    readonly nav: LayoutSection,
    readonly footer: LayoutSection,
    readonly content: LayoutSection
  ) {}
}

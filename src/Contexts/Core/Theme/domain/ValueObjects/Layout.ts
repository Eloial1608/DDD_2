import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'

export class LayoutSection extends StringValueObject {}

export type LayoutType = {
  header: string
  nav: string
  footer: string
  content: string
}

export class Layout {
  constructor (
    readonly header: LayoutSection,
    readonly nav: LayoutSection,
    readonly footer: LayoutSection,
    readonly content: LayoutSection
  ) {}
}

import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import sanitizeHtml from 'sanitize-html'

export class Description extends StringValueObject {
  constructor (value: string) {
    super(
      sanitizeHtml(value, {
        allowedTags: ['b', 'i', 'p', 'em', 'strong', 'u', 'h2', 'img', 'video', 'ul', 'li', 'ol', 'a'],
        allowedAttributes: {
          img: ['src', 'alt'],
          a: ['href']
        }
      })
    )
  }
}

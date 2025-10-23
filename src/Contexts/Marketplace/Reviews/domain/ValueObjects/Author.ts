import { Nullable } from '@Shared/domain/Nullable'

export class Author {
  constructor (
        readonly id: string,
        readonly mainId: string,
        readonly name: string,
        readonly username: string,
        readonly pictureUrl: Nullable<string>,
        readonly bannerUrl: Nullable<string>
  ) {}

  toPrimitives () {
    return {
      id: this.id,
      mainId: this.mainId,
      name: this.name,
      username: this.username,
      pictureUrl: this.pictureUrl,
      bannerUrl: this.bannerUrl
    }
  }
}

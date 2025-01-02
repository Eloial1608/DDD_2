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
}

import { Product } from '@Marketplace/Products/domain/Product'
import { Author } from '@Marketplace/Products/domain/ValueObjects/Author'
import { CommunityId } from '@Marketplace/Products/domain/ValueObjects/CommunityId'
import { Content } from '@Marketplace/Products/domain/ValueObjects/Content'
import { CreatedAt } from '@Marketplace/Products/domain/ValueObjects/CreatedAt'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { Price } from '@Marketplace/Products/domain/ValueObjects/Price'
import { SpaceId } from '@Marketplace/Products/domain/ValueObjects/SpaceId'
import { Title } from '@Marketplace/Products/domain/ValueObjects/Title'
import { TotalRatings } from '@Marketplace/Products/domain/ValueObjects/TotalRatings'
import { ProductTypes, Type } from '@Marketplace/Products/domain/ValueObjects/Type'
import { UpdatedAt } from '@Marketplace/Products/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Marketplace/Products/domain/ValueObjects/UserId'
import { User } from '@Marketplace/User/domain/User'
import { MoneyValueObjectCurrency, MoneyValueObjectValue } from '@Shared/domain/ValueObjects/MoneyValueObject'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class ProductMother {
  static create (params: Partial<Product>): Product {
    return new Product(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.title ?? new Title(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.content ?? new Content(WordMother.random()),
      params.bannerUrl ?? null,
      params.type ?? new Type(ProductTypes.CODE),
      params.stock ?? null,
      params.author ?? new Author(
        UuidMother.random(),
        UuidMother.random(),
        WordMother.random(),
        SlugMother.random(),
        null,
        null
      ),
      params.price ?? new Price(
        new MoneyValueObjectValue(10),
        new MoneyValueObjectCurrency('USD')
      ),
      params.totalRatings ?? new TotalRatings(0),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Product {
    return this.create({})
  }

  static forAuthor (user: User): Product {
    return this.create({
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })
  }
}

import { Review } from '@Marketplace/Reviews/domain/Review'
import { ReviewRepository } from '@Marketplace/Reviews/domain/ReviewRepository'
import { Author } from '@Marketplace/Reviews/domain/ValueObjects/Author'
import { Content } from '@Marketplace/Reviews/domain/ValueObjects/Content'
import { Id } from '@Marketplace/Reviews/domain/ValueObjects/Id'
import { UserId } from '@Marketplace/Reviews/domain/ValueObjects/UserId'
import { ProductId } from '@Marketplace/Reviews/domain/ValueObjects/ProductId'
import { Rating } from '@Marketplace/Reviews/domain/ValueObjects/Rating'
import { FindUsersByCriteriaQuery } from '@Marketplace/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Marketplace/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindProductByIdQuery } from '@Marketplace/Products/application/FindById/FindProductByIdQuery'
import { ProductResponse } from '@Marketplace/Products/application/ProductResponse'

export class Creator {
  constructor (
        private readonly repository: ReviewRepository,
        private readonly eventBus: EventBus,
        private readonly queryBus: QueryBus
  ) {}

  async run (
    id: Id,
    productId: ProductId,
    userId: UserId,
    content: Nullable<Content>,
    rating: Rating
  ) {
    const review = await this.repository.find(id)

    if (review) return

    const product = await this.findProductById(productId)

    if (!product) return

    const user = await this.findUserByIdAndCommunityId(userId, product.communityId)

    if (!user) return

    const created = Review.create(
      id,
      productId,
      new Author(
        user.id,
        user.mainId,
        user.name,
        user.username,
        user.pictureUrl,
        user.bannerUrl
      ),
      content,
      rating,
      userId
    )

    await this.repository.persist(created)

    await this.eventBus.publish(created.pullDomainEvents())
  }

  private async findUserByIdAndCommunityId (id: UserId, communityId: string) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
  }

  private async findProductById (id: ProductId) {
    const query = new FindProductByIdQuery(id.valueOf())

    return (await this.queryBus.ask<ProductResponse>(query)).response
  }
}

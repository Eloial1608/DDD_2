import { Review } from "@Marketplace/Review/domain/Review";
import { Author } from "@Marketplace/Review/domain/ValueObjects/Author";
import { CreatedAt } from "@Marketplace/Review/domain/ValueObjects/CreatedAt";
import { Id } from "@Marketplace/Review/domain/ValueObjects/Id";
import { ProductId } from "@Marketplace/Review/domain/ValueObjects/ProductId";
import { Rating } from "@Marketplace/Review/domain/ValueObjects/Rating";
import { UserId } from "@Marketplace/Review/domain/ValueObjects/UserId";
import { User } from "@Marketplace/User/domain/User";
import { SlugMother } from "@Tests/Contexts/Shared/domain/SlugMother";
import { UuidMother } from "@Tests/Contexts/Shared/domain/UuidMother";
import { WordMother } from "@Tests/Contexts/Shared/domain/WordMother";

export class ReviewMother{
    static create(params: Partial<Review>): Review{
        return new Review(
         params.id ?? new Id(UuidMother.random()),
         params.productId  ?? new ProductId(UuidMother.random()),
         params.author ??  new Author(
                 UuidMother.random(),
                 UuidMother.random(),
                 WordMother.random(),
                 SlugMother.random(),
                 null,
                 null
               ),
         params.content ?? null,
         params.rating ?? new Rating(0), 
         params.userId ?? new UserId(UuidMother.random()),
         params.createdAt ?? new CreatedAt( new Date())
        )
    }

     static random (): Review {
        return this.create({})
      }
    
      static forAuthor (user: User): Review {
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
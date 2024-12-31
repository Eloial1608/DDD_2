import { Like } from "@Posts/Like/domain/Like";
import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer";
import { Id } from "@Posts/Like/domain/ValueObjects/Id";
import { PostId } from "@Posts/Like/domain/ValueObjects/PostId";
import { UserId } from "@Posts/Like/domain/ValueObjects/UserId";
import { CreatedAt } from "@Posts/Like/domain/ValueObjects/CreatedAt";
import { EntitySchema } from "typeorm";

export const LikeSchema = new EntitySchema<Like>({
    name: 'Like',
    target: Like,
    tableName: 'like',
    columns:{
        id:{
            type: String,
            primary: true,
            transformer: ValueObjectTransformer(Id)
        },
        postId:{
            type: String,
            transformer: ValueObjectTransformer(PostId)
        },
        userId:{
            type: String,
            transformer: ValueObjectTransformer(UserId)
        },
        createdAt:{
            type: Date,
            transformer: ValueObjectTransformer(CreatedAt)
        }
    },
    indices: [
        {
          name: 'IDX_LIKE_USER_ID',
          columns: ['userId']
        },
        {
            name: 'IDX_LIKE_POST_ID',
            columns: ['postId']
        }
      ]
})
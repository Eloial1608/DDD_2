import { Event } from '@Events/Event/domain/Event'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'
import { CreatedAt } from '@Events/Event/domain/ValueObjects/CreatedAt'
import { CommunityId } from '@Events/Event/domain/ValueObjects/CommunityId'
import { SpaceId } from '@Events/Event/domain/ValueObjects/SpaceId'
import { StartDate } from '@Events/Event/domain/ValueObjects/StartDate'
import { EndDate } from '@Events/Event/domain/ValueObjects/EndDate'
import { IsPrivate } from '@Events/Event/domain/ValueObjects/IsPrivate'
import { BannerUrl } from '@Events/Event/domain/ValueObjects/BannerUrl'
import { Author } from '@Events/Event/domain/ValueObjects/Author'
import { IsPaid } from '@Events/Event/domain/ValueObjects/IsPaid'
import { Type } from '@Events/Event/domain/ValueObjects/Type'
import { Data } from '@Events/Event/domain/ValueObjects/Data'
import { MaxOnlineMembers } from '@Events/Event/domain/ValueObjects/MaxOnlineMembers'
import { MaxOnSiteMembers } from '@Events/Event/domain/ValueObjects/MaxOnSiteMembers'
import { TotalOnlineMembers } from '@Events/Event/domain/ValueObjects/TotalOnlineMembers'
import { TotalOnSiteMembers } from '@Events/Event/domain/ValueObjects/TotalOnSiteMembers'
import { Location } from '@Events/Event/domain/ValueObjects/Location'
import { UpdatedAt } from '@Events/Event/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Events/Event/domain/ValueObjects/DeletedAt'
import { Accessibility } from '@Events/Event/domain/ValueObjects/Accessibility'

const EventAuthorSchema = new EntitySchema<Author>({
  name: 'eventAuthor',
  target: Author,
  columns: {
    id: {
      type: String
    },
    mainId: {
      type: String
    },
    name: {
      type: String
    },
    username: {
      type: String
    },
    pictureUrl: {
      type: String,
      nullable: true
    },
    bannerUrl: {
      type: String,
      nullable: true
    }
  }
})

const EventDataSchema = new EntitySchema<Data>({
  name: 'eventData',
  target: Data,
  columns: {
    url: {
      type: String,
      nullable: true
    },
    platform: {
      type: String,
      nullable: true
    }
  }
})

export const EventSchema = new EntitySchema<Event>({
  name: 'Event',
  target: Event,
  tableName: 'events',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    spaceId: {
      type: String,
      transformer: ValueObjectTransformer(SpaceId)
    },
    title: {
      type: String
    },
    description: {
      type: String,
      nullable: true
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    startDate: {
      type: Date,
      transformer: ValueObjectTransformer(StartDate)
    },
    endDate: {
      type: Date,
      transformer: ValueObjectTransformer(EndDate)
    },
    isPrivate: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsPrivate)
    },
    accessibility: {
      type: String,
      transformer: ValueObjectTransformer(Accessibility)
    },
    bannerUrl: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(BannerUrl)
    },
    isPaid: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsPaid)
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(Type)
    },
    maxOnlineMembers: {
      type: 'int',
      nullable: true,
      transformer: ValueObjectTransformer(MaxOnlineMembers)
    },
    maxOnSiteMembers: {
      type: 'int',
      transformer: ValueObjectTransformer(MaxOnSiteMembers)
    },
    totalOnlineMembers: {
      type: 'int',
      transformer: ValueObjectTransformer(TotalOnlineMembers)
    },
    totalOnSiteMembers: {
      type: 'int',
      transformer: ValueObjectTransformer(TotalOnSiteMembers)
    },
    location: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Location)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      nullable: true,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt)
    }
  },
  embeddeds: {
    author: {
      schema: EventAuthorSchema,
      prefix: 'author'
    },
    data: {
      schema: EventDataSchema,
      prefix: 'data'
    }
  },
  indices: [
    {
      name: 'IDX_EVENTS_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_EVENTS_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_EVENTS_SPACE_ID',
      columns: ['spaceId']
    },
    {
      name: 'IDX_EVENTS_START_DATE',
      columns: ['startDate']
    }
  ]
})

import { Event } from '@Events/Event/domain/Event'
import { CreatedAt } from '@Events/Event/domain/ValueObjects/CreatedAt'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'
import { CommunityId } from '@Events/Event/domain/ValueObjects/CommunityId'
import { SpaceId } from '@Events/Event/domain/ValueObjects/SpaceId'
import { Title } from '@Events/Event/domain/ValueObjects/Title'
import { Description } from '@Events/Event/domain/ValueObjects/Description'
import { StartDate } from '@Events/Event/domain/ValueObjects/StartDate'
import { EndDate } from '@Events/Event/domain/ValueObjects/EndDate'
import { IsPrivate } from '@Events/Event/domain/ValueObjects/IsPrivate'
import { BannerUrl } from '@Events/Event/domain/ValueObjects/BannerUrl'
import { Author } from '@Events/Event/domain/ValueObjects/Author'
import { IsPaid } from '@Events/Event/domain/ValueObjects/IsPaid'
import { EventTypes, Type } from '@Events/Event/domain/ValueObjects/Type'
import { Data, ValidPlatforms } from '@Events/Event/domain/ValueObjects/Data'
import { MaxOnlineMembers } from '@Events/Event/domain/ValueObjects/MaxOnlineMembers'
import { MaxOnSiteMembers } from '@Events/Event/domain/ValueObjects/MaxOnSiteMembers'
import { TotalOnlineMembers } from '@Events/Event/domain/ValueObjects/TotalOnlineMembers'
import { TotalOnSiteMembers } from '@Events/Event/domain/ValueObjects/TotalOnSiteMembers'
import { Location } from '@Events/Event/domain/ValueObjects/Location'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { Accessibility, EventAccessibilities } from '@Events/Event/domain/ValueObjects/Accessibility'
import { User } from '@Events/User/domain/User'

export class EventMother {
  static create (params: Partial<Event> = {}): Event {
    return new Event(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.title ?? new Title(WordMother.random()),
      params.description ?? new Description(MotherCreator.random().lorem.lines(3)),
      params.userId ?? new UserId(UuidMother.random()),
      params.startDate ?? new StartDate(new Date()),
      params.endDate ?? new EndDate(new Date()),
      params.isPrivate ?? new IsPrivate(false),
      params.accessibility ?? new Accessibility(EventAccessibilities.ONLINE),
      params.bannerUrl ?? new BannerUrl(MotherCreator.random().internet.url()),
      params.author ?? new Author(
        UuidMother.random(),
        UuidMother.random(),
        WordMother.random(),
        SlugMother.random(),
        null,
        null
      ),
      params.isPaid ?? new IsPaid(false),
      params.type ?? new Type(EventTypes.CALL),
      params.data ?? new Data(
        MotherCreator.random().internet.url(),
        ValidPlatforms.JITSI
      ),
      params.maxOnlineMembers ?? new MaxOnlineMembers(100),
      params.maxOnSiteMembers ?? new MaxOnSiteMembers(50),
      params.totalOnlineMembers ?? new TotalOnlineMembers(0),
      params.totalOnSiteMembers ?? new TotalOnSiteMembers(0),
      params.location ?? new Location(MotherCreator.random().location.direction()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new CreatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Event {
    return this.create({})
  }

  static forAuthor (user: User): Event {
    return this.create({
      userId: user.id,
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

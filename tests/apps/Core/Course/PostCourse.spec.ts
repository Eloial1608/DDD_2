import '@Apps/Course/env/loadEnv'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { test, expect } from '@playwright/test'
import { CourseMother } from '@Tests/Contexts/Course/Course/domain/CourseMother'
import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'

let arranger: EnvironmentArranger
let repository: CourseRepository

test.beforeAll(async () => {
  await DI.getInstance().initialize()
  arranger = await DI.getInstance().resolve<EnvironmentArranger>('Course.EnvironmentArranger')
  repository = await DI.getInstance().resolve<CourseRepository>('Course.Repository')
  await arranger.arrange()
})

test('POST Course', async ({ request }) => {
  const course = CourseMother.random()

  const r = await request.post(`/v1/courses/${course.id.valueOf()}`, {
    data: {
      communityId: course.communityId,
      spaceId: course.spaceId,
      title: course.title,
      bannerUrl: course.bannerUrl,
      isPaid: course.isPaid,
      price: course.price,
      startDate: course.startDate,
      endDate: course.endDate,
      maxStudents: course.maxStudents
    }
  })

  expect(r.status()).toEqual(201)
})

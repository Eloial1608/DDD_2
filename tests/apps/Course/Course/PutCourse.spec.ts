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

test('PUT Course', async ({ request }) => {
  const oldCourse = CourseMother.random()

  const newCourse = CourseMother.create({
    id: oldCourse.id
  })

  await repository.persist(oldCourse)

  const r = await request.put(`/v1/communities/${oldCourse.id.valueOf()}`, {
    data: {
      title: newCourse.title.valueOf(),
      bannerUrl: newCourse.bannerUrl?.valueOf(),
      isPaid: newCourse.isPaid.valueOf(),
      price: newCourse.price,
      startDate: newCourse.startDate.valueOf(),
      endDate: newCourse.endDate?.valueOf(),
      maxStudents: newCourse.maxStudents?.valueOf()
    }
  })

  expect(r.status()).toEqual(201)
})

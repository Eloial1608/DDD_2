// import '@Apps/Course/env/loadEnv'
// import DI from '@Apps/Course/dependencyInjection/DI'
// import { test, expect } from '@playwright/test'
// import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'
// import { CourseRepository } from '@Course/Course/domain/CourseRepository'
// import { CourseMother } from '@Tests/Contexts/Course/Course/domain/CourseMother'

// let arranger: EnvironmentArranger
// let repository: CourseRepository

// test.beforeAll(async () => {
//   await DI.getInstance().initialize()
//   arranger = await DI.getInstance().resolve<EnvironmentArranger>('Course.EnvironmentArranger')
//   repository = await DI.getInstance().resolve<CourseRepository>('Plan.Repository')
//   await arranger.arrange()
// })

// test('GET Course should return a Course', async ({ request }) => {
//   const course = CourseMother.random()

//   await repository.persist(course)

//   const r = await request.get(`/v1/courses/${course.id.valueOf()}`)

//   expect(r.ok()).toBeTruthy()
// })

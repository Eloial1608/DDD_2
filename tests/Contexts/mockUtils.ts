import { vitest, type VitestUtils } from 'vitest'
import {
  mock as VitestMock,
  type MockProxy,
  mockReset as VitestMockReset
} from 'vitest-mock-extended'

export const mock = <T>(): MockProxy<T> => VitestMock<T>() as MockProxy<T>

export const mockReset = (mockedClass: MockProxy<unknown>): void =>
  VitestMockReset(mockedClass) as void

export const resetAllMocks = (): VitestUtils => vitest.resetAllMocks()

export const mockFn = vitest.fn

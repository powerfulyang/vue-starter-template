import type { RequestHandler } from 'msw'
import { setupWorker } from 'msw/browser'

const modules: Record<
  string,
  {
    default: Array<RequestHandler>
  }
> = import.meta.glob('./**/*.ts', { eager: true })

export const handlers: RequestHandler[] = Object.entries(modules)
  .filter(([key]) => {
    return !key.includes('/_')
  })
  .map(([_, module]) => {
    return module.default
  })
  .flat()

export async function createWorker() {
  const worker = setupWorker(...handlers)
  await worker.start({ onUnhandledRequest: 'bypass' })
}

export async function setupMock() {
  await createWorker()
}

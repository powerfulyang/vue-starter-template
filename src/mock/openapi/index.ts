import type { RequestHandler } from 'msw'
import openapi from '#/openapi/source.json'
import { fromOpenApi } from '@mswjs/source/open-api'

const handles: RequestHandler[] = (await fromOpenApi(openapi))
  .filter(x => x.info.header !== 'POST /api/upload')

export default handles

import type { RequestHandler } from 'msw'
import openapi from '#/openapi/source.json'
import { fromOpenApi } from '@mswjs/source/open-api'

const handles: RequestHandler[] = await fromOpenApi(openapi)

export default handles

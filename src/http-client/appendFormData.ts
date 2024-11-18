import type { KyRequest } from 'ky'

export function appendFormData(
  body?: BodyInit | null,
) {
  let data = null
  if (body instanceof FormData) {
    data = body
  }

  return (request: KyRequest) => {
    Reflect.defineMetadata('formData', data, request)
  }
}

import type { Options } from 'ky'
import log from '@/log'
import { logRequest } from '@/log/logRequest'
import ky from 'ky'

const instance = ky.create({
  hooks: {
    beforeRequest: [
      async (request) => {
        const url = new URL(request.url)
        // method
        const method = request.method
        const requestUrl = `${url.origin}${url.pathname}`
        // params
        const params = url.searchParams
        // json
        const cloned = request.clone()
        const json = await cloned.json()
        logRequest({
          method,
          url: requestUrl,
          params,
          json,
        })
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        log.debug(`response: ok->${response.ok}`)
        return response
      },
    ],
  },
})

interface RequestOptions extends Options {
  notifyErrorMessage?: boolean
}

export async function request<T>(url: string, options?: RequestOptions): Promise<T> {
  const {
    notifyErrorMessage = true,
    ...restOptions
  } = options || {}
  try {
    const response = await instance(url, {
      ...restOptions,
    })
    const responseType = response.headers.get('content-type')
    if (!response.ok) {
      if (responseType?.includes('application/json')) {
        const json = await response.json<{ error: string }>()
        return Promise.reject(json.error)
      }
      return Promise.reject(new Error(`${response.statusText}`))
    }
    if (responseType?.includes('application/json')) {
      return response.json()
    }
    if (responseType?.includes('text/plain')) {
      return await response.text() as unknown as Promise<T>
    }
    if (responseType?.includes('application/octet-stream')) {
      return await response.blob() as unknown as Promise<T>
    }
    return response as unknown as Promise<T>
  }
  catch (e) {
    if (notifyErrorMessage) {
      // TODO: 错误信息提示
    }
    log.error(e)
    return Promise.reject(e)
  }
}

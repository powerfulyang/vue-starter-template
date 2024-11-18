import type { Options } from 'ky'
import { appendFormData } from '@/http-client/appendFormData'
import log from '@/log'
import { logRequest, logResponse } from '@/log/fetch'
import ky from 'ky'

const instance = ky.create({
  hooks: {
    beforeRequest: [
      async (_request) => {
        // TODO
      },
    ],
    afterResponse: [
      async (_request, _options, _response) => {
        // TODO
      },
    ],
  },
})

interface RequestOptions extends Options {
  notifyErrorMessage?: boolean
  debug?: boolean
}

export async function request<T>(url: string, options?: RequestOptions): Promise<T> {
  const {
    notifyErrorMessage = true,
    debug = false,
    ...restOptions
  } = options || {}

  try {
    const response = await instance(url, {
      ...restOptions,
      hooks: {
        beforeRequest: debug ? [appendFormData(restOptions.body), logRequest] : [],
        afterResponse: debug ? [logResponse] : [],
      },
    })
    const responseType = response.headers.get('content-type')
    if (!response.ok) {
      if (responseType?.includes('application/json')) {
        const json = await response.json<{ error: string }>()
        return Promise.reject(new Error(json.error))
      }
      return Promise.reject(new Error(response.statusText))
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

import type { Options } from 'ky'
import log from '@/log'
import ky from 'ky'
import { stringify } from 'qs'

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const url = new URL(request.url)
        log.debug(`request\n pathname:${url.pathname}\n query:${JSON.stringify(url.searchParams)}`)
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
  responseType?: 'json' | 'text' | 'blob'
  params?: Record<string, string | number>
  data?: Record<string, any>
  notifyErrorMessage?: boolean
}

export async function request<T>(url: string, options?: RequestOptions): Promise<T> {
  const {
    responseType = 'json',
    params,
    data,
    notifyErrorMessage = true,
    ...restOptions
  } = options || {}
  const requestUrl = params ? `${url}?${stringify(params)}` : url
  try {
    const response = await instance(requestUrl, {
      json: data,
      ...restOptions,
    })
    if (!response.ok) {
      if (response.headers.get('content-type')?.includes('application/json')) {
        const json = await response.json<{ error: string }>()
        return Promise.reject(json.error)
      }
      return Promise.reject(new Error(`${response.statusText}`))
    }
    if (responseType === 'json') {
      return response.json()
    }
    if (responseType === 'text') {
      return await response.text() as unknown as Promise<T>
    }
    if (responseType === 'blob') {
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

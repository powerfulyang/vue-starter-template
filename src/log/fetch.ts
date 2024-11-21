import type { KyRequest, KyResponse, NormalizedOptions } from 'ky'
import { getBase64 } from '@/utils/getBase64'
import { isEmpty, omit } from 'lodash-es'
import { parse } from 'qs'
import logger from '.'

export async function logRequest(
  request: KyRequest,
  options: NormalizedOptions,
) {
  Reflect.defineMetadata('startTime', performance.now(), options)
  const cloned = request.clone()
  const requestUrl = new URL(cloned.url)
  // method
  const method = cloned.method
  const url = `${requestUrl.origin}${requestUrl.pathname}`
  // headers
  const _headers = cloned.headers
  const contentType = _headers.get('content-type')
  const headers = omit(
    Object.fromEntries(_headers.entries()),
    'content-type',
  )
  // params
  const params = parse(requestUrl.searchParams.toString())
  // json body
  let json = {} as Record<string, any>
  if (contentType?.includes('application/json')) {
    json = await cloned.json()
  }

  console.groupCollapsed(
    `%c${method}%c 🌐 ${url}`,
    'color: #fff; background: #2ecc71; font-weight: bold; font-size: 10px; padding: 2px; border-radius: 2px;',
    'color: inherit; font-size: inherit;',
  )

  if (!isEmpty(headers)) {
    console.groupCollapsed(
      '%c📋 Request Headers %o',
      'color: #9b59b6; font-size: 11px',
      headers,
    )
    console.table(headers)
    console.groupEnd()
  }

  if (!isEmpty(params)) {
    console.groupCollapsed(
      '%c🔍 Request Params %o',
      'color: #e67e22; font-size: 11px',
      params,
    )
    console.table(params)
    console.groupEnd()
  }

  if (!isEmpty(json)) {
    console.groupCollapsed(
      `%c📦 Request Body %c${contentType} %o`,
      'color: #3498db; font-size: 11px',
      'background: #3498db; color: #fff; padding: 2px; border-radius: 2px; margin-left: 4px;',
      json,
    )
    console.table(json)
    console.groupEnd()
  }

  if (contentType?.includes('multipart/form-data')) {
    const data = await cloned.formData()
    console.groupCollapsed(
      `%c📦 Request Body %c${contentType} %o`,
      'color: #3498db; font-size: 11px',
      'background: #3498db; color: #fff; padding: 2px; border-radius: 2px; margin-left: 4px;',
      data,
    )

    for (const [key, value] of data.entries()) {
      if (value instanceof File) {
        // 文件转成 base64
        const dataURL = await getBase64(value)
        if (value.type.startsWith('image/')) {
          // 图片直接展示
          console.log(
            `%c${key} %c=> %c🖼️`,
            'color: #3498db',
            'color: inherit',
            'color: inherit',
          )
          logger.debug(
            '%c ',
            `
              padding: 100px 200px;
              background-image: url('${dataURL}');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            `,
          )
        }
        else {
          // 其他文件转成 url
          const url = URL.createObjectURL(value)
          console.log(
            `%c${key} %c=> %c${url}`,
            'color: #3498db',
            'color: inherit',
            'color: #fff; background: #2ecc71; padding: 2px; border-radius: 2px',
          )
        }
      }
      else {
        console.log(
          `%c${key} %c=> %c${value}`,
          'color: #3498db',
          'color: inherit',
          'color: #3498db',
        )
      }
    }
    console.groupEnd()
  }
  console.groupEnd()
}

export async function logResponse(
  request: KyRequest,
  options: NormalizedOptions,
  response: KyResponse,
) {
  const cloned = response.clone()
  const url = new URL(request.url)
  // headers
  const _headers = cloned.headers
  const contentType = _headers.get('content-type')
  const headers = omit(
    Object.fromEntries(_headers.entries()),
    'content-type',
  )
  const startTime = Reflect.getMetadata('startTime', options)
  const endTime = performance.now()
  const duration = (endTime - startTime).toFixed(0)

  console.groupCollapsed(
    `%c${response.status}%c %c⚡${duration}ms%c 🌐 ${url}`,
    `color: #fff; background: ${response.status >= 200 && response.status < 300 ? '#2ecc71' : '#e74c3c'}; font-weight: bold; font-size: 10px; padding: 2px; border-radius: 2px;`,
    'color: inherit',
    `color: #fff; background: ${Number(duration) > 1000 ? '#e74c3c' : '#2ecc71'}; font-size: 10px; padding: 2px; border-radius: 2px;`,
    'color: inherit',
  )

  if (!isEmpty(headers)) {
    console.groupCollapsed(
      '%c📋 Response Headers %o',
      'color: #9b59b6; font-size: 11px',
      headers,
    )
    console.table(headers)
    console.groupEnd()
  }

  let json = {}
  if (contentType?.includes('application/json')) {
    json = await cloned.json()
    if (!isEmpty(json)) {
      console.groupCollapsed(
        `%c📦 Response Body %c${contentType} %o`,
        'color: #3498db; font-size: 11px',
        'background: #3498db; color: #fff; padding: 2px; border-radius: 2px; margin-left: 4px;',
        json,
      )
      console.table(json)
      console.groupEnd()
    }
  }
  else if (contentType?.startsWith('image/')) {
    const dataURL = await getBase64(await cloned.blob())
    console.groupCollapsed(
      `%c📦 Response Body %c${contentType}`,
      'color: #3498db; font-size: 11px',
      'background: #3498db; color: #fff; padding: 2px; border-radius: 2px; margin-left: 4px;',
    )
    logger.debug(
      '%c ',
      `
        padding: 100px 200px;
        background-image: url('${dataURL}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `,
    )
    console.groupEnd()
  }
  else {
    const blob = await cloned.blob()
    const url = URL.createObjectURL(blob)
    console.groupCollapsed(
      `%c📦 Response Body %c${contentType} %c${url}`,
      'color: #3498db; font-size: 11px',
      'background: #3498db; color: #fff; padding: 2px; border-radius: 2px; margin-left: 4px;',
      'background: #2ecc71; color: #fff; padding: 2px; border-radius: 2px; margin-left: 4px;',
    )
    logger.debug(await blob.text())
    console.groupEnd()
  }
  console.groupEnd()
}

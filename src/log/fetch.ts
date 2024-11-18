import type { KyRequest, KyResponse, NormalizedOptions } from 'ky'
import { getBase64 } from '@/utils/getBase64'
import { isEmpty, omit } from 'lodash-es'
import { parse } from 'qs'
import tiza from 'tiza'
import logger from '.'

export async function logRequest(request: KyRequest) {
  const cloned = request.clone()
  const requestUrl = new URL(cloned.url)
  // method
  const method = cloned.method
  const url = `${requestUrl.origin}${requestUrl.pathname}`
  // headers
  const _headers = cloned.headers
  const contentType = _headers.get('content-type')
  _headers.delete('content-type')
  const headers = Object.fromEntries(_headers.entries())
  // params
  const params = parse(requestUrl.searchParams.toString())
  // json body
  let json = {} as Record<string, any>
  if (contentType?.includes('application/json')) {
    json = await cloned.json()
  }
  if (contentType?.includes('multipart/form-data')) {
    const data = Reflect.getMetadata('formData', request) as FormData
    for (const [key, value] of data.entries()) {
      if (value instanceof File) {
        // 文件转成 base64
        const dataURL = await getBase64(value)
        if (value.type.startsWith('image/')) {
          // 图片直接展示
          logger.debug(
            `%c${key}`,
            `padding: 100px 200px;
            background-image: url('${dataURL}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            `,
          )
        }
        else {
          // 其他文件转成 url
          json[key] = URL.createObjectURL(value)
        }
      }
      else {
        json[key] = value
      }
    }
  }

  let log = tiza
    .color('#fff')
    .bgColor('#2ecc71') // 使用清新的绿色作为方法背景
    .bold()
    .size(10)
    .style('padding: 2px; border-radius: 2px;')
    .text(`${method}`)
    .reset()
    .text(` 🌐 ${url}`)

  if (!isEmpty(headers)) {
    log = log
      .reset()
      .newline()
      .color('#9b59b6') // 使用优雅的紫色显示请求头
      .size(11)
      .text(`📋 Request Headers`)
      .newline()
      .text(JSON.stringify(headers, null, 2))
  }

  if (!isEmpty(params)) {
    log = log
      .reset()
      .newline()
      .color('#e67e22') // 使用温暖的橙色显示参数
      .size(11)
      .text(`🔍 Request Params`)
      .newline()
      .text(JSON.stringify(params, null, 2))
  }

  if (!isEmpty(json)) {
    log = log
      .reset()
      .newline()
      .color('#3498db') // 使用明亮的蓝色显示请求体
      .size(11)
      .text(`📦 Request Body`)
      .reset()
      .bgColor('#3498db')
      .color('#fff')
      .style('padding: 2px; border-radius: 2px; margin-left: 4px;')
      .text(`${contentType}`)
      .reset()
      .color('#3498db')
      .newline()
      .text(JSON.stringify(json, null, 2))
  }

  log.log()
}

export async function logResponse(
  request: KyRequest,
  _options: NormalizedOptions,
  response: KyResponse,
) {
  // await logRequest(request)
  const cloned = response.clone()
  const url = new URL(request.url)
  // headers
  const _headers = cloned.headers
  const contentType = _headers.get('content-type')
  const headers = omit(Object.fromEntries(_headers.entries()), 'content-type')
  let json = {}
  if (contentType?.includes('application/json')) {
    json = await cloned.json()
  }

  let log = tiza
    .color('#fff')
    .bgColor('#2ecc71') // 使用清新的绿色作为方法背景
    .bold()
    .size(10)
    .style('padding: 2px; border-radius: 2px;')
    .text(`${response.status}`)
    .reset()
    .text(` 🌐 ${url}`)

  if (!isEmpty(headers)) {
    log = log
      .reset()
      .newline()
      .color('#9b59b6') // 使用优雅的紫色显示请求头
      .size(11)
      .text(`📋 Response Headers`)
      .newline()
      .text(JSON.stringify(headers, null, 2))
  }

  if (!isEmpty(json)) {
    log = log
      .reset()
      .newline()
      .color('#3498db') // 使用明亮的蓝色显示请求体
      .size(11)
      .text(`📦 Response Body`)
      .reset()
      .bgColor('#3498db')
      .color('#fff')
      .style('padding: 2px; border-radius: 2px; margin-left: 4px;')
      .text(`${contentType}`)
      .reset()
      .color('#3498db')
      .newline()
      .text(JSON.stringify(json, null, 2))
  }

  log.log()
}

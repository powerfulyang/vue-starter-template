import tiza from 'tiza'

export function logRequest(options: {
  method: string
  url: string
  params?: Record<string, any>
  json?: unknown
  headers?: Record<string, any>
}) {
  const { method, url, params, json, headers } = options

  tiza
    .color('#fff')
    .bgColor('#09f')
    .bold()
    .size(20)
    .style('padding: 4px; border-radius: 2px;')
    .text(`${method}`)
    .reset()
    .text(` ${url}`)
    .log()
}

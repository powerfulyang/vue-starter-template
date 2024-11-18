import { http, HttpResponse } from 'msw'

export default [
  http.post('/api/upload', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return HttpResponse.arrayBuffer(
      new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      {
        headers: {
          'content-type': 'application/octet-stream',
        },
      },
    )
  }),
]

import { http, HttpResponse } from 'msw'

export default [
  http.post('/api/hello', async () => {
    await new Promise(resolve => setTimeout(resolve, 5000))
    return HttpResponse.json({
      message: 'Hello World',
    })
  }),
]

import { http, HttpResponse } from 'msw'

export default [
  http.post('/api/upload', async () => {
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 501) + 500))

    // 随机选择返回类型和状态码
    const types = ['json', 'text', 'image']
    const type = types[Math.floor(Math.random() * types.length)]
    const statusCodes = [200, 201, 400, 401, 403, 404, 500]
    const status = statusCodes[Math.floor(Math.random() * statusCodes.length)]

    switch (type) {
      case 'json':
        return HttpResponse.json({
          message: 'Hello from JSON!',
          timestamp: Date.now(),
        }, { status })

      case 'text':
        return new HttpResponse('Hello plain text!', {
          status,
          headers: {
            'Content-Type': 'text/plain',
          },
        })

      case 'image': {
        // 返回一个示例图片
        const imageResponse = await fetch('https://picsum.photos/200/300')
        const imageBlob = await imageResponse.blob()
        return new HttpResponse(imageBlob, {
          status,
          headers: {
            'Content-Type': 'image/jpeg',
          },
        })
      }

      default:
        return HttpResponse.json({
          message: 'Fallback response',
        }, { status })
    }
  }),
]

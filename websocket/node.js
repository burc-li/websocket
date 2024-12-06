/**
 * 启动命令： nodemon websocket/node.js
 */

import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const server = app.listen(3000)

const wss = new WebSocketServer({ server })

wss.on('connection', ws => {
  console.log('[服务器]：客官您来了~里边请')

  // 给客户端发送消息
  ws.send(`[websocket]您已经连接云端!数据推送中!`)

  let index = 1
  const interval = setInterval(() => {
    // 给客户端发送消息
    ws.send(`[websocket]数据推送第${index}次`)
    index++
  }, 1000 * 10)

  ws.on('message', data => {
     // 检查是否是 Buffer
     if (Buffer.isBuffer(data)) {
      // 可以将 Buffer 转为字符串或直接处理
      const decodedData = data.toString('utf-8');
      console.log('[服务器.message]', decodedData);
    } else {
      console.log('[服务器.message]:', data);
    }
  })

  ws.on('close', () => {
    clearInterval(interval) // 清除定时器
    console.log('[服务器]：客官下次再来呢~')
  })
})

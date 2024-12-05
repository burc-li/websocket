/**
 * 启动命令： nodemon websocketAPI/node.js
 */

import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const server = app.listen(3000)

const wss = new WebSocketServer({ server })


wss.on("connection", (ws) => {
  console.log("[服务器]：客官您来了~里边请");

  // 给客户端发送消息
  ws.send(`[websocket云端]您已经连接云端!数据推送中!`);

  let index = 1;
  const interval = setInterval(() => {
    // 给客户端发送消息
    ws.send(`[websocket]数据推送第${index}次`);
    index ++
  }, 1000 * 10);

  ws.on("close", () => {
    clearInterval(interval); // 清除定时器
    console.log("[服务器]：客官下次再来呢~");
  });
});



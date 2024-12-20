import Dispatcher from './eventDispatcher.js'

class WebSocketClient extends Dispatcher {
  // socket链接
  url = ''
  // socket实例
  socket = null
  // 重连次数
  reconnectAttempts = 0
  // 最大重连数
  maxReconnectAttempts = 5
  // 重连间隔
  reconnectInterval = 1000 * 10
  // 断网重连计时器id
  reconnectTimer = undefined
  // 正在重连
  reconnecting = false
  // 发送心跳数据间隔
  heartbeatInterval = 1000 * 30
  // 心跳检测计时器id
  heartbeatTimer = undefined
  // 彻底终止ws
  stopWs = false
  // 构造函数
  constructor(url) {
    super()
    this.url = url
  }

  // 生命周期钩子
  onopen(callBack) {
    this.addEventListener('open', callBack)
  }
  onmessage(callBack) {
    this.addEventListener('message', callBack)
  }
  onclose(callBack) {
    this.addEventListener('close', callBack)
  }
  onerror(callBack) {
    this.addEventListener('error', callBack)
  }

  // 消息发送
  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message)
    } else {
      console.error('[WebSocket] 未连接')
    }
  }

  // 初始化连接
  connect() {
    if (this.reconnectAttempts === 0) {
      console.log('WebSocket', `初始化连接中...         ${this.url}`)
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return
    }
    this.socket = new WebSocket(this.url)

    // websocket连接成功
    this.socket.onopen = event => {
      this.stopWs = false
      // 重置重连尝试成功连接
      this.reconnectAttempts = 0
      // 在连接成功时停止当前的心跳检测并重新启动
      this.startHeartbeat()
      console.log('WebSocket', `连接成功,等待服务端数据推送[onopen]...     ${this.url}`)
      this.dispatchEvent('open', event)
    }

    this.socket.onmessage = event => {
      this.dispatchEvent('message', event)
      this.startHeartbeat()
    }

    this.socket.onclose = event => {
      if (this.reconnectAttempts === 0) {
        console.log('WebSocket', `连接断开[onclose]...    ${this.url}`)
      }
      // 和服务端约定，code码若为1000，代表服务端主动关闭连接，不进行重连操作
      if (!this.stopWs && event.code !== 1000) {
        this.handleReconnect()
      }
      this.dispatchEvent('close', event)
    }

    this.socket.onerror = event => {
      if (this.reconnectAttempts === 0) {
        console.log('WebSocket', `连接异常[onerror]...    ${this.url}`)
      }
      this.handleReconnect()
      this.dispatchEvent('error', event)
    }
  }

  // 断网重连逻辑
  handleReconnect() {
    if(this.reconnecting) return 
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      this.reconnecting = true
      console.log('WebSocket', `尝试重连... (${this.reconnectAttempts}/${this.maxReconnectAttempts})       ${this.url}`)
      this.reconnectTimer = setTimeout(() => {
        this.connect()
        this.reconnecting = false
      }, this.reconnectInterval)
    } else {
      console.log('WebSocket', `最大重连失败，终止重连: ${this.url}`)
      this.close()
    }
  }

  // 关闭断网重连
  closeReconnect() {
    clearInterval(this.reconnectTimer)
    this.reconnectTimer = undefined
  }

  // 开始心跳检测 -> 定时发送心跳消息
  startHeartbeat() {
    if (this.stopWs) return
    if (this.heartbeatTimer) {
      this.closeHeartbeat()
    }
    this.heartbeatTimer = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: 'heartBeat', data: {} }))
        console.log('WebSocket', '送心跳数据...')
      } else {
        console.error('[WebSocket] 未连接')
      }
    }, this.heartbeatInterval)
  }

  // 关闭心跳
  closeHeartbeat() {
    clearInterval(this.heartbeatTimer)
    this.heartbeatTimer = undefined
  }

  // 关闭连接
  close() {
    if (this.socket) {
      this.stopWs = true
      this.socket.close()
      this.socket = null
      this.removeEventListener('open')
      this.removeEventListener('message')
      this.removeEventListener('close')
      this.removeEventListener('error')
    }
    this.closeReconnect()
    this.closeHeartbeat()
  }
}

export default WebSocketClient

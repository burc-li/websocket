class EventDispatcher {
  listeners = {}

  addEventListener(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    if (this.listeners[type].indexOf(listener) === -1) {
      this.listeners[type].push(listener)
    }
  }

  removeEventListener(type) {
    this.listeners[type] = []
  }

  dispatchEvent(type, ...args) {
    const listenerArray = this.listeners[type] || []
    if (listenerArray.length === 0) return
    listenerArray.forEach(listener => {
      listener.apply(this, args)
    })
  }
}

export default EventDispatcher

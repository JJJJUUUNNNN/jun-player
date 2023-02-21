export class EventEmitter {
  constructor () {
    this.events = {}
    this.nextGuid = -1
  }

  on (type, listener) {
    const events = this.events
    if (!Object.hasOwnProperty.call(events, type)) {
      events[type] = {}
    }

    const guid = 'uuid_' + ++this.nextGuid
    events[type][guid] = listener
    return this
  }

  once (type, listener) {
    function callback () {
      this.off(type, callback)
      Reflect.apply(listener, this, arguments)
    }
    this.on(type, callback)
    return this
  }

  off (type, listener) {
    const events = this.events
    if (!Object.hasOwnProperty.call(events, type)) {
      return false
    }

    const handlers = events[type]
    for (const [key, value] of Object.entries(handlers)) {
      if (Object.hasOwnProperty.call(handlers, key) && listener === value) {
        delete handlers[key]
        return true
      }
    }
    return false
  }

  emit (type, ...args) {
    const events = this.events
    const handlers = events[type]
    if (!handlers) return
    for (const listener of Object.values(handlers)) {
      Reflect.apply(listener, this, args)
    }
  }
}

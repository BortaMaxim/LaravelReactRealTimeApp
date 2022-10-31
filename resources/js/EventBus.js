class EventBus {
    constructor() {
        this.subscribers = []
    }

    on(event, func) {
        let findSubscribers = this.subscribers.find(sub => sub.event === event && sub.func.toString())
        if (findSubscribers) return
        this.subscribers.push({event, func})
    }

    emit(event) {
        for (let sub of this.subscribers) {
            if (sub.event === event)
                (sub.func)()
        }
    }
}

export default new EventBus

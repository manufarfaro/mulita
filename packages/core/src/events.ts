export type MulitaGenericDomElement = HTMLElement | Document | Window;

type EventListenerParams = {
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions
}

type EventCacheEntry = EventListenerParams & {
    domObject: MulitaGenericDomElement
} ;

export class EventManager {
    private readonly eventsCache: EventCacheEntry[] = [];

    public getRegisteredEvents(): EventCacheEntry[] {
        return this.eventsCache;
    }

    public getAttachedEvents(domObject: MulitaGenericDomElement): EventCacheEntry[] {
        return this.eventsCache.filter(event => event.domObject === domObject);
    }

    public attachEvent(
        domObject: MulitaGenericDomElement,
        eventListenerParams: EventListenerParams
    ): EventCacheEntry {
        this.eventsCache.push({ domObject, type: eventListenerParams.type, listener: eventListenerParams.listener, options: eventListenerParams.options });
        domObject.addEventListener(eventListenerParams.type, eventListenerParams.listener, eventListenerParams.options);

        return this.eventsCache.slice(-1)[0];
    }

    public cleanUpEvents(): void {
        for (const event of this.eventsCache) {
            event.domObject.removeEventListener(event.type, event.listener, event.options);
        }

        this.eventsCache.splice(0, this.eventsCache.length);
    }
    
    public removeAttachedEvent(domObject: MulitaGenericDomElement, type: string, listener: EventListener): void {
        for (let i = 0; i < this.eventsCache.length; i++) {
            const event = this.eventsCache[i];
            if (event.domObject === domObject && event.type === type && event.listener === listener) {
                domObject.removeEventListener(type, listener, event.options);
                this.eventsCache.splice(i, 1);
                break;
            }
        }
    }
}
import { Context } from "./context";
import { EventManager } from "./events";
import { Sender } from "./sender";

export enum MulitaEvents {
    Immediate,
    DOMContentLoaded,
    BeforeUnload
}

export interface IMulitaModule {
    name: string;
    priority: number;
    init: () => void;
    destroy: () => void;
    sender: Sender;
    context: Context;
    eventManager: EventManager;
    triggerEvents: MulitaEvents[];
}

export abstract class MulitaModule implements IMulitaModule {
    name: string = "GenericMulitaModule";
    priority: number = 0;
    sender: Sender;
    context: Context;
    eventManager: EventManager;
    triggerEvents: MulitaEvents[] = [MulitaEvents.DOMContentLoaded];
    
    constructor(sender: Sender, context: Context, eventManager: EventManager) {
        this.sender = sender;
        this.context = context;
        this.eventManager = eventManager;
    }

    abstract init(): void;
    abstract destroy(): void;
}

export type MulitaModuleConstructor = new (sender: Sender, context: Context, eventManager: EventManager) => IMulitaModule;

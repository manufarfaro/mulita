import { Context } from "./context";
import { EventManager } from "./events";
import { IMulitaModule, MulitaEvents, MulitaModule, MulitaModuleConstructor } from "./modules";
import { Sender } from "./sender";

export class MulitaLoader {
    private modules: { [key in MulitaEvents]: MulitaModule[] } = {
        [MulitaEvents.Immediate]: [],
        [MulitaEvents.DOMContentLoaded]: [],
        [MulitaEvents.BeforeUnload]: []
    };
    private sender: Sender;
    private context: Context;
    private eventManager: EventManager;
    
    constructor(sender: Sender, context: Context, eventManager: EventManager) {
        this.sender = sender;
        this.context = context;
        this.eventManager = eventManager;
    }

    public loadModules(enabledModules: MulitaModuleConstructor[]) {
        enabledModules
            .map((Module: MulitaModuleConstructor) => new Module(this.sender, this.context, this.eventManager))
            .sort((a: IMulitaModule, b: IMulitaModule) => a.priority - b.priority)
            .forEach((module: IMulitaModule) => {
                for (const triggerEvent of module.triggerEvents) {
                    this.modules[triggerEvent].push(module);
                }
            })
    }

    public init() {
        this.sendInitSignal();
        // IMMEDIATE
        console.log(`MulitaEvents.Immediate`);
        for (const module of this.modules[MulitaEvents.Immediate]) {
            console.log(`Initializing ${module.name}...`)
            module.init();
        }

        // DOMContentLoaded
        this.context.getWindow().addEventListener('DOMContentLoaded', () => {
            console.log(`MulitaEvents.DOMContentLoaded`);
            for (const module of this.modules[MulitaEvents.DOMContentLoaded]) {
                console.log(`Initializing ${module.name}...`)
                module.init();
            }
        });
        
        // BeforeUnload
        this.context.getWindow().addEventListener('beforeunload', (event: BeforeUnloadEvent) => {
            console.log(`MulitaEvents.BeforeUnload`);
            this.destroyModules();
            this.sendEOSSignal();

            this.eventManager.cleanUpEvents();
        });
    }

    private destroyModules() {
        for (const modules of Object.values(this.modules)) {
            for(const module of modules) {
                console.log(`Destroying ${module.name}...`);
                module.destroy();
            }
        }
    }

    private sendInitSignal() {
        this.sender.send({ init: true });
    }
    private sendEOSSignal() {
        this.sender.send({ eos: true });
    }
}

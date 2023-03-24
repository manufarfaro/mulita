import { MulitaConfig } from "./config";

export class Context {
    private readonly window: Window;
    private readonly config: MulitaConfig;

    constructor(config: MulitaConfig, window: Window) {
        this.config = config;
        this.window = window;
    }

    public getWindow(): Window {
        return this.window;
    }

    public getConfig(): MulitaConfig {
        return this.config;
    }
}
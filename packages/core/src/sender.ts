import { MulitaConfig } from "./config";

export enum SendStrategy {
    BEACON,
    CONSOLE
}

export class Sender {
    private config: MulitaConfig;
    private strategy: SendStrategy;

    constructor(config: MulitaConfig, strategy: SendStrategy = SendStrategy.BEACON) {
        this.config = config;
        this.strategy = strategy;
    }

    private sendBeacon(data: string) : boolean {
        const blob = new Blob([data], { type: 'text/plain; charset=UTF-8' });
        return navigator.sendBeacon(this.config.getServerConfig().url, blob);

    }

    private sendConsole(data: string) : boolean {
        console.log(`Mulita | Send: ${data}`);
        return true;
    }

    public sendRaw(data: any): boolean {
        switch (this.strategy) {
            case SendStrategy.CONSOLE:
                return this.sendConsole(data);

            default:
                return this.sendBeacon(data);
        }
    }

    public send(data: any): boolean {
        const payload = JSON.stringify({ id: this.config.getSessionId(), data: data });
        return this.sendRaw(payload);
    }
}

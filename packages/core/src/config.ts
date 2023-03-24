type MulitaServerConfig = {
    url: string;
}

type MulitaConfigParams = {
    serverConfig: MulitaServerConfig;
    sessionId: string;
}

export class MulitaConfig {
    private readonly serverConfig: MulitaServerConfig;
    private readonly sessionId: string;

    constructor(mulitaConfigParams: MulitaConfigParams) {
        this.serverConfig = mulitaConfigParams.serverConfig;
        this.sessionId = mulitaConfigParams.sessionId;
    }

    public getSessionId() {
        return this.sessionId;
    }

    public getServerConfig() {
        return this.serverConfig;
    }
}
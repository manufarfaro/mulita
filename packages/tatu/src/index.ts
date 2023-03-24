import { Sender, Context, SendStrategy, EventManager, MulitaLoader, MulitaConfig } from "@manufarfaro/mulita-core";
import { enabledModules } from "./modules";

// All config will come from server; Will be injected into file
const fakeSessionId = `AEs000${Math.floor(Math.random() * 99) + 1}`;

// const config = {}; // This will be filled at build-time
const config = new MulitaConfig({ sessionId: fakeSessionId, serverConfig: { url: "http://localhost:3000" } });
const sender = new Sender(config, SendStrategy.BEACON);
const context = new Context(config, window);
const eventManager = new EventManager();

const loader = new MulitaLoader(sender, context, eventManager);
loader.loadModules(enabledModules);
loader.init();

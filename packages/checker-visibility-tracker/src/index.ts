import {
  MulitaModule,
  Sender,
  MulitaEvents,
  Context,
  EventManager
} from "@manufarfaro/mulita-core";

export class VisibilityTracker extends MulitaModule {
  public name = "VisibilityTracker";
  public priority = 0;
  public triggerEvents = [MulitaEvents.Immediate];

  constructor(sender: Sender, context: Context, eventManager: EventManager) {
    super(sender, context, eventManager);
  }

  public init(): void {
    const documentEl = this.context.getWindow().document;

    this.eventManager.attachEvent(
      documentEl, {
        type: 'visibilitychange',
        listener: () => { this.sender.send({ [this.name]: { status: documentEl.visibilityState, time: Date.now() }}) }
      }
    );

  }

  public destroy(): void { }
}

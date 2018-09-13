import { Listeners } from "./Listeners";

export interface HttpServerConfiguration {
  app: any,
  httpPort: string|number,
  listeners: Listeners
}

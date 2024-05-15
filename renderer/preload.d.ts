import { IpcHandler, Platform } from '../main/preload'

declare global {
  interface Window {
    ipc: IpcHandler
    platform: Platform
  }
}

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import is from 'electron-is'

const handler = {
    send(channel: string, value: unknown) {
        ipcRenderer.send(channel, value)
    },
    on(channel: string, callback: (...args: unknown[]) => void) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
            callback(...args)
        ipcRenderer.on(channel, subscription)
        
        return () => {
            ipcRenderer.removeListener(channel, subscription)
        }
    },
    platform: {
        isWin: process.platform === "win32",
        isMac: process.platform === "darwin"
    }
}

contextBridge.exposeInMainWorld('ipc', handler)

export type IpcHandler = typeof handler

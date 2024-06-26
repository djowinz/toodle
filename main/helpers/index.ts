import os from 'os';

const isMac = os.platform() === "darwin";
const isWindows = os.platform() === "win32";
const isLinux = os.platform() === "linux";

export const platform = {
    isMac,
    isWindows,
    isLinux
}
export * from './create-window'
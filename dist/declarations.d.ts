interface Ethereum {
    send: unknown;
    enable: () => Promise<string[]>;
    on?: (method: string, listener: (...args: any[]) => void) => void;
    removeListener?: (method: string, listener: (...args: any[]) => void) => void;
}
interface Coin98 {
    provider: Ethereum;
}
declare interface Window {
    coin98: Coin98;
}
declare const __DEV__: boolean;

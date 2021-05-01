/// <reference types="node" />
declare module 'pumpify' {
    import { Stream, Duplex } from 'stream';
    const obj: (...streams: Stream[]) => Duplex;
}

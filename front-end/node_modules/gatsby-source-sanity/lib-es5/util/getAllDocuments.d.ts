/// <reference types="node" />
import { Stream } from 'stream';
export declare function getAllDocuments(url: string, token?: string, options?: {
    includeDrafts?: boolean;
}): Promise<Stream>;

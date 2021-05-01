export declare const pluginPrefix = "gatsby-source-sanity";
export declare function prefixId(id: string): string;
declare enum ReporterLevel {
    Error = "ERROR"
}
declare enum ReporterCategory {
    User = "USER",
    ThirdParty = "THIRD_PARTY",
    System = "SYSTEM"
}
export declare const ERROR_CODES: {
    UnsupportedGatsbyVersion: string;
    SchemaFetchError: string;
    MissingProjectId: string;
    MissingDataset: string;
    InvalidToken: string;
    ExpiredToken: string;
    WrongProjectToken: string;
};
export declare const ERROR_MAP: {
    [x: string]: {
        text: (context: any) => any;
        level: ReporterLevel;
        category: ReporterCategory;
    };
};
export declare const SANITY_ERROR_CODE_MAP: Record<string, string>;
export declare const SANITY_ERROR_CODE_MESSAGES: Record<string, string>;
export declare class ErrorWithCode extends Error {
    code?: string | number;
    constructor(message: string, code?: string | number);
}
export {};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorWithCode = exports.SANITY_ERROR_CODE_MESSAGES = exports.SANITY_ERROR_CODE_MAP = exports.ERROR_MAP = exports.ERROR_CODES = exports.prefixId = exports.pluginPrefix = void 0;
exports.pluginPrefix = 'gatsby-source-sanity';
function prefixId(id) {
    return `${exports.pluginPrefix}_${id}`;
}
exports.prefixId = prefixId;
var ReporterLevel;
(function (ReporterLevel) {
    ReporterLevel["Error"] = "ERROR";
})(ReporterLevel || (ReporterLevel = {}));
var ReporterCategory;
(function (ReporterCategory) {
    // Error caused by user (typically, site misconfiguration)
    ReporterCategory["User"] = "USER";
    // Error caused by Sanity plugin ("third party" relative to Gatsby Cloud)
    ReporterCategory["ThirdParty"] = "THIRD_PARTY";
    // Error caused by Gatsby process
    ReporterCategory["System"] = "SYSTEM";
})(ReporterCategory || (ReporterCategory = {}));
exports.ERROR_CODES = {
    UnsupportedGatsbyVersion: '10000',
    SchemaFetchError: '10001',
    MissingProjectId: '10002',
    MissingDataset: '10002',
    InvalidToken: '10003',
    ExpiredToken: '10004',
    WrongProjectToken: '10005',
};
exports.ERROR_MAP = {
    [exports.ERROR_CODES.UnsupportedGatsbyVersion]: {
        text: (context) => context.sourceMessage,
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    [exports.ERROR_CODES.SchemaFetchError]: {
        text: (context) => context.sourceMessage,
        level: ReporterLevel.Error,
        category: ReporterCategory.ThirdParty,
    },
    [exports.ERROR_CODES.MissingProjectId]: {
        text: (context) => context.sourceMessage,
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    [exports.ERROR_CODES.MissingDataset]: {
        text: (context) => context.sourceMessage,
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    [exports.ERROR_CODES.InvalidToken]: {
        text: (context) => context.sourceMessage,
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    [exports.ERROR_CODES.ExpiredToken]: {
        text: (context) => context.sourceMessage,
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    [exports.ERROR_CODES.WrongProjectToken]: {
        text: (context) => context.sourceMessage,
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
};
// Map Sanity API errors to plugin errors
exports.SANITY_ERROR_CODE_MAP = {
    'SIO-401-ANF': exports.ERROR_CODES.InvalidToken,
    'SIO-401-AWH': exports.ERROR_CODES.WrongProjectToken,
    'SIO-401-AEX': exports.ERROR_CODES.ExpiredToken,
};
exports.SANITY_ERROR_CODE_MESSAGES = {
    'SIO-401-ANF': 'The token specified is not valid or has been deleted',
    'SIO-401-AWH': 'The token specified does not belong to the configured project',
    'SIO-401-AEX': 'The token specified is expired - use API tokens instead of user tokens to prevent this from happening',
};
class ErrorWithCode extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.ErrorWithCode = ErrorWithCode;
//# sourceMappingURL=errors.js.map
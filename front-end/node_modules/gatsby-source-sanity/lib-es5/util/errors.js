"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorWithCode = exports.SANITY_ERROR_CODE_MESSAGES = exports.SANITY_ERROR_CODE_MAP = exports.ERROR_MAP = exports.ERROR_CODES = exports.prefixId = exports.pluginPrefix = void 0;
exports.pluginPrefix = 'gatsby-source-sanity';
function prefixId(id) {
    return exports.pluginPrefix + "_" + id;
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
exports.ERROR_MAP = (_a = {},
    _a[exports.ERROR_CODES.UnsupportedGatsbyVersion] = {
        text: function (context) { return context.sourceMessage; },
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    _a[exports.ERROR_CODES.SchemaFetchError] = {
        text: function (context) { return context.sourceMessage; },
        level: ReporterLevel.Error,
        category: ReporterCategory.ThirdParty,
    },
    _a[exports.ERROR_CODES.MissingProjectId] = {
        text: function (context) { return context.sourceMessage; },
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    _a[exports.ERROR_CODES.MissingDataset] = {
        text: function (context) { return context.sourceMessage; },
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    _a[exports.ERROR_CODES.InvalidToken] = {
        text: function (context) { return context.sourceMessage; },
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    _a[exports.ERROR_CODES.ExpiredToken] = {
        text: function (context) { return context.sourceMessage; },
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    _a[exports.ERROR_CODES.WrongProjectToken] = {
        text: function (context) { return context.sourceMessage; },
        level: ReporterLevel.Error,
        category: ReporterCategory.User,
    },
    _a);
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
var ErrorWithCode = /** @class */ (function (_super) {
    __extends(ErrorWithCode, _super);
    function ErrorWithCode(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return ErrorWithCode;
}(Error));
exports.ErrorWithCode = ErrorWithCode;
//# sourceMappingURL=errors.js.map
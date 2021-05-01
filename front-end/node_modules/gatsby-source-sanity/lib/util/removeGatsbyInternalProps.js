"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGatsbyInternalProps = void 0;
// Gatsby mutates (...tm) the `internal` object, adding `owner`.
// This function helps "clean" the internal representation if we are readding/reusing the node
const removeGatsbyInternalProps = (node) => {
    if (!node || typeof node.internal === 'undefined') {
        return node;
    }
    const { mediaType, type, contentDigest } = node.internal;
    return Object.assign(Object.assign({}, node), { internal: {
            mediaType,
            type,
            contentDigest,
        } });
};
exports.removeGatsbyInternalProps = removeGatsbyInternalProps;
//# sourceMappingURL=removeGatsbyInternalProps.js.map
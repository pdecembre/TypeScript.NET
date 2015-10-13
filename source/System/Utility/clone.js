/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require", "exports", '../Types'], function (require, exports, Types_1) {
    function clone(source, depth) {
        if (depth === void 0) { depth = 0; }
        if (depth < 0)
            return source;
        switch (typeof source) {
            case Types_1.default.UNDEFINED:
            case Types_1.default.NULL:
            case Types_1.default.STRING:
            case Types_1.default.BOOLEAN:
            case Types_1.default.NUMBER:
            case Types_1.default.FUNCTION:
                return source;
        }
        var result;
        if (source instanceof Array) {
            result = source.slice();
            if (depth > 0) {
                for (var i = 0; i < result.length; i++) {
                    result[i] = clone(result[i], depth - 1);
                }
            }
        }
        else {
            result = {};
            if (depth > 0)
                for (var k in source) {
                    result[k] = clone(source[k], depth - 1);
                }
        }
        return result;
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = clone;
});
//# sourceMappingURL=clone.js.map
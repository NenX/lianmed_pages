"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var Result_1 = __importDefault(require("./Result"));
var Setting_1 = __importDefault(require("./Setting"));
var CTGChart_1 = __importDefault(require("./CTGChart"));
var utils_1 = require("@lianmed/utils");
var request_1 = __importDefault(require("@lianmed/request"));
var useCtgData_1 = __importDefault(require("./useCtgData"));
exports.Context = react_1.default.createContext({});
var border = { border: '1px solid #ddd' };
function Analysis(_a) {
    var _b = _a.docid, docid = _b === void 0 ? '1_1112_160415144057' : _b;
    var ctgData = useCtgData_1.default(docid)[0];
    var v = react_1.useMemo(function () {
        return {};
    }, []);
    var _c = react_1.useState(1), fetal = _c[0], setFetal = _c[1];
    var submit = function () {
        var data = { note: docid };
        utils_1.event.emit('analysis:result', function (result) {
            Object.assign(data, { result: result });
        });
        utils_1.event.emit('analysis:diagnosis', function (diagnosis) {
            Object.assign(data, { diagnosis: diagnosis });
        });
        console.log(data);
        request_1.default.put("/ctg-exams-note", { data: data });
    };
    return (react_1.default.createElement(exports.Context.Provider, { value: v },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', height: '100%' } },
            react_1.default.createElement("div", { style: { flex: 1, padding: 24, marginBottom: 24, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px' } },
                react_1.default.createElement(CTGChart_1.default, { ctgData: ctgData })),
            react_1.default.createElement("div", { style: { height: 420 } },
                react_1.default.createElement(antd_1.Row, { gutter: 24, style: { height: '100%' } },
                    react_1.default.createElement(antd_1.Col, { span: 12, style: { height: '100%' } },
                        react_1.default.createElement(Result_1.default, { fetal: fetal, setFetal: setFetal, ctgData: ctgData, docid: docid, v: v, style: __assign(__assign({}, border), { height: '100%', background: '#fff' }) })),
                    react_1.default.createElement(antd_1.Col, { span: 12, style: { height: '100%' } },
                        react_1.default.createElement(Setting_1.default, { fetal: fetal, style: __assign(__assign({}, border), { height: '100%', background: '#fff' }) }),
                        react_1.default.createElement(antd_1.Button, { style: { position: 'absolute', right: 24, bottom: 16 }, type: "primary", onClick: submit }, "\u4FDD\u5B58")))))));
}
exports.default = Analysis;

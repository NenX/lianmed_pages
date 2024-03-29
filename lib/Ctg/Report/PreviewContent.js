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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_pdf_1 = require("react-pdf");
var antd_1 = require("antd");
require("react-pdf/dist/Page/AnnotationLayer.css");
var PreviewContent = function (props) {
    var pdfBase64 = props.pdfBase64;
    var _a = react_1.useState(false), isFullpage = _a[0], setFullpage = _a[1];
    var _b = react_1.useState(200), height = _b[0], setHeight = _b[1];
    var _c = react_1.useState('100%'), width = _c[0], setWidth = _c[1];
    var _d = react_1.useState(0), numPages = _d[0], setNumPages = _d[1];
    var _e = react_1.useState(1), pageNumber = _e[0], setPageNumber = _e[1];
    var onDocumentLoad = react_1.useCallback(function (_a) {
        var numPages = _a.numPages;
        setNumPages(numPages);
    }, []);
    var onChangePage = react_1.useCallback(function (page) { setPageNumber(page); }, []);
    var largen = function () {
        var _a = props.wh, h = _a.h, w = _a.w;
        setFullpage(true);
        setHeight(h - 24);
        setWidth(w);
    };
    var shrink = function () {
        setFullpage(false);
        setHeight(200);
        setWidth('100%');
    };
    var content = pdfBase64 ? (react_1.default.createElement("div", { style: __assign({ width: width }, (isFullpage ? {
            position: 'absolute',
            top: 0,
            left: 0,
            background: '#fff'
        } : {})) },
        react_1.default.createElement(react_pdf_1.Document, { loading: react_1.default.createElement(antd_1.Spin, { style: { margin: '120px 0' } }), onLoadSuccess: onDocumentLoad, file: pdfBase64, renderMode: "canvas", options: {
                cMapUrl: 'cmaps/',
                cMapPacked: true,
            } },
            react_1.default.createElement(react_pdf_1.Page, { pageNumber: pageNumber, scale: 1, height: height })),
        react_1.default.createElement(antd_1.Pagination, { total: numPages, showTotal: function (total) { return "\u5171 " + total + " \u9875"; }, current: pageNumber, pageSize: 1, size: "small", onChange: onChangePage }),
        isFullpage ? (react_1.default.createElement("span", { style: { position: 'absolute', top: 24, right: 24, cursor: 'pointer' }, onClick: shrink },
            "\u8FD4\u56DE",
            react_1.default.createElement(antd_1.Icon, { title: "\u7F29\u5C0F", type: "fullscreen-exit" }))) : (react_1.default.createElement("span", { style: { position: 'absolute', bottom: 36, right: 12, } },
            react_1.default.createElement(antd_1.Button, { title: "\u5168\u5C4F", type: "primary", onClick: largen }, "\u653E\u5927\u9884\u89C8"))))) : (react_1.default.createElement(antd_1.Empty, { style: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', margin: 0 } }));
    return (react_1.default.createElement("div", { style: {
            position: 'relative',
            flex: 1,
            background: '#fff',
            marginRight: 12,
            zIndex: 99,
            border: '1px solid #eee',
        } }, content));
};
exports.default = PreviewContent;

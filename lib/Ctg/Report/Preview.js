"use strict";
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
var index_1 = require("./index");
var request_1 = __importDefault(require("@lianmed/request"));
var usePrintConfig_1 = __importDefault(require("./usePrintConfig"));
var useSign_1 = __importDefault(require("./useSign"));
var PreviewContent_1 = __importDefault(require("./PreviewContent"));
var COEFFICIENT = 240;
var Preview = function (props) {
    var onDownload = props.onDownload, docid = props.docid, name = props.name, age = props.age, gestationalWeek = props.gestationalWeek, inpatientNO = props.inpatientNO, startdate = props.startdate, fetalcount = props.fetalcount, print_interval = props.print_interval, wh = props.wh;
    var _a = react_1.useState({ suit: null }), value = _a[0], setValue = _a[1];
    var _b = react_1.useState('观察      分钟，胎心基线     bpm，胎动    次，胎动时胎心    bpm,持续时间     s，胎心振幅范围            bpm  NST   反应。 '), diagnosis = _b[0], setDiagnosis = _b[1];
    var _c = react_1.useState(''), pdfBase64 = _c[0], setPdfBase64 = _c[1];
    var _d = react_1.useState(false), pdfBase64Loading = _d[0], setPdfBase64Loading = _d[1];
    var _e = usePrintConfig_1.default(value, print_interval), startingTime = _e.startingTime, endingTime = _e.endingTime, locking = _e.locking, customizable = _e.customizable, toggleLocking = _e.toggleLocking, toggleCustomiz = _e.toggleCustomiz;
    var _f = useSign_1.default(docid, setPdfBase64), signHandler = _f.signHandler, qrCodeBase64 = _f.qrCodeBase64, modalVisible = _f.modalVisible, qrCodeBase64Loading = _f.qrCodeBase64Loading, setModalVisible = _f.setModalVisible;
    var handlePreview = function () {
        setPdfBase64Loading(true);
        request_1.default.post("/ctg-exams-pdf", {
            data: {
                name: name, age: age, gestationalWeek: gestationalWeek, inpatientNO: inpatientNO, startdate: startdate, fetalcount: fetalcount,
                docid: docid,
                diagnosis: diagnosis,
                start: startingTime,
                end: endingTime,
            },
        }).then(function (res) {
            setPdfBase64Loading(false);
            var pdfData = res.pdfdata && "data:application/pdf;base64," + res.pdfdata;
            setPdfBase64(pdfData);
        });
    };
    return (react_1.default.createElement(index_1.Context.Consumer, null, function (v) {
        setValue(v);
        return (react_1.default.createElement("div", { style: { display: 'flex', height: '100%' } },
            react_1.default.createElement(PreviewContent_1.default, { pdfBase64: pdfBase64, wh: wh }),
            react_1.default.createElement("div", { style: { border: '1px solid #eee', width: 400, marginRight: 10, display: 'flex', flexDirection: 'column' } },
                react_1.default.createElement("label", null, "NST\u62A5\u544A\u7ED3\u679C"),
                react_1.default.createElement(antd_1.Input.TextArea, { value: diagnosis, style: { height: '100%', border: 0 }, onChange: function (e) { return setDiagnosis(e.target.value); } })),
            react_1.default.createElement("div", { style: { width: 300, padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', border: '1px solid #eee' } },
                react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                    react_1.default.createElement("span", null,
                        "\u5F00\u59CB\u65F6\u95F4\uFF1A",
                        (startingTime / COEFFICIENT).toFixed(1),
                        "\u5206"),
                    react_1.default.createElement(antd_1.Button, { type: locking ? 'danger' : 'primary', onClick: toggleLocking, size: "small" }, locking ? '重置' : '确定')),
                react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                    react_1.default.createElement("span", null,
                        "\u7ED3\u675F\u65F6\u95F4\uFF1A",
                        (endingTime / COEFFICIENT).toFixed(1),
                        "\u5206"),
                    locking && (react_1.default.createElement(antd_1.Button, { type: customizable ? 'danger' : 'primary', onClick: toggleCustomiz, size: "small" }, customizable ? '取消' : '选择'))),
                react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                    react_1.default.createElement("span", null,
                        "\u65F6\u957F\uFF1A",
                        ((endingTime - startingTime) / COEFFICIENT).toFixed(1) || 0,
                        "\u5206")),
                react_1.default.createElement("div", { style: { display: 'flex' } },
                    react_1.default.createElement(antd_1.Button, { block: true, disabled: !locking, type: "primary", loading: pdfBase64Loading, onClick: handlePreview, style: { marginRight: 10 } }, "\u751F\u6210"),
                    react_1.default.createElement(antd_1.Button, { block: true, disabled: !pdfBase64, type: "primary", loading: qrCodeBase64Loading, onClick: signHandler, style: { marginRight: 10 } }, "\u7B7E\u540D"),
                    react_1.default.createElement(antd_1.Button, { block: true, disabled: !pdfBase64, type: "primary", onClick: onDownload }, "\u6253\u5370"))),
            react_1.default.createElement(antd_1.Modal, { visible: modalVisible, footer: null, centered: true, onCancel: function () { return setModalVisible(false); }, bodyStyle: { textAlign: 'center' } },
                react_1.default.createElement("img", { alt: "qrcode", src: qrCodeBase64 }))));
    }));
};
exports.default = Preview;

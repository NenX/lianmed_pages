"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var request_1 = __importDefault(require("@lianmed/request"));
var antd_1 = require("antd");
exports.default = (function (docid, setPdfBase64) {
    var _a = react_1.useState(''), qrCodeBase64 = _a[0], setQrCodeBase64 = _a[1];
    var _b = react_1.useState(false), qrCodeBase64Loading = _b[0], setQrCodeBase64Loading = _b[1];
    var _c = react_1.useState(false), modalVisible = _c[0], setModalVisible = _c[1];
    react_1.useEffect(function () {
    }, []);
    var signHandler = function () {
        setQrCodeBase64Loading(true);
        request_1.default.post('/ca/signreq', {
            data: {
                action: "sign",
                docid: docid
            }
        }).then(function (r) {
            setQrCodeBase64(r && r.data);
            setModalVisible(true);
            setQrCodeBase64Loading(false);
        }).catch(function (r) {
            setModalVisible(true);
            setQrCodeBase64Loading(false);
            setQrCodeBase64('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAADj0lEQVR42u1bQa7rMAhE8gFyJF/dR/IBLPHNDOC8Lr7e8sk0qqo0mWSBYICBiv7+WPIFf8F/Hix29CXS7LyvZ+wbbYo82nTsKzoN0WqAN0Zn3xf3rY1Zz/4p9ohdlH2+T+zxIuApbW7TddhqH2Pj90ceO9lviFcVApuVzG22/wwznf10q7Z6YDOdmMPQfwSW3O60LKwqgcM++wT+Y1fsXLYBO8EfMXgxmIZq8z+fT36+GOy5FkbbkcVoQgKy+Gqw20fuvhhsZkHy5SM7lEA19C7LRODeUQWMdLNvLdrK7Gb+s7w4Eb6kFQEbmZiJQCyddkuyZf3WXo50N9gqNFQgAIjz7aMMKHybLxUBi7BA7VG9v8LKc5PFXREwCGSgPmEN34FnCh54ych0fD24oUxlUkYLg0fQ3An9ypgnvO52sCDFWPhMr82E/R1NGpzcaoDZ4VIBoOkaDYj6bYFvk3KvB5NUQSMUQxSWpDsp40ueDKvbwcG6KYawMmFqBl70pOPLwSxFmG5IvKaHeHBBGXi0Engwjkg1AqNZ3kH56gqJSBEwG5nGjAxz6SlWB/EwbAmwujQk0fYOPycDM+iicL0e3JTpWCJ8SLBOwgskDNsWAavzrTtVDCAe5x/qA1oEzK7WidefItuw/W8kohpgefKWemHmxCtRxjMHlQBTBmk6jjTkxAK8K8yjFQGLzxeYg7z9Z70KWeBHOr4eTKbFhCWmkz1syLqlZ1hdD0b+7R5ELM+mj7PR+P8c6N8OpjSU7S2nt6o+tBWv8EerAeaI1rV0uA25l4+resujNcAImRGs0l/S+oCIKhCITljdDV7o7FISWVGkpWz4FtivB1NOhwFTIRw+lQPPsLVpNcDoZyVMx1wzuAATohDawBrg09lFOtbIQbEMw2qtBFhDBmkpjKD5XWd8ObLFux5MndB1IfUNB5fZAfMFoRpgYfhMyfWG0Mc4ZVAXEmuAo8mNXRevUjqpJmhHWw0wR7SSMrLnX9+dC8o9pdrd4CU9s0yuvpzFBnY6r/b/bjDTMU1HsqWKGPJyf8uGBcBHRl6x40G+ReuXM/0S4Fyn1Nwy9S6PC7dZ5JcAc9uHCqH3uTlw4bTuJRveD47JrPcvMzo7X4tyyUiLgZmGuE36kg07NwyLgQdX4yiGrCDbs4pcBJz/0fA1j7F8HHMqWM2NstvB/meNPB4u/4wjG8onP18M/v7n8Qu+BvwPjRxbcMI8bggAAAAASUVORK5CYII=');
        });
    };
    var info = antd_1.message.info;
    var fetchSigninfo = function () {
        request_1.default.post('/ca/signinfo', {
            data: {
                bizSn: docid
            }
        }).then(function (_a) {
            var ret = _a.ret, data = _a.data;
            if (ret === '1') {
                setModalVisible(false);
                if (data) {
                    info('签名成功');
                    setPdfBase64("data:application/pdf;base64," + data);
                }
                else {
                    info('签名失败');
                }
            }
        }).catch(function (err) {
            setModalVisible(false);
            setPdfBase64('data:application/pdf;base64,MIIC5zCCAougAwIBAgIQUsqwhEGq%2BiSmMg0IjxOSyTAMBggqgRzPVQGDdQUAMDQxCzAJBgNVBAYTAkNOMREwDwYDVQQKDAhVbmlUcnVzdDESMBAGA1UEAwwJU0hFQ0EgU00yMB4XDTE5MTExMTA4NDAxNloXDTIwMTExMTE1NTk1OVowITELMAkGA1UEBgwCQ04xEjAQBgNVBAMMCeWIkeWFtueOujBZMBMGByqGSM49AgEGCCqBHM9VAYItA0IABI4EBbh9o0KIPYbsjHqr1eA0iY%2Ft7j%2BOAZi%2FPRyW9iIgceRvnhPTOXyART3hJ0%2Fl97w6Inm8rn7KoN7xLz26FSCjggGOMIIBijAiBgNVHSMBAf8EGDAWgBSJMQSRe0Oqqpq%2FhB2bhu7wuHCZoDAgBgNVHQ4BAf8EFgQUKUOAb0Uqe8x3FnF%2FOpqPOYci9MEwDgYDVR0PAQH%2FBAQDAgeAMCkGCCqBHIbvOoEUBB0xMDFANTAwOFNGMDM3MDY4MTE5ODkxMDI1NDgxMDAkBgUqVhUBAQQbMUA1MDA4U0YwMzcwNjgxMTk4OTEwMjU0ODEwMIHgBgNVHR8EgdgwgdUwgZmggZaggZOGgZBsZGFwOi8vbGRhcDIuc2hlY2EuY29tOjM4OS9jbj1DUkwxNzAuY3JsLG91PVJBMjAxNjEwMTIsb3U9Q0E5MSxvdT1jcmwsbz1VbmlUcnVzdD9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0P2Jhc2U%2Fb2JqZWN0Q2xhc3M9Y1JMRGlzdHJpYnV0aW9uUG9pbnQwN6A1oDOGMWh0dHA6Ly9sZGFwMi5zZWhjYS5jb20vQ0E5MS9SQTIwMTYxMDEyL0NSTDE3MC5jcmwwDAYIKoEcz1UBg3UFAANIADBFAiBog14UH02iXnZZB7eCFWoBA10i%2FsCtDBZuz3WSu9LfyAIhALrZdTadwXDaZ2L0L8XDjyvk4lpoCiDlDoLdiEmMWLcl');
            info('签名成功');
        });
    };
    react_1.useEffect(function () {
        var timeoutId = modalVisible && setInterval(fetchSigninfo, 1500);
        return function () {
            timeoutId && clearInterval(timeoutId);
        };
    }, [modalVisible]);
    return {
        signHandler: signHandler, qrCodeBase64: qrCodeBase64, modalVisible: modalVisible, setModalVisible: setModalVisible, qrCodeBase64Loading: qrCodeBase64Loading
    };
});

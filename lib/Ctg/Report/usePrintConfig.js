"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var COEFFICIENT = 240;
exports.default = (function (value, print_interval) {
    var _a = react_1.useState(0), startingTime = _a[0], setStartingTime = _a[1];
    var _b = react_1.useState(0), endingTime = _b[0], setEndingTime = _b[1];
    var _c = react_1.useState(false), locking = _c[0], setLocking = _c[1];
    var _d = react_1.useState(false), customizable = _d[0], setCustomizable = _d[1];
    react_1.useEffect(function () {
        var cb = function (startingTime) {
            setStartingTime(startingTime);
            setEndingTime(startingTime + print_interval * COEFFICIENT);
        };
        var cbe = function (endingTime) {
            console.log('cb');
            setEndingTime(endingTime);
        };
        value.suit && value.suit.on('startTime', cb).on('endTime', cbe);
        return function () {
            value.suit && value.suit.off('startTime', cb).off('endTime', cb);
        };
    }, [value]);
    var toggleLocking = function () {
        var nextV = !locking;
        setLocking(nextV);
        value.suit.emit('locking', nextV);
    };
    var toggleCustomiz = function () {
        var nextV = !customizable;
        setCustomizable(nextV);
        value.suit.emit('customizing', nextV);
    };
    var remoteSetStartingTime = react_1.useCallback(function (v) {
        setStartingTime(v);
        value.suit.emit('setStartingTime', v);
    }, [value]);
    var remoteSetEndingTime = react_1.useCallback(function (v) {
        setEndingTime(v);
        value.suit.emit('setEndingTime', v);
    }, [value]);
    return {
        startingTime: startingTime,
        endingTime: endingTime,
        locking: locking,
        customizable: customizable,
        remoteSetStartingTime: remoteSetStartingTime,
        remoteSetEndingTime: remoteSetEndingTime,
        toggleLocking: toggleLocking,
        toggleCustomiz: toggleCustomiz
    };
});

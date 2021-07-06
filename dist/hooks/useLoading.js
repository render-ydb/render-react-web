import { useState, useEffect } from "react";
export default (function (loading) {
    var timer = null;
    var _a = useState(loading), loadingVisible = _a[0], setLoaingVisible = _a[1];
    useEffect(function () {
        if (typeof loading !== 'boolean') {
            timer = setTimeout(function () {
                setLoaingVisible(false);
            }, loading === null || loading === void 0 ? void 0 : loading.delay);
        }
        else {
            setLoaingVisible(loading);
        }
        return function () {
            if (typeof loading !== 'boolean') {
                clearTimeout(timer);
            }
        };
    }, [loading]);
    return loadingVisible;
});

import { useState, useEffect } from "react";

export default (loading: boolean | { delay: number }) => {
    let timer: any = null;
    const [loadingVisible, setLoaingVisible] = useState(loading);
    useEffect(() => {
        if (typeof loading !== 'boolean') {
            timer = setTimeout(() => {
                setLoaingVisible(false)
            }, loading?.delay);
        } else {
            setLoaingVisible(loading)
        }
        return () => {
            if (typeof loading !== 'boolean') {
                clearTimeout(timer)
            }
        }

    }, [loading]);
    return loadingVisible
}


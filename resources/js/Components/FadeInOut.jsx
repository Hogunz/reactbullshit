import React, { useState, useEffect } from "react";

const FadeInOut = ({ show, duration, children, className, style }) => {
    const UNMOUNTED = "unmounted";
    const EXITED = "exited";
    const ENTERING = "entering";
    const ENTERED = "entered";
    const EXITING = "exiting";

    const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };

    const [status, setStatus] = useState(show ? ENTERED : EXITED);

    useEffect(() => {
        let nextStatus = null;
        if (show) {
            if (status !== ENTERING && status !== ENTERED) {
                nextStatus = ENTERING;
            }
        } else {
            if (status === ENTERING || status === ENTERED) {
                nextStatus = EXITING;
            }
        }
        updateStatus(nextStatus);
    }, [show]);

    const updateStatus = (nextStatus) => {
        if (nextStatus !== null) {
            if (nextStatus === ENTERING) {
                performEnter();
            } else {
                performExit();
            }
        } else if (status === EXITED) {
            setStatus(UNMOUNTED);
        }
    };

    const performEnter = () => {
        setStatus(ENTERING);
        setTimeout(() => {
            setStatus(ENTERED);
        }, 0);
    };

    const performExit = () => {
        setTimeout(() => {
            setStatus(EXITED);
        }, duration);
    };

    return (
        <div
            className={className}
            style={{
                ...style,
                transition: `opacity ${duration}ms ease-in-out`,
                opacity: status === ENTERED ? 1 : 0,
                ...transitionStyles[status],
            }}
        >
            {children}
        </div>
    );
};

FadeInOut.defaultProps = {
    show: false,
    duration: 700,
};

export default FadeInOut;

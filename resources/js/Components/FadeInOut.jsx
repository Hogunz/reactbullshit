import React, { useState, useEffect, useRef } from "react";

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

    const [testimonialStatus, setTestimonialStatus] = useState(
        show ? ENTERED : EXITED
    );
    const [imageStatus, setImageStatus] = useState(show ? EXITED : ENTERED);
    const exitTimeoutRef = useRef(null);

    const performEnter = (setType) => {
        setTestimonialStatus(ENTERING);
        setTimeout(() => {
            setTestimonialStatus(ENTERED);
        }, duration);
    };

    const performExit = () => {
        if (
            testimonialStatus === testimonialStatus ||
            imageStatus === imageStatus
        ) {
            exitTimeoutRef.current = setTimeout(() => {
                setTestimonialStatus(EXITED);
            }, duration);
        }
    };

    const updateStatus = (nextTestimonialStatus, nextImageStatus) => {
        performExit();
        if (nextTestimonialStatus !== null && nextImageStatus !== null) {
            performEnter();
        }
    };
    useEffect(() => {
        let nextTestimonialStatus = null;
        let nextImageStatus = null;
        if (show) {
            if (
                testimonialStatus !== ENTERING &&
                testimonialStatus !== ENTERED
            ) {
                nextTestimonialStatus = ENTERING;
            }
            if (imageStatus !== ENTERING && imageStatus !== ENTERED) {
                nextImageStatus = ENTERING;
            }
        } else {
            nextTestimonialStatus = EXITING;
            nextImageStatus = EXITING;
        }
        updateStatus(nextTestimonialStatus, nextImageStatus);

        return () => {
            clearTimeout(exitTimeoutRef.current);
        };
    }, [show, testimonialStatus, imageStatus, duration]);

    return (
        <div
            className={className}
            style={{
                ...style,
                transition: `opacity ${duration}ms ease-in-out`,
                opacity: testimonialStatus === ENTERED ? 1 : 0,
                ...transitionStyles[testimonialStatus],
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

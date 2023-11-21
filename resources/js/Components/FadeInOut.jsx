import React, { useState, useEffect } from "react";

const FadeInOut = ({ show, duration, children, className, style }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        let timeout;
        if (show) {
            setOpacity(0); // Reset opacity when showing
            timeout = setTimeout(() => {
                setOpacity(1); // Fade in
            }, 50); // Small delay to trigger the transition
        } else {
            setOpacity(0); // Fade out immediately when hiding
        }

        return () => clearTimeout(timeout);
    }, [show]);

    return (
        <div
            className={className}
            style={{
                ...style,
                transition: `opacity ${duration}ms ease-in-out`,
                opacity: opacity,
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

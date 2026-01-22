import React, { useState, useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";

export default function CustomCursor() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            // Check if screen is large enough (lg breakpoint is usually 1024px)
            // And try to detect if it's not a touch device (optional but good)
            const isLargeScreen = window.innerWidth >= 1024;
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // Show only if large screen and preferably not touch (hybrid devices might be tricky, but size is a good proxy for "mobile view")
            setIsDesktop(isLargeScreen && !isTouch);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    if (!isDesktop) return null;

    return (
        <AnimatedCursor
            innerSize={8}
            outerSize={8}
            color="193, 11, 111" //this is the purple one: 99, 48, 125
            outerAlpha={0.2}
            innerScale={0.7}
            outerScale={5}
            clickables={[
                "a",
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                "label[for]",
                "select",
                "textarea",
                "button",
                ".link",
                {
                    target: ".custom",
                    options: {
                        innerSize: 12,
                        outerSize: 12,
                        color: "255, 255, 255",
                        outerAlpha: 0.3,
                        innerScale: 0.7,
                        outerScale: 5,
                    },
                },
            ]}
        />
    );
}

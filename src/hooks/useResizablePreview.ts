import { useState, useCallback } from "react";

export default function useResizablePreview(
    initialWidth = 800,
    min = 100,
    max = 1000
) {

    const [previewWidth, setPreviewWidth] = useState(initialWidth);

    const startResize = useCallback(() => {

        const handleMouseMove = (e: MouseEvent) => {

            const newWidth = Math.min(
                Math.max(window.innerWidth - e.clientX, min),
                max
            );

            setPreviewWidth(newWidth);
        };

        const stopResize = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", stopResize);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", stopResize);

    }, [min, max]);

    return { previewWidth, startResize };
}
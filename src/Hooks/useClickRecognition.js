import { useEffect } from "react";

export default function ClickRecognition(exitProductHandle, pointRef) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (pointRef.current && !pointRef.current.contains(event.target)) {
                exitProductHandle()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [pointRef]);
}
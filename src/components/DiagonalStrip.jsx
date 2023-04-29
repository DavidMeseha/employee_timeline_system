const DiagonalStrip = () => {
    return (
        <>
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="pinstripe" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
                        <line x1="5" y="0" x2="5" y2="50" stroke="#c1c1c1" strokeWidth="2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pinstripe)" />
            </svg>
        </>
    )
};
export default DiagonalStrip;
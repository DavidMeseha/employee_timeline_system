const InputTextBox = ({ type, value, onChange, title, required, ref }) => {
    return (
        <>
            <div className="wrap-title">
                <h4>{title}</h4>
                <input type={type} value={value} ref={ref || null} onChange={onChange} required={required} />
            </div>
        </>
    )
};
export default InputTextBox;
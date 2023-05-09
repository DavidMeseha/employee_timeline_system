const InputTextBox = ({ type, value, onChange, title, required }) => {
    return (
        <>
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <div className="wrap-title">
                    <h4>{title}</h4>
                    <input type={type} value={value} onChange={onChange} required={required} step={type === 'time' ? 300 : 1} />
                </div>
            </div>
        </>
    )
};
export default InputTextBox;
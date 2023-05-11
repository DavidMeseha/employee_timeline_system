import TimePickerInput from "./TimePickerInput";

const InputTextBox = ({ type, value, setValue, onChange, title, required }) => {
    return (
        <>
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <div className="wrap-title">
                    <h4>{title}</h4>
                    {
                        type !== 'time' ? <input type={type} value={value} onChange={onChange} required={required} step={type === 'time' ? 300 : 1} ></input>
                            : <TimePickerInput time={value} setTime={setValue} onChange={onChange} />
                    }
                </div>
            </div>
        </>
    )
};
export default InputTextBox;
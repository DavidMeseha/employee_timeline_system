const CheckBox = ({onChange, refFn, value, name}) => {
    return (
        <label className='check-box'> {name}
            <input type='checkbox' ref={refFn} onChange={onChange} value={value} />
            <span className="check-mark"></span>
        </label>
    )
};

export default CheckBox;
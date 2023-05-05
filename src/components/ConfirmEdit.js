const ConfirmEdit = ({ confirm, cancel }) => {
    return (
        <>
            <div className="confirm-edit-container">
                <p>Confirm Appointment Edit ?</p>
                <div>
                    <button onClick={confirm}>Confirm</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
            </div>
        </>
    )
};
export default ConfirmEdit;
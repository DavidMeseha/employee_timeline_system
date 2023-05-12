const ConfirmEdit = ({ confirm, cancel, deleteAppointment }) => {
    return (
        <>
            <div className="confirm-edit-container">
                <p>Confirm Appointment Edit ?</p>
                <div>
                    <button onClick={confirm}>Confirm</button>
                    <button onClick={cancel}>Cancel</button>
                    <button onClick={deleteAppointment}>Delete</button>
                </div>
            </div>
        </>
    )
};
export default ConfirmEdit;
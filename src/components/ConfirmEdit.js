const ConfirmEdit = ({ confirm, cancel, deleteAppointment, confirmRef, action }) => {
    return (
        <>
            <div ref={confirmRef} className="confirm-edit-container">
                <p>{action || 'Confirm Appointment Edit'} ?</p>
                <div>
                    {confirm && <button onClick={confirm}>Confirm</button>}
                    {cancel && <button onClick={cancel}>Cancel</button>}
                    {deleteAppointment && <button onClick={deleteAppointment}>Delete</button>}
                </div>
            </div >
        </>
    )
};
export default ConfirmEdit;
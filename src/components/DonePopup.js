import { Done as DoneIcon } from "./Icons";

const DonePopup = ({ action }) => {
    return (
        <div className="on-done-icon">
            <div className='icon'><DoneIcon /></div>
            <div style={{ color: 'white' }} ><h1>{action} Created</h1></div>
        </div>
    );
};
export default DonePopup;
const CustomerCard = ({ name, phone }) => {
    return (
        <div className="customer-card">
            <div className="customer-card-tag">{name ? name[0] : ''}</div>
            <div>
                <h3 style={{ color: "yellow" }}>{name || ''}</h3>
                <p>{phone || ''}</p>
            </div>
        </div>
    )
};
export default CustomerCard;
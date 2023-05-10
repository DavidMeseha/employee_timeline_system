const Card = ({ head, sup }) => {
    return (
        <div className="customer-card">
            <div className="customer-card-tag">{head[0]}</div>
            <div>
                <h3 style={{ color: "yellow" }}>{head}</h3>
                <p>{sup}</p>
            </div>
        </div>
    )
};
export default Card;
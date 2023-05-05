const Test = ({editEmployeeDatesView}) => {
    let start = new Date()
    let end = new Date()
    return (
        <>
            <button style={{zIndex:10, width:200, position:'fixed', top:0}} onClick={() => { editEmployeeDatesView('Marcos Lima', '03', start, end) }}>add</button>
        </>
    )
};
export default Test;
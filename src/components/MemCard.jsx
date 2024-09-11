// import image from "../images/banana.jpg"
function MemCard({ item, id, handleClick }) {
    const itemClass = item.stat ? " active " + item.stat: " ";
    return (
        <div>
            <div className={"MemCard" + itemClass} onClick={() => handleClick(id)}>
                <img src={item.img} alt={`Card ${item.id}`} style={{ width: '120px', height: '100px' }} />
            </div>
        </div>
    );
}
export default MemCard;
import AddToCartIcon from "../../assets/icons/add_cart.svg"
import { Fragment, useState } from "react"
import Modal from "../UI/Modal";
const ListItem = ({ data,onAdd,onRemove,updateItemTitle }) => {
    // const [counter, setCounter] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const counterIncrement = event => {
        event.stopPropagation();
        onAdd(data.id)
        // setCounter( counter + 1);
        
    }
    const counterDecrement = event => {
        event.stopPropagation();
        onRemove(data.id);
        // if (counter === 0) {
        //     return;
        // }
        // if (counter === 1) {
        //     onRemove(data.id);
        // }
        // setCounter(counter - 1);
        
      
    }
    
    const handleModal = () => {
        setShowModal(previousState=>!previousState);
    }
    return (
        <Fragment>
            <div onClick={handleModal}  className={"item-card"}>
            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
            <div className={"item-card__information"}>
                <div className={"pricing"}>
                    <span>₹{data.discountedPrice}</span>
                    <small>
                        <strike>₹{data.price}</strike>
                    </small>
                </div>
                <div className={"title"}>
                    <h3>{data.title}</h3>
                </div>
            </div>
            <button onClick={()=>updateItemTitle(data.id)}>Update the title</button>
        
            {/* <button className={"cart-add"} onClick={handleClick}>
                <span>Add to Cart</span>
                <img src={AddToCartIcon} alt="Cart Icon"/>
            </button> */}
            {
                data.quantity < 1 ?
                <button className={"cart-add card-add__modal"} onClick={counterIncrement}>
                        <span>Add to Cart</span>
                        <img src={AddToCartIcon} alt="cart Icon" />
                        
                    </button>
                    :
                    <div className={"cart-addon card-addon__modal"}>
                    <button onClick={counterDecrement}><span >-</span></button> 
                    <span className={"counter"}>{data.quantity}</span>
                    <button onClick={counterIncrement}><span>+</span></button>
                </div>
                    
            }
            </div>
            {showModal &&
                <Modal onClose={handleModal} >
                    <div className="item-card__modal">
                        <div className="img-wrap">
                            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title} />
                        </div>
                        <div className="meta">
                            <h3>{data.title}</h3>
                            <div className={"pricing"}>
                            <span>₹{data.discountedPrice}</span>
                            <small><strike>₹{data.price}</strike></small>
                            </div>
                            <p>{data.description}</p>
                            {
                                data.quantity < 1 ?
                                    <button className={"cart-add card-add__modal"} onClick={counterIncrement }>
                                          <span>Add to Cart</span>
                                    <img src={AddToCartIcon} alt="Cart Icon"/>
                                    </button> : 
                                     <div className="cart-addon card-addon__modal">
                                     <button onClick={counterDecrement}><span>-</span></button>
                                     <span>{data.quantity}</span>
                                     <button onClick={counterIncrement}><span>+</span></button>
                                 </div>
                            }

                        </div>
                      
                    </div>

                   
                </Modal>
            
            }
        </Fragment>
        
    )
}

export default ListItem
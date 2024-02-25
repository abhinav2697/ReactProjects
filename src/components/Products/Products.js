import { useState,useEffect } from "react";
import ListItem from "../ListItems/ListItem";
import Form from "../Form/Form";
import axios from "axios";
import Loader from "../UI/Loader";

// const items = [
//     {
//         id: 0,
//         title: "Title of this Item 1",
//         price: 450,
//         discountedPrice: 340,
//         thumbnail: "placeholder.png"
//     },
//     {
//         id: 1,
//         title: "Title of this Item 2",
//         price: 100,
//         discountedPrice: 80,
//         thumbnail: "placeholder.png"
//     }
// ]

const Products = ({onAddItem,onRemoveItem}) => {
    // const [title, setTitle] = useState("");
    // const [price, setPrice] = useState(0);
    // const [discountedPrice, setDiscountedPrice] = useState(0);
    // const [thumbnail, setThumbnail] = useState("");
    const [item, setItem] = useState([])
    const [loader, setLoader] = useState(true);
    const[presentItems,setPresentItems] = useState([])
        
    //                 id: 0,
    //                 title: "Title of this Item 1",
    //                 price: 450,
    //                 discountedPrice: 340,
    //                 thumbnail: "placeholder.png"
                

    // });
    useEffect(() => {
        
        // fetch(`https://e-commerce-react-a4787-default-rtdb.firebaseio.com/items.json`)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //     })
        //     .catch(error => {
        //         console.log(error);
    
        // })
        async function fetchItems() {
            try {
                const response = await axios.get(`https://e-commerce-react-a4787-default-rtdb.firebaseio.com/items.json`)
                const data = response.data
                const transformData = data.map((item, index) => {
                    return {
                        ...item,
                        id: index
                    }
                })
                // setLoader(false)
                setItem(transformData);
            } catch (error) {
                // setLoader(false)
                console.log("Error:", error);
                alert("some error occurred");
                
            } finally {
                setLoader(false)
            }
                // .then(response => {
                // const data = response.data
                // const transformData = data.map((item, index) => {
                //     return {
                //         ...item,
                //         id: index
                //     }
                //     })
              
                // })
                // .catch(error => {
                //     console.log(error);
                // })
        }
        fetchItems();
    }, [])
    const handleAddItem = id => {
        if (presentItems.indexOf(id) > -1) {
            return;
        }
        setPresentItems([...presentItems,id]);
        onAddItem();
        
    }
    const handleRemoveItem = id => {
        let index = presentItems.indexOf(id)
        if (index > -1) {
            let items = [...presentItems]
            items.splice(index,1)
            setPresentItems([...items]);
            onRemoveItem();
        }
      
       
    }
    

    const updateItemTitle = async(itemId) => {
        console.log(`Item with Id:${itemId}`)
        try {
            let title=`Update Title #Item-${itemId}`
            await axios.patch(`https://e-commerce-react-a4787-default-rtdb.firebaseio.com/items/${itemId}.json`, {
                title: title
            })
            let data = [...item]
            let index = data.findIndex( e => e.id === itemId)
            data[index]['title'] = title
            setItem(data)
        }
        catch (error) {
            console.log("Error Updating the data!");
        }
        
    }
    // const handleTitle = (event) => {
    //     // setTitle(event.target.value);
    //     setItem({
    //         ...item,
    //         title:event.target.value
    //     })
        
    // }
    // const handlePrice = (event) => {
    //     // setPrice(event.target.value);
    //     setItem({
    //         ...item,
    //         price:event.target.value
    //     })
    // }
    // const handleDiscountedPrice = (event) => {
    //     // setDiscountedPrice(event.target.value);
    //     setItem({
    //         ...item,
    //         discountedPrice:event.target.value
    //     })
    // }
    // const handleThumbnail = event => {
    //     // setThumbnail(event.target.value);
    //     setItem({
    //         ...item,
    //         thumbnail: event.target.value
    //     })
    // }
    const handleInput = event => {
        setItem({
            ...item,
            [event.target.name]: event.target.value
            
        })
        
    }
    const submitForm = (event) => {
        event.preventDefault();
        if (item.discountedPrice > item.price) {
            alert('Discounted Price cannot be greater than actual price.')
        }
        // setItem({
        //     title,
        //     price,
        //     discountedPrice,
        //     thumbnail

        // });
        console.log("item updated",item);
       
    }
    return (
        <>
         <div className={"product-list"}>
            <div className={"product-wrapper"}>
                <div className={"form"}>
                <Form item={item} onChangeInput={handleInput} onFormSubmission={submitForm } />
            </div>
        
            <div>
                     <div> 
                    {/* <ListItem data={item}></ListItem> */}
                     {
                        item.map(item => {
                            return (<ListItem onAdd={handleAddItem} onRemove={handleRemoveItem} key={item.id} data={item} updateItemTitle={updateItemTitle} />)
                        })
                    } 
                </div>
                    </div>
                   
             </div> 
            </div>
            {loader && <Loader />}
            
        </>
    )
}

export default Products;
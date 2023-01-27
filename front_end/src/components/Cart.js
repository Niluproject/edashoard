import React, { useEffect, useState } from 'react';
import { faPenSquare, faTrash, faShoppingCart, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cart=()=>{
    const user_id = JSON.parse(localStorage.getItem('user'))._id;
    const [cartproducts, setcartProducts] = useState([]);
    const [productData, setProductData] = useState(cartproducts);

    useEffect(()=>{
        const getData =async () => {
            let result = await fetch('http://localhost:5000/cartlist',{
                method: "post",
                headers:{
                    "Content-type": "application/json",
                     authorization:JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({ user_id }),
            });
            result = await result.json();
            setcartProducts(result);
          
        }
        getData();
    },[productData]); 

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/cartlist/${id}`, {
            method: "Delete",
            headers:{
                "Content-type": "application/json",
                 authorization:JSON.parse(localStorage.getItem('token'))
            },
        });
        result = await result.json();
        if (result) {
            setProductData(cartproducts);
            // setcartProducts(productData);
        }
    }

    return(
        <div className="product-list">
            {
                console.log(cartproducts)
            }
            <h3>Cart Items</h3>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>

            {
               cartproducts .length>0 ?  cartproducts.map((item, index) =>
                    <ul key={item._id}>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>
                    <button onClick={() => deleteProduct(item._id)} style={{background: "#87cce9"}}><FontAwesomeIcon icon={faTrash} color="red"/></button>
                    </li>
                </ul>
                ) :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default Cart;
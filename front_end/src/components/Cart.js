import React, { useEffect, useState } from 'react';

const Cart=()=>{
    const user_id = JSON.parse(localStorage.getItem('user'))._id;
    const [cartproducts, setcartProducts] = useState([]);

    useEffect(async ()=>{
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

    },[]);
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
                {/* <li>Operation</li> */}
            </ul>

            {
               cartproducts .length>0 ?  cartproducts.map((item, index) =>{
                  return <ul key = {index}>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                </ul>
                }) :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default Cart;
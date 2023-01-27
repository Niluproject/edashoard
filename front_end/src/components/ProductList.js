import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faPenSquare, faTrash, faShoppingCart, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProductList = () => {
    const [products, setProducts] = useState([]);
    // try {

    console.log(localStorage.getItem('user'));
        const auth = JSON.parse(localStorage.getItem('user'));
    // } catch (error) {
    //    console.log(error); 
    // }
    
    console.log(auth);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
        
    }

    const addtocarthandler =  (product_id) => {
        const user_id = auth._id;
        console.log(user_id);
        fetch('http://localhost:5000/cart',{
            method: "post",
            headers:{
                "Content-type": "application/json",
                authorization:JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({ product_id, user_id }),

        }).then((response) => {
            console.log(response);
        });

    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>

            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                //item.price ==='24000'?
                        <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                            <li>
                            <button style={{background: "#87cce9"}}><Link to={"/update/"+item._id} ><FontAwesomeIcon icon={faPenSquare} color="green" /></Link></button>
                            <button onClick={() => deleteProduct(item._id)} style={{background: "#87cce9"}}><FontAwesomeIcon icon={faTrash} color="red"/></button>
                            <button style={{background: "#87cce9"}} onClick={() => addtocarthandler(item._id)}> <FontAwesomeIcon icon={faShoppingCart} /></button>
                            </li>
                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;
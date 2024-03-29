const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Product = require("./db/Product");
const Cart = require("./db/cart")
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send("Something went wrong")
        }
        resp.send({ result, auth: token })
    })
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send("Something went wrong")
                }
                resp.send({ user, auth: token })
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

    app.get("/product/:id", async (req, resp) => {
        let result = await Product.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.post("/cart", async (req, resp) => {
    console.log(req.body)
    let cart = new Cart(req.body);
    let result = await cart.save();
    resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    //     if(token){
    // token = token.split(' ');
    //     }else{

    //     }
    // Jwt.verify(token, jwtKey, (err, valid)=>{
    //     if(err){

    //     }else{
    //         res.send({result: "please add token with header"});
    //     }
    // })
    console.warn("Middleware called", token);
    next();
}


app.post("/cartlist", async (req, resp) => {
    console.log(req.body.user_id);
    let result = await Cart.find({ user_id: req.body.user_id }).populate('product_id');
    let list = result.map((item) => item.product_id)
    console.log(list);
    if (result) {
        resp.send(list)
    } else {
        resp.send({ "result": "No Record Found." })
    }
});

app.delete("/cartlist/:id", async (req, resp) => {
    console.log('req.params.id', req.params.id);
    let result = await Cart.deleteOne({ product_id: req.params.id });
    resp.send(result)
}),

    app.listen(5000);
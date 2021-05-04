const express = require("express");
const bodyPerser = require("body-parser");
const mongoose = require("mongoose");
const indexHtml = require(__dirname + "/pages/index.json");
const projectHtml = require(__dirname + "/pages/project.json");


const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyPerser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/productDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Create DB schema
const productSchema = mongoose.Schema({
    type: String,
    name: String,
    price: String,
    img: String,
    rating: String,
    description: String
});

// create the modef for the products
const T_shirt = mongoose.model("T_shirt", productSchema);
const Shoe = mongoose.model("Shoe", productSchema);
const Short = mongoose.model("Short", productSchema);
const Bag = mongoose.model("Bag", productSchema);
const Hat = mongoose.model("Hat", productSchema);

let t_shirt, shoe, short, bag, hat, tlen;


T_shirt.find({}, (err, pro) => {
    if (err) {
        console.log(err);
    } else {
        t_shirt = pro;
    }
});

Shoe.find({}, (err, pro) => {
    if (err) {
        console.log(err);
    } else {
        shoe = pro;
    }
});

Short.find({}, (err, pro) => {
    if (err) {
        console.log(err);
    } else {
        short = pro;
    }
});

Bag.find({}, (err, pro) => {
    if (err) {
        console.log(err);
    } else {
        bag = pro;
    }
});

Hat.find({}, (err, pro) => {
    if (err) {
        console.log(err);
    } else {
        hat = pro;
    }
});

function getRandomProducts() {
    tlen = t_shirt.length + shoe.length + short.length + bag.length + hat.length;
    let rndPro = [];
    for (let i = 0; i < tlen; i++) {
        let rn = Math.floor(Math.random() * 5) + 1;

        if (rn === 1) {
            let rm = Math.floor(Math.random() * t_shirt.length);
            rndPro.push(t_shirt[rm]);
        }
        else if (rn === 2) {
            let rm = Math.floor(Math.random() * shoe.length);
            rndPro.push(shoe[rm]);
        }
        else if (rn === 3) {
            let rm = Math.floor(Math.random() * short.length);
            rndPro.push(short[rm]);
        }
        else if (rn === 4) {
            let rm = Math.floor(Math.random() * bag.length);
            rndPro.push(bag[rm]);
        }
        else if (rn === 5) {
            let rm = Math.floor(Math.random() * hat.length);
            rndPro.push(hat[rm]);
        }
        else {
            throw "Woops! Solve this one now. lol!"
        }
    }
    return rndPro;
}


// get home route
app.get("/", (req, res) => {
    res.render("index", indexHtml);
});


// get project route
app.get("/projects", (req, res) => {
    res.render("projects", projectHtml);
});

// get project/ownIt route
app.get("/projects/ownit/home", (req, res) => {
    res.render("ownIt", { products: getRandomProducts() });
});

// get project/ownIt route
app.get("/projects/ownit", (req, res) => {
    res.redirect("/projects/ownit/home");
});


// get project/ownIt progucts 
app.get("/projects/ownit/products", (req, res) => {

    // console.log(rndPro);
    res.render("shop", { allProduct: getRandomProducts() });
});

// get project/ownIt 404 page
app.get("/projects/ownit/707", (req, res) => {
    res.render("707", { products: getRandomProducts() });
});

// get project/ownIt progucts bags
app.get("/projects/ownit/products/:productName", (req, res) => {
    switch (req.params.productName) {
        case "home":
            res.redirect("/projects/ownit/home");
            break;
        case "products":
            res.redirect("/projects/ownit/products");
            break;
        case "t-shirt":
            T_shirt.find({}, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("products", { products: pro });
                }
            });
            break;
        case "shoes":
            Shoe.find({}, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("products", { products: pro });
                }
            });
            break;
        case "short":
            Short.find({}, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("products", { products: pro });
                }
            });
            break;
        case "bag":
            Bag.find({}, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    // res.send(pro)
                    res.render("products", { products: pro });
                }
            });
            break;
        case "hat":
            Hat.find({}, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("products", { products: pro });
                }
            });
            break;
        default:
            res.redirect("/projects/ownit/707");
            throw "error::: post request got fucked up! by " + req.body.card_type;
    }
});


// get project/ownIt preview page
app.post("/projects/ownit/products/:productID", (req, res) => {

    switch (req.body.card_type) {
        case "home":
            res.redirect("/projects/ownit/home");
            break;
        case "products":
            res.redirect("/projects/ownit/products");
            break;
        case "t-shirt":
            T_shirt.findOne({ _id: req.params.productID }, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    pro.rating
                    res.render("product-detail", { product: pro });
                }
            });
            break;
        case "shoes":
            Shoe.findOne({ _id: req.params.productID }, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("product-detail", { product: pro });
                }
            });
            break;
        case "shorts":
            Short.findOne({ _id: req.params.productID }, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("product-detail", { product: pro });
                }
            });
            break;
        case "bags":
            Bag.findOne({ _id: req.params.productID }, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("product-detail", { product: pro });
                }
            });
            break;
        case "hats":
            Hat.findOne({ _id: req.body.card_id }, (err, pro) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("product-detail", { product: pro });
                }
            });
            break;
        default:
            res.redirect("/projects/ownit/707");
            throw "error::: post request got fucked up! by " + req.body.card_type;
    }
});





app.listen(3000, () => {
    console.log("Listening at port 3000");
});





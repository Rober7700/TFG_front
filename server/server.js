const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")("");

app.post("/checkout", async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.nombre,
                        images: [item.imagen]
                    },
                    unit_amount: item.precioConDescuento * 100
                },
                quantity: 1,
            })),
            phone_number_collection: {
                enabled: true,
            },
            mode: "payment",
            success_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost:4200/carrito",
            billing_address_collection: 'required',
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});



app.listen(4242, () => console.log('app is running on 4242'));

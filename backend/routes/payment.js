const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// payment routes
router.post('/checkout'), async (req, res) => {
    try {
        const {amount, currency} = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = router;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripeLib = require('stripe');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4242;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple in-memory products store using products.json
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE);
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeProducts(data) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
}

// GET /api/products
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// POST /api/products (admin add) - naive, no auth. In production, protect this endpoint.
app.post('/api/products', (req, res) => {
  const { title, description, price, category, image } = req.body;
  if (!title || !price) return res.status(400).json({ message: 'title and price required' });

  const products = readProducts();
  const id = `prod_${Date.now()}`;
  const newProd = { id, title, description: description || '', price: Number(price), category: category || 'General', image: image || 'https://via.placeholder.com/400x300' };
  products.push(newProd);
  writeProducts(products);
  res.status(201).json(newProd);
});

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY not set in .env. Stripe Checkout endpoint will fail without it.');
}

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// POST /api/create-checkout-session
app.post('/api/create-checkout-session', async (req, res) => {
  /*
    Expects body:
    {
      items: [{ id: 'prod_1', quantity: 2 }]
    }
  */
  try {
    const products = readProducts();
    const items = req.body.items || [];
    if (!items.length) return res.status(400).json({ message: 'No items provided' });

    const line_items = items.map(item => {
      const prod = products.find(p => p.id === item.id);
      if (!prod) throw new Error(`Product ${item.id} not found`);
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: prod.title,
            images: [prod.image]
          },
          unit_amount: prod.price
        },
        quantity: item.quantity || 1
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: process.env.SUCCESS_URL || `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL || `${CLIENT_URL}/cancel`
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

# 🪷 SareeKart — Full Stack Saree Shop

A production-style full stack web application for an Indian saree e-commerce store.

**Tech Stack:** HTML · CSS · Vanilla JS · Node.js · Express · MongoDB Atlas

---

## 📁 Project Structure

```
sareekart/
├── backend/
│   ├── models/
│   │   ├── Product.js          # Product schema (name, desc, price, imageUrl...)
│   │   └── Contact.js          # Contact form schema
│   ├── routes/
│   │   ├── productRoutes.js    # GET /api/products, GET /api/products/:id
│   │   └── contactRoutes.js    # POST /api/contact
│   ├── controllers/
│   │   ├── productController.js
│   │   └── contactController.js
│   ├── server.js               # Main Express entry point
│   ├── seed.js                 # Database seeder (6 sample sarees)
│   ├── .env.example            # Environment variables template
│   └── package.json
│
└── frontend/
    ├── css/
    │   └── style.css           # Master stylesheet (all pages)
    ├── js/
    │   ├── config.js           # API base URL configuration
    │   ├── main.js             # Shared utilities (cart, navbar, toast)
    │   ├── collections.js      # Collections page — fetch & render products
    │   ├── product.js          # Product detail — fetch by ID
    │   ├── cart.js             # Cart page — localStorage CRUD
    │   ├── payment.js          # Payment page — form, tabs, redirect
    │   └── contact.js          # Contact form — API submit
    ├── index.html              # Home page
    ├── collections.html        # Products listing
    ├── product.html            # Product detail
    ├── cart.html               # Shopping cart
    ├── payment.html            # Checkout / payment form
    ├── oops.html               # Demo gateway redirect
    └── contact.html            # Contact form
```

---

## 🚀 Local Setup

### 1. MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a **new cluster** (free tier M0)
3. Create a **database user** (username + password)
4. Under **Network Access**, add IP `0.0.0.0/0` (allow all) for development
5. Click **Connect → Drivers** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sareekart
   ```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and paste your MongoDB URI
npm run seed        # Seed 6 sample sarees
npm run dev         # Start development server (nodemon)
# OR
npm start           # Production start
```

Server runs at: `http://localhost:5000`

### 3. Frontend Setup

Open `frontend/index.html` with a live server (VS Code Live Server or similar).

The default API URL in `frontend/js/config.js` points to `http://localhost:5000`.

---

## 🌐 Deployment

### Backend → Render

1. Push your `backend/` folder to a GitHub repository
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. Add **Environment Variables:**
   - `MONGODB_URI` = your Atlas connection string
   - `PORT` = `5000`
   - `FRONTEND_URL` = your Vercel frontend URL (after deploying)
6. Deploy — Render gives you a URL like `https://sareekart-api.onrender.com`

### Frontend → Vercel

1. Push your `frontend/` folder to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import repo
3. No build settings needed (static HTML)
4. Deploy — Vercel gives you a URL like `https://sareekart.vercel.app`

### Connect Frontend to Backend

Edit `frontend/js/config.js`:

```js
const CONFIG = {
  // Comment out local URL:
  // API_BASE_URL: "http://localhost:5000",
  
  // Uncomment and update with your Render URL:
  API_BASE_URL: "https://sareekart-api.onrender.com",
};
```

Push the change — Vercel auto-redeploys.

Also update `FRONTEND_URL` on Render to your Vercel URL so CORS works correctly.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/contact` | Submit contact form |

**POST /api/contact body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "message": "I'd like to know more about..."
}
```

---

## 💳 Payment Integration (Next Steps)

The payment page is a UI-only demo. To activate:

**Razorpay (India):**
```bash
npm install razorpay
```

**Stripe (International):**
```bash
npm install stripe
```

See their respective docs for order creation + webhook verification.

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--maroon` | `#7B1C2E` | Primary brand color |
| `--gold` | `#C9933A` | Accents, prices |
| `--cream` | `#FDF8F0` | Page backgrounds |
| `--blush` | `#F2D5D5` | Soft highlights |

---

Made with ❤️ for Indian craftsmanship

import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function NavBar({ cartCount }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 shadow-lg shadow-orange-500/30"></div>
          <span className="text-white text-xl font-bold tracking-tight">
            CART<span className="text-orange-500">X</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="#products" className="hover:text-white transition">Products</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-black font-semibold shadow-[0_0_0_0_rgba(249,115,22,0.7)] hover:shadow-[0_0_30px_8px_rgba(249,115,22,0.25)] transition-all">
            <span>Cart</span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-orange-400 text-xs border border-orange-400/50">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black" id="hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/dE8ryMHkF0EMjFf3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            Futuristic commerce experience
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Welcome to CART<span className="text-orange-500">X</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl">
            A single-vendor store blending premium products with motion and light. Powered by a glowing orange core.
          </p>
          <a href="#products" className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-orange-500 text-black font-semibold hover:scale-105 transition-transform shadow-[0_8px_30px_rgba(249,115,22,0.35)]">
            Shop the collection
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.293 4.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1-1.414-1.414L17.586 12l-4.293-4.293a1 1 0 0 1 0-1.414Z"/><path d="M3 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ item, onAdd }) {
  return (
    <div className="group relative bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-colors">
      {item.image && (
        <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
      )}
      <div className="p-5">
        <h3 className="text-white font-semibold tracking-tight">{item.title}</h3>
        <p className="text-white/60 text-sm line-clamp-2 mt-1 min-h-[2.5rem]">{item.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-orange-400 font-bold">${item.price?.toFixed(2)}</span>
          <button onClick={() => onAdd(item)} className="px-3 py-2 rounded-xl bg-orange-500 text-black font-semibold hover:scale-105 transition-transform">Add</button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-orange-500/0 via-orange-500/0 to-orange-500/10"></div>
    </div>
  )
}

function Products({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <section id="products" className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 w-40 rounded bg-zinc-800 animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-zinc-900/60 border border-white/10 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <ProductCard key={item._id} item={item} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckoutBar({ cart, onCheckout }) {
  const total = useMemo(() => cart.reduce((s, i) => s + i.price, 0), [cart])
  if (!cart.length) return null
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-between bg-zinc-950/80 backdrop-blur border border-orange-500/30 rounded-2xl px-6 py-4 shadow-[0_8px_30px_rgba(249,115,22,0.25)]">
          <div className="text-white/80 text-sm">
            {cart.length} item(s) • <span className="text-orange-400 font-semibold">${total.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="px-4 py-2 rounded-xl bg-orange-500 text-black font-semibold hover:scale-105 transition-transform">Checkout</button>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer id="about" className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-white/70">
        <div>
          <div className="text-white text-lg font-semibold">CART<span className="text-orange-500">X</span></div>
          <p className="mt-3 text-sm">A single-vendor shop crafted with motion and light. Built for speed, designed for delight.</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Support</div>
          <ul className="space-y-2 text-sm">
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div id="contact">
          <div className="text-white font-semibold mb-3">Stay in the loop</div>
          <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2">
            <input className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-white/40" placeholder="Email address" />
            <button className="px-4 py-2 rounded-xl bg-orange-500 text-black font-semibold">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="py-6 text-center text-xs text-white/40">© {new Date().getFullYear()} CARTX. All rights reserved.</div>
    </footer>
  )
}

export default function App() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    // attempt seed for demo convenience
    fetch(`${API_BASE}/api/seed`, { method: 'POST' }).catch(()=>{})
  }, [])

  const handleAdd = (item) => setCart((c) => [...c, item])

  const handleCheckout = async () => {
    const items = cart.map(i => ({ product_id: i._id, title: i.title, price: i.price, quantity: 1, image: i.image }))
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const payload = {
      customer_name: 'Guest',
      customer_email: 'guest@example.com',
      address: 'N/A',
      items,
      subtotal,
      shipping: 0,
      total: subtotal,
    }
    try {
      const res = await fetch(`${API_BASE}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (res.ok) {
        alert('Order placed! ID: ' + data._id)
        setCart([])
      } else {
        alert('Checkout failed: ' + (data.detail || 'Unknown error'))
      }
    } catch (e) {
      alert('Checkout error')
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <NavBar cartCount={cart.length} />
      <Hero />
      <Products onAdd={handleAdd} />
      <CheckoutBar cart={cart} onCheckout={handleCheckout} />
      <Footer />
    </div>
  )
}

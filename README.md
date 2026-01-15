# DashCart - Product Management Dashboard

A modern, full-featured product management dashboard built with Next.js, featuring authentication, product management, shopping cart, and checkout functionality.

## 🚀 Features

- **Authentication**: Secure login/logout with DummyJSON API
- **Route Protection**: Middleware-based route guarding
- **Product Management**: Full CRUD operations with pagination
- **Search & Filtering**: Real-time search with category and price filters
- **Shopping Cart**: Persistent cart with quantity management
- **Checkout Flow**: Complete order placement system
- **Order History**: View past orders and cart history
- **Responsive Design**: Mobile-first, fully responsive UI
- **Smooth Animations**: Framer Motion powered transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **API Layer**: oRPC (typed server procedures)
- **Server State**: TanStack Query (data fetching, caching)
- **Client State**: Zustand (auth, cart, UI filters)
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **Language**: TypeScript (strict mode)
- **Backend**: DummyJSON API

## 📁 Project Structure

```
app/
├── api/orpc/[...procedure]/  # oRPC API routes
├── dashboard/                 # Protected dashboard routes
│   ├── products/             # Product management
│   ├── cart/                 # Shopping cart
│   ├── checkout/             # Checkout process
│   └── orders/               # Order history
├── login/                    # Authentication page
└── layout.tsx                # Root layout

lib/
├── orpc/                     # oRPC configuration
│   ├── procedures/           # API procedures
│   ├── router.ts            # Router definition
│   ├── client.ts            # Client setup
│   └── context.ts           # Server context
├── stores/                   # Zustand stores
│   ├── auth-store.ts        # Authentication state
│   ├── cart-store.ts        # Shopping cart state
│   └── ui-store.ts          # UI filters state
├── hooks/                    # Custom hooks
│   └── use-api.ts           # TanStack Query hooks
└── providers/                # React providers
    └── query-provider.tsx   # TanStack Query provider

components/
└── ui/                       # Shadcn UI components
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Demo Credentials

Use these credentials to login:

- **Username**: `emilys`
- **Password**: `emilyspass`

Other test users:
- `michaelw` / `michaelwpass`
- `sophiab` / `sophiabpass`

## 📖 State Management Architecture

### TanStack Query (Server State)
- Product listings with pagination
- Product details
- Categories
- User carts/orders
- Automatic caching and refetching
- Optimistic updates

### Zustand (Client State)
- Authentication session
- Shopping cart items
- UI filters (search, category, price)
- Persisted to localStorage

## 🎨 UI/UX Features

- **Dark Mode**: Modern dark theme with purple/blue gradient accents
- **Responsive**: Mobile-first design, works on all screen sizes
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Animations**: Smooth page transitions and micro-interactions
- **Toast Notifications**: Success/error feedback (future enhancement)

## 🔐 Security Features

- HTTP-only cookies for token storage
- Middleware-based route protection
- Secure token handling
- Client-side validation with Zod
- Server-side validation in oRPC procedures

## 🚀 API Integration

All API calls go through oRPC procedures - no direct REST calls from components:

```typescript
// ✅ Correct: Using oRPC through TanStack Query
const { data } = useProducts({ limit: 10, skip: 0 });

// ❌ Wrong: Direct fetch from components
const data = await fetch('https://dummyjson.com/products');
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

```bash
vercel deploy
```

## 🤝 Contributing

This is an internship assignment project. Feel free to explore and learn from the codebase!

## 📝 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Developer

Built by Akshay as an internship assignment project demonstrating:
- Modern React patterns
- Type-safe API integration
- State management best practices
- Clean code architecture
- Production-ready UI/UX

---

## ✨ Complete Feature List

### 🎨 UI/UX Features
- **Modern Design System**
  - Glassmorphism UI with backdrop blur effects
  - Gradient backgrounds with blue/indigo theme
  - Smooth animations using Framer Motion
  - Floating particle effects on backgrounds
  - Interactive hover states and micro-interactions
  
- **Theme System**
  - Dark & Light mode toggle
  - Next-themes integration
  - Theme persistence across sessions
  - Shadcn UI components with theme support
  - CSS custom properties for dynamic theming

- **Responsive Layout**
  - Mobile-first design approach
  - Adaptive layouts for all screen sizes
  - Touch-friendly interface elements
  - Responsive navigation bar
  - Grid-based product displays

### 🔐 Authentication & User Management
- **Secure Authentication**
  - Login with DummyJSON API integration
  - HTTP-only cookie-based sessions
  - Middleware route protection
  - Automatic token refresh
  - Secure logout functionality

- **User Profile**
  - Editable profile page
  - Personal information management
  - Profile picture placeholder
  - User statistics display
  - LocalStorage persistence for profile data

### 🛍️ Product Management
- **Product Listing**
  - Paginated product display (12 items per page)
  - Real-time search functionality
  - Category-based filtering
  - Price range filters
  - Advanced filter panel
  - Product card with image preview
  - Stock availability indicators
  - Smooth loading states with skeletons

- **Product Operations**
  - Add new products
  - Edit existing products
  - Delete products with confirmation
  - Form validation using Zod
  - Image URL support
  - Category selection
  - Price and stock management

### 🛒 Shopping Cart
- **Cart Management**
  - Add products to cart
  - Update item quantities
  - Remove items from cart
  - Clear entire cart
  - Real-time cart count badge
  - Persistent cart state (localStorage)
  - Stock limit validation
  - Quantity controls with +/- buttons

- **Cart Features**
  - Visual product thumbnails
  - Price calculations
  - Subtotal per item
  - Total cart value display
  - Empty cart state with illustrations
  - Continue shopping option
  - Smooth animations for cart updates

### 💳 Checkout & Orders
- **Checkout Process**
  - Multi-section checkout form
  - Personal information section
  - Shipping address collection
  - Payment card details (simulated)
  - Form validation with React Hook Form
  - Order summary sidebar
  - Tax calculation (10%)
  - Free shipping indicator
  - Success animation on order placement

- **Order Management**
  - Complete order history
  - Order details with product list
  - Status tracking (Pending, Processing, Shipped, Delivered)
  - Status badges with icons
  - Order date and ID display
  - Order cancellation (for non-delivered orders)
  - CSV export for order reports
  - Order persistence in localStorage

### 📊 Dashboard Features
- **Statistics Cards**
  - Total products count
  - Cart items count
  - Cart value display
  - Categories count
  - Animated stat cards
  - Real-time updates
  - Loading states

- **Quick Actions**
  - Fast navigation to key pages
  - Manage Products shortcut
  - View Cart shortcut
  - Orders tracking shortcut
  - Gradient accent cards
  - Hover animations

- **Recent Activity**
  - Latest cart items display
  - Product thumbnails
  - Quantity badges
  - Price information
  - Empty state handling

### 🎯 Navigation
- **Top Navigation Bar**
  - Company logo with brand name
  - Products & Orders links
  - Theme toggle button (Sun/Moon icons)
  - Shopping cart icon with item count badge
  - User profile dropdown
  - Logout functionality
  - Sticky positioning
  - Glass morphism effect

### 🔧 Technical Features
- **State Management**
  - Zustand for client state
  - TanStack Query for server state
  - Persistent stores with localStorage
  - Optimistic UI updates
  - Automatic cache invalidation

- **Data Management**
  - oRPC for type-safe API calls
  - Zod schema validation
  - Optimistic mutations
  - Error handling with user feedback
  - Loading states throughout app

- **Code Quality**
  - TypeScript strict mode
  - ESLint configuration
  - Consistent code formatting
  - Component composition patterns
  - Custom hooks for reusability

### 📱 Progressive Features
- **Performance**
  - Fast page transitions
  - Optimized images
  - Efficient re-renders
  - Code splitting
  - Lazy loading where appropriate

- **Accessibility**
  - Semantic HTML
  - ARIA labels
  - Keyboard navigation support
  - Focus states
  - Color contrast compliance

### 🎨 Styling & Design
- **Tailwind CSS v4**
  - Modern CSS-based configuration
  - Custom color palette with OKLCH
  - Responsive utilities
  - Dark mode variants
  - Custom animations (float, pulse-glow, shimmer, gradient-shift)

- **Animation Library**
  - Framer Motion integration
  - Spring physics animations
  - Stagger children effects
  - Page transitions
  - Interactive hover states
  - Scale and rotation effects

### 📦 Export & Reports
- **CSV Export**
  - Download order history as CSV
  - Includes all order details
  - Customer information
  - Shipping addresses
  - Order status and totals
  - Date-stamped file names

### 🔒 Security
- **Data Protection**
  - Client-side validation
  - Server-side validation
  - XSS prevention
  - CSRF protection via middleware
  - Secure credential handling

### 🌐 Currency
- **INR Support**
  - Indian Rupee formatting
  - Rs/₹ symbol display
  - Proper number formatting
  - Consistent currency display throughout app

---

**Note**: This project uses DummyJSON API for demonstration purposes. In production, replace with your own backend API.

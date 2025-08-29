# Product Dashboard

A small product dashboard built with **React + TypeScript**, styled using **TailwindCSS** and **shadcn/ui**, and powered by **@tanstack/react-query** for data fetching and mutations.  
The app uses the [DummyJSON API](https://dummyjson.com/docs/products) for product data.

---

##  Features

- **Responsive layout** (sidebar + header + main content)
- **Products table** with:
  - Columns: Title, Price, Category, Stock
  - Pagination (limit = 10 per page)
  - Search by product name
  - Category filter
  - Loading skeletons, error state, and empty state handling
- **CRUD Operations**:
  - Add new product (Dialog form)
  - Edit product details
  - Delete product
  - Auto-refresh list after mutation
- **React Query integration**:
  - Query caching, pagination, and filters
  - Mutations with refetch and toast notifications
- Bonus:
  - Artificial API delay (`?delay=1000`) to demonstrate proper loading
  - Product statistics (low stock count, average price)

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for build tooling
- [TailwindCSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for accessible UI components
- [@tanstack/react-query](https://tanstack.com/query) for data fetching & mutations
- [DummyJSON](https://dummyjson.com/) API as backend

---

##  Project Structure
item-orama-main/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── public
└── src/
    ├── main.tsx           # Entry point
    ├── App.tsx
    ├── index.css
    ├── App.css
    ├── components/
    │   ├── app-sidebar.tsx
    │   ├── dashboard-layout.tsx
    │   ├── product-form.tsx      # Dialog form for Add/Edit
    │   ├── products-table.tsx    # Table UI + pagination/search
    │   └── ui/                   # shadcn/ui components
    ├── hooks/
    │   ├── use-products.ts       # React Query hooks
    │   └── use-toast.ts
    ├── lib/
    │   ├── api.ts                # API calls (fetch, CRUD)
    │   └── utils.ts
    └── pages/
        ├── Index.tsx             # Dashboard home
        ├── Products.tsx          # Products page
        ├── Orders.tsx
        ├── Analytics.tsx
        └── Settings.tsx



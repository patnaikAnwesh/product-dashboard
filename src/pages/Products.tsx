import { ProductsTable } from "@/components/products-table"

export default function Products() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Product Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your product inventory, pricing, and stock levels.
        </p>
      </div>
      
      <ProductsTable />
    </div>
  )
}
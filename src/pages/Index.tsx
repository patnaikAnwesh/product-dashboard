import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProducts, useCategories } from "@/hooks/use-products"
import { Package, TrendingUp, ShoppingCart, BarChart3, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  const { data: productsData } = useProducts(1, 5)
  const { data: categories = [] } = useCategories()

  const totalProducts = productsData?.total || 0
  const recentProducts = productsData?.products || []
  const lowStockProducts = recentProducts.filter(p => p.stock <= 10).length

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Product Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your inventory, track sales, and analyze performance all in one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-spring">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <Package className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-spring">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
              <BarChart3 className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">Product categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-spring">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock</CardTitle>
              <TrendingUp className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockProducts}</div>
              <p className="text-xs text-muted-foreground">Items need restock</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-spring">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              <ShoppingCart className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12.5K</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Products */}
        <Card className="bg-card/50 border-border/50 shadow-card backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Recent Products</CardTitle>
              <Button asChild variant="ghost" className="hover:bg-secondary/80 transition-smooth">
                <Link to="/products" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-smooth">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title}
                      className="w-16 h-16 rounded-lg object-cover bg-secondary"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/%3E%3Cpolyline points='3.27,6.96 12,12.01 20.73,6.96'/%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'/%3E%3C/svg%3E"
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">{product.category} • {product.brand}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-medium text-primary">${product.price}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          product.stock <= 10 
                            ? "bg-destructive/10 text-destructive" 
                            : "bg-accent/10 text-accent"
                        }`}>
                          {product.stock} in stock
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
                <p className="text-muted-foreground mb-4">Get started by adding your first product.</p>
                <Button asChild className="bg-gradient-primary hover:shadow-glow transition-spring">
                  <Link to="/products">
                    <Package className="h-4 w-4 mr-2" />
                    Add Product
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-spring group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:animate-glow">
                  <Package className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Manage Products</h3>
                  <p className="text-sm text-muted-foreground">Add, edit, and organize your inventory</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-spring group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:animate-glow">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Track performance and insights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-spring group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:animate-glow">
                  <ShoppingCart className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Order Management</h3>
                  <p className="text-sm text-muted-foreground">Process and track orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

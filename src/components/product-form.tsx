import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useCategories, useCreateProduct, useUpdateProduct } from "@/hooks/use-products"
import { type Product, type CreateProductData } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface ProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
}

interface FormData {
  title: string
  description: string
  price: number
  category: string
  stock: number
  brand: string
}

export function ProductForm({ open, onOpenChange, product }: ProductFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  
  const { data: categories = [] } = useCategories()
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const isEditing = !!product
  const isLoading = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (product) {
      setValue("title", product.title)
      setValue("description", product.description)
      setValue("price", product.price)
      setValue("category", product.category)
      setValue("stock", product.stock)
      setValue("brand", product.brand)
      setSelectedCategory(product.category)
    } else {
      reset()
      setSelectedCategory("")
    }
  }, [product, setValue, reset])

  const onSubmit = async (data: FormData) => {
    try {
      const productData: CreateProductData = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        category: selectedCategory,
        stock: Number(data.stock),
        brand: data.brand,
      }

      if (isEditing && product) {
        await updateMutation.mutateAsync({
          id: product.id,
          ...productData,
        })
      } else {
        await createMutation.mutateAsync(productData)
      }
      
      onOpenChange(false)
      reset()
      setSelectedCategory("")
    } catch (error) {
      // Error handling is done in the mutations
      console.error("Form submission error:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border shadow-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-hero bg-clip-text text-transparent">
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                className="bg-secondary/50 border-border/50 focus:bg-secondary"
                placeholder="Product title"
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand" className="text-sm font-medium">Brand</Label>
              <Input
                id="brand"
                {...register("brand")}
                className="bg-secondary/50 border-border/50 focus:bg-secondary"
                placeholder="Product brand"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              className="bg-secondary/50 border-border/50 focus:bg-secondary min-h-[100px]"
              placeholder="Product description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { 
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" }
                })}
                className="bg-secondary/50 border-border/50 focus:bg-secondary"
                placeholder="0.00"
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-sm font-medium">Stock</Label>
              <Input
                id="stock"
                type="number"
                {...register("stock", { 
                  required: "Stock is required",
                  min: { value: 0, message: "Stock must be positive" }
                })}
                className="bg-secondary/50 border-border/50 focus:bg-secondary"
                placeholder="0"
              />
              {errors.stock && <p className="text-sm text-destructive">{errors.stock.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-secondary/50 border-border/50 focus:bg-secondary">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-secondary">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!selectedCategory && <p className="text-sm text-destructive">Category is required</p>}
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !selectedCategory}
              className="bg-gradient-primary hover:shadow-glow transition-spring"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update Product" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  fetchProducts, 
  fetchCategories, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  type CreateProductData,
  type UpdateProductData
} from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

export function useProducts(
  page = 1,
  limit = 10,
  search?: string,
  category?: string,
  withDelay = false
) {
  const skip = (page - 1) * limit
  const delay = withDelay ? 1000 : 0
  
  return useQuery({
    queryKey: ['products', page, limit, search, category],
    queryFn: () => fetchProducts(limit, skip, search, category, delay),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast({
        title: "Success",
        description: "Product created successfully!",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast({
        title: "Success",
        description: "Product updated successfully!",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      })
    },
  })
}
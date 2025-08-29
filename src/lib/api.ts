const BASE_URL = 'https://dummyjson.com'

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CreateProductData {
  title: string
  description?: string
  price: number
  category: string
  stock: number
  brand?: string
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: number
}

// Fetch products with pagination and search
export async function fetchProducts(
  limit = 10, 
  skip = 0, 
  search?: string, 
  category?: string,
  delay = 0
): Promise<ProductsResponse> {
  let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  
  if (delay > 0) {
    url += `&delay=${delay}`
  }
  
  if (search) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
    if (delay > 0) url += `&delay=${delay}`
  }
  
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  
  const data = await response.json()
  
  // Filter by category if specified (since API doesn't support both search and category filtering)
  if (category && category !== 'all') {
    data.products = data.products.filter((product: Product) => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  return data
}

// Fetch product categories
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

// Create new product
export async function createProduct(productData: CreateProductData): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create product')
  }
  
  return response.json()
}

// Update product
export async function updateProduct(productData: UpdateProductData): Promise<Product> {
  const { id, ...data } = productData
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('Failed to update product')
  }
  
  return response.json()
}

// Delete product
export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    throw new Error('Failed to delete product')
  }
}
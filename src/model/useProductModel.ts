import { useState } from "react";
import { DataOrException, TypeDataOrException } from "../data/DataOrException";
import client from "../client/client";

interface ProductModel {
  getProducts(): void
  products: TypeDataOrException<Product[]>
  addProduct: (product: Product) => void
  removeProduct: (product: Product) => void
  confirmProducts: () => void
}

export function useProductModel(): ProductModel {
  const [products, setProducts] = useState<TypeDataOrException<Product[]>>({ data: null, exception: null, isLoading: true })
  const [productNeedUpdate, setProductNeedUpdate] = useState<string[]>([])
  let { fetchProducts, updateProduct } = client()


  function getProducts() {
    fetchProducts((data: TypeDataOrException<Product[]>) => {
      setProducts(data)
    })


  }

  function addProduct(product: Product) {
    const newProducts = products.data!.map((item) => {

      if (item.id === product.id) {
        item.quantidade = item.quantidade + 1
        setProductNeedUpdate([...productNeedUpdate, product.id])
        return item
      }
      return item
    })

    setProducts({ data: newProducts, exception: null, isLoading: false })
  }

  function removeProduct(product: Product) {
    const newProducts = products.data!.map((item) => {

      if (item.id === product.id) {
        item.quantidade = item.quantidade - 1
        setProductNeedUpdate([...productNeedUpdate, product.id])
        return item
      }
      return item
    })
    setProducts({ data: newProducts, exception: null, isLoading: false })
  }

  function confirmProducts() {
    productNeedUpdate.forEach((id) => {
      const finProduct = products.data!.find(item => item.id === id)
      updateProduct(id, finProduct!)
    })
  }

  return {
    getProducts,
    products,
    addProduct,
    removeProduct,
    confirmProducts

  }

}
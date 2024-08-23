import axios, { AxiosError } from "axios";
import { DataOrException, TypeDataOrException } from "../data/DataOrException";





export default function client() {



  function fetchProducts(onChange: (data: TypeDataOrException<Product[]>) => void) {

    axios.get("http://192.168.0.2:3000/products").then(result => {
      onChange(DataOrException<Product[]>(result.data, null, false))

    }).catch((error: AxiosError) => {

      onChange(DataOrException<[Product]>(null, error, false))
    })

  }

  async function updateProduct(idProduct: string, product: Product) {
    await axios.put(`http://192.168.0.2:3000/products/${idProduct}`, product).catch((error: AxiosError) => {

      console.log(error)
    })
  }

  return {
    fetchProducts,
    updateProduct
  }
}


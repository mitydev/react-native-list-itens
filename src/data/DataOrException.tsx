import { AxiosError } from "axios";



export interface TypeDataOrException<T> {
  data: T | null
  exception: AxiosError | null
  isLoading: boolean
}


export function DataOrException<T>(data: T | null, exception: AxiosError | null = null, isLoading: boolean = false): TypeDataOrException<T> {
  return {
    data: data,
    exception: exception,
    isLoading: isLoading
  }
}
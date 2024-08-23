import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useProductModel } from "./model/useProductModel";
import { useEffect } from "react";





export default function ShowItems() {
  const { getProducts, products, addProduct, removeProduct, confirmProducts } = useProductModel()

  useEffect(() => {
    getProducts()
  }, [])

  if (products.isLoading) {
    return <Text>Loading...</Text>
  }


  function RenderItem({ item }: { item: Product }) {
    return (
      <View style={style.card}>
        <View style={{ flexDirection: 'column' }}>
          <Text>{item.name}</Text>
          <Text>{item.weight}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => removeProduct(item)} >
            <Text> - </Text>
          </TouchableOpacity>
          <Text>{item.quantidade}</Text>
          <TouchableOpacity onPress={() => addProduct(item)}>
            <Text> + </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={style.container}>
      {products.exception != null ? <Text>{products.exception.message}</Text> :
        <FlatList
          data={products.data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RenderItem item={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListFooterComponent={() => <TouchableOpacity style={style.buttonFinished} onPress={confirmProducts} >
            <Text>Confirmar</Text>
          </TouchableOpacity>}
        />}

    </View>

  )

}

const style = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20
  },
  card: {
    opacity: 0.7,
    borderRadius: 10,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonFinished: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'

  }
})
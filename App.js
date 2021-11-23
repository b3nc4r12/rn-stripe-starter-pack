import React from "react"
import { StatusBar } from "expo-status-bar"
import { Text, View, Image, SafeAreaView } from "react-native"
import tw from "tailwind-rn"

const App = () => {
  return (
    <>
      <SafeAreaView style={tw("flex-1 items-center")}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" }}
          style={tw("w-full h-36")}
          resizeMode="contain"
        />
        <Text style={tw("text-3xl font-bold my-5")}>React Native Stripe Demo</Text>
        <Image
          source={{ uri: "https://b.stripecdn.com/docs-srv/assets/ios-overview.9a8b762e060eb4be79a5abb237378498.png" }}
          style={tw("w-full h-80")}
        />
        <Text style={tw("text-xs text-gray-600 italic text-right pl-32")}>Image from Stripe docs (we will only be using the payment popup)</Text>
        <View style={tw("mt-3 items-center")}>
          <Text>Scan HERE to get started with Stripe!</Text>
          <Image
            source={require("./qrcode.png")}
            style={tw("h-44")}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  )
}

export default App
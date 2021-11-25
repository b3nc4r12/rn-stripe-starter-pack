import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native"
import tw from "tailwind-rn"
import { StripeProvider } from "@stripe/stripe-react-native"
import Checkout from "./components/Checkout"
import { STRIPE_PUBLIC_KEY } from "@env"

const App = () => {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      <SafeAreaView style={tw("flex-1 mx-5")}>
        <Checkout />
      </SafeAreaView>
      <StatusBar style="auto" />
    </StripeProvider>
  )
}

export default App
import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, Alert } from "react-native"
import tw from "tailwind-rn"
import { products } from "../products"
import { API_URL } from "@env"
import { useStripe } from "@stripe/stripe-react-native"
import Spinner from "react-native-loading-spinner-overlay"

const Checkout = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [total] = useState(products.reduce((acc, product) => acc + product.price, 0));
    const [loading, setLoading] = useState(false);

    const fetchPaymentIntent = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: Math.round(total * 100)
            })
        })

        const { clientSecret, error } = await response.json();

        return { clientSecret, error }
    }

    const handlePayPress = async () => {
        setLoading(true);

        const { clientSecret, error } = await fetchPaymentIntent();

        if (error) {
            Alert.alert("Error:", error);
        } else {
            await initPaymentSheet({
                paymentIntentClientSecret: clientSecret
            })
                .then(() => openPaymentSheet())
        }
    }

    const openPaymentSheet = async () => {
        setLoading(false);

        const { error } = await presentPaymentSheet();

        if (error) Alert.alert(`Error code: ${error.code}`, error.message)
        else Alert.alert("Success!", "Your payment has been confirmed!")
    }

    return (
        <View>
            <Spinner
                visible={loading}
                textContent={"Initializing..."}
                textStyle={tw("text-white")}
                overlayColor="rgba(0, 0, 0, 0.5)"
                cancelable={false}
            />
            <Text style={tw("text-2xl font-semibold mt-5")}>React Native Stripe Demo</Text>
            {products.map(({ id, name, price, image }) => (
                <View key={id} style={tw("flex-row items-center py-2.5 border-b border-gray-300")}>
                    <Image style={tw("w-20 h-20 mr-5")} source={{ uri: image }} />
                    <View>
                        <Text style={tw("font-bold text-lg")}>{name}</Text>
                        <Text>
                            {new Intl.NumberFormat("en-CA", {
                                style: "currency",
                                currency: "CAD"
                            }).format(price)}
                        </Text>
                    </View>
                </View>
            ))}
            <Text style={tw("text-lg font-bold mt-2.5")}>
                Total: {new Intl.NumberFormat("en-CA", {
                    style: "currency",
                    currency: "CAD"
                }).format(total)}
            </Text>
            <TouchableOpacity
                disabled={loading}
                onPress={handlePayPress}
                style={tw("w-full h-10 items-center justify-center bg-blue-500 rounded-md mt-2.5")}
            >
                <Text style={tw("text-lg font-semibold text-white")}>Checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Checkout
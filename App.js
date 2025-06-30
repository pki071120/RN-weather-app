import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
	const [number, setNumber] = useState(0);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Counter: {number}</Text>
			<View style={{ flexDirection: "row", gap: 10 }}>
				<Button title="증가" onPress={() => setNumber((cur) => (cur += 1))} />
				<Button title="감소" onPress={() => setNumber((cur) => (cur -= 1))} />
			</View>
			<StatusBar barStyle="light-content" style="light" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 40,
		color: "#333",
	},
});

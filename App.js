import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Switch } from "react-native";

export default function App() {
	const [number, setNumber] = useState(0);
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20 }}>Counter: {number}</Text>
			<View style={{ flexDirection: "row", gap: 10 }}>
				<Button title="증가" onPress={() => setNumber((cur) => (cur += 1))} />
				<Button title="감소" onPress={() => setNumber((cur) => (cur -= 1))} />
				<Button
					style={{ color: "black" }}
					color={"red"}
					title="초기화"
					onPress={() => setNumber((cur) => (cur = 0))}
				/>
			</View>
			<Switch
				trackColor={{ true: "#81b0ff", false: "#767577" }}
				thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onChange={() => {
					setNumber(number + 1);
				}}
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
			<Text>turn {isEnabled ? "on" : "off"}</Text>
			<Text style={styles.text}>{number < 50 ? "" : "hello, user?"}</Text>
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

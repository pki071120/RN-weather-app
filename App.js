import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Switch } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<View style={{ flex: 1, backgroundColor: "red" }}></View>
			<View style={{ flex: 1, backgroundColor: "orange" }}></View>
			<View style={{ flex: 1, backgroundColor: "green" }}></View>
			<StatusBar barStyle="light-content" style="light" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

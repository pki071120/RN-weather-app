import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
	return (
		<View style={styles.container}>
			<View style={styles.cityBox}>
				<Text style={styles.city}>city</Text>
			</View>
			<View style={styles.weatherBox}>
				<View style={styles.day}>
					<Text style={styles.date}>june</Text>
					<Text style={styles.weather}>weather</Text>
				</View>
				<View style={styles.tempBox}>
					<Text style={styles.temp}>temp</Text>
				</View>
			</View>
			<StatusBar barStyle="light-content" style="light" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffe01a",
	},

	cityBox: {
		flex: 1,
	},
	city: {
		flex: 1,
		marginTop: 50,
		paddingTop: 20,
		textAlign: "center",
		fontSize: 40,
		fontWeight: "bold",
	},

	weatherBox: {
		flex: 3,
	},
	day: {
		flex: 0.2,
		textAlign: "center",
		alignItems: "center",
	},
	date: {
		flex: 1,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",

		paddingTop: 12,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,

		backgroundColor: "black",
		borderRadius: 20,

		overflow: "hidden",
	},
	weather: {
		flex: 1.5,
		marginTop: 20,
		fontSize: 25,
		fontWeight: "bold",
	},

	tempBox: {
		flex: 0.3,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	temp: {
		fontSize: 120,
	},
});

export default App;

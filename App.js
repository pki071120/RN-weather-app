import { StatusBar } from "expo-status-bar";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const App = () => {
	return (
		<View style={styles.container}>
			<View style={styles.cityBox}>
				<Text style={styles.city}>city</Text>
			</View>
			<View style={styles.dateBox}>
				<Text style={styles.date}>june</Text>
			</View>
			<ScrollView
				pagingEnabled
				contentContainerStyle={styles.weatherRoot}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.weatherInner}>
					<View style={styles.day}>
						<Text style={styles.weather}>weather</Text>
					</View>
					<View style={styles.tempBox}>
						<Text style={styles.temp}>temp</Text>
					</View>
				</View>
				<View style={styles.weatherInner}>
					<View style={styles.day}>
						<Text style={styles.weather}>weather</Text>
					</View>
					<View style={styles.tempBox}>
						<Text style={styles.temp}>temp</Text>
					</View>
				</View>
				<View style={styles.weatherInner}>
					<View style={styles.day}>
						<Text style={styles.weather}>weather</Text>
					</View>
					<View style={styles.tempBox}>
						<Text style={styles.temp}>temp</Text>
					</View>
				</View>
			</ScrollView>
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
		flex: 0.3,
	},
	city: {
		flex: 1,
		marginTop: 50,
		paddingTop: 20,
		textAlign: "center",
		fontSize: 40,
		fontWeight: "bold",
	},

	dateBox: {
		alignItems: "center",
	},
	date: {
		paddingTop: 10,
		paddingBottom: 16,
		paddingLeft: 20,
		paddingRight: 20,
		fontWeight: "bold",
		color: "white",
		backgroundColor: "black",
		borderRadius: 20,
		overflow: "hidden",
	},

	weatherRoot: {},
	weatherInner: {
		flex: 3,
		width: SCREEN_WIDTH,
	},
	day: {
		flex: 0.2,
		textAlign: "center",
		alignItems: "center",
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

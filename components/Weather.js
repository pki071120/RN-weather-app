import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Weather = ({ day }) => {
	const weatherDes = (day) => {
		const weatherIconMap = {
			Clouds: "weather-cloudy",
			Rain: "weather-rainy",
			Drizzle: "weather-rainy",
			Snow: "weather-snowy",
			Thunderstorm: "weather-thunderstorm",
			Clear: "weather-sunny",
		};

		const iconType = weatherIconMap[day.weather[0].main] || "weather-cloudy";

		return iconType;
	};
	return (
		<>
			<View style={styles.day}>
				<Text style={styles.weather}>
					{day.weather[0].description}{" "}
					<MaterialCommunityIcons
						name={weatherDes(day)}
						size={24}
						color="black"
					/>
				</Text>
			</View>
			<View style={styles.tempCon}>
				<Text style={styles.temp}>{Math.round(day.temp.day)}°</Text>
			</View>
		</>
	);
};

export default Weather;

const styles = StyleSheet.create({
	day: {
		flex: 0.1,
		textAlign: "center",
		alignItems: "center",
	},
	weather: {
		flex: 1.5,
		marginTop: 20,
		fontSize: 25,
		fontWeight: "bold",
	},

	tempCon: {
		flex: 0.5,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	temp: {
		fontSize: 160,
	},
});

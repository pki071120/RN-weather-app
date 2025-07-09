import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const Forecast = ({ day, forecastDay }) => {
	return (
		<View style={styles.forecastCon}>
			<View style={styles.forecastTextBox}>
				<Text style={styles.forecastTitle}>Week Forecast</Text>
				<Text style={styles.forecastDate}>{forecastDay}</Text>
			</View>
			<View style={styles.forecastInfo}>
				<View style={styles.forecastItem}>
					<Feather name="wind" size={40} color="white" />
					<Text style={{ fontSize: 20, paddingTop: 10, color: "white" }}>
						{parseFloat(day.wind_speed).toFixed(0)}km/h
					</Text>
					<Text style={{ fontSize: 16, paddingTop: 10, color: "white" }}>
						풍속
					</Text>
				</View>
				<View style={styles.forecastItem}>
					<Ionicons name="water-outline" size={40} color="white" />
					<Text style={{ fontSize: 20, paddingTop: 10, color: "white" }}>
						{parseFloat(day.pop).toFixed(0)}%
					</Text>
					<Text style={{ fontSize: 16, paddingTop: 10, color: "white" }}>
						강수확률
					</Text>
				</View>
				<View style={styles.forecastItem}>
					<MaterialCommunityIcons
						name="sun-wireless-outline"
						size={40}
						color="white"
					/>
					<Text style={{ fontSize: 20, paddingTop: 10, color: "white" }}>
						{parseFloat(day.uvi).toFixed(0)}UV
					</Text>
					<Text style={{ fontSize: 16, paddingTop: 10, color: "white" }}>
						자외선
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Forecast;

const styles = StyleSheet.create({
	forecastCon: {
		flex: 0.6,
		alignItems: "center",
	},
	forecastTextBox: {
		width: "80%",
		flexDirection: "row",
		alignItems: "center",
	},
	forecastTitle: {
		fontSize: 25,
		fontWeight: "bold",
	},
	forecastDate: {
		fontSize: 15,
		fontWeight: "bold",
		flex: 1,
		height: "100%",
		textAlign: "right",
		paddingTop: 10,
		paddingRight: 10,
	},
	forecastInfo: {
		flex: 0.6,
		backgroundColor: "black",
		flexDirection: "row",
		width: "80%",
		borderRadius: 10,
		marginTop: 10,
		justifyContent: "center",
	},
	forecastItem: {
		width: "30%",
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
	},
});

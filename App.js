import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
} from "react-native";
import { WEATHER_API_KEY, LOCATION_API_KEY } from "@env";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import * as Location from "expo-location";
import axios from "axios";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// https://www.googleapis.com/geolocation/v1/geolocate?key=
const App = () => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	const [city, setCity] = useState(null);
	const [weather, setWeather] = useState([]);

	const [permitted, setPermitted] = useState(true);

	const locationData = async () => {
		const { granted } = await Location.requestForegroundPermissionsAsync();

		if (!granted) {
			setPermitted(false);
			setErrorMsg("위치에 대한 권한 부여가 거부되었습니다");
			return;
		}

		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync({ accuracy: 5 });

		// const address = await Location.reverseGeocodeAsync(
		// 	{ latitude, longitude },
		// 	{ useGoogleMaps: false }
		// );
		// console.log(address[0].region);
		// const cityName =
		// 	address[0].city || address[0].region || address[0].district;
		// setCity(cityName);

		const locationApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${LOCATION_API_KEY}`;
		const locationRes = await axios.get(locationApiUrl);
		const cityName =
			locationRes.data.results[5].address_components[0].long_name;
		setCity(cityName);

		const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;
		const weatherRes = await axios.get(weatherApiUrl);
		console.log(weatherRes.data.daily);
		setWeather(weatherRes.data.daily);
	};

	useEffect(() => {
		locationData();
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.cityBox}>
				<Text style={styles.city}>{city}</Text>
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
				{weather.length !== 0 ? (
					weather.map((day, index) => (
						<View key={index} style={styles.weatherInner}>
							<View style={styles.day}>
								<Text style={styles.weather}>
									{day.weather[0].description}{" "}
									{day.weather[0].id > 800 && day.weather[0].id < 805 && (
										<MaterialCommunityIcons
											name="weather-cloudy"
											size={24}
											color="black"
										/>
									)}
									{day.weather[0].id === 800 && (
										<MaterialCommunityIcons
											name="weather-sunny"
											size={24}
											color="black"
										/>
									)}
									{day.weather[0].id > 700 && day.weather[0].id < 800 && (
										<MaterialCommunityIcons
											name="weather-cloudy"
											size={24}
											color="black"
										/>
									)}
									{day.weather[0].id >= 600 && day.weather[0].id < 700 && (
										<MaterialCommunityIcons
											name="weather-snowy"
											size={24}
											color="black"
										/>
									)}
									{day.weather[0].id >= 300 && day.weather[0].id < 600 && (
										<MaterialCommunityIcons
											name="weather-rainy"
											size={24}
											color="black"
										/>
									)}
									{day.weather[0].id >= 200 && day.weather[0].id < 300 && (
										<MaterialCommunityIcons
											name="weather-thunderstorm"
											size={24}
											color="black"
										/>
									)}
								</Text>
							</View>
							<View style={styles.tempBox}>
								<Text style={styles.temp}>{Math.round(day.temp.day)}°</Text>
							</View>
						</View>
					))
				) : (
					<View style={styles.weatherInner}>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				)}
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

	tempBox: {
		flex: 0.5,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	temp: {
		fontSize: 160,
	},
});

export default App;

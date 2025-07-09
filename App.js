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
import { Weather, Forecast } from "./components";

import * as Location from "expo-location";
import axios from "axios";
import { useRegDate } from "./hooks/useRegDate";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// https://www.googleapis.com/geolocation/v1/geolocate?key=
const App = () => {
	const [errorMsg, setErrorMsg] = useState(null);

	const [city, setCity] = useState(null);
	const [weather, setWeather] = useState([]);
	const { currDate, forecastDay } = useRegDate();

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

		const locationApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${LOCATION_API_KEY}`;
		const locationRes = await axios.get(locationApiUrl);
		const cityName =
			locationRes.data.results[4].address_components[0].long_name;

		const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;
		const weatherRes = await axios.get(weatherApiUrl);

		setCity(cityName);
		setWeather(weatherRes.data.daily);
	};

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

	useEffect(() => {
		locationData();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.cityCon}>
				<Text style={styles.city}>{city}</Text>
			</View>
			<View style={styles.dateCon}>
				<Text style={styles.date}>{currDate}</Text>
			</View>
			<ScrollView
				pagingEnabled
				contentContainerStyle={styles.weatherRoot}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				{weather.length !== 0 ? (
					weather.map((day, index) => (
						<View key={index} style={styles.weatherCon}>
							<Weather day={day} />
							<Forecast day={day} forecastDay={forecastDay} />
						</View>
					))
				) : (
					<View style={styles.weatherCon}>
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

	cityCon: {
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

	dateCon: {
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
	weatherCon: {
		flex: 3,
		width: SCREEN_WIDTH,
	},
});

export default App;

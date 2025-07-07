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
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";
import axios from "axios";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const useRegDate = () => {
	const [currDate, setCurrDate] = useState(null);
	const [forecastDay, setForecastDay] = useState(null);
	useEffect(() => {
		const date = new Date();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let dayOfWeek = date.getDay();
		let dayOfWeekString = ["일", "월", "화", "수", "목", "금", "토"];

		let hours = date.getHours();
		let minutes = date.getMinutes();

		let ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12 || 12;

		minutes = minutes < 10 ? `0${minutes}` : minutes;
		let dateString = `${month}월 ${day}일 ${dayOfWeekString[dayOfWeek]}요일 ${hours}:${minutes} ${ampm}`;

		setCurrDate(dateString);
		day === 1
			? setForecastDay(day + "st")
			: day === 2
				? setForecastDay(day + "nd")
				: day === 3
					? setForecastDay(day + "rd")
					: setForecastDay(day + "th");
	}, []);

	return { currDate, forecastDay };
};

// https://www.googleapis.com/geolocation/v1/geolocate?key=
const App = () => {
	const [location, setLocation] = useState(null);
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

		const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;
		const weatherRes = await axios.get(weatherApiUrl);
		console.log(weatherRes);

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
					weather.map((day, index) => {
						return (
							<View key={index} style={styles.weatherCon}>
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
								<View style={styles.forecastCon}>
									<View style={styles.forecastTextBox}>
										<Text style={styles.forecastTitle}>Week Forecast</Text>
										<Text style={styles.forecastDate}>{forecastDay}</Text>
									</View>
									<View style={styles.forecastInfo}>
										<View style={styles.forecastItem}>
											<Feather name="wind" size={40} color="white" />
											<Text
												style={{ fontSize: 20, paddingTop: 10, color: "white" }}
											>
												{parseFloat(day.wind_speed).toFixed(0)}km/h
											</Text>
											<Text
												style={{ fontSize: 16, paddingTop: 10, color: "white" }}
											>
												풍속
											</Text>
										</View>
										<View style={styles.forecastItem}>
											<Ionicons name="water-outline" size={40} color="white" />
											<Text
												style={{ fontSize: 20, paddingTop: 10, color: "white" }}
											>
												30%
											</Text>
											<Text
												style={{ fontSize: 16, paddingTop: 10, color: "white" }}
											>
												강수확률
											</Text>
										</View>
										<View style={styles.forecastItem}>
											<Feather name="eye" size={40} color="white" />
											<Text
												style={{ fontSize: 20, paddingTop: 10, color: "white" }}
											>
												1.5km/h
											</Text>
											<Text
												style={{ fontSize: 16, paddingTop: 10, color: "white" }}
											>
												시야
											</Text>
										</View>
									</View>
								</View>
							</View>
						);
					})
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
	forecastItemText: {},
});

export default App;

import React, { useState, useEffect } from "react";

export const useRegDate = () => {
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

import {
	format,
	getTime,
	formatDistanceToNow,
	parse,
	parseISO,
	isValid,
} from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
	const fm = newFormat || "dd MMM yyyy";

	return date ? format(new Date(date), fm) : "";
}

export function fDateAlt(dateString) {

	let parsedDate;
	// Check if the dateString is in DD/MM/YYYY format
	const isDMYFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(dateString);

	if (isDMYFormat) {
		// Parse the date string in DD/MM/YYYY format
		parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
	} else {
		// Assume the date string is in ISO format
		parsedDate = parseISO(dateString);
	}

	if (isValid(parsedDate)) {
		return format(parsedDate, "PP");
	} else {
		// If not a valid date, return the original string
		return dateString;
	}
}

export function fDateTime(date, newFormat) {
	const fm = newFormat || "dd MMM yyyy p";

	return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
	return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
	return date
		? formatDistanceToNow(new Date(date), {
				addSuffix: true,
			})
		: "";
}

export function fTime(time) {
	if (!time) return "";

	const [hours, minutes] = time.split(":");
	const parsedHours = parseInt(hours, 10);
	const period = parsedHours >= 12 ? "PM" : "AM";
	const formattedHours = parsedHours % 12 || 12;

	return `${formattedHours}:${minutes} ${period}`;
}

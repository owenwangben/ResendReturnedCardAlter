import { ValidatorFn, AbstractControl } from "@angular/forms";

export function dateValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } => {
		const dateStr = control.value;

		if (!dateStr) {
			return null;
		}

		// Length of months (will update for leap years)
		const monthLengthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		// Object to return if date is invalid
		const invalidObj = { 'date': true };
		// Parse the date input to integers
		const year = parseInt(dateStr.substr(0, 4), 10);
		const month = parseInt(dateStr.substr(4, 2), 10);
		const day = parseInt(dateStr.substr(6, 2), 10);
		// Today's date
		const now = new Date();

		// First check for yyyymmdd format
		const DATE_REGEX = new RegExp(/^\d{8}$/);
		if (!DATE_REGEX.test(dateStr)) {
			return invalidObj;
		}

		// Validate year and month
		if (year <= 0 || year > 3000 || month === 0 || month > 12) {
			return invalidObj;
		}
		// Adjust for leap years
		if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
			monthLengthArr[1] = 29;
		}
		// Validate day
		if (!(day > 0 && day <= monthLengthArr[month - 1])) {
			return invalidObj;
		}

		return null;
	};
}

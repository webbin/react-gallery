

const getTimeData = (input) => {
	let time;
	if (!input) {
		time = new Date();
	} else {
		time = new Date(input);
	}


	const year = time.getFullYear();
	const month = time.getMonth();
	const day = time.getDay();

	const hour = time.getHours();
	const minute = time.getMinutes();
	const second = time.getSeconds();


	return {
		year,
		month,
		day,

		hour,
		minute,
		second,
	}
};



const TimeUtil = {
	getTimeData,
};


export default TimeUtil;

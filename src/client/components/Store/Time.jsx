import React from 'react';

class Time extends React.Component {

	constructor(props) {
		super(props);
	}

	setFormat(value) {
		let sec_num = parseInt(value, 10),
			hours   = Math.floor(sec_num / 3600),
			minutes = Math.floor((sec_num - (hours * 3600)) / 60),
			seconds = sec_num - (hours * 3600) - (minutes * 60);

		hours = (hours < 10 && hours > 0) ? '0' + hours : hours;
		// minutes = (minutes < 10) ? '0' + minutes : minutes;
		seconds = (seconds < 10) ? '0' + seconds : seconds;

		// if (hours)
		// 	return hours+':'+minutes+':'+seconds;
		// else
			return minutes+':'+seconds;
	}

	render() {
		return (
			<spam>{setFormat(this.props.value)}</spam>
		);
	}

}

export default Time;

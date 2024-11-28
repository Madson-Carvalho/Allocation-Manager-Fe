 const formatSecondsInHoursAndMinutes = (value) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

 export default formatSecondsInHoursAndMinutes

const sumHours = (totalHours, hours) => {
    return totalHours += hours;
};

const subtractHours = (totalHours, hours) => {
    return totalHours -= hours;
};

module.exports = { sumHours: sumHours, subtractHours: subtractHours };
exports.celsiusToFrehenheit = (celsius) => {
    if (!Number.isInteger(celsius)) return undefined;
    return celsius * 9 / 5 + 32;
}

exports.frehenheitToCelsius = (fahrenheit) => {
    if (!Number.isInteger(fahrenheit)) return undefined;
    return (fahrenheit - 32) * 5 / 9;
}
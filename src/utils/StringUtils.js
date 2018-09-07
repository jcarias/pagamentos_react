export const pad = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
};

export const trail = (num, size) => {
    return parseFloat(Math.round((num || 0) * 100) / 100).toFixed(size || 2);
};

export const dateFormatter = (date, longFormat = false) => {
    let dateObj = new Date(date);
    if (longFormat) {
        return dateObj.toLocaleDateString();
    } else {
        return (
            dateObj.getFullYear() +
            "-" +
            pad(dateObj.getMonth() + 1, 2) +
            "-" +
            pad(dateObj.getDate(), 2)
        );
    }
};

export const formatMoney = (value, locale = "pt-PT", currency = "EUR") => {
    const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
    });

    return formatter.format(value);
};

export const formatDuration = (hours = 0, minutes = 0) => {
    let hh = hours + parseInt(minutes / 60, 10);
    let mm = minutes % 60;
    return `${hh}:${pad(mm, 2)} h`;
};

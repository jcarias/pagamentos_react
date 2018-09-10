export const months_pt = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

export const getYears = year => {
    let currentYear =
        !isNaN(Number(year)) && Number(year) > 0
            ? Number(year)
            : new Date().getFullYear();
    return [currentYear - 1, currentYear, currentYear + 1];
};

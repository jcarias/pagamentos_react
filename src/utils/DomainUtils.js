export const calcServiceCost = ({
    priceHour,
    serviceHours: hours,
    serviceMinutes: minutes
}) => {
    let serviceCost =
        (Number(hours) + Number(minutes) / 60) * Number(priceHour);

    return isNaN(serviceCost) ? 0 : serviceCost;
};

export const getWorker = (workers, key) => {
    if (Object.keys(workers)) {
        return workers[key];
    }
    return key;
};

export const getWorkerName = worker => {
    if (worker !== null && typeof worker === "object") {
        return worker.fname + (worker.lname ? " " + worker.lname : "");
    }
    return worker;
};

export const getWorkerAvatarInitials = worker => {
    return (
        worker.fname.substring(0, 1) +
        (worker.lname ? worker.lname.substring(0, 1) : "")
    );
};

export const computeServicesMetrics = services => {
    let metrics = {
        count: 0,
        totalCost: 0,
        min: null,
        max: null,
        avgCost: 0
    };

    if (
        services &&
        Object.keys(services).map(key => {
            let service = services[key];
            let serviceCost = calcServiceCost(service);
            metrics.count += 1;
            metrics.totalCost += serviceCost;
            metrics.min =
                metrics.min === null
                    ? serviceCost
                    : serviceCost < metrics.min
                        ? serviceCost
                        : metrics.min;
            metrics.max =
                metrics.max === null
                    ? serviceCost
                    : serviceCost > metrics.max
                        ? serviceCost
                        : metrics.max;
            metrics.avgCost = metrics.totalCost / metrics.count;
            return metrics;
        })
    )
        return metrics;
};

export const calcSubsides = (services, year) => {
    let semesters = {
        total1stSemester: 0.0,
        total2ndSemester: 0.0
    };

    let middleDate = new Date(
        year || new Date().getFullYear(),
        6,
        1,
        0,
        0,
        0,
        0
    );

    if (
        services &&
        Object.keys(services).map(key => {
            let service = services[key];
            let serviceDate = new Date(service.serviceDate);

            if (serviceDate.getTime() <= middleDate.getTime()) {
                semesters.total1stSemester += service.totalCost;
            } else {
                semesters.total2ndSemester += service.totalCost;
            }
            return semesters;
        })
    );

    return {
        vacations: semesters.total1stSemester / 6,
        thirteenth: semesters.total2ndSemester / 6
    };
};

export const paymentFormats = {
    unknown: "Desconhecido",
    tranf: "Transferência Bancária",
    money: "Dinheiro"
};

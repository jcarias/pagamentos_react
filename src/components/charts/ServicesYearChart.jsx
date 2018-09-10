import React from "react";
import { ComposedChart, Bar, Line, XAxis, Tooltip, Legend } from "recharts";
import { months_pt } from "../../utils/dateUtils";
import { computeServicesMetrics } from "../../utils/DomainUtils";
import { clientSideFilter } from "../../utils/commonUtils";

const ServicesYearChart = props => {
    const data = [
        { name: "J", uv: 4000, pv: 2400, amt: 2400 },
        { name: "B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "C", uv: 2000, pv: 9800, amt: 2290 },
        { name: "D", uv: 2780, pv: 3908, amt: 2000 },
        { name: "E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "G", uv: 3490, pv: 4300, amt: 2100 }
    ];

    const buildData = services => {
        let data = [];
        for (let i = 0; i < months_pt.length; i++) {
            let monthData = {
                name: months_pt[i],
                "Custo Mensal": 0.0,
                totalServices: 0
            };

            //Aggregate Services by Month
            let monthServices = clientSideFilter(services, service => {
                return new Date(service.serviceDate).getMonth() === i;
            });

            //Compute month Totals
            const { count, totalCost } = computeServicesMetrics(monthServices);
            monthData.totalServices = count;
            monthData["Custo Mensal"] = totalCost;

            data.push(monthData);
        }
        console.log(data);
        return data;
    };

    return (
        <ComposedChart
            width={296}
            height={148}
            data={buildData(props.services) || data}
        >
            <XAxis dataKey="name" />

            <Tooltip />
            <Legend />
            <Bar dataKey="Custo Mensal" fill="#ff9900" />
            <Line type="monotype" dataKey="totalServices" stroke="#0099ff" />
        </ComposedChart>
    );
};

export default ServicesYearChart;

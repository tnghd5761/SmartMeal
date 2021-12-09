import React, { Component, Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class High extends Component {
    render() {
        const series1 = this.props.Healthinfo;       

        const options = {
            chart: {
                type: 'bar'		
            },
            title: {
                text: 'My Health info chart'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['체중(Kg)', '골격근량(Kg)', '체지방률(%)']
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.y}</b>",
                    }
                }

            },

            series: [{ name: "data", data: series1 }]

        }
        return (
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Fragment>
        );
    }
}
export default High;
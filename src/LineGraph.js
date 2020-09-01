import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import {casesTypeColors} from './util.js';
import {Paper} from '@material-ui/core';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
        ticks:{
          fontColor:LineGraph.darkMode? "grey":"#D3CEC4"
        }
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
          fontColor:LineGraph.darkMode? "grey":"#D3CEC4"
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType,darkMode, ...props }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=180")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let a= casesType
          let chartData = buildChartData(data,a);
          setData(chartData);
         
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <Paper className={props.className} style={{backgroundColor:darkMode ? "#424242" : "white", }} >
      
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: casesTypeColors[casesType].rgba,
                borderColor: casesTypeColors[casesType].hex,
                data: data,
              },
              
            ],
            color:darkMode ? "white" : "white"
          }}

        />
      )}
    
    </Paper>
   
  );
}

export default LineGraph;
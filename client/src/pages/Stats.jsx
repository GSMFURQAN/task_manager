import { useTheme } from "@emotion/react";
import { Box, Button, Stack, Switch, Typography, useMediaQuery } from "@mui/material";
import React, { Component, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";

const Stats = () => {
    const [data, setData] = useState({
        options: {
            labels: ["Completed", "Pending", "Elapsed"],
            colors:['#7FFF00', '#00FFFF', '#EA3546'],
      chart: {
        type: "donut",
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1000,
            // animateGradually: {
            //     enabled: true,
            //     delay: 150
            // },
            // dynamicAnimation: {
            //     enabled: true,
            //     speed: 350
            // }
        }
},
legend: {
  labels: {
    colors: ['#7FFF00', '#00FFFF', '#EA3546'], // Set the legend text colors here
    useSeriesColors: false
  }
},
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          donut:{size:'35'}
        },
      },
      grid: {
        padding: {
          bottom: -80,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series:[3,4,6]
  });

  
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
 

  const completed = 2
  const pending =4
  const elapsed =1

  

  return (
    <div className="donut">
      {1 && (
          <Stack width={"20%"} position={"relative"} pl={1}>
            <Typography>Stats : </Typography>
          <Chart
            options={data?.options}
            series={data?.series}
            type="donut"
            width="290"
          />
        </Stack>
      )}
    </div>
  );
};

export default Stats;

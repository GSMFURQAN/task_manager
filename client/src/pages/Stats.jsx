import { useQuery } from "@apollo/client";
import { useTheme } from "@emotion/react";
import { Box, Button, MenuItem, Select, Stack, Switch, Typography, useMediaQuery } from "@mui/material";
import React, { Component, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { FILTERED_TASKS, GET_ALL_CATEGORIES } from "../gqlQueries/Quries";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const Stats = () => {
  const [category, setCategory] = useState('')
  const general = useSelector(state => state.general)
  const categoryList = useQuery(GET_ALL_CATEGORIES)
  const filteredTasks = useQuery(FILTERED_TASKS, {
    variables: {
        category,
    }
})
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
              width: 174,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series:[  ]
  });


  const completed = useMemo(() => filteredTasks?.data?.filteredTasks?.filter((x) => x.done === true).length );
  const pending = useMemo(() => filteredTasks?.data?.filteredTasks?.filter((x) => x.done === false && dayjs(Number(x.dueDate)).diff(dayjs(), "hours") > 0).length);
  const elapsed = useMemo(() => filteredTasks?.data?.filteredTasks?.filter((x) => x.done === false && dayjs(Number(x.dueDate)).diff(dayjs(), "hours") <= 0 ).length);

  useEffect(() => {
    if (filteredTasks?.data?.filteredTasks) {
      setData((prevData) => ({
        ...prevData,
        series: [completed, pending, elapsed],
      }));
    }
  }, [category, completed, pending, elapsed]);
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  

  return (
    <div className="donut">
        <Stack direction={'row'} spacing={1} mx={{lg:4,md:4,sm:1,xs:1}}>

            <Typography variant="subtitle2">Category : </Typography>
            <Select
            variant="standard"
                            size="small"
                            sx={{ marginTop: "9px", color: 'white', width:'48%'  }}
                            value={category}
                            label="Category"
                            onChange={(e) =>
                              setCategory(e.target.value)
                            }
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            >
                            {general && general?.selectedCategories?.map((option) => (
                              <MenuItem key={option._id} value={option.name} sx={{fontSize:'14px'}}>
                                  <Typography sx={{fontSize:'14px'}}>{option.name}
                                    </Typography>  
                                </MenuItem>
                            ))}
                        </Select>
                            </Stack>
          <Stack width={"100%"} position={"relative"} pl={1}>
          <Chart
            options={data?.options}
            series={data?.series}
            type="donut"
            width="290"
          />
        </Stack>
    </div>
  );
};

export default Stats;

import React, { useEffect, useState } from "react";
import {
    Badge,
    Box,
    Button,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Switch,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    DateTimePicker,
    LocalizationProvider,

} from "@mui/x-date-pickers";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../gqlQueries/Quries";
import { CREATE_TASK } from "../gqlQueries/Mutations";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { lg: "40vw", xs: "85vw" },
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const AddTask = ({ id, selectedDate, open, setOpen }) => {

    const [parentDate, setParentDate] = useState("");
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    const [tabs, setTabs] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("account"));
    const { data, loading, error } = useQuery(GET_ALL_CATEGORIES)
    const [createTask, task] = useMutation(CREATE_TASK,{
        refetchQueries:['getFilteredTasks']
    })
    console.log('gxxx', data)
    const [goalData, setGoalData] = React.useState({
        task: "",
        done: false,
        note: "",
        dueDate: "",
        category: "",
    });
    console.log('sux',)

    const handleAdd = async () => {
        createTask({
            variables: {
                newTask: {
                    ...goalData,
                }
            }
        })
    };

    useEffect(() => {
        if (!task.loading) {
            setTimeout(()=>{
                setOpen(false)
            },1000)
        }
    }, [task.loading])

    useEffect(() => {
        return () => { };
    }, []);

    return (
        <div>
            {" "}
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <Box sx={style}>
                    <Typography variant="h6" textTransform={'capitalize'} mb={2}>Add your task</Typography>
                    <Stack display={"flex"} direction={"column"} spacing={2}>
                        <Select
                            size="small"
                            sx={{ marginTop: "9px", color: 'white', maxWidth: { md: '50%', sm: '80%', lg: '60%' } }}
                            value={goalData.category}
                            label="Category"
                            onChange={(e) =>
                                setGoalData({ ...goalData, category: e.target.value })
                            }
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                        >
                            {data && data.categories.map((option) => (
                                <MenuItem key={option._id} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label="Task"
                            type="text"
                            size="small"
                            sx={{ maxWidth: { md: '50%', sm: '80%', lg: '60%' } }}

                            value={goalData.task}
                            onChange={(e) =>
                                setGoalData({ ...goalData, task: e.target.value })
                            }
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box>
                                <DemoContainer components={['DateTimePicker']}  >
                                    <DateTimePicker label="DueDate Date" sx={{ maxWidth: { md: '50%', sm: '80%', lg: '60%' } }}
                                        value={goalData.e}
                                        onChange={(e) => setGoalData({ ...goalData, dueDate: e.$d })}
                                    />
                                </DemoContainer>
                            </Box>
                        </LocalizationProvider>
                        <TextField
                            multiline
                            size="small"
                            label="Note"
                            type="text"
                            value={goalData.note}
                            onChange={(e) =>
                                setGoalData({ ...goalData, note: e.target.value })
                            }
                            maxRows={5}

                        />

                    </Stack>

                    <Stack
                        pt={2}
                        display={"flex"}
                        direction={"row"}
                        alignSelf={"flex-end"}
                        spacing={2}
                    >
                        <Button
                            variant="outlined"

                            color="error"
                        >
                            Close
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleAdd()}
                            color="primary"
                        >
                            {!task.loading ? "Add" : "Creating new task..."}
                        </Button>
                    </Stack>

                </Box>
            </Modal>
        </div>
    );
};

export default AddTask;

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
import { CREATE_TASK, EDIT_TASK } from "../gqlQueries/Mutations";
import dayjs from "dayjs";

const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { lg: "40vw", xs: "85vw" },
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

const AddTask = ({ id, selectedDate, open, setOpen, editData }) => {

    const [parentDate, setParentDate] = useState("");
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    const [tabs, setTabs] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("account"));
    const { data, loading, error } = useQuery(GET_ALL_CATEGORIES)
    const [createTask, task] = useMutation(CREATE_TASK, {
        refetchQueries: ['getFilteredTasks']
    })
    const [editTask, editedTask] = useMutation(EDIT_TASK, {
        refetchQueries: ['getFilteredTasks']
    })
    const [goalData, setGoalData] = React.useState({
        task: editData?.isEdit ? editData.task : "",
        done: false,
        note: editData?.isEdit ? editData.note : "",
        dueDate: editData?.isEdit ? dayjs(Number(editData.dueDate)).format("YYYY-MM-DDTHH:mm") : dayjs().add(1, 'day').hour(10).minute(0),
        category: editData?.isEdit ? editData.category : "",
    });

    const handleAdd = async () => {
        editData?.isEdit ?
            editTask({
                variables: {
                    task: {
                        _id: editData._id,
                        taskDetails: goalData
                    }
                }
            })
            :
            createTask({
                variables: {
                    newTask: {
                        taskDetails: goalData,
                    }
                }
            })
            setTimeout(() => {
                setOpen(false)
            }, 1000)
    };

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
                    <Typography variant="h6" textTransform={'capitalize'} mb={2}>{editData?.isEdit ? 'Edit' : 'Add'} your task</Typography>
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
                            {data && data?.categories?.filter((x)=>x.name != 'Today').map((option) => (
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
                                <DemoContainer components={['DateTimePicker']}  >
                                    <DateTimePicker label="DueDate Date"
                                        value={dayjs(goalData?.dueDate)}
                                        sx={{
                                            '.MuiInputBase-root': {
                                                width: { md: '50%', sm: '88%',xs:'88%', lg: '62%' } , // Adjust width here
                                              height: '40px', // Adjust height here
                                            },
                                          }}
                                        onChange={(e) => setGoalData({ ...goalData, dueDate: e.$d })}
                                    />
                                </DemoContainer>
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
                            onClick={() => setOpen(false)}
                            color="error"
                        >
                            Close
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleAdd()}
                            color="primary"
                        >
                            {editData?.isEdit ? "Update" : "Create"}
                        </Button>
                    </Stack>

                </Box>
            </Modal>
        </div>
    );
};

export default AddTask;

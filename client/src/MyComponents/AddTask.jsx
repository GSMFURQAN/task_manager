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

    const [goalData, setGoalData] = React.useState({
        title: "",
        note: "",
        dueDate: "",
        subTasks: [],
        major: false,
        image: "",
        category: "",
        docs: []
    });

    // const handleFileUpload = async (file) => {
    //     setFileUploadProgress(true);
    //     try {
    //         const downloadURL = await uploadFile(file);
    //         console.log("File uploaded successfully:", downloadURL);
    //         downloadURL && setGoalData({ ...goalData, image: downloadURL });
    //         setFileUploadProgress(false);
    //         // You can now use the downloadURL, e.g., set it in your state or send it to your backend
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //     }
    // };

    // const handleDocsUpload = async (file) => {
    //     setFileUploadProgress(true);
    //     try {
    //         const downloadURL = await uploadFile(file);
    //         console.log("File uploaded successfully:", downloadURL);
    //         downloadURL && setGoalData({ ...goalData, docs: [...goalData.docs, downloadURL] });
    //         setFileUploadProgress(false);
    //         // You can now use the downloadURL, e.g., set it in your state or send it to your backend
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //     }
    // };



    const handleAdd = async () => {
        // const days = moment(
        //     id && goalData.dueDate.$d ? goalData.dueDate.$d : goalData.dueDate
        // ).diff(moment(), "days");
        // const goalView =
        //     days < 1 ? "day" : days < 32 ? "month" : days < 366 ? "year" : "future";

        // const payload = {
        //     title: goalData.title,
        //     note: goalData.note,
        //     dueDate: goalData.dueDate,
        //     done: false,
        //     dayView: goalView,
        //     parentId: "",
        //     viewed: "NO",
        //     major: goalData.major,
        //     image: goalData.image,
        //     userId: userData?.userId,
        //     category: tabs.filter((x) => x.id == goalData?.category)[0],
        //     docs: goalData.docs,
        // };
        // if (
        //     general.action == "subTask" &&
        //     moment(goalData.dueDate).toISOString() > general.dueDate
        // ) {
        //     dispatch(
        //         selectSnack({
        //             severity: "error",
        //             message: "selcted date must be less than parent",
        //             open: true,
        //         })
        //     );
        // } else if (general.action == "edit") {
        //     await updateTodo({ ...payload, _id: id }).then(async () => {
        //         dispatch(fetchData({ dayView: general.dayView }));
        //         dispatch(selectView({ ...general, id: "", action: "" }));
        //     });
        // } else if (general.action == "subTask") {
        //     await addNewTodo({ ...payload, parentId: id, subTask: true }).then(() => {
        //         dispatch(fetchData({ dayView: general.dayView }));
        //         dispatch(selectView({ ...general, id: "", action: "" }));
        //     });
        // } else {
        //     await addNewTodo(payload).then(() => {
        //         dispatch(fetchData({ dayView: general.dayView }));
        //     });
        // }
        // !loading &&
        //     dispatch(
        //         selectView({ ...general, id: "", action: "", addGoalOpen: false })
        //     );
        // setGoalData({});
        // dispatch(getProgress({ dayView: general.dayView }));
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
                    <Typography variant="h6" textTransform={'capitalize'} mb={2}>Add your task</Typography>
                    <Stack display={"flex"} direction={"column"} spacing={2}>
                        <Select
                            size="small"
                            sx={{ marginTop: "9px", color: 'white', maxWidth: { md: '50%', sm: '100%', lg: '60%' } }}
                            value={goalData.category}
                            label="Category"
                            onChange={(e) =>
                                setGoalData({ ...goalData, category: e.target.value })
                            }
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                        >
                            {tabs.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label="Task"
                            type="text"
                            size="small"
                            sx={{ maxWidth: { md: '50%', sm: '100%', lg: '60%' } }}

                            value={goalData.title}
                            onChange={(e) =>
                                setGoalData({ ...goalData, task: e.target.value })
                            }
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box>
                                <DemoContainer components={['DateTimePicker']}  >
                                    <DateTimePicker label="DueDate Date"  sx={{maxWidth: { md: '50%', sm: '100%', lg: '60%' } }}
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
                            {!fileUploadProgress ? "Add" : "image uploading..."}
                        </Button>
                    </Stack>

                </Box>
            </Modal>
        </div>
    );
};

export default AddTask;

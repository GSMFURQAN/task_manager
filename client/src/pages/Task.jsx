import {
    Badge,
    Box,
    Button,
    Checkbox,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { COMPLETE_TASK } from "../gqlQueries/Mutations";

const Task = ({ todo, index }) => {
    const general = useSelector((state) => state.general)
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = React.useState();
const [completeTask] = useMutation(COMPLETE_TASK, {refetchQueries:['getFilteredTasks']})
    const handleEditTodo = async (id) => {

    };

    const handleDeleteTodo = async (id) => {

    };
    const handleChangeDone = async (id, done) => {
completeTask({
    variables:{
        taskvalues:{
            _id:id,
            done: done ? false :true
        }
    }
})
    };
    const handleAddNewTodo = () => {

    };
    console.log('dtx', todo.task, dayjs(Number(todo.dueDate)).diff(dayjs(), "hours") )
    return (
        <div style={{ width: '100%' }}>
            {/* <Divider /> */}
            <Stack
                sx={{ maxHeight: "400px", overflowY: "auto" }}
                key={todo.id}
                borderRadius={4}
                mx={1}
                px={2}
                onMouseOver={() => setSelectedId(todo._id)}
                onMouseLeave={() => setSelectedId(todo._id)}
            >
                <Stack>
                    <Stack
                        display={"flex"}
                        direction={"row"}
                        justifyContent={"space-between"}
                    >
                        <Stack direction={"row"} display={"flex"} ml={-1}>
                            <Typography my={'auto'} fontSize={12}>{index + 1}</Typography>
                            <Checkbox
                                size="small"
                                checked={todo.done}
                                onChange={() => handleChangeDone(todo._id, todo.done)}
                            />
                            <Typography
                                my={"auto"}
                                style={{
                                    textDecoration: todo.done ? "line-through" : "none",
                                }}
                                variant="h6"
                                fontSize={13}
                                color={`${todo?.done
                                    ? "green"
                                    : dayjs(Number(todo.dueDate)).diff(dayjs(), "hours") <= 0
                                    ? "red"
                                        : "cyan"
                                    }`}
                            >
                                {todo.task}
                            </Typography>
                        </Stack>
                        <Typography
                            my={"auto"}
                            maxWidth={{ xs: 100, sm: 200 }}
                            fontSize={12}
                        >
                            Due date:  { dayjs(Number(todo?.dueDate)).format('DD-MM-YYYY')}
                            {/* {moment(todo.dueDate).format("DD MMMM YYYY , hh:mm a")} */}
                        </Typography>
                    </Stack>

                    <Stack
                        // width={{ xl: 600, lg: 520, md: 520, sm: 400, xs: 300 }}
                        my={0.5}
                        display={'flex'}
                        direction={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            display={"inline-block"}
                            fontSize={12}
                            mb={0.5}
                        >
                            <b>Note :</b> &nbsp; {todo.note}
                        </Typography>{" "}
                        {/* <Timer daysLeft={moment(todo.dueDate).diff(moment(), "days")}/> */}
                        {/* {todo.docs.length > 0 && <Badge badgeContent={`+ ${todo.docs.length -1}`} color="primary">
                <img
                style={{borderRadius:'12px'}}
                src={todo.docs[0]}
                width={"40rem"}
                height={"40rem"}
                alt="doc"
                //   onClick={()=>dispatch(selectView({...general, imageGridModal : true}))}
                />
                </Badge>} */}
                    <Stack display={'flex'} direction={'row'}  spacing={2}>
                    <EditIcon fontSize='small'/>
                    <DeleteIcon fontSize="small" sx={{cursor:'pointer'}} onClick={()=>{}} />
                </Stack>
                    </Stack>
                </Stack>
                {/* <ImageGrid media={todo.docs} /> */}
            </Stack>
            <div style={{border:'0.1px solid gray',margin:'0px 6px'}}></div> 
        </div>
    );
};

export default Task;

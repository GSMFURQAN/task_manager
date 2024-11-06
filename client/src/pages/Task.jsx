import {
    Badge,
    Box,
    Button,
    Checkbox,
    Divider,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { COMPLETE_TASK, DELETE_TASK, EDIT_TASK } from "../gqlQueries/Mutations";
import AddTask from "../MyComponents/AddTask";
import { NavigateNext } from "@mui/icons-material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const Task = ({ todo, index }) => {
    const general = useSelector((state) => state.general)
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = React.useState();
    const [openEdit, setOpenEdit] = useState(false)
    const [completeTask] = useMutation(COMPLETE_TASK, { refetchQueries: ['getFilteredTasks'] })
    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: ['getFilteredTasks']
    })
    const [editTask, editedTask] = useMutation(EDIT_TASK, {
        refetchQueries: ['getFilteredTasks']
    })

    const handleDeleteTask = async (id) => {
        deleteTask({
            variables: {
                id: id
            }
        })
    };
    const handleChangeDone = async (id, done) => {
        completeTask({
            variables: {
                taskvalues: {
                    _id: id,
                    done: done ? false : true
                }
            }
        })
    };

    const handledueDateChange = (movement) => {

        editTask({
            variables: {
                task: {
                    _id: todo._id,
                    taskDetails: {

                        dueDate: movement == 'forward' ? dayjs(Number(todo.dueDate)).add(1, 'day').format('YYYY-MM-DD HH:mm:ss') : dayjs(Number(todo.dueDate)).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            }
        })
    }

    return (
        <div style={{ width: '100%' }}>
            {/* <Divider /> */}
            <Stack
                sx={{ maxHeight: "400px", overflowY: "auto" }}
                key={todo.id}
                borderRadius={4}
                mx={1}
                pl={1.5}
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
                                    textTransform: 'capitalize',
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
                        <Stack direction={'row'} spacing={0}>
                            <Tooltip title="Move task to previous day">
                                <ChevronLeftIcon sx={{ m: 'auto' }} onClick={() => handledueDateChange('back')} fontSize="small" cursor='pointer' />
                            </Tooltip>
                            <Typography
                                my={"auto"}
                                fontSize={12}
                            >Due date: <span style={{
                                color: todo?.done
                                    ? "green"
                                    : dayjs(Number(todo.dueDate)).diff(dayjs(), "hours") <= 0
                                        ? "red"
                                        : "cyan"
                            }}>
                                    {dayjs(Number(todo?.dueDate)).format('DD-MM-YYYY')}
                                </span>
                            </Typography>
                            <Tooltip title="Move task to next day">
                                <NavigateNext sx={{ m: 'auto' }} onClick={() => handledueDateChange('forward')} fontSize="small" cursor='pointer' />
                            </Tooltip>
                        </Stack>
                    </Stack>

                    <Stack
                        // width={{ xl: 600, lg: 520, md: 520, sm: 400, xs: 300 }}
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
                        <Stack display={'flex'} direction={'row'} spacing={2}>
                            <EditIcon fontSize='small' sx={{ cursor: 'pointer' }} onClick={() => setOpenEdit(true)} />
                            <DeleteIcon fontSize="small" sx={{ cursor: 'pointer' }} onClick={() => handleDeleteTask(todo._id)} />
                        </Stack>
                    </Stack>
                </Stack>
                {/* <ImageGrid media={todo.docs} /> */}
            </Stack>
            <div style={{ border: '0.1px solid gray', margin: '0px 6px' }}></div>
            {<AddTask open={openEdit} setOpen={setOpenEdit} editData={{ ...todo, isEdit: true }} />}
        </div>
    );
};

export default Task;

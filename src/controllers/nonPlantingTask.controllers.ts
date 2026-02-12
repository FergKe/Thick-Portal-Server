import { type Request, type Response, type NextFunction } from "express";
import {
  type TasksRes,
  type TaskParams,
  type TaskRes,
  type TaskCreateReq,
  type TaskUpdateReq,
  type TaskDeleteRes,
  type TaskType,
  type NewTask
} from "../types/task.types.js";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../services/nonPlantingTask.services.js"

export const getAllTasksController = async (
  req: Request<{}, TasksRes<TaskType>>,
  res: Response<TasksRes<TaskType>>,
  next: NextFunction
) => {
  try {
    const Tasks = await getAllTasks();

    res.status(200).json(Tasks);
  } catch (error) {
    return next(error);
  };
};

export const getTaskByIdController = async (
  req: Request<TaskParams, TaskRes<TaskType>>,
  res: Response<TaskRes<TaskType>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const Task = await getTaskById(_id);

    res.status(200).json(Task);
  } catch (error) {
    return next(error);
  };
};

export const createTaskController = async (
  req: Request<{}, TaskRes<TaskType>, TaskCreateReq>,
  res: Response<TaskRes<TaskType>>,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const newTask = await createTask(data);

    res.status(201).json(newTask);
  } catch (error) {
    return next(error);
  }
};

export const updateTaskController = async (
  req: Request<TaskParams, TaskRes<TaskType>, TaskUpdateReq>,
  res: Response<TaskRes<TaskType>>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params
    const data = req.body;
    const updatedTask = await updateTask(_id, data)

    res.status(200).json(updatedTask);
  } catch (error) {
    return next(error);
  }
};

export const deleteTaskController = async (
  req: Request<TaskParams, TaskDeleteRes>,
  res: Response<TaskDeleteRes>,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const result = await deleteTask(_id);

    res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

import {
    type HydratedDocument,
    type DeleteResult
} from "mongoose";
import Task from "../models/nonPlantingTask.model.js"
import {
    type NewTask,
    type TaskCreateReq,
    type TaskFromDB,
    type TaskRes,
    type TaskType,
    type TaskUpdateReq,
} from "../types/task.types.js";
import { AppError } from "../errors/AppError.js";

export const getAllTasks = async () => {
    try {
        const tasks = await Task.find().lean<TaskFromDB[] | null>();

        if ( !tasks ) { 
            throw new AppError(404, "Tasks not found")
        };

        const TasksIdToString: TaskType[] = tasks.map((task) => ({
            ...task,
            _id: task._id.toString()
        }));

        return { ok: true , tasks: TasksIdToString }
        
    } catch ( error: any )  {
        if (error instanceof AppError) throw error;

        throw new AppError(500, "Internal server error")
    }
};

export const getTaskById = async (
    _id: string
) => {
    try {
            const task= await Task.findById(_id).lean<TaskFromDB | null>();
    
            // Possible this does not catch, might need to change later
            if ( !task ) {
                throw new AppError(404, "Task not found");
            };
            
            const resTask = { ...task, _id: task._id.toString()}

            return { ok: true , task: resTask };
    
        } catch ( error: any ) {
            if (error instanceof AppError) throw error;
    
            throw new AppError(500, "Internal server error")
        }
};

export const createTask = async (
    data: TaskCreateReq,
) => {
    try {
        const newTask: HydratedDocument<NewTask> = await Task.create(data);


        const resTask: TaskType  = {
            _id: newTask._id.toString(),
            taskName: newTask.taskName,
            pricePerHour: newTask.pricePerHour
        }
        return { ok: true , task: resTask };

    } catch ( error: any) {
        if ( error.code === 110000 ) {
            throw new AppError( 409, "Task already Exists")
        };

        if( error.name === "ValidationError" ) {
            throw new AppError( 400, "Invalid data" );
        };

        throw new AppError ( 500, "Server error" );
    }
};

export const updateTask = async (
    _id: string,
    body: TaskUpdateReq,
) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            _id,
            body,
            { new: true }
        ).lean<TaskFromDB | null>();

        if ( !updatedTask ) {
            throw new AppError( 404, "Could not find task");
        };

        const resTask: TaskType = {
            _id: updatedTask._id.toString(),
            taskName: updatedTask.taskName,
            pricePerHour: updatedTask.pricePerHour
        };

        return { ok: true, task: resTask }

    } catch ( error: any ){
        if ( error instanceof AppError ) throw error;

        throw new AppError( 500, "Server Error");
    }
};

export const deleteTask = async (
    _id: string
) => {
    try {
    
            const deletedTask: DeleteResult = await Task.deleteOne({_id: _id})
    
            if ( deletedTask.acknowledged !== true && deletedTask.deletedCount !== 1 ) {
                throw new AppError(400, "Could not delete Task");
            };
    
            return { ok: true, message: "Task deleted successfully" }
        } catch ( error: any ) {
            if ( error instanceof AppError ) throw error;
        
            throw new AppError( 500, "Server Error");
        }
};


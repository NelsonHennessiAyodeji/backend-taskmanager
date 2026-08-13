import type { Request, Response } from "express";
import Task from "../model/Task";

const getAllTask = async (req: Request, res: Response) => {
    // Accounting for queery paramters
    const {status} = req.query;
    let tasks;
    if ((status === "pending") || (status === "completed")) {
    // hiding unneccessary contents like UpdatedAt and __v
        tasks = await Task.find({status}).select("-updatedAt -__v");
    } else {
        tasks = await Task.find({}).select("-updatedAt -__v");
    }
    res.json(tasks);
}

const getTask = async (req: Request, res: Response) => {
    const {id: taskId} = req.params;
    // hiding unneccessary contents like UpdatedAt and __v
    const task = await Task.findOne({_id: taskId}).select("-updatedAt -__v");
    if (task) res.json(task);
    else {res.status(404).json({msg: `Task with id of ${taskId} does not exist`})}
}

const createTask = async (req: Request, res: Response) => {
    const rawTask = req.body;
    const newTask = await Task.create(rawTask);
    res.status(201).json({msg: "Created new task", newTask})
}

const updateTask = async (req: Request, res: Response) => {
    const {id: taskId} = req.params;
    // if (!taskId) res.status(400).json({msg: "Pleaser provide a valid ID"});
    const rawTaskUpdates = req.body;
    const updatedTask = await Task.findOneAndUpdate(
        {_id: taskId},
        rawTaskUpdates,
        {new: true, runValidators: true},
    );
    if (updatedTask) res.json({msg: "Updated Sucessfully", updatedTask});
    else {res.status(404).json({msg: `Task with id of ${taskId} does not exist`})}
}

const deleteTask = async (req: Request, res: Response) => {
    const {id: taskId} = req.params;
    // if (!taskId) res.status(400).json({msg: "Pleaser provide a valid ID"});
    const deletedTask = await Task.findOneAndDelete({_id: taskId});
    if (deletedTask) res.json({msg: "Task deleted sucessfully"});
    else {res.status(404).json({msg: `Task with id of ${taskId} does not exist`})}
}

export {
    getAllTask,
    getTask,
    createTask,
    updateTask,
    deleteTask
}

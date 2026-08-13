import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const errorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // If it a validation error
    if (error instanceof mongoose.Error.ValidationError) {
        // If it is a validation error, it is automatically a bad request
        return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Invalid task data",
            // Directly gets the messages and print the accordingly
            errors: Object.values(error.errors).map(err => err.message),
        });
    }

    // Incase a wrong ID or a wrong type of ID is provided
    if (error instanceof mongoose.Error.CastError 
        && error.path === "_id") {
        return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Invalid ID data type",
            error: error.message
        });
    }

    // If the code gets here, then it technically has to do with the servers themselves, hence 500 status code
    // In case its is a clear error, which it will be majority of the time, the system will send a clean message.
    console.error(error);
    if (error instanceof Error) {
        return res.status(500).json({
            success: false,
            code: typeof error,
            message: error.message
        });
    } else {
        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal server error"
        });
    }
}

export default errorHandler;

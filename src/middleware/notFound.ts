import type {Request, Response} from 'express';

const notFound = (req: Request, res: Response) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    })
}

export default notFound;

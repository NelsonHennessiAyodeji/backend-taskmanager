import type { Request, Response } from "express";

const defaultPage = (req: Request, res: Response) => {
    return res.
    send(`<h2>Check the GitHub Docs for better reference and usage <a href="https://github.com/NelsonHennessiAyodeji/backend-taskmanager#task-management-rest-api" >here</a></h2>`);
}

export default defaultPage;

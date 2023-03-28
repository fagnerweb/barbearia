import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import { AppError } from "./errors/AppError";
import { routes } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError)
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });

    return res.status(500).json({
        status: "error",
        message: `Internal server error -> ${err.message}`,
    });
});

app.listen(3333, () => {
    console.log("Barber server is running");
});

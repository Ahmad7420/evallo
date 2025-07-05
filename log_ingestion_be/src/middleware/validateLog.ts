import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const logSchema = yup.object({
    level: yup.string().required("Level is required"),
    message: yup.string().required("Message is required"),
    resourceId: yup.string().required("Resource ID is required"),
    traceId: yup.string().required("Trace ID is required"),
    spanId: yup.string().required("Span ID is required"),
    commit: yup.string().required("Commit is required"),
    metadata: yup.object().shape({
        parentResourceId: yup.string().required("Parent Resource ID is required"),
    }),
});

export async function validateLogInput(req: Request, res: Response, next: NextFunction) {
    try {
        await logSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ error: err.errors });
    }
}
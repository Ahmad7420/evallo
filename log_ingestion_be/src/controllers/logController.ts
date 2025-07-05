import { Request, Response } from 'express';
import LogModel from '../models/Log';
import { Log } from '../types/log';

export const createLog = async (req: Request, res: Response): Promise<void> => {
    try {
        const log: Log = req.body;
        if (!log.level || !log.message) {
            res.status(400).json({ error: 'Level and message are required' });
            return;
        }
        const newLog = new LogModel(log);
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getLogs = async (req: Request, res: Response) => {

    try {
        const { level, message, resourceId, timestamp_start, timestamp_end, traceId, spanId, commit } = req.query;
        const query: any = {};

        if (level) query.level = level;
        if (message) query.message = { $regex: message, $options: 'i' };
        if (resourceId) query.resourceId = resourceId;
        if (traceId) query.traceId = traceId;
        if (spanId) query.spanId = spanId;
        if (commit) query.commit = commit;
        if (timestamp_start && timestamp_end) {
            query.timestamp = { $gte: timestamp_start, $lte: timestamp_end };
        }

        const logs = await LogModel.find(query).sort({ timestamp: -1 });
        console.log(logs, 'logs');

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
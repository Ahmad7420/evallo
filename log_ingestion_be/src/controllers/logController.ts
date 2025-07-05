import { Request, Response } from 'express';
import { Log } from '../types/log';
import { sampleLogs } from '../models/Log';


export const createLog = async (req: Request, res: Response): Promise<void> => {
    try {
        const log: Log = req.body;
        if (!log.level || !log.message) {
            res.status(400).json({ error: 'Level and message are required' });
            return;
        }
        // Add timestamp if not present
        if (!log.timestamp) log.timestamp = new Date().toISOString();
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getLogs = async (req: Request, res: Response) => {
    try {
        let logs = [...sampleLogs];
        const { level, message, resourceId, timestamp_start, timestamp_end, traceId, spanId, commit } = req.query;

        if (level) logs = logs.filter(l => l.level === level);
        if (message) logs = logs.filter(l => l.message?.toLowerCase().includes((message as string).toLowerCase()));
        if (resourceId) logs = logs.filter(l => l.resourceId === resourceId);
        if (traceId) logs = logs.filter(l => l.traceId === traceId);
        if (spanId) logs = logs.filter(l => l.spanId === spanId);
        if (commit) logs = logs.filter(l => l.commit === commit);
        if (timestamp_start && timestamp_end) {
            logs = logs.filter(l =>
                l.timestamp &&
                l.timestamp >= timestamp_start &&
                l.timestamp <= timestamp_end
            );
        }

        // Sort by timestamp descending
        logs.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
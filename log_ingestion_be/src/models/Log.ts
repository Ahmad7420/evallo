import mongoose, { Schema, Document } from 'mongoose';
import { Log } from '../types/log';

interface ILog extends Log, Document { }

const LogSchema: Schema = new Schema({
    level: { type: String, required: true },
    message: { type: String, required: true },
    resourceId: { type: String, required: true },
    timestamp: { type: String, default: () => new Date().toISOString() },
    traceId: { type: String, required: true },
    spanId: { type: String, required: true },
    commit: { type: String, required: true },
    metadata: {
        parentResourceId: { type: String, required: true },
    },
});

export default mongoose.model<ILog>('Log', LogSchema);
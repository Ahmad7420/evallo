import mongoose, { Schema, Document } from 'mongoose';
import { Log } from '../types/log';

interface ILog extends Log, Document { }

const LogSchema: Schema = new Schema({
    level: { type: String, required: true },
    message: { type: String, required: true },
    resourceId: { type: String },
    timestamp: { type: String, default: () => new Date().toISOString() },
    traceId: { type: String },
    spanId: { type: String },
    commit: { type: String },
    metadata: {
        parentResourceId: { type: String },
    },
});

export default mongoose.model<ILog>('Log', LogSchema);
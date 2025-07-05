
import { useState } from 'react';
import { Log } from '@/types/log';

interface CreateLogResponse {
    success: boolean;
    error?: string;
}

export const useCreateLog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createLog = async (log: Omit<Log, '_id'>): Promise<CreateLogResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3001/logs/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(log),
            });

            if (!response.ok) {
                throw new Error('Failed to create log');
            }

            return { success: true };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { createLog, loading, error };
};

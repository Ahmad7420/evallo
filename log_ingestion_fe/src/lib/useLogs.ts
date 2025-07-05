
import { useState, useEffect } from 'react';
import { Log } from '@/types/log';

interface Filters {
    level?: string;
    message?: string;
    resourceId?: string;
    timestampStart?: string;
    timestampEnd?: string;
    newLog?: Log;
}

export const useLogs = ({ level, message, resourceId, timestampStart, timestampEnd, newLog }: Filters) => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            setError(null);

            try {
                const query = new URLSearchParams({
                    ...(level && { level }),
                    ...(message && { message }),
                    ...(resourceId && { resourceId }),
                    ...(timestampStart && { timestamp_start: timestampStart }),
                    ...(timestampEnd && { timestamp_end: timestampEnd }),
                }).toString();

                const response = await fetch(`http://localhost:3001/logs?${query}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch logs');
                }
                const data = await response.json();
                setLogs(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [level, message, resourceId, timestampStart, timestampEnd]);

    useEffect(() => {
        if (newLog) {
            setLogs((prevLogs) => [...prevLogs, newLog]);
        }
    }, [newLog]);

    return { logs, loading, error };
};

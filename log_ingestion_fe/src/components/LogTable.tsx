import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Log } from "@/types/log";

interface LogTableProps {
  logs: Log[];
}

export function DataTable({ logs }: LogTableProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "border-l-4 border-red-500";
      case "warning":
        return "border-l-4 border-yellow-500";
      case "info":
        return "border-l-4 border-blue-500";
      default:
        return "";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Level</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Resource ID</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Trace ID</TableHead>
          <TableHead>Span ID</TableHead>
          <TableHead>Commit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log._id} className={getLevelColor(log.level)}>
            <TableCell>{log.level}</TableCell>
            <TableCell>{log.message}</TableCell>
            <TableCell>{log.resourceId}</TableCell>
            <TableCell>
              {log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}
            </TableCell>
            <TableCell>{log.traceId}</TableCell>
            <TableCell>{log.spanId}</TableCell>
            <TableCell>{log.commit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

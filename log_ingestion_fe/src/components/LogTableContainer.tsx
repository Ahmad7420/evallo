import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/LogTable";

export default function LogTableSection({
  logs,
  logsLoading,
  logsError,
  message,
  setMessage,
  level,
  setLevel,
  resourceId,
  setResourceId,
  timestampStart,
  setTimestampStart,
  timestampEnd,
  setTimestampEnd,
  handleClearFilters,
}: any) {
  return (
    <section className="mb-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-0 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Filter Logs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="message-filter"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Message
            </label>
            <Input
              id="message-filter"
              placeholder="Search message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="level-filter"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Level
            </label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level-filter" className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="resource-filter"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Resource ID
            </label>
            <Input
              id="resource-filter"
              placeholder="Resource ID..."
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="start-filter"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Start Time
            </label>
            <Input
              id="start-filter"
              type="datetime-local"
              value={timestampStart}
              onChange={(e) => setTimestampStart(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="end-filter"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              End Time
            </label>
            <Input
              id="end-filter"
              type="datetime-local"
              value={timestampEnd}
              onChange={(e) => setTimestampEnd(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="w-full hover:cursor-pointer"
            >
              Clear Filters
            </Button>
          </div>
        </div>
        {logsLoading && <p className="text-gray-500">Loading...</p>}
        {logsError && <p className="text-red-500">{logsError}</p>}
      </div>
      <div className="p-4">
        {logs.length > 0 ? (
          <DataTable logs={logs} />
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 mt-10 bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-lg text-gray-500 font-medium mb-2">
              No logs found
            </span>
            <span className="text-sm text-gray-400">
              Please add logs to get started.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

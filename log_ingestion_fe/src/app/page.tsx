"use client";

import { useState } from "react";
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
import { useLogs } from "@/lib/useLogs";
import { useCreateLog } from "@/lib/useCreateLog";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [timestampStart, setTimestampStart] = useState("");
  const [timestampEnd, setTimestampEnd] = useState("");
  const [newLog, setNewLog] = useState({
    level: "",
    message: "",
    resourceId: "",
    traceId: "",
    spanId: "",
    commit: "",
    metadata: { parentResourceId: "" },
  });

  const {
    logs,
    loading: logsLoading,
    error: logsError,
  } = useLogs({
    level,
    message,
    resourceId,
    timestampStart,
    timestampEnd,
  });

  const {
    createLog,
    loading: createLoading,
    error: createError,
  } = useCreateLog();

  const handleClearFilters = () => {
    setLevel("");
    setMessage("");
    setResourceId("");
    setTimestampStart("");
    setTimestampEnd("");
  };

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.level || !newLog.message) {
      alert("Level and message are required");
      return;
    }

    const result = await createLog(newLog);
    if (result.success) {
      setNewLog({
        level: "",
        message: "",
        resourceId: "",
        traceId: "",
        spanId: "",
        commit: "",
        metadata: { parentResourceId: "" },
      });
      // Trigger a refresh of logs by resetting filters or re-fetching
      setMessage(""); // This will trigger useLogs to refresh
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Log Query Interface
      </h1>

      {/* Log Ingestion Form */}
      <section className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Add New Log
        </h2>
        <form
          onSubmit={handleLogSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <Label htmlFor="new-level" className="mb-1 block">
              Level
            </Label>
            <Select
              value={newLog.level}
              onValueChange={(value) => setNewLog({ ...newLog, level: value })}
            >
              <SelectTrigger id="new-level" className="w-full">
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
            <Label htmlFor="new-message" className="mb-1 block">
              Message
            </Label>
            <Input
              id="new-message"
              placeholder="Enter message..."
              value={newLog.message}
              onChange={(e) =>
                setNewLog({ ...newLog, message: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="new-resourceId" className="mb-1 block">
              Resource ID
            </Label>
            <Input
              id="new-resourceId"
              placeholder="Enter resource ID..."
              value={newLog.resourceId}
              onChange={(e) =>
                setNewLog({ ...newLog, resourceId: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="new-traceId" className="mb-1 block">
              Trace ID
            </Label>
            <Input
              id="new-traceId"
              placeholder="Enter trace ID..."
              value={newLog.traceId}
              onChange={(e) =>
                setNewLog({ ...newLog, traceId: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="new-spanId" className="mb-1 block">
              Span ID
            </Label>
            <Input
              id="new-spanId"
              placeholder="Enter span ID..."
              value={newLog.spanId}
              onChange={(e) => setNewLog({ ...newLog, spanId: e.target.value })}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="new-commit" className="mb-1 block">
              Commit
            </Label>
            <Input
              id="new-commit"
              placeholder="Enter commit..."
              value={newLog.commit}
              onChange={(e) => setNewLog({ ...newLog, commit: e.target.value })}
              className="w-full"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="new-parentResourceId" className="mb-1 block">
              Parent Resource ID
            </Label>
            <Input
              id="new-parentResourceId"
              placeholder="Enter parent resource ID..."
              value={newLog.metadata.parentResourceId}
              onChange={(e) =>
                setNewLog({
                  ...newLog,
                  metadata: {
                    ...newLog.metadata,
                    parentResourceId: e.target.value,
                  },
                })
              }
              className="w-full"
            />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-center justify-end mt-2">
            <Button
              type="submit"
              disabled={createLoading}
              className="w-full sm:w-auto"
            >
              {createLoading ? "Submitting..." : "Submit Log"}
            </Button>
            {createError && (
              <span className="text-red-500 text-sm">{createError}</span>
            )}
          </div>
        </form>
      </section>

      {/* Log Filtering Section */}
      <section className="mb-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Filter Logs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <Input
              placeholder="Search message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
            />
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Resource ID..."
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
              className="w-full"
            />
            <Input
              type="datetime-local"
              value={timestampStart}
              onChange={(e) => setTimestampStart(e.target.value)}
              className="w-full"
            />
            <Input
              type="datetime-local"
              value={timestampEnd}
              onChange={(e) => setTimestampEnd(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
          {logsLoading && <p className="text-gray-500">Loading...</p>}
          {logsError && <p className="text-red-500">{logsError}</p>}
        </div>
        <div className="p-4">
          <DataTable logs={logs} />
        </div>
      </section>
    </div>
  );
}

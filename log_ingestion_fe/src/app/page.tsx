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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Log } from "@/types/log";
import LogForm from "@/components/LogForm";
import LogTableSection from "@/components/LogTableContainer";

export default function Home() {
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [timestampStart, setTimestampStart] = useState("");
  const [timestampEnd, setTimestampEnd] = useState("");
  const [newLog, setNewLog] = useState<Log>();

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
    newLog,
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Log Query Interface
      </h1>

      <LogForm
        createLog={createLog}
        createLoading={createLoading}
        createError={createError}
        setNewLog={setNewLog}
        setMessage={setMessage}
      />

      <LogTableSection
        logs={logs}
        logsLoading={logsLoading}
        logsError={logsError}
        message={message}
        setMessage={setMessage}
        level={level}
        setLevel={setLevel}
        resourceId={resourceId}
        setResourceId={setResourceId}
        timestampStart={timestampStart}
        setTimestampStart={setTimestampStart}
        timestampEnd={timestampEnd}
        setTimestampEnd={setTimestampEnd}
        handleClearFilters={handleClearFilters}
      />
    </div>
  );
}

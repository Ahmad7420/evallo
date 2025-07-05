import { Formik, Form, Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";

export const logSchema = Yup.object().shape({
  level: Yup.string().required("Level is required"),
  message: Yup.string().required("Message is required"),
  resourceId: Yup.string().required("Resource ID is required"),
  traceId: Yup.string().required("Trace ID is required"),
  spanId: Yup.string().required("Span ID is required"),
  commit: Yup.string().required("Commit is required"),
  metadata: Yup.object().shape({
    parentResourceId: Yup.string().required("Parent Resource ID is required"),
  }),
});

export default function LogForm({
  createLog,
  createLoading,
  createError,
  setNewLog,
  setMessage,
}: any) {
  return (
    <section className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">Add New Log</h2>
      <Formik
        initialValues={{
          level: "",
          message: "",
          resourceId: "",
          traceId: "",
          spanId: "",
          commit: "",
          metadata: { parentResourceId: "" },
        }}
        validationSchema={logSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          const result = await createLog(values);
          setSubmitting(false);
          setNewLog(result.data);
          if (result.success) {
            resetForm();
            setMessage(""); // refresh logs
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="level" className="mb-1 block">
                Level
              </Label>
              <Field name="level">
                {({ field }: any) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => setFieldValue("level", val)}
                  >
                    <SelectTrigger id="level" className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </Field>
              <ErrorMessage
                name="level"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="message" className="mb-1 block">
                Message
              </Label>
              <Field
                as={Input}
                id="message"
                name="message"
                placeholder="Enter message..."
                className="w-full"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="resourceId" className="mb-1 block">
                Resource ID
              </Label>
              <Field
                as={Input}
                id="resourceId"
                name="resourceId"
                placeholder="Enter resource ID..."
                className="w-full"
              />
              <ErrorMessage
                name="resourceId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="traceId" className="mb-1 block">
                Trace ID
              </Label>
              <Field
                as={Input}
                id="traceId"
                name="traceId"
                placeholder="Enter trace ID..."
                className="w-full"
              />
              <ErrorMessage
                name="traceId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="spanId" className="mb-1 block">
                Span ID
              </Label>
              <Field
                as={Input}
                id="spanId"
                name="spanId"
                placeholder="Enter span ID..."
                className="w-full"
              />
              <ErrorMessage
                name="spanId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="commit" className="mb-1 block">
                Commit
              </Label>
              <Field
                as={Input}
                id="commit"
                name="commit"
                placeholder="Enter commit..."
                className="w-full"
              />
              <ErrorMessage
                name="commit"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="metadata.parentResourceId" className="mb-1 block">
                Parent Resource ID
              </Label>
              <Field
                as={Input}
                id="metadata.parentResourceId"
                name="metadata.parentResourceId"
                placeholder="Enter parent resource ID..."
                className="w-full"
              />
              <ErrorMessage
                name="metadata.parentResourceId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-center justify-end mt-2">
              <Button
                type="submit"
                disabled={isSubmitting || createLoading}
                className="w-full sm:w-auto hover:cursor-pointer"
              >
                {isSubmitting || createLoading ? "Submitting..." : "Submit Log"}
              </Button>
              {createError && (
                <span className="text-red-500 text-sm">{createError}</span>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

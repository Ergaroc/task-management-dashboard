// React
import { useEffect, useMemo, useRef } from "react";
// React hook form
import { useForm } from "react-hook-form";
// Constants
import { PRIORITIES, STATUSES } from "@/constants";
// Types
import type { FormValues } from "@/types";
// Interfaces
import type { Task } from "@/interfaces";
// Molecules
import { Modal } from "@/ui/molecules";
// Api
import { createTask, updateTask } from "@/api/tasksOperations";
// Styles
import "./task-modal-form.scss";

interface TaskModalFormProps {
  open: boolean;
  initial?: Partial<Task>;
  onClose: () => void;
  mode: "create" | "edit";
  onSuccess?: () => void;
}

export const TaskModalForm = ({
  open,
  initial,
  onClose,
  mode,
  onSuccess,
}: TaskModalFormProps) => {
  const defaultValues: FormValues = useMemo(
    () => ({
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      status: initial?.status ?? "To Do",
      priority: initial?.priority ?? "Medium",
      dueDate: initial?.dueDate ? initial.dueDate.slice(0, 10) : "",
    }),
    [initial]
  );

  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (!open) reset(defaultValues);
  }, [open, reset, defaultValues]);

  const submit = async (values: FormValues) => {
    const payload: FormValues = {
      title: values.title,
      description: values.description ?? undefined,
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate ?? undefined,
    };

    if (mode === "create") {
      await createTask(payload);
    } else {
      if (!initial?.id) throw new Error("Missing task id for edit mode");
      await updateTask(initial.id, payload);
    }

    onSuccess?.();
    onClose();
  };

  const isEdit = mode === "edit";

  return (
    <Modal
      isOpen={open}
      title={isEdit ? "Edit task" : "Create task"}
      onClose={onClose}
      onPrimary={() => formRef.current?.requestSubmit()}
      onSecondary={onClose}
      primaryText={isEdit ? "Save changes" : "Create task"}
      secondaryText="Cancel"
      primaryDisabled={!isValid || isSubmitting}
    >
      <form
        ref={formRef}
        className="m-task-modal-form"
        onSubmit={handleSubmit(submit)}
        noValidate
      >
        <div className="m-task-modal-form__grid">
          <div className="m-task-modal-form__field">
            <label htmlFor="title" className="m-task-modal-form__label">
              Title *
            </label>
            <input
              id="title"
              type="text"
              className="m-task-modal-form__input"
              placeholder="e.g. Implement login page"
              {...register("title", {
                required: "Title is required",
                validate: (v) => v.trim().length > 0 || "Title cannot be empty",
                maxLength: { value: 120, message: "Max 120 characters" },
              })}
              aria-invalid={!!errors.title || undefined}
            />
            {errors.title && (
              <p className="m-task-modal-form__error">{errors.title.message}</p>
            )}
          </div>

          <div className="m-task-modal-form__field m-task-modal-form__field--full">
            <label htmlFor="description" className="m-task-modal-form__label">
              Description
            </label>
            <textarea
              id="description"
              className="m-task-modal-form__textarea"
              rows={4}
              placeholder="Short description…"
              {...register("description", {
                maxLength: { value: 1000, message: "Max 1000 characters" },
              })}
            />
            {errors.description && (
              <p className="m-task-modal-form__error">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="m-task-modal-form__field">
            <label htmlFor="status" className="m-task-modal-form__label">
              Status *
            </label>
            <select
              id="status"
              className="m-task-modal-form__select"
              {...register("status", { required: true })}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="m-task-modal-form__field">
            <label htmlFor="priority" className="m-task-modal-form__label">
              Priority *
            </label>
            <select
              id="priority"
              className="m-task-modal-form__select"
              {...register("priority", { required: true })}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="m-task-modal-form__field">
            <label htmlFor="dueDate" className="m-task-modal-form__label">
              Due date
            </label>
            <input
              id="dueDate"
              type="date"
              className="m-task-modal-form__input"
              {...register("dueDate", {
                validate: (v) => {
                  if (!v) return true;
                  const ok = /^\d{4}-\d{2}-\d{2}$/.test(v);
                  return ok || "Invalid date";
                },
              })}
            />
            {errors.dueDate && (
              <p className="m-task-modal-form__error">
                {errors.dueDate.message}
              </p>
            )}
          </div>
        </div>

        <p className="m-task-modal-form__hint">
          Fields marked with * are required.
        </p>
      </form>
    </Modal>
  );
};

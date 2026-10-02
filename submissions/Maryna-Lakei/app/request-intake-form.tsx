"use client";

import { useRef, useState, type FormEvent } from "react";
import { holdValidatedRequest } from "@/lib/requirements/actions";
import { validateRawBusinessRequest } from "@/lib/requirements/validation";

export function RequestIntakeForm() {
  const [rawRequest, setRawRequest] = useState("");
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const [inFlight, setInFlight] = useState(false);
  const inFlightRef = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) {
      return;
    }

    const validation = validateRawBusinessRequest(rawRequest);
    if (!validation.ok) {
      setValidationMessage(validation.message);
      return;
    }

    setValidationMessage(null);
    inFlightRef.current = true;
    setInFlight(true);
    try {
      await holdValidatedRequest(rawRequest);
    } finally {
      inFlightRef.current = false;
      setInFlight(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="raw-business-request"
          className="text-sm font-medium text-neutral-950"
        >
          Raw business request
        </label>
        <textarea
          id="raw-business-request"
          name="rawBusinessRequest"
          value={rawRequest}
          rows={8}
          onChange={(event) => {
            setRawRequest(event.target.value);
          }}
          aria-invalid={validationMessage ? true : undefined}
          aria-describedby={
            validationMessage ? "raw-business-request-error" : undefined
          }
          className="w-full rounded-md border border-neutral-400 bg-white px-3 py-2 text-base text-neutral-950"
        />
      </div>
      {validationMessage ? (
        <p id="raw-business-request-error" role="alert" className="text-sm text-red-800">
          {validationMessage}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={inFlight}
        className="h-11 w-fit rounded-md bg-neutral-950 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        Generate
      </button>
    </form>
  );
}

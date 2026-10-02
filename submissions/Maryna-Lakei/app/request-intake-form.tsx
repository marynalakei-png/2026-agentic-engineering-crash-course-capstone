"use client";

import { useRef, useState, type FormEvent } from "react";
import { generateFromRequest } from "@/lib/requirements/actions";
import { validateRawBusinessRequest } from "@/lib/requirements/validation";

type GeneratedRequirement = {
  userStory: string;
  acceptanceCriteria: string[];
  clarifyingQuestions: string[];
};

type FailureReason =
  | "empty-input"
  | "missing-key"
  | "provider-error"
  | "timeout"
  | "invalid-payload";

export function RequestIntakeForm() {
  const [rawRequest, setRawRequest] = useState("");
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const [inFlight, setInFlight] = useState(false);
  const [result, setResult] = useState<GeneratedRequirement | null>(null);
  const [failureReason, setFailureReason] = useState<FailureReason | null>(
    null,
  );
  const inFlightRef = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) {
      return;
    }

    const validation = validateRawBusinessRequest(rawRequest);
    if (!validation.ok) {
      setValidationMessage(validation.message);
      setFailureReason(null);
      return;
    }

    setValidationMessage(null);
    setFailureReason(null);
    inFlightRef.current = true;
    setInFlight(true);
    try {
      const outcome = await generateFromRequest(rawRequest);
      if (outcome.ok) {
        setResult({
          userStory: outcome.userStory,
          acceptanceCriteria: outcome.acceptanceCriteria,
          clarifyingQuestions: outcome.clarifyingQuestions,
        });
        setFailureReason(null);
      } else {
        setResult(null);
        setFailureReason(outcome.reason);
      }
    } catch {
      setResult(null);
      setFailureReason("provider-error");
    } finally {
      inFlightRef.current = false;
      setInFlight(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      data-generation-reason={failureReason ?? undefined}
    >
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
      {result ? (
        <div className="flex flex-col gap-4 text-base text-neutral-950">
          <p data-testid="user-story">{result.userStory}</p>
          <ul data-testid="acceptance-criteria" className="list-disc pl-5">
            {result.acceptanceCriteria.map((criterion, index) => (
              <li key={`${criterion}-${index}`}>{criterion}</li>
            ))}
          </ul>
          <ul data-testid="clarifying-questions" className="list-disc pl-5">
            {result.clarifyingQuestions.map((question, index) => (
              <li key={`${question}-${index}`}>{question}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
}

"use server";

const IN_FLIGHT_STUB_DELAY_MS = 1000;

/**
 * In-flight stub for an already-validated raw business request.
 * Waits about one second and returns no generated text.
 * Does not call an LLM and does not read an API key.
 */
export async function holdValidatedRequest(rawRequest: string): Promise<void> {
  if (rawRequest.trim() === "") {
    return;
  }

  await new Promise<void>((resolve) => {
    setTimeout(resolve, IN_FLIGHT_STUB_DELAY_MS);
  });
}

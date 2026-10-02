/**
 * Grades whether Clarifying Questions ask about gaps in the raw request.
 * produce() returns a fixture. It does not call the network or read a key.
 */
const clarifyingQuestionsCase = {
  id: "eval-clarifying-questions-unstated-gaps",
  trace: ["FR-5", "FR-11"],
  dimension: "gap-questions",
  capability: "requirement-generation",
  scenario:
    'A business analyst submits the raw request "Need a weekly sales report." The request does not state which regions are included, who the audience is, or what counts as a sale. Grade the clarifying questions produced for that request.',
  produce: async () => [
    "Which regions are included?",
    "Who receives the report?",
    "What counts as a sale?",
  ],
  rubric: [
    "CRITICAL: the questions ask about gaps that the raw request does not already state, including which regions are included, who receives the report, and what counts as a sale",
    "CRITICAL: the questions do not merely restate that a weekly sales report is needed, and they are not about an unrelated topic",
    "CRITICAL: wording that asks about those unstated gaps is enough; the questions do not have to match one exact sentence",
  ],
};

export { clarifyingQuestionsCase };
export const cases = [clarifyingQuestionsCase];

// @trace FR-5
// @trace FR-11

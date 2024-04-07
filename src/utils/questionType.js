/**
 * Question types for the quiz.
 *
 * @type {{SLIDE: string, TEXT: string, TRUE_OR_FALSE: string}}
 */
const QuestionType = {
  TEXT: "TEXT",
  SLIDE: "SLIDE",
  TRUE_OR_FALSE: "TRUE_OR_FALSE",
};

/**
 * Generates an array of question types with value and label.
 *
 * @returns {{label: string, value: *}[]}
 */
function getQuestionTypes() {
  return Object.keys(QuestionType).map((key) => ({
      value: key,
      label: getQuestionTypeLabel(QuestionType[key]),    
    })
  );
}

/**
 * Returns the label of a given question type.
 *
 * @param type
 * @returns {string}
 */
function getQuestionTypeLabel(type) {
  switch (type) {
    case QuestionType.TEXT:
      return "Text";
    case QuestionType.SLIDE:
      return "Slide";
    case QuestionType.TRUE_OR_FALSE:
      return "True or False";
    default:
      return "Unknown";
  }
}

/**
 * Exports the QuestionType object, getQuestionTypes and getQuestionTypeLabel functions.
 */
export { QuestionType, getQuestionTypes, getQuestionTypeLabel };

const QuestionType = {
  TEXT: "TEXT",
  SLIDE: "SLIDE",
  TRUE_OR_FALSE: "TRUE_OR_FALSE",
};

function getQuestionTypes() {
  return Object.keys(QuestionType).map((key) => ({
      value: key,
      label: getQuestionTypeLabel(QuestionType[key]),    
    })
  );
}

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

export { QuestionType, getQuestionTypes };

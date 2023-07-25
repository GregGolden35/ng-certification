export interface IQuestions {
    response_code: number;
    results: IQuestion[];
  }
  
  export interface IQuestion {
    questionNumber: number;
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
    selected_index: number;
    correct_index: number;
  }
  
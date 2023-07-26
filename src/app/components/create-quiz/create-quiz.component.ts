import { Component, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IQuestions } from '../../models/question.interface';
import { ITriviaCategory } from '../../models/trivia-category.interface';
import { QuizService } from '../../services/quiz.service';

@Component({
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  categoryData: Signal<ITriviaCategory[] | undefined>;
  trivia: IQuestions;
  formGroup!: FormGroup;
  constructor(private quizService: QuizService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      category: ['defaultCategory',],
      difficulty: ['defaultDifficulty',]
    });
    this.categoryData = this.quizService.categoriesSignal;    
  }

  createQuiz() {
    let categoryId = this.formGroup.get('category')?.value;
    let difficulty = this.formGroup.get('difficulty')?.value;

    this.quizService.getQuestions(categoryId, difficulty)
    .subscribe({
      next: (response) => {
        this.trivia = response;
        let questionNumber = 1;
        this.trivia.results.forEach(result => {
          result.questionNumber = questionNumber;
          //randomize incorrect and correct answer
          result.answers = this.shuffle(result.incorrect_answers.concat(result.correct_answer));
          questionNumber++;
        });
      }
    }); 
  }
  //Fisher-Yates algorithm to shuffle
  private shuffle(array: string[]) {
    for (var i = array.length - 1; i > 0; i--) {
      const swapIndex = Math.floor(Math.random() * (i + 1))
      const currentElement = array[i]
      const elementToSwap = array[swapIndex]
      array[i] = elementToSwap
      array[swapIndex] = currentElement
    }

    return array; 
  }
}

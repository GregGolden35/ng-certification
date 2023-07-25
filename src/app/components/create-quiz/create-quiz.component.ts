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
        this.trivia.results.forEach(x => {
          x.questionNumber = questionNumber;
          //randomize incorrect and correct answer
          x.answers = this.shuffle(x.incorrect_answers.concat(x.correct_answer));
          questionNumber++;
        });
      }
    }); 
  }

  private shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5); 
  }
}

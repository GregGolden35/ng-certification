import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestions } from '../../models/question.interface';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.css']
})
export class TriviaQuestionsComponent implements OnInit {
  @Input() trivia: IQuestions;
  selectedAnswers: string[] = [];
  submitButtonVisible: boolean = false;
  constructor(private router: Router,
    private quizService: QuizService) { }

  ngOnInit(): void {
  }

  triviaAnswerClick(event, answer, questionNumber, answerIndex) {
    let questionBeingAnswered = this.trivia?.results?.find(x => x.questionNumber == questionNumber + 1);
    //in case user has changed their answer to same question,
    //remove prior answers from same question. only add the most current answer for a question
    this.selectedAnswers = this.selectedAnswers.filter( function( selectedAnswer ) {
      return !questionBeingAnswered?.answers?.includes( selectedAnswer );
    } );

    this.selectedAnswers[questionNumber] = answer;

    this.trivia.results[questionNumber].selected_index = answerIndex;

    if(this.selectedAnswers.length === this.trivia.results.length) {
      this.submitButtonVisible = true;
    }
  }

  submitClick() {
    this.quizService.setSelectedAnswers(this.selectedAnswers);
    this.quizService.setTrivia(this.trivia);
    this.router.navigate(['/trivia-results']);
  }
}

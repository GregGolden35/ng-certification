import { Component, Input, OnInit } from '@angular/core';
import { IQuestions } from '../../../models/question.interface';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-trivia-results',
  templateUrl: './trivia-results.component.html',
  styleUrls: ['./trivia-results.component.css']
})
export class TriviaResultsComponent implements OnInit {
  trivia: IQuestions;
  totalAnswersCorrect: number = 0;
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.trivia = this.quizService.getTrivia();
    var totalCorrect = 0;
    this.trivia?.results?.forEach(function(x) {
      x.correct_index = x.answers.indexOf(x.correct_answer,0);
      if(x.correct_index == x.selected_index) {
        totalCorrect++;
      }
    });

    this.totalAnswersCorrect = totalCorrect;
  }
}

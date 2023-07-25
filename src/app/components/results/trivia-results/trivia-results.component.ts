import { Component, OnInit } from '@angular/core';
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
    this.trivia?.results?.forEach(function(result) {
      result.correct_index = result.answers.indexOf(result.correct_answer,0);
      if(result.correct_index == result.selected_index) {
        totalCorrect++;
      }
    });

    this.totalAnswersCorrect = totalCorrect;
  }
}

import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { IQuestions } from '../models/question.interface';
import { ITriviaCategories, ITriviaCategory } from '../models/trivia-category.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private triviaSignal = signal<IQuestions>(null);
  trivia: Signal<IQuestions> = this.triviaSignal.asReadonly();
  
  private selectedAnswersSignal = signal<string[]>(null);
  selectedAnswers: Signal<string[]> = this.selectedAnswersSignal.asReadonly();

  private categories$: Observable<ITriviaCategory[] | undefined> = this.getCategories();
  categoriesSignal = toSignal(this.categories$);
  
  constructor(private httpClient: HttpClient) { }

  setTrivia(trivia: IQuestions) {
    this.triviaSignal.set(trivia);
  }

  getTrivia(): IQuestions {
    return this.triviaSignal();
  }

  setSelectedAnswers(selectedAnswers: string[]) {
    this.selectedAnswersSignal.set(selectedAnswers);
  }

  getSelectedAnswers(): string[] {
    return this.selectedAnswersSignal();
  }  

  getCategories() : Observable<ITriviaCategory[]> {
    const categoryApiUrl = 'https://opentdb.com/api_category.php';
    
    return this.httpClient.get<ITriviaCategories>(categoryApiUrl)
    .pipe(
      retry(3),
      map(response => response.trivia_categories)
    );
  }

  getQuestions(categoryId: number, difficulty: string) : Observable<IQuestions> {
    const categoryApiUrl = `https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple`;

    return this.httpClient.get<IQuestions>(categoryApiUrl)
      .pipe(
        retry(3)
      );
  }
}
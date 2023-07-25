import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { TriviaQuestionsComponent } from './components/trivia-questions/trivia-questions.component';
import { AppRoutingModule } from './app-routing.module';
import { TriviaResultsComponent } from './components/results/trivia-results/trivia-results.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, CreateQuizComponent, TriviaQuestionsComponent, TriviaResultsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

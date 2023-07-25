import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { TriviaQuestionsComponent } from './components/trivia-questions/trivia-questions.component';
import { AppRoutingModule } from './app-routing.module';
import { TriviaResultsComponent } from './components/results/trivia-results/trivia-results.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule ],
  declarations: [ AppComponent, CreateQuizComponent, TriviaQuestionsComponent, TriviaResultsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

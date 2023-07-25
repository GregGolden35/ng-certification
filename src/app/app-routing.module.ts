import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { TriviaResultsComponent } from './components/results/trivia-results/trivia-results.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-quiz' },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'trivia-results', component: TriviaResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

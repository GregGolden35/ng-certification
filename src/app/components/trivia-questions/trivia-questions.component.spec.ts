import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaQuestionsComponent } from './trivia-questions.component';

describe('TriviaQuestionsComponent', () => {
  let component: TriviaQuestionsComponent;
  let fixture: ComponentFixture<TriviaQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaQuestionsComponent]
    });
    fixture = TestBed.createComponent(TriviaQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { TesteComponent } from './teste.component';

describe('TesteComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TesteComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});

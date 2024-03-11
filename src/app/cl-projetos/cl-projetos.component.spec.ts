import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClProjetosComponent } from './cl-projetos.component';

describe('ClProjetosComponent', () => {
  let component: ClProjetosComponent;
  let fixture: ComponentFixture<ClProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClProjetosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

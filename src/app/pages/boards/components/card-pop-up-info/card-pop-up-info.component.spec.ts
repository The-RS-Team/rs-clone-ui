import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPopUpInfoComponent } from './card-pop-up-info.component';

describe('CardPopUpComponent', () => {
  let component: CardPopUpInfoComponent;
  let fixture: ComponentFixture<CardPopUpInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPopUpInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPopUpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

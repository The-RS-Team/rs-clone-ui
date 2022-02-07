import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAccauntComponent } from './tab-accaunt.component';

describe('TabAccauntComponent', () => {
  let component: TabAccauntComponent;
  let fixture: ComponentFixture<TabAccauntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAccauntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAccauntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalFilterComponent } from './internal-filter.component';

describe('InternalFilterComponent', () => {
  let component: InternalFilterComponent;
  let fixture: ComponentFixture<InternalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

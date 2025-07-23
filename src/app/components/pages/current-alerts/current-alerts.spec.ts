import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAlerts } from './current-alerts';

describe('CurrentAlerts', () => {
  let component: CurrentAlerts;
  let fixture: ComponentFixture<CurrentAlerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAlerts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAlerts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

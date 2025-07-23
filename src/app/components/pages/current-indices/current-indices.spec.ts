import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentIndices } from './current-indices';

describe('CurrentIndices', () => {
  let component: CurrentIndices;
  let fixture: ComponentFixture<CurrentIndices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentIndices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentIndices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

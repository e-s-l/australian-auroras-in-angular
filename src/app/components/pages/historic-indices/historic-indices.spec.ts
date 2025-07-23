import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricIndices } from './historic-indices';

describe('HistoricIndices', () => {
  let component: HistoricIndices;
  let fixture: ComponentFixture<HistoricIndices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricIndices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricIndices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

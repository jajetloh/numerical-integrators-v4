import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSelectionDialogComponent } from './data-selection-dialog.component';

describe('DataSelectionDialogComponent', () => {
  let component: DataSelectionDialogComponent;
  let fixture: ComponentFixture<DataSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSelectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

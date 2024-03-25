import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskDialogComponent } from './mask-dialog.component';

describe('MaskDialogComponent', () => {
  let component: MaskDialogComponent;
  let fixture: ComponentFixture<MaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaskDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

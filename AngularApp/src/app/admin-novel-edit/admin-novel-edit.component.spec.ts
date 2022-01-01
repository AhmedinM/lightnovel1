import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNovelEditComponent } from './admin-novel-edit.component';

describe('AdminNovelEditComponent', () => {
  let component: AdminNovelEditComponent;
  let fixture: ComponentFixture<AdminNovelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNovelEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNovelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

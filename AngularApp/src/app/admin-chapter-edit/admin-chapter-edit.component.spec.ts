import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterEditComponent } from './admin-chapter-edit.component';

describe('AdminChapterEditComponent', () => {
  let component: AdminChapterEditComponent;
  let fixture: ComponentFixture<AdminChapterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChapterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChapterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

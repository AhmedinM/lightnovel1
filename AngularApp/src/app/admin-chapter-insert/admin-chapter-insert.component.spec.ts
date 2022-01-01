import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterInsertComponent } from './admin-chapter-insert.component';

describe('AdminChapterInsertComponent', () => {
  let component: AdminChapterInsertComponent;
  let fixture: ComponentFixture<AdminChapterInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChapterInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChapterInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

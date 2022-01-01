import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNovelListComponent } from './admin-novel-list.component';

describe('AdminNovelListComponent', () => {
  let component: AdminNovelListComponent;
  let fixture: ComponentFixture<AdminNovelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNovelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNovelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

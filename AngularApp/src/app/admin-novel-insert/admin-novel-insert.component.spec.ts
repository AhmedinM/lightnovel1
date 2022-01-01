import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNovelInsertComponent } from './admin-novel-insert.component';

describe('AdminNovelInsertComponent', () => {
  let component: AdminNovelInsertComponent;
  let fixture: ComponentFixture<AdminNovelInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNovelInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNovelInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

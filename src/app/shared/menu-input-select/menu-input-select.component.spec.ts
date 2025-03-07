import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInputSelectComponent } from './menu-input-select.component';

describe('InputSelectComponent', () => {
  let component: MenuInputSelectComponent;
  let fixture: ComponentFixture<MenuInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuInputSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

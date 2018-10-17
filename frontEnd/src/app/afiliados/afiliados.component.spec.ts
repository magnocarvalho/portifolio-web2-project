import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosComponent } from './afiliados.component';

describe('AfiliadosComponent', () => {
  let component: AfiliadosComponent;
  let fixture: ComponentFixture<AfiliadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfiliadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

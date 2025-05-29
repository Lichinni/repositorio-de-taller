import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretoComponent } from './secreto.component';

describe('SecretoComponent', () => {
  let component: SecretoComponent;
  let fixture: ComponentFixture<SecretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

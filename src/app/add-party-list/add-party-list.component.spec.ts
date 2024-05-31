import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartyListComponent } from './add-party-list.component';

describe('AddPartyListComponent', () => {
  let component: AddPartyListComponent;
  let fixture: ComponentFixture<AddPartyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

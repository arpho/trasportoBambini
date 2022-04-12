import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../services/auth.service';
describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AlertController,AuthService],
      imports: [RouterModule, RouterTestingModule,firebase],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

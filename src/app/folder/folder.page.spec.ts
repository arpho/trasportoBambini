import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from '../modules/user/pages/login/login.page';

describe('FolderPage', () => {
  let component: FolderPage;
  let fixture: ComponentFixture<FolderPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]),RouterTestingModule.withRoutes(
        [{path: 'users/login', component: LoginPage}]
      )]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create folder page', () => {
    expect(component).toBeTruthy();
  });
});

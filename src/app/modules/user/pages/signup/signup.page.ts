import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { QuestionBase } from 'src/app/modules/dynamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { UserModel } from '../../models/userModel';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit,OnDestroy {
  public signupForm: FormGroup;
  public usersFields:any
  public modal: any;
  subscription:Subscription
  constructor(
    public modalCtrl: ModalController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.usersFields = [new TextboxQuestion({
      key:'name',
      label:'nome',
      required:true,
      order:1

    }),new TextboxQuestion({
      key:'surname',
      label:'cognome',
      required:true,
      order:2

    }),new EmailQuestion({
      key:'email',
      label:'email',
      required:true,
      order:3

    })]
    this.signupForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }
  ngOnDestroy(): void {
  if(this.subscription){
    this.subscription.unsubscribe()
  }
  }

  ngOnInit() { }

  filter(ev) {
    console.log('ciao',ev)
  }
  dismiss(payment?) {
    this.modalCtrl.dismiss(payment)
  }

  async submit(ev) {
    const user = new UserModel().load(ev)
    console.log('submitting',ev,user)

  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      const successHandler = (v) => {

        console.log('loading', this.modal)
        this.modal.dismiss().then(() => {
          this.router.navigateByUrl('home');

        })
      }

        const errorHandler = (error) => {
          this.modal.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
        this.authService.signupUser(email, password, successHandler, errorHandler)
        this.modal = await this.loadingCtrl.create();
        await this.modal.present();
      }
    }
  }

import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  ngOnInit() {}

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  onSubmit() {}

  async loginUser(loginForm: FormGroup): Promise<void> {

    if (!loginForm.valid) {
    } else {
      const email = loginForm.value.email;
      const password = loginForm.value.password;
      this.authService.loginUser(email, password).then(
        () => {
          const auth = getAuth()
          setPersistence(auth,browserLocalPersistence)
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("home");
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }
}

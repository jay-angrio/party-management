import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  showLoader = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onPasswordClick(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onLoginClick() {
    this.showLoader = true;
    let body = new FormData();
    body.append('username', this.loginForm.value.username);
    body.append('password', this.loginForm.value.password);

    this.http
      .post(environment.baseurl + 'login/', body)
      .subscribe((res: any) => {
        this.showLoader = false;
        localStorage.setItem('auth', JSON.stringify(res));
        localStorage.setItem('token', JSON.stringify(res?.token));

        this.router.navigate(['/party-management']);
      });
  }
}

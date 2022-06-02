import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../common/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nicknameControl = new FormControl('', [Validators.required]);

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  async setNickname() {
    await this.userService.setNickname(this.nicknameControl.value);
    this.router.navigate(['']);
  }
}

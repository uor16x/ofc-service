import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class NicknameGuard implements CanActivateChild {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  async canActivateChild(): Promise<boolean> {
    const username = await this.userService.getNickname();
    if (!username) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

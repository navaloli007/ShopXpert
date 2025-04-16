import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly role = signal<'admin' | 'customer' | null>(null);
  private readonly loggedIn = signal(false);

  getRole() {
    return this.role;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  loginAs(role: 'admin' | 'customer') {
    this.role.set(role);
    this.loggedIn.set(true);
  }

  logout() {
    this.role.set(null);
    this.loggedIn.set(false);
  }
}

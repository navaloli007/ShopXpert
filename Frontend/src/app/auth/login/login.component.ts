import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  selectedRole: 'customer' | 'admin' = 'customer';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.loginAs(this.selectedRole);

    const route = this.selectedRole === 'admin' ? '/admin' : '/customer';
    this.router.navigateByUrl(route);
  }
}

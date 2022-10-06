import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginValid = true;
  public username = '';
  public password = '';
  public user!: Usuario;
  public error_message: string = 'Error, revise sus datos de login!'

  private readonly returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/filter';
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(loggedFlag => {
      if (loggedFlag) {
        this.router.navigateByUrl(this.returnUrl);
      }
    })
  }


  public onLoginSubmit(): void {
    this.loginValid = true;

    this.authService.Login(this.username, this.password).subscribe({
      next: (response) => {
        // console.log('Response: ', response);
        if (response) {
          this.router.navigate(['filter']);
        }
      },
      error: (error) => {
        if (error.toString().includes('401')) {
          this.loginValid = false;
          this.error_message = `El usuario ${this.username} no está autorizado. Revise sus datos.`
        }
      }
    });
  }


}





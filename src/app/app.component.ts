import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title: string = "Aplicación de Filtrado para TV Scroller";
  public isAuthenticated = false; // To handle login from auth service
  public loggedUser: string = '';


  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.authService.isLogged.subscribe(loggedFlag => {
      if (loggedFlag) {
        this.isAuthenticated = true;
        let user = localStorage.getItem('user')!;
        this.loggedUser = atob(user)?.split(':')[0];
      } else {
        this.isAuthenticated = false;
      }
    })
  }


  public onLogout(): void {
    this.authService.logout("/");
  }


}

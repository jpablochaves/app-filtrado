import { Component, OnInit } from '@angular/core';
import { FiltradoService } from '../services/filtrado.service';
import { Usuario } from '../interfaces/usuario';
import { Sms } from '../interfaces/sms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  user!: Usuario;
  current_sms!: Sms;
  isAuthenticated: boolean = false;
  public error: boolean = false;
  public sms_text: string = '';
  public error_message: string = 'Error, se presento un problema con la operación';
  public response: string = '';


  constructor(private apiService: FiltradoService) { }


  ngOnInit(): void {
    this.loadNewMessages();
  }

  public onSmsApprove(event: Event): void {
    const { ID: id, CONTENIDO: sms } = this.current_sms;
    let operationOk = false;
    this.apiService.approveMessage(id).subscribe({
      next: (resp) => {
        if (resp.ESTADO === 'error' || resp.ESTADO === 'FALLIDO') {
          this.response = '';
        } else {
          this.response = 'Mensaje aprobado'
          operationOk = true;
        }
      },
      error: (err) => {
        console.error("Error presented approving message", err);
        this.error_message = "Se presento un error, favor intente nuevamente";
        this.error = true;
      },
      complete: () => {
        if(operationOk){
          this.loadNewMessages()
        }
      }
    });
  }

  public onSmsReject(event: Event): void {
    const { ID: id, CONTENIDO: sms } = this.current_sms;
    let operationOk = false;
    this.apiService.rejectMessage(id).subscribe({
      next: (resp) => {
        if (resp.ESTADO === 'error' || resp.ESTADO === 'FALLIDO') {
          this.response = '';
        } else {
          this.response = 'Mensaje rechazado'
          operationOk = true;
        }
      },
      error: (err) => {
        console.error("Error presented rejecting message", err);
        this.error_message = "Se presento un error, favor intente nuevamente";
        this.error = true;
      },
      complete: () => {
        if(operationOk){
          this.loadNewMessages()
        }
      }
    });
  }

  private loadNewMessages(): void {
    this.apiService.getMessage().subscribe({
      next: (response) => {
        Object.values(response).forEach(obj => {
          this.current_sms = obj;
          this.sms_text = obj.CONTENIDO;
        });
      },
      error: (err) => {
        console.error("Error presented getting messages", err);
        this.error = true;
      },
      complete: () => { }
    });
  }


}

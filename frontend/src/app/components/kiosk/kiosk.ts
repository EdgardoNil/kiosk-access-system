import { Component, OnDestroy, OnInit } from '@angular/core';

// Permite usar formularios con ngModel
import { FormsModule } from '@angular/forms';

// Habilita directivas básicas de Angular como *ngIf
import { CommonModule } from '@angular/common';

// Herramientas RxJS para controlar múltiples clics
import { Subject, EMPTY } from 'rxjs';
import { catchError, exhaustMap, finalize, takeUntil, tap } from 'rxjs/operators';

// Servicio que se comunica con el backend
import { CheckInService } from '../../services/check-in';

@Component({
  selector: 'app-kiosk',
  imports: [FormsModule, CommonModule],
  templateUrl: './kiosk.html',
  styleUrl: './kiosk.css',
})
export class Kiosk implements OnInit, OnDestroy {

  accessCode: string = '';
  message: string = '';
  messageType: string = '';
  isLoading: boolean = false;

  // Recibe los clics del botón
  private checkInClick$ = new Subject<string>();

  // Cierra la suscripción al destruir el componente
  private destroy$ = new Subject<void>();

  constructor(private checkInService: CheckInService) {}

  ngOnInit(): void {
    this.checkInClick$
      .pipe(
        tap(() => this.isLoading = true),

        // Evita enviar otra petición si ya hay una en proceso
        exhaustMap((accessCode) =>
          this.checkInService.checkIn(accessCode).pipe(
            tap((response) => {
              this.showMessage(
                response.message,
                response.success ? 'success' : 'error'
              );
            }),
            catchError(() => {
              this.showMessage('Error de conexión con el servidor', 'error');
              return EMPTY;
            }),
            finalize(() => {
              this.isLoading = false;
            })
          )
        ),

        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  validateAccess(): void {
    const accessCode = this.accessCode.trim();

    if (!accessCode) {
      this.showMessage('Ingresa un código de acceso', 'error');
      return;
    }

    this.checkInClick$.next(accessCode);
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    this.accessCode = '';

    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
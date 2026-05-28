import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

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

  // Código ingresado por el usuario
  accessCode: string = '';

  // Mensaje mostrado en pantalla
  message: string = '';

  // Tipo de mensaje: éxito o error
  messageType: string = '';

  // Controla si el botón está cargando o bloqueado
  isLoading: boolean = false;

  // Captura los clics del botón
  private checkInClick$ = new Subject<string>();

  // Libera recursos al destruir el componente
  private destroy$ = new Subject<void>();

  constructor(
    private checkInService: CheckInService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Escucha los clics enviados al Subject
    this.checkInClick$
      .pipe(

        // Evita múltiples peticiones simultáneas
        exhaustMap((accessCode) => {

          // Bloquea el botón mientras valida
          this.isLoading = true;

          return this.checkInService.checkIn(accessCode).pipe(

            // Maneja respuesta exitosa
            tap((response) => {
              this.showMessage(
                response.message,
                response.success ? 'success' : 'error'
              );
            }),

            // Maneja errores de conexión
            catchError(() => {
              this.showMessage(
                'Acceso denegado / Código inválido',
                'error'
              );

              return EMPTY;
            }),

            // Reactiva el botón al finalizar
            finalize(() => {
              this.isLoading = false;

              // Actualiza la vista inmediatamente
              this.changeDetectorRef.detectChanges();
            })
          );
        }),

        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  // Valida el código ingresado
  validateAccess(): void {

    const accessCode = this.accessCode.trim();

    if (!accessCode) {
      this.showMessage('Ingresa un código de acceso', 'error');
      return;
    }

    // Envía el clic a RxJS
    this.checkInClick$.next(accessCode);
  }

  // Muestra mensajes temporales en pantalla
  private showMessage(message: string, type: string): void {

    this.message = message;
    this.messageType = type;
    this.accessCode = '';

    // Limpia mensaje después de 3 segundos
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  ngOnDestroy(): void {

    // Libera las suscripciones activas
    this.destroy$.next();
    this.destroy$.complete();
  }
}
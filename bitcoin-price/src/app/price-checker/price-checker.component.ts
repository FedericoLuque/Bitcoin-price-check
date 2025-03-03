import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Agregar CommonModule
import { FormsModule } from '@angular/forms';    // Agregar FormsModule
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-price-checker',
  standalone: true,  // Indica que es un componente standalone
  imports: [CommonModule, FormsModule],  // Asegúrate de incluir estos módulos aquí
  templateUrl: './price-checker.component.html',
  styleUrls: ['./price-checker.component.css']
})
export class PriceCheckerComponent {
  selectedDate: string = '';  // Fecha seleccionada por el usuario
  
  price: number | null = null; // Precio de Bitcoin
  errorMessage: string = '';  // Mensaje de error en caso de fallo

  constructor(private http: HttpClient) {}

  

  getPrice() {
    if (this.selectedDate) {
      // La fecha seleccionada está en formato YYYY-MM-DD, que es lo que tu backend necesita
      const date = this.selectedDate.split('-').reverse().join('-'); // Formato: DD-MM-YYYY
  
      this.http.get<any>(`http://localhost:8000/price?date_time=${date}`)
        .pipe(
          catchError(error => {
            this.errorMessage = 'Hubo un error al obtener el precio.';
            return of(null); // Si hay error, no interrumpimos el flujo
          })
        )
        .subscribe(response => {
          if (response) {
            this.price = response.price_usd.toFixed(2);
            this.errorMessage = '';  // Limpiar cualquier mensaje de error previo
          }
        });
    } else {
      this.errorMessage = 'Por favor, selecciona una fecha.';
    }
  }
  
}

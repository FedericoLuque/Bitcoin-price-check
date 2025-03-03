import { Component } from '@angular/core';
import { PriceCheckerComponent } from './price-checker/price-checker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PriceCheckerComponent],
  template: `<app-price-checker></app-price-checker>`, // Usa el selector correctamente
})
export class AppComponent {}

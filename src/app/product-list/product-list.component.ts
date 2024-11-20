import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../signal-rservice.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule here
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productId: string = '';

  constructor(public signalRService: SignalRService) {}

  decrementQuantity() {
    if (this.productId) {
      this.signalRService.decrementQuantity(this.productId);
      this.productId = '';
    } else {
      alert('Please enter a product ID.');
    }
  }
}

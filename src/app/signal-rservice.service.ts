import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: HubConnection;
  public products: any[] = [];

  constructor() {
    this.startConnection();
    this.registerHandlers();
  }

  private startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7195/inventoryHub') 
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err) => console.error('Error starting SignalR connection:', err));
  }

  private registerHandlers() {
    this.hubConnection.on('ReceiveProducts', (products) => {
      this.products = products;
    });

    this.hubConnection.on('QuantityUpdated', (id: string, quantity: number) => {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        product.quantity = quantity;
      }
    });

    this.hubConnection.on('Error', (message: string) => {
      alert(message);
    });
  }

  public getProducts() {
    return this.products;
  }

  public decrementQuantity(productId: string) {
    this.hubConnection.invoke('DecrementQuantity', productId).catch((err) => console.error(err));
  }
}
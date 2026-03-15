import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss',
})
export class CartComponent {
  private cartCount = signal<number>(0);
  moreThanTenItems = computed(() => this.cartCount() > 10);

  updateCount(val: number) {
    this.cartCount.set(val);
  }
}

import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from './models';

const STORAGE_KEY = 'piese-auto-cos';

function readFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(readFromStorage());

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().reduce((sum, i) => sum + i.cantitate, 0));
  readonly total = computed(() => this._items().reduce((sum, i) => sum + i.pret * i.cantitate, 0));

  add(item: Omit<CartItem, 'cantitate'>, cantitate = 1): void {
    const items = this._items();
    const existing = items.find(i => i.id === item.id);

    this.set(
      existing
        ? items.map(i => (i.id === item.id ? { ...i, cantitate: i.cantitate + cantitate } : i))
        : [...items, { ...item, cantitate }]
    );
  }

  updateCantitate(id: string, cantitate: number): void {
    if (cantitate < 1) {
      this.remove(id);
      return;
    }
    this.set(this._items().map(i => (i.id === id ? { ...i, cantitate } : i)));
  }

  remove(id: string): void {
    this.set(this._items().filter(i => i.id !== id));
  }

  clear(): void {
    this.set([]);
  }

  private set(items: CartItem[]): void {
    this._items.set(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

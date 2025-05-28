import { Card } from "./Card.js";

export class Deck {
  private id?: number;
  private title: string;
  private description?: string | null;
  private cards: Card[];

  constructor(title: string, description?: string) {
    this.title = title;
    this.description = description ?? null;
    this.cards = [];
  }

  getId(): number | undefined {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  getDescription(): string | null {
    return this.description ?? null;
  }
  getCards(): Card[] {  
    return this.cards;
  }
}
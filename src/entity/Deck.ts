import { Card } from "./Card";

export class Deck {
  private id?: number;
  private name: string;
  private description?: string | null;
  private cards: Card[];

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description ?? null;
    this.cards = [];
  }

  getId(): number | undefined {
    return this.id;
  }
  getTitle(): string {
    return this.name;
  }
  getDescription(): string | null {
    return this.description ?? null;
  }
  getCards(): Card[] {  
    return this.cards;
  }
}
export class Card {
    private id?: number;
    private name: string;
    private description?: string | null;
    private image: string;
    private deckId: number;

    constructor(name: string, image: string, deckId: number, description?: string) {
        this.name = name;
        this.image = image;
        this.deckId = deckId;
        this.description = description ?? null;
    }
    
    getId(): number | undefined{
        return this.id;
    }
    getName(): string{
        return this.name;
    }
    getImage(): string{
        return this.image;
    }
    getDescription(): string | null{
        return this.description ?? null;
    }
    getDeckId(): number{
        return this.deckId;
    }
}
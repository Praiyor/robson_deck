import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface";
import { DeckFormat } from "../../utils/DeckFormatRules";

export class CreateDeckUsecase{
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(name: string, format: DeckFormat, rules: {minCards?: number; exactCards?: number}, description?: string): Promise<boolean> {
        const deckData = {
          name,
          format,
          description,
          minCards: rules.minCards ?? null,
          exactCards: rules.exactCards ?? null,
        };
        return await this.DeckRepository.create(deckData)
    }
}
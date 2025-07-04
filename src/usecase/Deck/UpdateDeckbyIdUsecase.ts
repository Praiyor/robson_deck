import { DeckRepositoryInterface } from "../../repository/interface/DeckRepositoryInterface";
import { DeckFormat } from "../../utils/DeckFormatRules";
import { GetDeckByIdUseCase } from "./GetDeckbyIdUsecase";

type DeckUpdateRules = {
  minCards?: number;
  exactCards?: number;
};

type DeckUpdateFields = {
  name?: string;
  format?: DeckFormat;
  minCards?: number | null;
  exactCards?: number | null;
  description?: string;
};

export class UpdateDeckbyidUsecase {
    constructor(private DeckRepository: DeckRepositoryInterface){}

    async execute(deckId: number, name?: string, format?: DeckFormat, rules?: {minCards?: number; exactCards?: number}, description?: string): Promise<void> {
        const dataToUpdate = this.buildUpdateData(name, format, rules, description);
        await this.validate(deckId);
        await this.DeckRepository.updateById(deckId, dataToUpdate)
    }

    private buildUpdateData(name?: string,
        format?: DeckFormat,
        rules?: DeckUpdateRules,
        description?: string
        ): DeckUpdateFields {
        const updateData: DeckUpdateFields = {
          ...(name !== undefined && { name }),
          ...(format !== undefined && { format }),
          ...(description !== undefined && { description }),
        };
    
        if (rules?.minCards !== undefined && rules?.exactCards !== undefined) {
          throw new Error("Cannot set both minCards and exactCards at the same time.");
        }
    
        if (rules?.minCards !== undefined) {
          updateData.minCards = rules.minCards;
          updateData.exactCards = null;
        } else if (rules?.exactCards !== undefined) {
          updateData.exactCards = rules.exactCards;
          updateData.minCards = null;
        }
    
        return updateData;
    }

    private async validate(deckId: number): Promise<void> {
        const getDeckUseCase = new GetDeckByIdUseCase(this.DeckRepository);
        const deck = await getDeckUseCase.execute(deckId);

        if(!deck){
            throw new Error(`Deck with id ${deckId} not found.`);
        }
    }
}
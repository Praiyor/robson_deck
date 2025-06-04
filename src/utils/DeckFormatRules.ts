export enum DeckFormat {
    COMMANDER = "Commander",
    STANDARD = "Standard",
    MODERN = "Modern",
    PAUPER = "Pauper",
    SINGLETON = "Singleton",
}

type FormatRule = {
    minCards?: number;
    exactCards?: number;
}

export const DeckFormatRules: Record<DeckFormat, FormatRule> = {
    [DeckFormat.COMMANDER]: { exactCards: 100 },
    [DeckFormat.STANDARD]:  { minCards: 60 },
    [DeckFormat.MODERN]:    { minCards: 60 },
    [DeckFormat.PAUPER]:    { minCards: 60 },
    [DeckFormat.SINGLETON]: { exactCards: 60}
}

export function getFormatRule(format: DeckFormat): FormatRule {
    const rule = DeckFormatRules[format];
    if(!rule){
        throw new Error(`Format ${format} is not recognized.`);
    }
    return rule;
}
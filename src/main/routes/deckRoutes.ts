import { Router } from "express";
import { Deckcontroller } from "../../controller/Deckcontroller.js";

const router = Router();

router.post('/', Deckcontroller.createDeck);
router.get('/', Deckcontroller.getAllDecks);
router.get('/:deckId', Deckcontroller.getDeckById);
router.post('/:deckId/cards', Deckcontroller.addCardToDeck);
router.delete('/:deckId/cards/:cardId', Deckcontroller.removeCardFromDeck);
router.delete('/:deckId', Deckcontroller.deletedeckById);
router.put('/:deckId', Deckcontroller.updateDeckById);

export {router as deckRoutes};
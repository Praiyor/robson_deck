import { Router } from "express";
import { Deckcontroller } from "../../controller/Deckcontroller.js";

const router = Router();

/**
 * @openapi
 * /decks:
 *   post:
 *     summary: Cria um novo deck
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Deck criado com sucesso
 *       400:
 *         description: Erro de validação
 *
 *   get:
 *     summary: Retorna todos os decks
 *     responses:
 *       200:
 *         description: Lista de decks
 *
 * /decks/{deckId}:
 *   get:
 *     summary: Retorna um deck específico
 *     parameters:
 *       - name: deckId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deck encontrado
 *       404:
 *         description: Deck não encontrado
 *
 *   put:
 *     summary: Atualiza um deck pelo ID
 *     parameters:
 *       - name: deckId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deck atualizado
 *       404:
 *         description: Deck não encontrado
 *
 *   delete:
 *     summary: Deleta um deck pelo ID
 *     parameters:
 *       - name: deckId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deck deletado com sucesso
 *       404:
 *         description: Deck não encontrado
 *
 * /decks/{deckId}/cards:
 *   post:
 *     summary: Adiciona um card ao deck
 *     parameters:
 *       - name: deckId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Card adicionado ao deck
 *       404:
 *         description: Deck ou card não encontrado
 *
 * /decks/{deckId}/cards/{cardId}:
 *   delete:
 *     summary: Remove um card de um deck
 *     parameters:
 *       - name: deckId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: cardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card removido do deck
 *       404:
 *         description: Deck ou card não encontrado
 */

router.post('/', Deckcontroller.createDeck);
router.get('/', Deckcontroller.getAllDecks);
router.get('/:deckId', Deckcontroller.getDeckById);
router.post('/:deckId/cards', Deckcontroller.addCardToDeck);
router.delete('/:deckId/cards/:cardId', Deckcontroller.removeCardFromDeck);
router.delete('/:deckId', Deckcontroller.deletedeckById);
router.put('/:deckId', Deckcontroller.updateDeckById);

export {router as deckRoutes};
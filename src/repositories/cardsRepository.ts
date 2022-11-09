import db from '../database/index.js';
import { PaginationConfig } from './../protocols/configs.js';
import { Card } from './../protocols/card.js';

async function getCards(config: PaginationConfig) {
  const { limit, offset } = config;
  return db.query(
    `SELECT * FROM cards c
    LIMIT $1
    OFFSET $2;`,
    [limit, offset]
  );
}

async function insertCard(card: Card) {
  return db.query(
    `INSERT INTO cards
      ("scryfall_id",
      "oracle_id",
      "name",
      "type_line",
      "oracle_text",
      "mana_cost",
      "cmc",
      "colors",
      "color_identity",
      "released_at",
      "scryfall_uri",
      "image_uri",
      "price")
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
    [
      card.scryfallId,
      card.oracleId,
      card.name,
      card.typeLine,
      card.oracleText,
      card.manaCost,
      card.cmc,
      card.colors,
      card.colorIdentity,
      card.releasedAt,
      card.scryfallUri,
      card.imageUri,
      card.price,
    ]
  );
}

const cardsRepository = { getCards, insertCard };

export default cardsRepository;

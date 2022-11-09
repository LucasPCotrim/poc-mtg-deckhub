import db from '../database/index.js';
import { PaginationConfig } from './../protocols/configs.js';
import { Card } from './../protocols/card.js';
import { QueryResult } from 'pg';

async function getCards(config: PaginationConfig): Promise<QueryResult> {
  const { limit, offset } = config;
  return db.query(
    `SELECT * FROM cards c
    LIMIT $1
    OFFSET $2;`,
    [limit, offset]
  );
}

async function insertCard(card: Card): Promise<QueryResult> {
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

async function getCardByName(name: string): Promise<QueryResult> {
  console.log('--------------------------getCardByName');
  return db.query(
    `SELECT * FROM cards
    WHERE name ILIKE $token$${name}$token$`
  );
}

const cardsRepository = { getCards, insertCard, getCardByName };

export default cardsRepository;

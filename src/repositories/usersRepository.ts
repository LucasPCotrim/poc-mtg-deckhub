import db from '../database/index.js';
import { QueryResult } from 'pg';
import { SignUpUser } from '../protocols/signUpUser.js';

async function createUser(user: SignUpUser): Promise<QueryResult> {
  return db.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)`,
    [user.name, user.email, user.hashPassword]
  );
}

async function getUserByEmail(email: string): Promise<QueryResult> {
  return db.query(
    `SELECT * FROM users u
    WHERE email = $1`,
    [email]
  );
}

async function getUserInfoById(id: number): Promise<QueryResult> {
  return db.query(
    `
    SELECT
      "u"."name" AS "name",
      "u"."email" AS "email",
      COUNT(DISTINCT "d"."id") AS "number_of_decks",
      SUM("c"."price" * "cd"."amount") AS "collection_value",
      ARRAY(
        SELECT
          json_build_object(
            'name', "u_d"."name",
            'format', "u_f"."name",
            'deck_value', SUM("u_c"."price" * "u_cd"."amount"),
            'cards',
            ARRAY (
              SELECT
                json_build_object('name', "u_d_c"."name", 'amount', "u_d_cd"."amount" ,'type_line', "u_d_c"."type_line", 'oracle_text', "u_d_c"."oracle_text", 'mana_cost', "u_d_c"."mana_cost", 'cmc', "u_d_c"."cmc", 'colors', "u_d_c"."colors", 'color_identity', "u_d_c"."color_identity", 'scryfall_uri', "u_d_c"."scryfall_uri", 'image_uri', "u_d_c"."image_uri", 'price', "u_d_c"."price" )
              FROM
                "cards" "u_d_c"
                JOIN "cards_decks" "u_d_cd" ON "u_d_c"."id" = "u_d_cd"."card_id"
                JOIN "decks" "u_d_d" ON "u_d_cd"."deck_id" = "u_d_d"."id"
              WHERE "u_d_d"."id" = "u_d"."id"
            )
          )
        FROM
          "decks" "u_d"
          JOIN "formats" "u_f" ON "u_d"."format_id" = "u_f"."id"
          JOIN "cards_decks" "u_cd" ON "u_d"."id" = "u_cd"."deck_id"
          JOIN "cards" "u_c" ON "u_cd"."card_id" = "u_c"."id"
        WHERE "u_d"."user_id" = "u"."id"
        GROUP BY "u_d"."id", "u_f"."name"
      ) AS "decks"
    FROM
      "users" "u"
      JOIN "decks" "d" ON "d"."user_id" = "u"."id"
      JOIN "cards_decks" "cd" ON "cd"."deck_id" = "d"."id"
      JOIN "cards" "c" ON "cd"."card_id" = "c"."id"
    WHERE "u"."id" = $1
    GROUP BY "u"."id";
    `,
    [id]
  );
}

const usersRepository = { createUser, getUserByEmail, getUserInfoById };

export default usersRepository;

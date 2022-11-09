CREATE DATABASE mtgdeckhub;

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL REFERENCES "users"("id"),
	"token" TEXT UNIQUE NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "formats" (
  "id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL
);

INSERT INTO "formats"("name") VALUES ('standard');
INSERT INTO "formats"("name") VALUES ('historic');
INSERT INTO "formats"("name") VALUES ('pioneer');
INSERT INTO "formats"("name") VALUES ('explorer');
INSERT INTO "formats"("name") VALUES ('modern');
INSERT INTO "formats"("name") VALUES ('legacy');
INSERT INTO "formats"("name") VALUES ('pauper');
INSERT INTO "formats"("name") VALUES ('vintage');
INSERT INTO "formats"("name") VALUES ('commander');
INSERT INTO "formats"("name") VALUES ('historicbrawl');

CREATE TABLE "decks" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "name" TEXT NOT NULL,
  "format_id" INTEGER NOT NULL REFERENCES "formats"("id"),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "cards" (
  "id" SERIAL PRIMARY KEY,
  "scryfall_id" TEXT NOT NULL,
  "oracle_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type_line" TEXT NOT NULL,
  "oracle_text" TEXT NOT NULL,
  "mana_cost" TEXT NOT NULL,
  "cmc" INTEGER NOT NULL,
  "colors" VARCHAR(5) NOT NULL,
  "color_identity" VARCHAR(5) NOT NULL,
  "released_at" DATE NOT NULL,
  "scryfall_uri" TEXT NOT NULL,
  "image_uri" TEXT NOT NULL,
  "price" INTEGER
);

CREATE TABLE "cards_decks" (
  "id" SERIAL PRIMARY KEY,
  "card_id" INTEGER NOT NULL REFERENCES "cards"("id") ON DELETE CASCADE,
  "deck_id" INTEGER NOT NULL REFERENCES "decks"("id") ON DELETE CASCADE
);
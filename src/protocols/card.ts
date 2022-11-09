export type Card = {
  scryfallId: number;
  oracleId: number;
  name: string;
  typeLine: string;
  oracleText: string;
  manaCost: string;
  cmc: number;
  colors: string;
  colorIdentity: string;
  releasedAt: Date;
  scryfallUri: string;
  imageUri: string;
  price: number;
};

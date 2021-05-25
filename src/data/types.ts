export type Deck = {
  settings: object;
  cardNumber: number;
  cards: {
    content: {
      line: number;
      color: string;
      text: string;
    }[];
    viewed: boolean;
  }[];
};

export type Card = {
  text1: string;
  text2: string;
};

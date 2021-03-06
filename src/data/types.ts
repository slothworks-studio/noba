export type Deck = {
  default: any;
  settings: {
    onboarded: boolean;
    isPersisted: boolean;
    mode: 'grid' | 'card' | 'onboarding' | 'initializing';
  };
  /**
   * cardNumber refers to the current card in the array. Can also be used
   * to tell the total cards viewed.
   */
  currentCard: number;
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

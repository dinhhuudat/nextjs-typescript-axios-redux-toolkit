export interface userDetails {
  isBanker: boolean;
  id: string;
  name: string;
  coins: number;
  points: number;
  userPosition: number;
  cardHolder: Array<cardsDetails>;
  hasNext: boolean;
  isPlaying: boolean;
}

export interface deckDetails {
  deck_id: string;
  loading: boolean;
  shuffled: boolean;
  remaining: number;
  nextDrawn: string;
  reveal: boolean;
  pause: boolean;
  newGame: boolean;
  winner: string[];
  loser: string[];
  alertSetting: settingAlert;
  currentUser: userDetails;
  userLists: Array<userDetails>;
}

export interface settingAlert {
  visible: boolean;
  title: string;
  type: "error" | "info" | "success";
}

export interface cardsDetails {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
  value: string;
  suit: string;
}

export interface drawnReponse {
  success: boolean;
  deck_id: string;
  cards: Array<cardsDetails>;
  remaining: number;
}

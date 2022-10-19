import { cardsDetails, userDetails } from "@/state/models/deck";

// APP TEXT
export const APP_TITLE = "Welcome, Developer";
export const FOOTER_TEXT = `${new Date().getFullYear()} Built with ♡ by Welcome, Developer`;
// UI CONSTANTS
export const FOOTER_HEIGHT = 30;
export const HEADER_HEIGHT = 60;
export const DRAWER_WIDTH = 0;

export const POINT_LOSE = 900;

export const VALIDATE_STRING =
  "Muốn mở bài phải đảm bảo mỗi nhà đã có 3 lá bài";

export const ALERT_TYPE: Record<string, "error" | "success" | "info"> = {
  error: "error",
  success: "success",
  info: "info",
};

export const SPECIAL_VALUES: Record<string, string> = {
  QUEEN: "10",
  JACK: "10",
  KING: "10",
  ACE: "1",
};

export const converCardToPoint = (value: string) => {
  const key = Object.keys(SPECIAL_VALUES).find((ele) => ele === value);
  if (key) {
    return SPECIAL_VALUES[key];
  } else {
    return value;
  }
};

export const caculatePoints = (cards: Array<cardsDetails>) => {
  return cards.reduce((a, b) => a + parseInt(b.value), 0) % 10;
};

export const countTotalCardInDeskOfUsers = (userLists: Array<userDetails>) => {
  return userLists.reduce((a, b) => {
    if (b.isPlaying) {
      return a + b.cardHolder.length;
    } else {
      return a + 0;
    }
  }, 0);
};

export const validateReveal = (
  totalCards: number,
  userLists: Array<userDetails>
) => {
  // total player
  const TOTAL_PLAYER = userLists.length;
  if (totalCards / TOTAL_PLAYER === 3) {
    return true;
  }

  return false;
};

export const checkWinnerOrLoser = (userLists: Array<userDetails>) => {
  let winner: string[] = [];
  let loser: string[] = [];
  const maxPoint = userLists.reduce((a, b) => Math.max(a, b.points), 0);

  userLists.forEach((user) => {
    if (user.points === maxPoint) {
      winner.push(user.id);
    } else {
      loser.push(user.id);
    }
  });

  return { winner, loser };
};

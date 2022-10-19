import {
  ALERT_TYPE,
  caculatePoints,
  checkWinnerOrLoser,
  converCardToPoint,
  POINT_LOSE,
  validateReveal,
  VALIDATE_STRING,
} from "@/utils/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deckDetails,
  drawnReponse,
  settingAlert,
  userDetails,
} from "../models/deck";
import { createDesk, getDrawn } from "../services/deck";

export const createNewDesk = createAsyncThunk("deskInfo/createNewDesk", () => {
  return createDesk();
});

export const fetchDrawn = createAsyncThunk(
  "deskInfo/fetchDrawn",
  (deckId: string) => {
    return getDrawn(deckId);
  }
);

let initialState: deckDetails = {
  deck_id: "",
  loading: false,
  shuffled: false,
  remaining: 52,
  nextDrawn: "0",
  reveal: false,
  pause: false,
  winner: [],
  loser: [],
  newGame: true,
  alertSetting: { visible: false, title: "", type: "info" },
  currentUser: {
    isBanker: true,
    id: "banker1",
    name: "Main",
    coins: 900,
    points: 0,
    userPosition: 0,
    cardHolder: [],
    hasNext: false,
    isPlaying: true,
  },
  userLists: [
    {
      isBanker: false,
      id: "0",
      name: "A",
      coins: 900,
      points: 0,
      userPosition: 0,
      cardHolder: [],
      hasNext: true,
      isPlaying: true,
    },
    {
      isBanker: false,
      id: "1",
      name: "B",
      coins: 900,
      points: 0,
      userPosition: 1,
      cardHolder: [],
      hasNext: false,
      isPlaying: true,
    },
    {
      isBanker: false,
      id: "2",
      name: "C",
      coins: 5000,
      points: 0,
      userPosition: 2,
      cardHolder: [],
      hasNext: false,
      isPlaying: true,
    },
    {
      isBanker: false,
      id: "3",
      name: "D",
      coins: 5000,
      points: 0,
      userPosition: 3,
      cardHolder: [],
      hasNext: false,
      isPlaying: true,
    },
  ],
};

export const deskDetailsSlice = createSlice({
  name: "deskInfo",
  initialState,
  reducers: {
    resetStore: () => initialState,
    dispatchAlert: (state, { payload }: PayloadAction<settingAlert>) => {
      state.alertSetting = payload;
    },
    setPause: (state, { payload }: PayloadAction<boolean>) => {
      state.pause = payload;
      if (!payload) {
        //clear cards
        state.currentUser.cardHolder = [];
        state.userLists.forEach((user, index) => {
          user.hasNext = index === 0;
          user.cardHolder = [];
        });
        state.reveal = false;
        state.newGame = true;
      }
    },
    setReveal: (state) => {
      //check conditions
      let totalCardInDesk = 0;

      let userPlaying = state.userLists.filter(
        (user) => user.isPlaying === true
      );

      if (state.currentUser.isPlaying) {
        userPlaying.push(state.currentUser);
      }

      userPlaying.forEach((user) => {
        if (user.isPlaying) {
          totalCardInDesk += user.cardHolder.length;
        }
      });

      // state.currentUser.cardHolder.length +
      //   countTotalCardInDeskOfUsers(state.userLists);
      console.log(1, { totalCardInDesk, userPlaying });
      const validate = validateReveal(totalCardInDesk, userPlaying);
      console.log(2, validate);
      if (validate) {
        //show cards
        state.reveal = !state.reveal;

        //user win & user lose
        const checkWinner = checkWinnerOrLoser([
          state.currentUser,
          ...userPlaying,
        ]);

        state.winner = checkWinner.winner;
        state.loser = checkWinner.loser;

        //reduce point of loser
        if (checkWinner.loser.includes("banker1")) {
          state.currentUser.coins -= POINT_LOSE;
        }

        state.userLists.forEach((user, index) => {
          if (checkWinner.loser.includes(user.id)) {
            state.userLists[index].coins -= POINT_LOSE;
          }
        });

        //user not enough coins
        state.userLists.forEach((user, index) => {
          if (user.coins < 900 && state.userLists[index].isPlaying) {
            state.userLists[index].isPlaying = false;
            //show alert
            state.alertSetting = {
              visible: true,
              title: `User ${user.name} đã hết tiền và mất quyền chơi tiếp`,
              type: ALERT_TYPE.info,
            };
          }
        });

        //me not enough coins
        if (state.currentUser.coins < 900 && state.currentUser.isPlaying) {
          state.currentUser.isPlaying = false;
          state.alertSetting = {
            visible: true,
            title: `Bạn đã hết tiền và mất quyền chơi tiếp`,
            type: ALERT_TYPE.info,
          };
        }

        //pause
        state.pause = true;
      } else {
        state.alertSetting = {
          visible: true,
          title: VALIDATE_STRING,
          type: ALERT_TYPE.error,
        };
      }
    },
  },
  extraReducers: {
    [createNewDesk.pending.type]: (state) => {
      state.loading = true;
    },
    [createNewDesk.fulfilled.type]: (
      state,
      { payload }: PayloadAction<deckDetails>
    ) => {
      state.deck_id = payload.deck_id;
      state.remaining = payload.remaining;
      state.currentUser.cardHolder = [];
      state.reveal = false;
      state.newGame = true;

      state.userLists.forEach((user, index) => {
        user.hasNext = index === 0;
        user.cardHolder = [];
      });

      state.loading = false;
    },
    [createNewDesk.rejected.type]: (state) => {
      state.loading = true;
    },
    [fetchDrawn.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchDrawn.fulfilled.type]: (
      state,
      { payload }: PayloadAction<drawnReponse>
    ) => {
      const { remaining, cards, success } = payload;
      if (success) {
        state.remaining = remaining;

        //card points
        cards[0].value = converCardToPoint(cards[0].value);

        // lấy ra tất cả user đang còn chơi
        let room: Array<userDetails> = [];

        if (state.currentUser.isPlaying) {
          room.push(state.currentUser);
        }

        const userPlaying = state.userLists.filter((user) => user.isPlaying);

        // cho tất cả user đang chơi vào 1 room
        room = [...userPlaying, ...room];

        let nextId = 0;
        room.forEach((user, index) => {
          if (user.hasNext) {
            nextId = index + 1;
            if (nextId === room.length) {
              nextId = 0;
            }
          }
        });

        let nextPerson = room[nextId];
        if (state.newGame) {
          nextPerson = room[0];
          state.newGame = false;
        }

        // mặc định không có user nào tiếp theo
        state.currentUser.hasNext = false;
        state.userLists.forEach((user, index) => {
          if (user.hasNext) {
            state.userLists[index].hasNext = false;
          }
        });

        //set next person recieve card
        if (state.currentUser.id === nextPerson.id) {
          state.currentUser.hasNext = true;
        } else {
          state.userLists.forEach((user, index) => {
            if (user.id === nextPerson.id) {
              state.userLists[index].hasNext = true;
            }
          });
        }

        //push card
        if (state.currentUser.hasNext) {
          state.currentUser.cardHolder.push(cards[0]);
          // caculate points
          state.currentUser.points = caculatePoints(
            state.currentUser.cardHolder
          );
        }

        //push card
        state.userLists.forEach((user, index) => {
          if (user.hasNext) {
            state.userLists[index].cardHolder.push(cards[0]);
            // caculate points
            state.userLists[index].points = caculatePoints(
              state.userLists[index].cardHolder
            );
          }
        });
      }

      state.loading = false;
    },
    [fetchDrawn.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

export default deskDetailsSlice.reducer;

export const { resetStore, setReveal, dispatchAlert, setPause } =
  deskDetailsSlice.actions;

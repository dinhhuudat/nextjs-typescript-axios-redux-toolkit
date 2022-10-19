import CustomButton from "@/components/common/Button/button";
import User from "@/components/user";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { deckDetails, userDetails } from "@/state/models/deck";
import {
  createNewDesk,
  dispatchAlert,
  fetchDrawn,
  resetStore,
  setPause,
  setReveal,
} from "@/state/redux/deck";
import styles from "@/styles/pages/desk.module.scss";
import { ALERT_TYPE } from "@/utils/constants";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";

const DeckById: React.FC = () => {
  const { deskDetails } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { id } = router.query;

  const COUNT_PLAYING = useMemo(
    () =>
      (deskDetails.currentUser.isPlaying ? 1 : 0) +
      deskDetails.userLists.filter((user) => user.isPlaying).length,
    [deskDetails.pause]
  );

  const handleDraw = () => {
    let COUNT_CARDS = 0;
    let maxCard = 0;

    let currentPlaying: Array<any> = [];

    if (deskDetails.currentUser.isPlaying) {
      currentPlaying.push(deskDetails.currentUser);
    }

    deskDetails.userLists.forEach((user) => {
      if (user.isPlaying) {
        currentPlaying.push(user);
      }
    });

    currentPlaying.forEach((user) => {
      COUNT_CARDS += user.cardHolder.length;
    });

    maxCard = currentPlaying.length * 3;

    if (COUNT_CARDS >= maxCard) {
      dispatch(
        dispatchAlert({
          type: "info",
          title: "Tổng bài của 3 người chơi đã đủ , bạn có thể lật bài rồi",
          visible: true,
        })
      );
    } else {
      id && dispatch(fetchDrawn(id.toString()));
    }
  };

  const handleShuffle = () => {
    dispatch(createNewDesk());
  };

  const handleReset = () => {
    dispatch(createNewDesk());
    dispatch(resetStore());
  };

  const handleReveal = () => {
    dispatch(setReveal());
  };

  const handlePause = () => {
    dispatch(setPause(false));
    let minCard = 0;
    if (deskDetails.currentUser.isPlaying) {
      minCard = 1;
    }
    minCard =
      (minCard +
        deskDetails.userLists.filter((user) => user.isPlaying).length) *
      3;

    if (deskDetails.remaining < minCard) {
      handleShuffle();
      dispatch(
        dispatchAlert({
          type: ALERT_TYPE.info,
          title:
            "Bộ bài hiện tại không đủ để chơi tiếp , nên đã reset lại bộ bài mới",
          visible: true,
        })
      );
    }
  };

  useEffect(() => {
    if (deskDetails.deck_id) {
      router.push(`${deskDetails.deck_id}`);
    }
  }, [deskDetails.deck_id]);

  return (
    <div className={styles["desk"]}>
      <div className={styles["desk__playerContainer"]}>
        {deskDetails.userLists.map((info: userDetails) => {
          if (info.isPlaying) {
            return (
              <React.Fragment key={info.id}>
                <User userInfo={info} />
              </React.Fragment>
            );
          }
        })}
      </div>
      <div className={styles["desk__remainCards"]}>
        Remain Cards:{deskDetails.remaining}
      </div>
      <div className={styles["desk__Buttons"]}>
        {deskDetails.pause ? (
          <>
            {COUNT_PLAYING < 2 ? (
              <CustomButton onClick={handleReset} title="Reset"></CustomButton>
            ) : (
              <CustomButton onClick={handlePause} title="Play Game!" />
            )}
          </>
        ) : (
          <>
            <CustomButton
              onClick={handleShuffle}
              title="Shuffle"
            ></CustomButton>
            <CustomButton
              isLoading={deskDetails.loading}
              onClick={handleDraw}
              title="Drawn"
            ></CustomButton>
            <CustomButton onClick={handleReveal} title="Reveal"></CustomButton>
            <CustomButton onClick={handleReset} title="Reset"></CustomButton>
          </>
        )}
      </div>
      {deskDetails.currentUser.isPlaying && (
        <User userInfo={deskDetails.currentUser} />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});

export default DeckById;

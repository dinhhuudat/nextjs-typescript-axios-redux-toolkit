import styles from "./user.module.scss";
import React from "react";
import { cardsDetails } from "@/state/models/deck";
import Image from "next/image";
import { useAppSelector } from "@/hooks/reduxHook";
import { backSideCard } from "@/public/images/backSideCard";

interface IUserProps {
  userInfo: {
    id?: string;
    name: string;
    coins: number;
    points: number;
    userPosition: number;
    cardHolder: Array<cardsDetails>;
  };
}

const User: React.FC<IUserProps> = ({ userInfo }) => {
  const {
    deskDetails: { reveal },
  } = useAppSelector((state) => state);

  return (
    <div className={styles["user"]}>
      <div className={styles["user__card"]}>
        <div className={styles["user__container"]}>
          <div className={styles["user__container--name"]}>
            Player: {userInfo.name}
          </div>
          <div className={styles["user__container--coins"]}>
            coins: {userInfo.coins}{" "}
          </div>
          {reveal && (
            <div className={styles["user__container--points"]}>
              points: {userInfo.points}
            </div>
          )}
          <div className={styles["user__container--cards"]}>
            {userInfo.cardHolder.map((card) => (
              <Image
                width={50}
                height={50}
                key={card.code}
                src={reveal ? card.image : backSideCard}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

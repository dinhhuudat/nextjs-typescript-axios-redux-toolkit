import CustomButton from "@/components/common/Button/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { createNewDesk } from "@/state/redux/deck";
import styles from "@/styles/pages/home.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const {
    deskDetails: { deck_id },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onCreateNewDesk = () => {
    dispatch(createNewDesk());
  };

  useEffect(() => {
    if (deck_id) {
      router.push(`deck/${deck_id}`);
    }
  }, [deck_id]);

  return (
    <>
      <div className={styles["homePage"]}>
        <CustomButton title="CREATE NEW DESK" onClick={onCreateNewDesk} />
      </div>
    </>
  );
}

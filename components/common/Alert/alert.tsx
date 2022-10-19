import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { dispatchAlert } from "@/state/redux/deck";
import React, { useEffect, useRef, useState } from "react";
import styles from "./alert.module.scss";

const AlertMessage = () => {
  const {
    deskDetails: { alertSetting },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [visible, setVisibible] = useState(false);

  const refInterval = useRef<any>();

  const classNameOfAlert = `rectangle--${alertSetting.type}`;

  useEffect(() => {
    refInterval.current = setTimeout(() => {
      setVisibible(false);
      dispatch(dispatchAlert({ visible: false, title: "", type: "error" }));
    }, 4000);
    return () => {
      clearTimeout(refInterval.current);
    };
  }, [visible]);

  useEffect(() => {
    if (alertSetting.visible) {
      setVisibible(true);
    }
  }, [alertSetting.visible]);

  return (
    <React.Fragment>
      {visible && (
        <div className={styles[`container`]}>
          <div className={styles["rectangle"]}>
            <div className={styles[classNameOfAlert]}>
              <div className={styles["notification-text"]}>
                <i className={styles["material-icons"]}>{alertSetting.type}</i>
                <span>&nbsp;&nbsp;{alertSetting.title}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AlertMessage;

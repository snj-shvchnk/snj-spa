import React, { useEffect } from "react";
import FormLogin from '../../Components/FormLogin';
import styles from "./LoginPage.module.css";
import icons from "../../Components/icons";
import "./LoginPage.css";

function LoginPage(props) {

  useEffect(() => {
    const logo = document.getElementById("logo");
    const form = document.getElementById("form");
    const spinner = document.getElementById("spinner");

    logo.classList.add("scale-in");
    spinner.style.transform = "translateX(-50%) rotate(-180deg)";
    spinner.style.opacity = 1;

    logo.addEventListener('animationend', () => {
      setTimeout(() => {
        logo.classList.add("slide-left");
        form.classList.add("slide-right");
        spinner.style.transform = "translateX(-50%) rotate(-360deg)";
        spinner.style.opacity = 0;
      }, 500); 

    });
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.innerLeft} id="logo">
            <img src="/logo.png" alt="Snj SPI boX" />
          </div>
          <div className={styles.innerRight} id="form">
            <FormLogin onSubmit={props.onLogIn} />
          </div>
        </div>
        <div id="spinner">{icons.spinner}</div>
      </section>
    </div>

  );
}

export default LoginPage;

import styled from "styled-components";
// import backGround from "../assets/images/agentphone2.png";
import whiteLogo from "../assets/images/iphoneCamera.png";
import phone from "../assets/images/iphone.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

function AgentPhone({ y, backGround }) {
  const phoneRef = useRef(null);
  const phoneScreenRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (phoneRef.current) {
        const theTop = () => {
          const { top } = phoneRef.current.getBoundingClientRect();
          const thedistance = top + pageYOffset;
          return thedistance;
        };
        const distance = theTop();
        const scrollEffect = () => {
          const screenHeight = window.innerHeight;

          const phoneScrollPosition =
            window.pageYOffset || document.documentElement.scrollTop;

          let scroll =
            ((distance - phoneScrollPosition) / screenHeight - 1) * 200;

          if (
            distance - phoneScrollPosition < screenHeight + 500 &&
            phoneScrollPosition - distance < screenHeight
          ) {
            gsap.to(phoneScreenRef.current, {
              backgroundPosition: `center ${scroll}px`,
            });
          }
        };
        document.addEventListener("scroll", scrollEffect);
      }
    }, 2000);
  }, []);
  return (
    <Phone
      ref={phoneRef}
      style={{
        y,
      }}
    >
      <Logo src={whiteLogo} alt="img" />
      <Screen background={backGround} ref={phoneScreenRef} />
      <img src={phone} className="phone" alt="img" />
    </Phone>
  );
}
const Phone = styled(motion.div)`
  position: relative;
  pointer-events: none;
  /* top: 130px;
  right: 0px; */
  width: 300px;
  z-index: 3;
  display: inline-block;
  @media screen and (max-width: 1300px) {
    width: 290px;
  }
  @media screen and (max-width: 1100px) {
    width: 270px;
  }
  @media screen and (max-width: 1000px) {
    width: 220px;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }

  img.phone {
    width: inherit;
  }
`;

const Screen = styled.div`
  position: absolute;
  bottom: 0;
  top: calc(100% / 42);
  left: calc(100% / 9.6);
  right: calc(100% / 10.6);
  bottom: calc(100% / 36);
  background-color: red;
  border-radius: 30px;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center 0px;
`;

const Logo = styled.img`
  top: calc(100% / 25);
  width: calc(100% / 4.5);
  z-index: 4;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
export default AgentPhone;

/** @jsx jsx */
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { css, jsx } from "@emotion/react";
import "./app.css";

export const App: FunctionComponent = () => {
  const [sample, setSample] = useState<null | HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const onEnded = useCallback(() => {
    setPlaying(false);
  }, []);

  useEffect(() => {
    const sample = new Audio("piano2.wav");
    sample.addEventListener("ended", onEnded);
    setSample(sample);
  }, []);

  const onClickButton = useCallback(() => {
    if (!sample || sample.readyState !== 4) {
      return;
    }

    sample.play();
    sample.currentTime = 0;
    setPlaying(true);
  }, [sample]);

  const depth = 25;
  const holeWidth = 4;

  const buttonStyle = css`
    background-color: #ff0;
    cursor: pointer;
    height: 70px;
    min-width: 200px;
    text-transform: uppercase;
    border: 0;
    font-size: 30px;
    font-weight: bold;
    position: relative;
    box-shadow: -${depth}px ${depth}px 0 ${holeWidth}px #000;
    user-select: none;

    &::before,
    &::after {
      content: "";
      position: absolute;
    }

    &::before {
      background-color: #0ff;
      height: 100%;
      right: 100%;
      top: 12px;
      transform: skew(0deg, -45deg);
      width: 24px;
    }

    &::after {
      background-color: #9900ff;
      height: 24px;
      left: -12px;
      top: 100%;
      transform: skew(-45deg);
      width: 100%;
    }

    &:active {
      color: #000;
      transform: translate(-${depth - holeWidth}px, ${depth - holeWidth}px);
      box-shadow: -${holeWidth}px ${holeWidth}px 0 ${holeWidth}px #000;

      &::before {
        top: 1.5px;
        width: 3px;
      }

      &::after {
        left: -1.5px;
        height: 3px;
      }
    }
  `;

  return (
    <div
      className="application"
      css={css`
        ${playing ? "filter: invert();" : ""}
        background-image: url("https://placekitten.com/g/1200/800");
        background-size: cover;
        background-position: center;
        display: flex;
        height: 100vh;
        width: 100vw;
      `}
    >
      <div
        className="buttons"
        css={css`
          align-self: flex-end;
          display: flex;
          justify-content: space-evenly;
          margin-bottom: 64px;
          width: 100%;
        `}
      >
        <button onClick={onClickButton} css={buttonStyle}>
          Bacon
        </button>
        <button onClick={onClickButton} css={buttonStyle}>
          Beer can
        </button>
      </div>
    </div>
  );
};

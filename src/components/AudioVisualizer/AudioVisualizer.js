import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer";
import styles from "./AudioVisualizer.module.css";
import { Button } from "@douyinfe/semi-ui";
import { IconPlay, IconPause } from "@douyinfe/semi-icons";

export default function AudioVisualizer({ audioUrl }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "violet",
      progressColor: "purple",
      cursorColor: "transparent",
    });

    wavesurfer.current.load(audioUrl);

    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    wavesurfer.current.on("finish", () => setIsPlaying(false));

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioUrl]);

  return (
    <>
      <div className={styles.frame}>
        <div id="waveform" className={styles.waveform} ref={waveformRef} />
        <div>
          <Button
            aria-label="播放/暂停"
            onClick={() => wavesurfer.current.playPause()}
            icon={isPlaying ? <IconPause /> : <IconPlay />}
          />
        </div>
      </div>
    </>
  );
}

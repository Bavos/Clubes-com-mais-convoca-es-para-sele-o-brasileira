import React from 'react';
import {Composition} from 'remotion';
import {MainVideo} from './scenes/MainVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RankingVideo"
        component={MainVideo}
        durationInFrames={45 * 30}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

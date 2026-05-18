import React from 'react';
import {Composition} from 'remotion';
import {RankingVideo} from './scenes/RankingVideo';

export const Root: React.FC = () => {
  return (
    <Composition
      id="RankingVideo"
      component={RankingVideo}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={1350}
    />
  );
};

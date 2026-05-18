import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';

export const FullFrame: React.FC<React.PropsWithChildren<{style?: React.CSSProperties}>> = ({children, style}) => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden', ...style}}>{children}</div>
);

export const Particles: React.FC<{count?: number; color?: string; drift?: number; opacity?: number}> = ({count = 40, color = '#fff', drift = 1, opacity = 0.45}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({length: count}).map((_, i) => {
        const x = (i * 97) % 1080;
        const yBase = (i * 173) % 1920;
        const y = (yBase + ((frame * drift + i * 13) % 2200)) - 140;
        const size = 1 + (i % 4);
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: 99, background: color, opacity}} />;
      })}
    </>
  );
};

export const KineticTitle: React.FC<{text: string; y?: number; color?: string}> = ({text, y = 220, color = '#FFF'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 14, stiffness: 90}});
  const blur = interpolate(enter, [0, 1], [20, 0]);
  return (
    <div style={{position: 'absolute', top: y, left: 90, right: 90, fontFamily: 'Inter, Montserrat, sans-serif', color, fontSize: 64, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1, transform: `translateY(${interpolate(enter, [0, 1], [80, 0])}px) scale(${interpolate(enter, [0, 1], [0.92, 1])})`, filter: `blur(${blur}px)`, textShadow: `0 0 34px ${color}55`}}>{text}</div>
  );
};

export const GlowRing: React.FC<{size: number; color: string; x: number; y: number; speed?: number}> = ({size, color, x, y, speed = 1}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.05 * speed) * 0.08;
  return <div style={{position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: 999, border: `3px solid ${color}`, transform: `scale(${pulse})`, boxShadow: `0 0 30px ${color}99, inset 0 0 20px ${color}66`}} />;
};

export const RevealBlock: React.FC<React.PropsWithChildren<{start: number; end: number}>> = ({start, end, children}) => {
  const frame = useCurrentFrame();
  const alpha = interpolate(frame, [start, start + 8, end - 8, end], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  return <div style={{opacity: alpha, position: 'absolute', inset: 0}}>{children}</div>;
};

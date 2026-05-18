import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontFamily, palette} from '../styles/theme';

export const AnimatedBackground: React.FC<{accent?: string}> = ({accent = palette.yellow}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${palette.green} 0%, ${palette.blue} 55%, ${palette.darkGray} 100%)`}} />
      <div style={{position: 'absolute', inset: 0, opacity: 0.18, backgroundSize: '80px 80px', backgroundImage: 'repeating-linear-gradient(0deg, #ffffff20 0 2px, transparent 2px 22px), repeating-linear-gradient(90deg, #00000033 0 2px, transparent 2px 22px)'}} />
      {new Array(50).fill(true).map((_, i) => <div key={i} style={{position:'absolute', width: 4 + (i % 3), height: 4 + (i % 3), borderRadius:999, left: (i * 89) % width, top: ((i * 131 + frame * (1 + i % 2)) % height), background: i % 5 === 0 ? accent : '#ffffff88'}} />)}
      {new Array(10).fill(true).map((_, i) => <div key={`d-${i}`} style={{position:'absolute', width: 1700, height: 9, background: '#ffffff20', transform: `rotate(-28deg) translateX(${(frame * 18 + i * 180) % 1800 - 900}px)`, left: -600, top: i * 210}} />)}
    </AbsoluteFill>
  );
};

export const BigNumber: React.FC<{value: string; color?: string; x?: number; y?: number}> = ({value, color = palette.white, x = 120, y = 700}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 9, stiffness: 120}});
  return <div style={{position:'absolute', left:x, top:y, fontFamily, fontWeight:900, fontSize:310, color, transform:`scale(${interpolate(pop,[0,1],[0.4,1.06])})`, textShadow:`0 0 30px ${palette.yellow}, 0 18px 35px #00000099`}}>{value}</div>;
};

export const RankingBar: React.FC<{index:number; club:string; value:number; max:number; color:string}> = ({index, club, value, max, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - index * 5, fps, config: {damping: 13}});
  const width = interpolate(enter, [0, 1], [0, (value / max) * 820], {extrapolateRight: 'clamp'});
  return <div style={{position:'relative', marginBottom:24, height:125}}>
    <div style={{position:'absolute', inset:0, borderRadius:20, background:'#00000070'}}/>
    <div style={{position:'absolute', left:0, top:0, bottom:0, width, borderRadius:20, background:color, boxShadow:'0 0 20px #ffdf0088'}}/>
    <div style={{position:'absolute', left:30, top:34, color:'#fff', fontWeight:800, fontSize:44, fontFamily}}>{index + 1}. {club}</div>
    <div style={{position:'absolute', right:30, top:25, color:'#fff', fontWeight:900, fontSize:58, fontFamily}}>{value}</div>
  </div>;
};

export const DiagonalTransition: React.FC<{progress:number}> = ({progress}) => (
  <div style={{position:'absolute', inset:0, pointerEvents:'none', opacity:interpolate(progress,[0,1],[0,1]), transform:`translateX(${interpolate(progress,[0,1],[-1200,1200])}px)`}}>
    {['#009C3B','#FFDF00','#002776','#050505','#FFFFFF'].map((c,i)=><div key={c} style={{position:'absolute', width:500, height:2200, background:c, left:i*220, top:-200, transform:'rotate(-25deg)'}} />)}
  </div>
);

export const BotafogoPattern: React.FC = () => <div style={{position:'absolute', inset:0}}>{new Array(12).fill(true).map((_,i)=><div key={i} style={{position:'absolute', top:0,bottom:0,left:i*90,width:55,background:i%2===0?'#fff':'#050505',opacity:0.9}}/>) }
<svg width="1080" height="1920" style={{position:'absolute', inset:0, opacity:0.25}}><polygon points="540,390 584,520 720,520 610,595 650,730 540,650 430,730 470,595 360,520 496,520" fill="#fff"/></svg></div>;

export const BrazilMapAbstract: React.FC<{opacity?: number}> = ({opacity = 0.35}) => <svg width="1080" height="1920" style={{position:'absolute', left:60, top:350, opacity}}><path d="M120 260 L280 170 L420 190 L530 120 L690 200 L840 230 L900 420 L820 620 L650 710 L570 860 L390 810 L250 660 L150 500 Z" fill="#ffdf00"/></svg>;

export const SoccerBallVector: React.FC = () => { const frame = useCurrentFrame(); return <svg width="260" height="260" style={{position:'absolute', right:90, top:640, transform:`rotate(${frame * 3}deg)`}}><circle cx="130" cy="130" r="120" fill="#fff"/><polygon points="130,70 165,95 152,136 108,136 95,95" fill="#050505"/></svg>; };

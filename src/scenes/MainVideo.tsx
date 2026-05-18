import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {rankingData} from '../data/ranking';
import {fontStack, palette} from '../styles/theme';
import {FullFrame, KineticTitle, Particles, RevealBlock} from '../components/VisualPrimitives';

const SceneBase: React.FC<React.PropsWithChildren<{bg: string; accent?: string}>> = ({bg, accent = palette.brasilYellow, children}) => {
  const frame = useCurrentFrame();
  const parallax = interpolate(frame, [0, 150], [0, -50], {extrapolateRight: 'clamp'});

  return (
    <FullFrame style={{background: bg, fontFamily: fontStack}}>
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${parallax}px)`}}>
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 15%, #ffffff55, transparent 40%), radial-gradient(circle at 80% 75%, #ffdf0050, transparent 42%)'}} />
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(120deg, #ffffff12 0px, #ffffff12 4px, transparent 5px, transparent 22px)', mixBlendMode: 'screen'}} />
        <div style={{position: 'absolute', left: -140, top: 240, width: 720, height: 720, borderRadius: 999, background: `${accent}55`, filter: 'blur(60px)'}} />
      </div>
      <Particles count={90} color="#FFFFFF" opacity={0.34} drift={2.4} />
      {children}
    </FullFrame>
  );
};

const Star = ({x, y, size = 26, color = '#fff'}: {x: number; y: number; size?: number; color?: string}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: x, top: y, filter: `drop-shadow(0 0 12px ${color})`}}>
    <polygon fill={color} points="50,5 61,38 95,38 67,58 78,91 50,70 22,91 33,58 5,38 39,38" />
  </svg>
);

const Scene1 = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 150], [1.18, 1]);

  return (
    <SceneBase bg={`linear-gradient(165deg, ${palette.brasilGreen}, ${palette.brasilBlue})`}>
      <div style={{position: 'absolute', inset: -40, transform: `scale(${zoom})`}}>
        <svg width="1080" height="1920" style={{opacity: 0.42}}>
          <path d="M120 390 L250 290 L420 330 L560 250 L730 330 L850 310 L920 450 L860 650 L720 760 L560 860 L400 810 L250 640 Z" fill={palette.brasilYellow} />
        </svg>
      </div>
      <KineticTitle text="Você sabe qual clube mais cedeu jogadores para a Seleção em Copas?" y={410} color={palette.white} />
      <div style={{position: 'absolute', right: 130, top: 900, width: 130, height: 130, borderRadius: 99, border: `5px solid ${palette.white}`, boxShadow: '0 0 25px #fff', transform: `rotate(${frame * 4}deg)`}} />
    </SceneBase>
  );
};

const Scene2 = () => {
  const frame = useCurrentFrame();
  const impact = spring({frame, fps: 30, config: {damping: 10, stiffness: 200}});
  return (
    <SceneBase bg={'linear-gradient(160deg,#111,#2a2a2a)'} accent="#fff">
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, #fff 0px, #fff 90px, #000 90px, #000 180px)', opacity: 0.3}} />
      {[120, 260, 880].map((x, i) => <Star key={i} x={x} y={260 + i * 130} size={48} />)}
      <KineticTitle text="O líder histórico é o Botafogo." y={150} color={palette.white} />
      <div style={{position: 'absolute', top: 570, width: '100%', textAlign: 'center', fontSize: 360, fontWeight: 900, color: palette.white, transform: `scale(${interpolate(impact, [0, 1], [0.55, 1])})`, textShadow: '0 0 30px #fff'}}>47</div>
      <div style={{position: 'absolute', top: 980, width: '100%', textAlign: 'center', fontSize: 92, fontWeight: 800, color: palette.brasilYellow}}>convocados</div>
    </SceneBase>
  );
};

const Scene3 = () => {
  const frame = useCurrentFrame();
  const barA = interpolate(frame, [0, 35], [0, 47], {extrapolateRight: 'clamp'});
  const barB = interpolate(frame, [5, 40], [0, 46], {extrapolateRight: 'clamp'});
  return <SceneBase bg={`linear-gradient(140deg, ${palette.brasilBlue}, ${palette.brasilGreen})`}>
    <KineticTitle text="Botafogo 47 x São Paulo 46" y={130} />
    <div style={{position: 'absolute', top: 420, left: 100, width: 380, height: 920, background: '#ffffff22', borderRadius: 20}}>
      <div style={{position: 'absolute', bottom: 0, width: '100%', height: `${(barA / 47) * 100}%`, background: 'repeating-linear-gradient(90deg,#fff 0 28px,#000 28px 56px)', boxShadow: '0 0 40px #fff8'}} />
    </div>
    <div style={{position: 'absolute', top: 420, right: 100, width: 380, height: 920, background: '#ffffff22', borderRadius: 20}}>
      <div style={{position: 'absolute', bottom: 0, width: '100%', height: `${(barB / 47) * 100}%`, background: 'linear-gradient(180deg,#fff,#d7263d 45%,#000)', boxShadow: '0 0 40px #ffdf0099'}} />
    </div>
  </SceneBase>;
};

const Scene4 = () => <SceneBase bg={`linear-gradient(140deg, ${palette.brasilYellow}, ${palette.brasilBlue})`}>
  <KineticTitle text="Flamengo e Vasco aparecem empatados." y={130} color={palette.brasilBlue} />
  <div style={{position: 'absolute', top: 450, left: 70, width: 450, height: 900, borderRadius: 24, background: 'linear-gradient(180deg,#d7263d,#000)', boxShadow: '0 0 40px #d7263d88'}} />
  <div style={{position: 'absolute', top: 450, right: 70, width: 450, height: 900, borderRadius: 24, background: 'linear-gradient(180deg,#fff,#111)', boxShadow: '0 0 40px #fff8'}} />
  <div style={{position: 'absolute', top: 780, left: 0, width: '50%', textAlign: 'center', color: '#fff', fontSize: 220, fontWeight: 900}}>35</div>
  <div style={{position: 'absolute', top: 780, right: 0, width: '50%', textAlign: 'center', color: '#111', fontSize: 220, fontWeight: 900}}>35</div>
</SceneBase>;

const Scene5 = () => {
  const frame = useCurrentFrame();
  return <SceneBase bg={`linear-gradient(160deg, ${palette.brasilGreen}, ${palette.darkElegant})`}>
    <KineticTitle text="Fluminense fecha o top 5." y={120} />
    <div style={{position: 'absolute', top: 360, left: 70, right: 70}}>
      {rankingData.slice(0, 5).map((r, i) => {
        const w = interpolate(frame, [i * 4, 30 + i * 4], [0, (r.value / 47) * 880], {extrapolateRight: 'clamp'});
        return <div key={r.name} style={{marginBottom: 38}}>
          <div style={{fontSize: 48, fontWeight: 800, color: '#fff'}}>{i + 1}. {r.name} — {r.value}</div>
          <div style={{height: 34, borderRadius: 12, background: '#ffffff2b'}}>
            <div style={{width: w, height: '100%', borderRadius: 12, background: i === 0 ? 'repeating-linear-gradient(90deg,#fff 0 20px,#000 20px 40px)' : `linear-gradient(90deg, ${palette.brasilYellow}, ${palette.brasilBlue})`}} />
          </div>
        </div>;
      })}
    </div>
  </SceneBase>;
};

const Scene6 = () => <SceneBase bg={`linear-gradient(150deg, ${palette.brasilBlue}, ${palette.darkElegant})`} accent={palette.gold}>
  <KineticTitle text="E o único estrangeiro no top 10?" y={150} />
  <div style={{position: 'absolute', top: 520, width: '100%', textAlign: 'center', fontSize: 300, fontWeight: 900, color: palette.gold, textShadow: '0 0 40px #f0c75e'}}>13</div>
  <div style={{position: 'absolute', top: 910, width: '100%', textAlign: 'center', fontSize: 72, fontWeight: 800, color: '#fff'}}>Real Madrid — convocados</div>
  <div style={{position: 'absolute', bottom: 230, left: 80, width: 420, height: 180, borderRadius: 18, background: '#009c3bcc', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, fontWeight: 900}}>BRASIL</div>
  <div style={{position: 'absolute', bottom: 230, right: 80, width: 420, height: 180, borderRadius: 18, background: '#f0c75ecc', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, fontWeight: 900}}>EXTERIOR</div>
</SceneBase>;

const Scene7 = () => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 120], [0, 200], {easing: Easing.out(Easing.cubic), extrapolateRight: 'clamp'});
  return <SceneBase bg={`linear-gradient(90deg, ${palette.brasilGreen}, ${palette.brasilBlue})`}>
    <KineticTitle text="Brasil ainda domina. Europa avança." y={120} />
    <div style={{position: 'absolute', top: 360, left: 0, width: '50%', height: 1080, borderRight: '5px solid #fff6', background: '#ffffff11'}} />
    <div style={{position: 'absolute', top: 360, right: 0, width: '50%', height: 1080, background: '#00000022'}} />
    {Array.from({length: 7}).map((_, i) => <div key={i} style={{position: 'absolute', left: 220 + slide + i * 35, top: 600 + i * 90, width: 180, height: 10, background: palette.brasilYellow, transform: 'rotate(8deg)', boxShadow: '0 0 16px #ffdf00'}} />)}
  </SceneBase>;
};

const Scene8 = () => <SceneBase bg={`linear-gradient(160deg, ${palette.brasilYellow}, ${palette.brasilGreen} 45%, ${palette.brasilBlue})`}>
  <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, #fff5 0 30px, #0005 30px 60px)', opacity: 0.2}} />
  <div style={{position: 'absolute', top: 420, width: '100%', textAlign: 'center', color: '#fff', fontSize: 110, fontWeight: 900, textShadow: '0 0 24px #000'}}>Botafogo lidera.</div>
  <div style={{position: 'absolute', top: 620, width: '100%', textAlign: 'center', color: '#fff', fontSize: 100, fontWeight: 900, textShadow: '0 0 24px #000'}}>São Paulo encosta.</div>
  <div style={{position: 'absolute', top: 810, width: '100%', textAlign: 'center', color: '#fff', fontSize: 100, fontWeight: 900, textShadow: '0 0 24px #000'}}>Europa avança.</div>
  <div style={{position: 'absolute', top: 1120, width: '100%', textAlign: 'center', color: palette.brasilBlue, fontSize: 74, fontWeight: 900}}>Salve este ranking histórico.</div>
  <div style={{position: 'absolute', bottom: 70, width: '100%', textAlign: 'center', color: '#ffffffd9', fontSize: 28, fontWeight: 700}}>Fonte: ge — 18/05/2026</div>
</SceneBase>;

export const MainVideo: React.FC = () => {
  const {durationInFrames} = useVideoConfig();

  return (
    <AbsoluteFill>
      <RevealBlock start={0} end={150}><Scene1 /></RevealBlock>
      <RevealBlock start={150} end={300}><Scene2 /></RevealBlock>
      <RevealBlock start={300} end={450}><Scene3 /></RevealBlock>
      <RevealBlock start={450} end={660}><Scene4 /></RevealBlock>
      <RevealBlock start={660} end={840}><Scene5 /></RevealBlock>
      <RevealBlock start={840} end={1050}><Scene6 /></RevealBlock>
      <RevealBlock start={1050} end={1230}><Scene7 /></RevealBlock>
      <RevealBlock start={1230} end={durationInFrames}><Scene8 /></RevealBlock>
    </AbsoluteFill>
  );
};

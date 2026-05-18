import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {rankingData} from '../data/ranking';
import {fontStack, palette} from '../styles/theme';
import {FullFrame, GlowRing, KineticTitle, Particles, RevealBlock} from '../components/VisualPrimitives';

const fps = 30;

const SceneBase: React.FC<React.PropsWithChildren<{bg: string}>> = ({bg, children}) => (
  <FullFrame style={{background: bg, fontFamily: fontStack}}>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 15%, #ffffff22, transparent 40%), radial-gradient(circle at 80% 70%, #f7c94826, transparent 44%)'}} />
    {children}
  </FullFrame>
);

const Scene1 = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 150], [1.08, 1]);
  return <SceneBase bg={`linear-gradient(180deg, ${palette.green}, ${palette.navy})`}>
    <div style={{position:'absolute', inset:-80, transform:`scale(${zoom})`}}>
      <svg width="1080" height="1920" style={{opacity:0.25}}><path d="M180 340 L280 260 L400 280 L520 220 L650 290 L760 260 L820 360 L760 500 L600 560 L500 660 L360 620 L240 500 Z" fill="#f7c948"/></svg>
    </div>
    <Particles color="#F7C948" count={60}/><GlowRing size={440} color="#F7C948" x={580} y={1080} speed={1.4}/>
    <div style={{position:'absolute', right:120, top:410, width:180, height:180, borderRadius:99, border:'6px solid white', boxShadow:'0 0 35px #fff8', transform:`rotate(${frame*2}deg)`}} />
    <KineticTitle text="Você sabe qual clube mais cedeu jogadores para a Seleção em Copas?" y={220}/>
  </SceneBase>;
};

const InfoScene: React.FC<{title:string; subtitle?:string; metric?:string; bg:string; children?:React.ReactNode}> = ({title, subtitle, metric, bg, children}) => {
  const frame = useCurrentFrame();
  return <SceneBase bg={bg}><Particles/><KineticTitle text={title} y={180}/>
    {subtitle && <div style={{position:'absolute', top:470, left:96, right:96, color:'white', fontSize:44, fontWeight:600}}>{subtitle}</div>}
    {metric && <div style={{position:'absolute', top:680, left:96, color:'#fff', fontSize:180, fontWeight:900, transform:`scale(${interpolate(frame,[0,30],[0.5,1],{extrapolateRight:'clamp'})})`, textShadow:'0 0 38px #fff8'}}>{metric}</div>}
    {children}
  </SceneBase>;
};

export const MainVideo: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill>
      <RevealBlock start={0} end={150}><Scene1/></RevealBlock>
      <RevealBlock start={150} end={300}><InfoScene title="O líder histórico é o Botafogo." metric="47" subtitle="convocados" bg="linear-gradient(160deg,#000,#222)"><div style={{position:'absolute',top:950,left:90,color:'#fff',fontSize:52,fontWeight:800}}>★ ★ ★ ★ ★</div></InfoScene></RevealBlock>
      <RevealBlock start={300} end={450}><InfoScene title="São Paulo vem logo atrás." metric="46" subtitle="convocados" bg="linear-gradient(180deg,#32050c,#000)"><div style={{position:'absolute',top:980,left:90,right:90,color:'#fff',fontSize:42}}><div>Botafogo — 47</div><div>São Paulo — 46</div></div></InfoScene></RevealBlock>
      <RevealBlock start={450} end={660}><InfoScene title="Flamengo e Vasco aparecem empatados." metric="35  x  35" bg="linear-gradient(180deg,#53040d,#101216)"/></RevealBlock>
      <RevealBlock start={660} end={840}><InfoScene title="Fluminense fecha o top 5." metric="32" subtitle="convocados" bg="linear-gradient(180deg,#06233d,#061018)"><div style={{position:'absolute',top:950,left:100,right:100,color:'#fff',fontSize:38,lineHeight:1.4}}>{rankingData.slice(0,5).map((r,i)=><div key={r.name}>{i+1}. {r.name} — {r.value}</div>)}</div></InfoScene></RevealBlock>
      <RevealBlock start={840} end={1050}><InfoScene title="E o único estrangeiro no top 10?" subtitle="Real Madrid — 13 convocados" bg="linear-gradient(180deg,#091C2B,#000)"><div style={{position:'absolute',top:740,left:90,color:palette.gold,fontSize:128,fontWeight:900,textShadow:'0 0 30px #f0c75e88'}}>13</div></InfoScene></RevealBlock>
      <RevealBlock start={1050} end={1230}><InfoScene title="Os brasileiros ainda dominam a história." subtitle="Mas os clubes europeus ganharam força nas últimas décadas." bg="linear-gradient(90deg,#1E7F43,#091C2B)"><div style={{position:'absolute',top:920,left:90,right:90,color:'#fff',fontSize:36}}>Brasil ▓▓▓▓▓▓▓▓▓  Europa ▓▓▓▓</div></InfoScene></RevealBlock>
      <RevealBlock start={1230} end={durationInFrames}><InfoScene title="Botafogo lidera. São Paulo encosta. E a Europa avança." subtitle="Salve este ranking histórico da Seleção." bg="linear-gradient(180deg,#0a1422,#000)"><div style={{position:'absolute',bottom:120,left:90,color:'#ffffffaa',fontSize:28}}>Fonte: ge — 18/05/2026</div></InfoScene></RevealBlock>
    </AbsoluteFill>
  );
};

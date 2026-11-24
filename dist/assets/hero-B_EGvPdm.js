import{S as D,O as L,T as E,a as R,V as l,M as N,P as z}from"./three-Dnp6o5Zy.js";import{l as C,a as H,b as O}from"./stage-D2t_is1k.js";import{H as V,a as _,g as A,h as W}from"./index-gIOuRwyJ.js";import"./motion-BO_ezugR.js";const $=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,q=`
precision highp float;
uniform sampler2D tA; uniform sampler2D tB; uniform sampler2D dA; uniform sampler2D dB;
uniform float aA; uniform float aB; uniform float uMix; uniform float uTime; uniform float uLeak;
uniform vec2 uRes; uniform vec2 uPtr; uniform float uStrength; uniform float uScroll; uniform float uNight;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }

vec2 cover(vec2 uv, float ia) {
  float sa = uRes.x / uRes.y;
  vec2 s = sa > ia ? vec2(1.0, ia / sa) : vec2(sa / ia, 1.0);
  float zoom = 0.93 - uScroll * 0.06;
  return (uv - 0.5) * s * zoom + 0.5 + vec2(0.0, uScroll * 0.035);
}

vec3 art(sampler2D t, sampler2D d, float ia) {
  vec2 uv = cover(vUv, ia);
  float dep = texture2D(d, uv).r;
  vec2 off = uPtr * (dep - 0.42) * uStrength;
  uv -= off;
  float far = 1.0 - smoothstep(0.08, 0.3, dep);
  float band = smoothstep(0.2, 0.42, 1.0 - uv.y) * (1.0 - smoothstep(0.5, 0.7, 1.0 - uv.y));
  float haze = far * band;
  uv.x += sin(uv.y * 70.0 + uTime * 1.8) * 0.00045 * haze;
  uv.y += cos(uv.x * 40.0 + uTime * 1.3) * 0.0003 * haze;
  vec3 c = texture2D(t, uv).rgb;
  float sweep = vUv.x * 0.9 + vUv.y * 0.55 - fract(uTime * 0.03) * 3.2 + 0.8;
  c += vec3(1.0, 0.82, 0.62) * exp(-sweep * sweep * 22.0) * 0.07 * (0.4 + far);
  return c;
}

void main() {
  vec3 a = art(tA, dA, aA);
  vec3 b = art(tB, dB, aB);
  float n = fbm(vUv * vec2(3.2, 2.2) + uTime * 0.05);
  float m = smoothstep(n - 0.12, n + 0.12, uMix * 1.24 - 0.12);
  vec3 col = mix(a, b, m);
  float edge = (1.0 - abs(m - 0.5) * 2.0);
  col += vec3(1.0, 0.45, 0.18) * pow(edge, 3.0) * uLeak * 0.9;
  col += vec3(1.0, 0.35, 0.55) * uLeak * 0.12 * (1.0 - vUv.y);
  col = mix(col, col * vec3(0.72, 0.62, 1.05), uNight * 0.55);
  float v = smoothstep(1.25, 0.35, length((vUv - 0.5) * vec2(1.15, 1.0)));
  col *= mix(0.7, 1.0, v);
  col += (hash(vUv * uRes + fract(uTime) * 91.0) - 0.5) * 0.035;
  gl_FragColor = vec4(col, 1.0);
}
`;function Y(h,s){const p=new D,T=new L(-1,1,1,-1,0,1),u=new E,a={tA:{value:u},tB:{value:u},dA:{value:u},dB:{value:u},aA:{value:16/9},aB:{value:16/9},uMix:{value:0},uTime:{value:0},uLeak:{value:0},uRes:{value:new l(1,1)},uPtr:{value:new l},uStrength:{value:s?.03:.022},uScroll:{value:0},uNight:{value:0}},g=new R({vertexShader:$,fragmentShader:q,uniforms:a,depthTest:!1,depthWrite:!1});p.add(new N(new z(2,2),g));const t=[],b=W(s),U=Promise.all(V.map(async e=>{const i=s?e.phone:"landscape",[n,d]=await Promise.all([C(_(e.key,i,b)),H(`/media/d/${e.key}-${i}.webp`)]),v=n.image;return{t:n,d,a:v.width/v.height}})).then(e=>{t.push(...e),f(o,o)});let o=1,w=1,r=1,c=0;const x=new l,m=new l;let y=!1;function f(e,i){t.length&&(a.tA.value=t[e].t,a.dA.value=t[e].d,a.aA.value=t[e].a,a.tB.value=t[i].t,a.dB.value=t[i].d,a.aB.value=t[i].a)}const M=e=>{y||m.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight*2-1))},S=e=>{e.gamma==null||e.beta==null||(y=!0,m.set(Math.max(-1,Math.min(1,e.gamma/25)),Math.max(-1,Math.min(1,(e.beta-45)/25))))};window.addEventListener("pointermove",M,{passive:!0}),window.addEventListener("deviceorientation",S);const P=O({el:h,enabled:()=>!A().reduced&&A().quality!=="low",render(e,i,n,d,v){if(!t.length)return;const k=1-Math.pow(.0015,n);x.lerp(m,k),a.uPtr.value.copy(x),a.uTime.value=i,a.uRes.value.set(d,v);const B=h.getBoundingClientRect();a.uScroll.value=Math.max(0,Math.min(1,-B.top/Math.max(1,B.height))),r<1?(r=Math.min(1,r+n/1.1),c=Math.sin(r*Math.PI),r>=1&&f(o,o)):c*=.9,a.uMix.value=r,a.uLeak.value=c,e.render(p,T)}});return{ready:U,setScene(e){e!==o&&(w=(r<1,o),o=e,f(w,o),r=0)},setNight(e){a.uNight.value=e},dispose(){P(),window.removeEventListener("pointermove",M),window.removeEventListener("deviceorientation",S),g.dispose(),t.forEach(e=>{e.t.dispose(),e.d.dispose()})}}}export{Y as createHero};

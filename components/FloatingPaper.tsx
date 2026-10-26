"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function FloatingPaper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animId: number;
    const T = THREE;
    const TW = 1200, TH = 1656;
    const CW = 1400, CH = 1932;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

    // 1. Weblytic Cyber Theme Texture Generation
    function makeWeblyticTexture() {
      const c = document.createElement("canvas");
      c.width = CW;
      c.height = CH;
      const ctx = c.getContext("2d");
      if (!ctx) return new T.CanvasTexture(c);

      ctx.save();
      ctx.scale(CW / TW, CH / TH);

      // Rounded paper border clip
      const r = 26;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(TW, 0, TW, TH, r);
      ctx.arcTo(TW, TH, 0, TH, r);
      ctx.arcTo(0, TH, 0, 0, r);
      ctx.arcTo(0, 0, TW, 0, r);
      ctx.closePath();
      ctx.clip();

      // Deep cyber obsidian gradient matching Weblytic theme
      const bgGrad = ctx.createLinearGradient(0, 0, TW, TH);
      bgGrad.addColorStop(0, "#080C14");
      bgGrad.addColorStop(0.5, "#0B1326");
      bgGrad.addColorStop(1, "#060A12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, TW, TH);

      // Subtle atmospheric glow in top right with theme violet
      const glow = ctx.createRadialGradient(960, 360, 0, 960, 360, 680);
      glow.addColorStop(0, "rgba(139, 92, 246, 0.22)");
      glow.addColorStop(0.4, "rgba(99, 102, 241, 0.12)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, TW, TH);

      // Micro grid matrix matching weblytic tech aesthetic
      ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 80; x < TW; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 80);
        ctx.lineTo(x, TH - 80);
        ctx.stroke();
      }
      for (let y = 80; y < TH; y += 40) {
        ctx.beginPath();
        ctx.moveTo(80, y);
        ctx.lineTo(TW - 80, y);
        ctx.stroke();
      }

      const LIME = "#B8FF3C";
      const CYAN = "#38BDF8";
      const WHITE = "#F8FAFC";
      const MONO = '"JetBrains Mono", monospace';

      // Targeting corner brackets
      ctx.strokeStyle = LIME;
      ctx.lineWidth = 4;
      [
        [70, 70, 1, 1],
        [TW - 70, 70, -1, 1],
        [TW - 70, TH - 70, -1, -1],
        [70, TH - 70, 1, -1],
      ].forEach(([x, y, sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(x + 52 * sx, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + 52 * sy);
        ctx.stroke();
      });

      // Top Header Badge
      ctx.fillStyle = LIME;
      ctx.beginPath();
      ctx.moveTo(120, 166);
      ctx.lineTo(140, 178);
      ctx.lineTo(120, 190);
      ctx.closePath();
      ctx.fill();

      ctx.font = "700 24px " + MONO;
      ctx.fillText("ARCHITECTURE VERIFIED // 2026", 156, 184);

      ctx.strokeStyle = "rgba(184, 255, 60, 0.35)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(120, 220);
      ctx.lineTo(TW - 120, 220);
      ctx.stroke();

      // Hexagonal Rank S Badge
      ctx.save();
      ctx.translate(980, 390);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + (i * Math.PI) / 3;
        ctx[i ? "lineTo" : "moveTo"](Math.cos(a) * 110, Math.sin(a) * 110);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(184, 255, 60, 0.12)";
      ctx.fill();
      ctx.strokeStyle = LIME;
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = LIME;
      ctx.font = '700 114px "Space Grotesk", sans-serif';
      const sW = ctx.measureText("S").width;
      ctx.fillText("S", -sW / 2, 42);

      ctx.font = "700 15px " + MONO;
      ctx.fillStyle = "rgba(184, 255, 60, 0.85)";
      const rW = ctx.measureText("TIER 1").width;
      ctx.fillText("TIER 1", -rW / 2, -54);
      ctx.restore();

      // Title & Brand
      ctx.fillStyle = WHITE;
      ctx.font = '700 96px "Space Grotesk", sans-serif';
      ctx.fillText("WEBLYTIC", 120, 530);

      ctx.fillStyle = LIME;
      ctx.fillText("PERFORMANCE", 120, 638);

      ctx.fillStyle = CYAN;
      ctx.font = "700 28px " + MONO;
      ctx.fillText("HIGH-SPEED NEXT.JS & CLOUD STACK", 120, 706);

      // Performance Score Meter
      ctx.fillStyle = "rgba(248, 250, 252, 0.65)";
      ctx.font = "400 20px " + MONO;
      ctx.fillText("BENCHMARK SCORE", 120, 818);
      ctx.fillStyle = LIME;
      ctx.font = "700 22px " + MONO;
      ctx.fillText("99.8 / 100", 790, 818);

      // Score Progress Bar
      ctx.fillStyle = "rgba(255, 255, 255, 0.10)";
      ctx.beginPath();
      ctx.roundRect(120, 840, 780, 22, 11);
      ctx.fill();

      const barGrad = ctx.createLinearGradient(120, 0, 900, 0);
      barGrad.addColorStop(0, LIME);
      barGrad.addColorStop(1, CYAN);
      ctx.fillStyle = barGrad;
      ctx.beginPath();
      ctx.roundRect(120, 840, 780 * 0.998, 22, 11);
      ctx.fill();

      // Sub-metrics
      const metrics = [
        ["CORE WEB VITALS", "GRADE A+", LIME, 100],
        ["CLOUD UPTIME", "99.99%", CYAN, 99.9],
        ["SECURITY & SEO", "100 / 100", LIME, 100],
      ];

      metrics.forEach(([label, val, col, pct], i) => {
        const y = 940 + i * 72;
        ctx.fillStyle = "rgba(248, 250, 252, 0.65)";
        ctx.font = "400 22px " + MONO;
        ctx.fillText(label as string, 120, y + 6);

        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        ctx.beginPath();
        ctx.roundRect(420, y - 6, 280, 10, 5);
        ctx.fill();

        ctx.fillStyle = col as string;
        ctx.beginPath();
        ctx.roundRect(420, y - 6, (280 * (pct as number)) / 100, 10, 5);
        ctx.fill();

        ctx.fillStyle = WHITE;
        ctx.font = "700 22px " + MONO;
        ctx.fillText(val as string, 740, y + 6);
      });

      // Bottom Divider
      ctx.strokeStyle = "rgba(248, 250, 252, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(120, 1190);
      ctx.lineTo(TW - 120, 1190);
      ctx.stroke();

      // Verification Metadata
      ctx.fillStyle = LIME;
      ctx.font = "700 24px " + MONO;
      ctx.fillText("CERTIFICATE #WBL-SOTY-2026-99", 120, 1260);

      ctx.fillStyle = "rgba(248, 250, 252, 0.50)";
      ctx.font = "400 20px " + MONO;
      ctx.fillText("MANAGED CLOUD INFRASTRUCTURE & AUTOMATION", 120, 1300);

      // Status Blocks
      for (let i = 0; i < 16; i++) {
        ctx.fillStyle = i < 14 ? "rgba(184, 255, 60, 0.85)" : "rgba(248, 250, 252, 0.15)";
        ctx.fillRect(120 + i * 30, 1360, 18, 18);
      }

      ctx.fillStyle = "rgba(248, 250, 252, 0.50)";
      ctx.font = "400 20px " + MONO;
      ctx.fillText("26.10.2026", TW - 260, 1376);

      ctx.restore();

      const tex = new T.CanvasTexture(c);
      tex.colorSpace = T.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.needsUpdate = true;
      return tex;
    }

    // 2. Realistic Studio Environment Reflection Map
    function makeEnvTexture() {
      const w = 1024, h = 512;
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const x = c.getContext("2d");
      if (!x) return new T.CanvasTexture(c);

      const g = x.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#1E293B");
      g.addColorStop(0.5, "#0B132B");
      g.addColorStop(1, "#05060A");
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);

      // Studio highlight spots
      const blob = (cx: number, cy: number, rx: number, ry: number, col: string) => {
        const rg = x.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
        rg.addColorStop(0, col);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        x.save();
        x.translate(cx, cy);
        x.scale(1, ry / rx);
        x.translate(-cx, -cy);
        x.fillStyle = rg;
        x.beginPath();
        x.arc(cx, cy, rx, 0, Math.PI * 2);
        x.fill();
        x.restore();
      };
      blob(w * 0.28, h * 0.26, 320, 240, "rgba(255, 255, 255, 0.90)");
      blob(w * 0.72, h * 0.35, 270, 220, "rgba(139, 92, 246, 0.65)");
      blob(w * 0.50, h * 0.85, 420, 200, "rgba(99, 102, 241, 0.40)");

      const t = new T.CanvasTexture(c);
      t.mapping = T.EquirectangularReflectionMapping;
      t.colorSpace = T.SRGBColorSpace;
      return t;
    }

    // 3. WebGL Scene & Camera Setup
    const renderer = new T.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = T.NoToneMapping;

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(24, 1, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const pmrem = new T.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envTex = pmrem.fromEquirectangular(makeEnvTexture()).texture;
    scene.environment = envTex;

    // 4. Universal Studio Lights (Theme Violet Key, Fill, Rim, Ambient)
    const keyLight = new T.DirectionalLight(0xfff6ec, 1.45);
    keyLight.position.set(-3.2, 2.2, 2.0);

    const fillLight = new T.DirectionalLight(0x8b5cf6, 0.45);
    fillLight.position.set(3.5, -1.8, 1.6);

    const rimLight = new T.DirectionalLight(0xa855f7, 0.35);
    rimLight.position.set(1.6, 1.2, -2.6);

    const ambientLight = new T.AmbientLight(0xffffff, 0.22);
    scene.add(keyLight, fillLight, rimLight, ambientLight);

    // Interactive Theme Violet Touch PointLight that tracks mouse
    const touchLight = new T.PointLight(0x8b5cf6, 0, 7.5, 1.8);
    touchLight.position.set(0, 0, 1.8);
    scene.add(touchLight);

    // 5. Flexible Arc-Length Conserving Wave Shader Geometry
    const SW = 2.30, SH = 2.72;
    const geo = new T.PlaneGeometry(SW, SH, 72, 96);

    const uni = {
      uTime: { value: 0 },
      uAmp: { value: 1.18 },
      uFreq: { value: 4.70 },
      uTwist: { value: 1.30 },
      uSize: { value: new T.Vector2(SW, SH) },
      uFlutter: { value: 0.15 },
      uPhase: { value: 0 },
      uRim: { value: 0.28 },
      uRimA: { value: 0.0 },
      uSpecA: { value: 0.0 },
      uRimCol: { value: new T.Color(0x8b5cf6) },
    };

    const WAVE_GLSL = `
uniform float uTime, uAmp, uFlutter, uPhase, uFreq, uTwist;
uniform vec2  uSize;

float sAmp(float u, float v){ return uAmp*(0.10 + pow(u,1.35))*(0.50 + 0.64*v); }
float sAmpV(float u){ return uAmp*(0.10 + pow(u,1.35))*0.64; }

float sTheta(float u, float v){
  float a  = sAmp(u,v);
  float ph = uFreq*u + uTwist*v + uTime*0.42 + uPhase;
  return a*sin(ph) + uFlutter*a*0.60*sin(ph*2.35 + uTime*2.0);
}
float sThetaV(float u, float v){
  float a  = sAmp(u,v), da = sAmpV(u);
  float ph = uFreq*u + uTwist*v + uTime*0.42 + uPhase;
  float f  = ph*2.35 + uTime*2.0;
  return da*sin(ph) + a*cos(ph)*uTwist
       + uFlutter*0.60*(da*sin(f) + a*cos(f)*uTwist*2.35);
}
float sYoff(float u, float v){
  float w = 1.0 - 0.55*v;
  return 0.021*uSize.y*sin(2.05*u + uTime*0.47 + uPhase)
       + 0.013*uSize.y*sin(3.35*u - 1.55*v + uTime*0.63 + uPhase)*w;
}
float sYdU(float u, float v){
  float w = 1.0 - 0.55*v;
  return 0.0431*uSize.y*cos(2.05*u + uTime*0.47 + uPhase)
       + 0.0436*uSize.y*cos(3.35*u - 1.55*v + uTime*0.63 + uPhase)*w;
}
float sYdV(float u, float v){
  float ph = 3.35*u - 1.55*v + uTime*0.63 + uPhase;
  return 0.013*uSize.y*(-1.55*cos(ph)*(1.0-0.55*v) - 0.55*sin(ph));
}

void sheetPoint(vec2 q, out vec3 P, out vec3 NN){
  float u = q.x, v = q.y;
  float x=0.0, z=0.0, xe=0.0, ze=0.0, dxv=0.0, dzv=0.0, dxe=0.0, dze=0.0;
  const int NS = 20;
  float h = 1.0/float(NS);
  for(int i=0;i<NS;i++){
    float uu = (float(i)+0.5)*h;
    float w  = clamp((u-(uu-0.5*h))/h, 0.0, 1.0);
    float th = sTheta(uu,v);
    float dt = sThetaV(uu,v);
    float c = cos(th), sn = sin(th);
    xe += c*h;          ze += sn*h;
    dxe += -sn*dt*h;    dze +=  c*dt*h;
    x   += c*h*w;       z   += sn*h*w;
    dxv += -sn*dt*h*w;  dzv +=  c*dt*h*w;
  }
  float W = uSize.x, H = uSize.y;
  float th0 = sTheta(u,v);
  P = vec3((x - xe*0.5)*W, (v-0.5)*H + sYoff(u,v), (z - ze*0.5)*W);
  vec3 Tu = vec3(W*cos(th0), sYdU(u,v), W*sin(th0));
  vec3 Tv = vec3((dxv - dxe*0.5)*W, H + sYdV(u,v), (dzv - dze*0.5)*W);
  NN = normalize(cross(Tu, Tv));
}
`;

    const certTex = makeWeblyticTexture();
    const mat = new T.MeshPhysicalMaterial({
      map: certTex,
      color: new T.Color(0xffffff),
      side: T.DoubleSide,
      metalness: 0.04,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      envMapIntensity: 0.85,
      specularIntensity: 1.0,
      transparent: true,
      alphaTest: 0.35,
      opacity: 1.0,
    });

    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, uni);
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\n" + WAVE_GLSL)
        .replace(
          "#include <beginnormal_vertex>",
          `
          vec3 sheetP; vec3 objectNormal;
          sheetPoint(uv, sheetP, objectNormal);
          #ifdef USE_TANGENT
            vec3 objectTangent = vec3( tangent.xyz );
          #endif
        `
        )
        .replace("#include <begin_vertex>", "vec3 transformed = sheetP;");

      sh.fragmentShader = sh.fragmentShader
        .replace(
          "#include <common>",
          "#include <common>\nuniform float uRim, uRimA, uSpecA;\nuniform vec3 uRimCol;"
        )
        .replace(
          "#include <alphatest_fragment>",
          "if ( diffuseColor.a / max(opacity,1e-4) < alphaTest ) discard;"
        )
        .replace(
          "#include <output_fragment>",
          `
          float fres = pow(1.0 - clamp(abs(dot(geometry.normal, geometry.viewDir)),0.0,1.0), 3.2);
          outgoingLight += fres * uRim * uRimCol;
          float baseA = diffuseColor.a / max(opacity, 1e-4);
          float outA  = clamp(baseA + fres*uRimA + uSpecA*dot(outgoingLight, vec3(0.3333)), 0.0, 1.0) * opacity;
          gl_FragColor = vec4( outgoingLight, outA );
        `
        );
    };

    const mesh = new T.Mesh(geo, mat);
    const group = new T.Group();
    group.add(mesh);
    scene.add(group);

    // 6. Interactive Drag & Momentum Physics
    let dragging = false;
    let dragYaw = 0, dragPitch = 0;
    let prevYaw = 0, prevPitch = 0;
    let velYaw = 0, velPitch = 0;
    let lastPX = 0, lastPY = 0;
    let release = 0;
    let hover = 0, hoverTarget = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      dragging = true;
      lastPX = e.clientX;
      lastPY = e.clientY;
      velYaw = velPitch = 0;
      prevYaw = dragYaw;
      prevPitch = dragPitch;
      setHintVisible(false);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.tx = nx;
      mouse.ty = ny;

      if (dragging) {
        const dx = e.clientX - lastPX;
        const dy = e.clientY - lastPY;
        lastPX = e.clientX;
        lastPY = e.clientY;
        dragYaw += dx * 0.007;
        dragPitch = clamp(dragPitch - dy * 0.005, -0.65, 0.65);
        return;
      }

      hoverTarget = Math.abs(nx) < 0.65 && Math.abs(ny) < 0.75 ? 1 : 0;
    };

    const handlePointerUp = () => {
      if (dragging) {
        dragging = false;
        release = 0.6;
      }
    };

    const handlePointerLeave = () => {
      hoverTarget = 0;
      dragging = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    // 7. Auto-Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const visH = 2 * camera.position.z * Math.tan(T.MathUtils.degToRad(camera.fov) / 2);
      const visW = visH * camera.aspect;
      const scaleFactor = Math.min((visH * 0.72) / SH, (visW * 0.85) / SW);
      group.scale.setScalar(scaleFactor);
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // 8. Animation Render Loop
    const clock = new T.Clock();
    const lightPos = new T.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      uni.uTime.value = t;

      if (dragging) {
        const k = Math.min(1, dt * 14);
        velYaw += ((dragYaw - prevYaw) / Math.max(dt, 1e-3) - velYaw) * k;
        velPitch += ((dragPitch - prevPitch) / Math.max(dt, 1e-3) - velPitch) * k;
        velYaw = clamp(velYaw, -7, 7);
        velPitch = clamp(velPitch, -4, 4);
      } else {
        dragYaw += velYaw * dt;
        dragPitch = clamp(dragPitch + velPitch * dt, -0.60, 0.60);
        const decay = Math.pow(0.018, dt);
        velYaw *= decay;
        velPitch *= decay;
        release = Math.max(0, release - dt);
        if (release <= 0) {
          const home = Math.round(dragYaw / (Math.PI * 2)) * Math.PI * 2;
          const k = Math.min(1, dt * 0.55);
          dragYaw += (home - dragYaw) * k;
          dragPitch -= dragPitch * k;
        }
      }
      prevYaw = dragYaw;
      prevPitch = dragPitch;

      mouse.x += (mouse.tx - mouse.x) * Math.min(1, dt * 3.0);
      mouse.y += (mouse.ty - mouse.y) * Math.min(1, dt * 3.0);

      // Smooth bobbing and breathing motion
      group.rotation.y = dragYaw + mouse.x * 0.16 + Math.sin(t * 0.25) * 0.045;
      group.rotation.x = dragPitch - mouse.y * 0.12 + Math.sin(t * 0.20) * 0.03;
      group.rotation.z = Math.sin(t * 0.28) * 0.02;
      group.position.y = Math.sin(t * 0.35) * 0.07;
      group.position.x = Math.sin(t * 0.22) * 0.05 + mouse.x * 0.10;
      group.updateMatrixWorld();

      // Dynamic cursor lime reflection
      hover += (hoverTarget - hover) * Math.min(1, dt * 4.5);
      touchLight.intensity = hover * 2.8;
      if (hover > 0.002) {
        lightPos.set(mouse.tx, -mouse.ty, 0.5).unproject(camera).sub(camera.position).normalize();
        touchLight.position
          .copy(camera.position)
          .addScaledVector(lightPos, (1.8 - camera.position.z) / lightPos.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      geo.dispose();
      mat.dispose();
      certTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[540px] lg:h-[620px] max-w-[460px] mx-auto flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing outline-none"
        style={{ touchAction: "none" }}
      />

      {/* Floating Interaction Hint */}
      {hintVisible && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300 pointer-events-none flex items-center gap-1.5 transition-opacity">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-ping" />
          <span>DRAG TO ROTATE &amp; FLEX</span>
        </div>
      )}
    </div>
  );
}

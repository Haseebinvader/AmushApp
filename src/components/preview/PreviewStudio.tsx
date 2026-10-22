"use client";

import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { contact } from "@/content/site";
import {
  applyLighting,
  brandColors,
  buildSet,
  createLightRig,
  disposeObject,
  lightingModes,
  spaces,
  type LightingId,
  type PreviewOptions,
  type SpaceId,
} from "./scene";

const initialSpace = spaces[0];

export default function PreviewStudio() {
  const mountRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<PreviewOptions>({
    space: initialSpace.id,
    lighting: "gallery",
    config: initialSpace.configs[0].id,
    brandedWalls: true,
    screens: true,
    brandColor: brandColors[0].value,
  });
  const rebuildRef = useRef<(options: PreviewOptions, resetCamera: boolean) => void>(() => {});

  const [space, setSpace] = useState<SpaceId>(initialSpace.id);
  const [lighting, setLighting] = useState<LightingId>("gallery");
  const [config, setConfig] = useState(initialSpace.configs[0].id);
  const [brandedWalls, setBrandedWalls] = useState(true);
  const [screens, setScreens] = useState(true);
  const [brandColor, setBrandColor] = useState(brandColors[0].value);
  const [webglFailed, setWebglFailed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const spaceMeta = spaces.find((item) => item.id === space) ?? spaces[0];
  const configMeta = spaceMeta.configs.find((item) => item.id === config) ?? spaceMeta.configs[0];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c0a0b");
    scene.fog = new THREE.Fog("#0c0a0b", 16, 32);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(7.2, 4.4, 8.4);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.15, 0);
    controls.minDistance = 4;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotateSpeed = 0.45;
    controls.addEventListener("start", () => {
      controls.autoRotate = false;
    });

    const lights = createLightRig(scene);
    let current: THREE.Group | null = null;
    let currentSpace: SpaceId | null = null;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    rebuildRef.current = (options, resetCamera) => {
      if (current) {
        scene.remove(current);
        disposeObject(current);
      }
      applyLighting(lights, options.lighting);
      current = buildSet(options);
      scene.add(current);
      if (resetCamera || currentSpace !== options.space) {
        const distance = options.space === "arena" ? 11.5 : options.space === "stage" ? 10.2 : 8.6;
        camera.position.set(distance * 0.72, distance * 0.42, distance * 0.78);
        controls.target.set(0, 1.15, 0);
        currentSpace = options.space;
      }
    };
    rebuildRef.current(optionsRef.current, true);

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      if (current) disposeObject(current);
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const options: PreviewOptions = { space, lighting, config, brandedWalls, screens, brandColor };
    optionsRef.current = options;
    rebuildRef.current(options, false);
  }, [space, lighting, config, brandedWalls, screens, brandColor]);

  const chooseSpace = (next: SpaceId) => {
    const meta = spaces.find((item) => item.id === next) ?? spaces[0];
    setSpace(next);
    setConfig(meta.configs[0].id);
  };

  const submitRequest = (event: FormEvent) => {
    event.preventDefault();
    const lightingLabel = lightingModes.find((item) => item.id === lighting)?.label ?? lighting;
    const colorLabel = brandColors.find((item) => item.value === brandColor)?.label ?? brandColor;
    const body = [
      `Space: ${spaceMeta.label}`,
      `Configuration: ${configMeta.label}`,
      `Lighting: ${lightingLabel}`,
      `Branded walls: ${brandedWalls ? `On (${colorLabel})` : "Off"}`,
      `Screens: ${screens ? "On" : "Off"}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${companyName || "—"}`,
      "",
      note || "Please customize this concept for our project.",
    ].join("\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `3D concept request — ${spaceMeta.label}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="px-5 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="order-2 border border-[var(--line)] bg-[var(--paper)] p-5 lg:order-1">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">Space</p>
          <div className="mt-4 flex flex-col gap-2">
            {spaces.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseSpace(item.id)}
                className={`border px-3 py-3 text-left transition-colors ${
                  space === item.id
                    ? "border-[var(--accent)] bg-[var(--plum)] text-white"
                    : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
                }`}
              >
                <span className="block text-[14px]">{item.label}</span>
              </button>
            ))}
          </div>
          <p className="mt-5 text-[14px] leading-6 text-[var(--muted)]">{spaceMeta.detail}</p>
        </aside>

        <div className="relative order-1 min-h-[520px] overflow-hidden border border-[var(--line)] bg-[#0c0a0b] lg:order-2 lg:min-h-[680px]">
          <div ref={mountRef} className="absolute inset-0" />
          {webglFailed && (
            <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-[15px] text-[var(--muted)]">
              This browser cannot start the 3D preview. The request form below still works.
            </p>
          )}
          <p className="pointer-events-none absolute bottom-4 left-4 text-[11px] tracking-[0.16em] uppercase text-white/55">
            Drag to rotate · Scroll to zoom
          </p>
        </div>

        <aside className="order-3 border border-[var(--line)] bg-[var(--paper)] p-5">
          <ControlGroup label="Configuration">
            {spaceMeta.configs.map((item) => (
              <ChoiceButton key={item.id} active={config === item.id} onClick={() => setConfig(item.id)}>
                {item.label}
              </ChoiceButton>
            ))}
          </ControlGroup>

          <ControlGroup label="Lighting">
            {lightingModes.map((item) => (
              <ChoiceButton key={item.id} active={lighting === item.id} onClick={() => setLighting(item.id)}>
                {item.label}
              </ChoiceButton>
            ))}
          </ControlGroup>

          <ControlGroup label="Brand walls">
            <ChoiceButton active={brandedWalls} onClick={() => setBrandedWalls(true)}>
              On
            </ChoiceButton>
            <ChoiceButton active={!brandedWalls} onClick={() => setBrandedWalls(false)}>
              Off
            </ChoiceButton>
          </ControlGroup>

          {brandedWalls && (
            <div className="mt-3 flex gap-2">
              {brandColors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  onClick={() => setBrandColor(item.value)}
                  className={`h-8 w-8 border ${
                    brandColor === item.value ? "border-[var(--ink)]" : "border-transparent"
                  }`}
                  style={{ backgroundColor: item.value }}
                />
              ))}
            </div>
          )}

          <ControlGroup label="Screens">
            <ChoiceButton active={screens} onClick={() => setScreens(true)}>
              Placed
            </ChoiceButton>
            <ChoiceButton active={!screens} onClick={() => setScreens(false)}>
              Hidden
            </ChoiceButton>
          </ControlGroup>
        </aside>
      </div>

      <form
        onSubmit={submitRequest}
        className="mx-auto mt-10 grid max-w-[1440px] gap-8 border border-[var(--line)] bg-[var(--paper)] p-6 md:p-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--accent)]">Customize</p>
          <h2 className="mt-3 font-serif text-[40px] leading-none tracking-[-0.03em] text-[var(--ink)]">
            Send this concept
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-[var(--muted)]">
            {spaceMeta.label} · {configMeta.label} · {lightingModes.find((item) => item.id === lighting)?.label} light
            · walls {brandedWalls ? "on" : "off"} · screens {screens ? "placed" : "hidden"}.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <Field label="Name" value={name} onChange={setName} required />
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Company" value={companyName} onChange={setCompanyName} className="sm:col-span-2" />
          <label className="sm:col-span-2 text-[11px] tracking-[0.16em] uppercase text-[var(--muted)]">
            Note
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              className="mt-2 w-full resize-none border border-[var(--line)] bg-[var(--sage)] px-3 py-3 text-[15px] normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--line-strong)]"
              placeholder="Venue, date, or what should change."
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-[var(--ink)] px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase text-[var(--inverse)] transition-colors hover:bg-[var(--plum)] hover:text-[var(--ink)]"
            >
              Request this concept
            </button>
            {sent && (
              <p className="mt-4 text-[14px] leading-6 text-[var(--muted)]">
                Your email app should open with the concept addressed to {contact.email}. Send it and the studio will
                take it from there.
              </p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

function ControlGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ChoiceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-2 text-[12px] tracking-[0.08em] transition-colors ${
        active
          ? "border-[var(--accent)] bg-[var(--plum)] text-white"
          : "border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`text-[11px] tracking-[0.16em] uppercase text-[var(--muted)] ${className ?? ""}`}>
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border border-[var(--line)] bg-[var(--sage)] px-3 py-3 text-[15px] normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--line-strong)]"
      />
    </label>
  );
}

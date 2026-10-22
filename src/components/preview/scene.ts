import * as THREE from "three";

export type SpaceId = "booth" | "stage" | "arena";
export type LightingId = "gallery" | "show" | "night";

export type PreviewOptions = {
  space: SpaceId;
  lighting: LightingId;
  config: string;
  brandedWalls: boolean;
  screens: boolean;
  brandColor: string;
};

export const spaces: {
  id: SpaceId;
  label: string;
  detail: string;
  configs: { id: string; label: string }[];
}[] = [
  {
    id: "booth",
    label: "Exhibition booth",
    detail: "A sample stand with walls, a counter, and display plinths.",
    configs: [
      { id: "open", label: "Open stand" },
      { id: "enclosed", label: "Enclosed pavilion" },
      { id: "island", label: "Island booth" },
    ],
  },
  {
    id: "stage",
    label: "Event stage",
    detail: "A live room with deck, truss, and backdrop.",
    configs: [
      { id: "keynote", label: "Keynote" },
      { id: "concert", label: "Concert" },
      { id: "conference", label: "Conference" },
    ],
  },
  {
    id: "arena",
    label: "eSports arena",
    detail: "A competition floor with broadcast and audience space.",
    configs: [
      { id: "broadcast", label: "Broadcast set" },
      { id: "grandstand", label: "Grandstand" },
      { id: "fanzone", label: "Fan zone" },
    ],
  },
];

export const lightingModes: { id: LightingId; label: string }[] = [
  { id: "gallery", label: "Gallery" },
  { id: "show", label: "Show" },
  { id: "night", label: "Night" },
];

export const brandColors = [
  { id: "plum", label: "Plum", value: "#451424" },
  { id: "rose", label: "Rose", value: "#8d3a52" },
  { id: "sand", label: "Sand", value: "#cbb59a" },
  { id: "ink", label: "Ink", value: "#241c1e" },
];

export type LightRig = {
  ambient: THREE.AmbientLight;
  key: THREE.DirectionalLight;
  fill: THREE.DirectionalLight;
  spotL: THREE.SpotLight;
  spotR: THREE.SpotLight;
  spotC: THREE.SpotLight;
};

export function createLightRig(scene: THREE.Scene): LightRig {
  const ambient = new THREE.AmbientLight("#f3eee7", 0.6);
  const key = new THREE.DirectionalLight("#fff6ee", 1.5);
  key.position.set(7, 11, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 28;
  key.shadow.camera.left = -10;
  key.shadow.camera.right = 10;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -10;
  key.shadow.bias = -0.0004;

  const fill = new THREE.DirectionalLight("#d9a8b4", 0.35);
  fill.position.set(-7, 5, -3);

  const target = new THREE.Object3D();
  target.position.set(0, 1.1, 0);
  scene.add(target);

  const spotL = new THREE.SpotLight("#fff1d6", 0, 22, Math.PI / 7, 0.45, 1);
  spotL.position.set(-2.4, 5.2, 2.2);
  spotL.target = target;
  const spotR = new THREE.SpotLight("#ffd0dc", 0, 22, Math.PI / 7, 0.45, 1);
  spotR.position.set(2.4, 5.2, 2.2);
  spotR.target = target;
  const spotC = new THREE.SpotLight("#8d3a52", 0, 20, Math.PI / 6, 0.5, 1);
  spotC.position.set(0, 5.6, 0.4);
  spotC.target = target;

  scene.add(ambient, key, fill, spotL, spotR, spotC);
  return { ambient, key, fill, spotL, spotR, spotC };
}

export function applyLighting(lights: LightRig, mode: LightingId) {
  if (mode === "gallery") {
    lights.ambient.intensity = 0.62;
    lights.key.intensity = 1.45;
    lights.key.color.set("#fff6ee");
    lights.fill.intensity = 0.38;
    lights.fill.color.set("#e7d3c8");
    lights.spotL.intensity = 3;
    lights.spotR.intensity = 3;
    lights.spotC.intensity = 0;
    return;
  }

  if (mode === "show") {
    lights.ambient.intensity = 0.2;
    lights.key.intensity = 0.4;
    lights.fill.intensity = 0.55;
    lights.fill.color.set("#d9a8b4");
    lights.spotL.intensity = 22;
    lights.spotL.color.set("#fff1d6");
    lights.spotR.intensity = 20;
    lights.spotR.color.set("#ffd5e0");
    lights.spotC.intensity = 14;
    lights.spotC.color.set("#8d3a52");
    return;
  }

  lights.ambient.intensity = 0.07;
  lights.key.intensity = 0.12;
  lights.fill.intensity = 0.15;
  lights.fill.color.set("#6e4250");
  lights.spotL.intensity = 30;
  lights.spotL.color.set("#fff6e8");
  lights.spotR.intensity = 26;
  lights.spotR.color.set("#ffc2d0");
  lights.spotC.intensity = 18;
  lights.spotC.color.set("#451424");
}

export function buildSet(options: PreviewOptions) {
  const group = new THREE.Group();
  const brandMap = options.brandedWalls ? makeBrandTexture(options.brandColor) : null;
  const screenMap = options.screens ? makeScreenTexture(screenTitle(options.space)) : null;

  if (options.space === "booth") buildBooth(group, options, brandMap, screenMap);
  if (options.space === "stage") buildStage(group, options, brandMap, screenMap);
  if (options.space === "arena") buildArena(group, options, brandMap, screenMap);

  return group;
}

export function disposeObject(root: THREE.Object3D) {
  const textures = new Set<THREE.Texture>();
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      const mapped = material as THREE.MeshStandardMaterial;
      if (mapped.map) textures.add(mapped.map);
      material.dispose();
    });
  });
  textures.forEach((texture) => texture.dispose());
}

function buildBooth(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  const enclosed = options.config === "enclosed";
  const island = options.config === "island";
  addFloor(group, island ? 7.2 : 6.4, island ? 7.2 : 5.2);

  if (island) {
    addWall(group, 5.2, 1.15, 0.1, 0, 0.58, -2.3, 0, options, brandMap);
    addWall(group, 5.2, 1.15, 0.1, 0, 0.58, 2.3, Math.PI, options, brandMap);
    addWall(group, 0.1, 1.15, 4.4, -2.5, 0.58, 0, 0, options, brandMap);
    addWall(group, 0.1, 1.15, 4.4, 2.5, 0.58, 0, 0, options, brandMap);
    addCounter(group, 0, 1.6, options.brandColor);
    addScreen(group, 1.5, 0.9, 0, 1.7, -2.15, 0, options.screens, screenMap);
    addScreen(group, 1.5, 0.9, 0, 1.7, 2.15, Math.PI, options.screens, screenMap);
    addScreen(group, 1.2, 0.8, -2.35, 1.6, 0, -Math.PI / 2, options.screens, screenMap);
    addScreen(group, 1.2, 0.8, 2.35, 1.6, 0, Math.PI / 2, options.screens, screenMap);
    return;
  }

  const sideHeight = enclosed ? 2.8 : 1.35;
  addWall(group, 5.6, 2.9, 0.12, 0, 1.45, -2.15, 0, options, brandMap);
  addWall(group, 0.12, sideHeight, enclosed ? 4.2 : 1.8, -2.8, sideHeight / 2, enclosed ? -0.1 : -1.2, 0, options, brandMap);
  addWall(group, 0.12, sideHeight, enclosed ? 4.2 : 1.8, 2.8, sideHeight / 2, enclosed ? -0.1 : -1.2, 0, options, brandMap);
  addTruss(group, enclosed ? 3.15 : 2.85, 5.4, -0.2);
  addCounter(group, 0, 0.85, options.brandColor);
  addPlinth(group, -1.55, -0.15);
  addPlinth(group, 1.55, -0.15);
  addScreen(group, enclosed ? 2.4 : 2.1, 1.25, 0, 1.7, -2.02, 0, options.screens, screenMap);
  if (enclosed) {
    addScreen(group, 0.9, 1.3, -2.66, 1.55, -0.2, -Math.PI / 2, options.screens, screenMap);
    addScreen(group, 0.9, 1.3, 2.66, 1.55, -0.2, Math.PI / 2, options.screens, screenMap);
  }
}

function buildStage(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  const concert = options.config === "concert";
  const conference = options.config === "conference";
  addFloor(group, 9.2, 7.4);

  const deck = box(7.2, 0.42, conference ? 2.4 : 3.1, "#2a2422", { roughness: 0.55, metalness: 0.15 });
  deck.position.set(0, 0.21, -0.7);
  group.add(deck);

  addWall(group, 7.4, concert ? 3.3 : 2.7, 0.12, 0, concert ? 1.85 : 1.55, -2.3, 0, options, brandMap);
  addTruss(group, concert ? 3.7 : 3.15, 7.6, -0.5);

  if (conference) {
    const table = box(3.4, 0.12, 0.7, "#3a312c");
    table.position.set(0, 0.72, -0.55);
    group.add(table);
    addScreen(group, 1.15, 0.7, -1.7, 1.7, -2.16, 0, options.screens, screenMap);
    addScreen(group, 1.15, 0.7, 1.7, 1.7, -2.16, 0, options.screens, screenMap);
  } else if (concert) {
    addScreen(group, 2.3, 1.3, 0, 1.85, -2.16, 0, options.screens, screenMap);
    addScreen(group, 1.15, 1.7, -2.55, 1.55, -0.8, -Math.PI / 2, options.screens, screenMap);
    addScreen(group, 1.15, 1.7, 2.55, 1.55, -0.8, Math.PI / 2, options.screens, screenMap);
    addLamp(group, -1.6, 3.45, -0.5);
    addLamp(group, 0, 3.45, -0.5);
    addLamp(group, 1.6, 3.45, -0.5);
  } else {
    addScreen(group, 2.6, 1.45, 0, 1.75, -2.16, 0, options.screens, screenMap);
    const podium = box(0.55, 1.05, 0.4, options.brandedWalls ? options.brandColor : "#3a312c");
    podium.position.set(0.85, 0.94, 0.15);
    group.add(podium);
  }

  [-3.4, 3.4].forEach((x) => {
    const house = box(1.5, 0.35, 2.2, "#161311");
    house.position.set(x, 0.18, 1.8);
    group.add(house);
  });
}

function buildArena(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  const grandstand = options.config === "grandstand";
  const fanZone = options.config === "fanzone";
  addFloor(group, 9.4, 8.2);
  addWall(group, 7.6, 3.1, 0.12, 0, 1.55, -3.1, 0, options, brandMap);

  if (fanZone) {
    addScreen(group, 4.2, 1.1, 0, 2.15, -2.96, 0, options.screens, screenMap);
    addScreen(group, 2.2, 0.7, -3.3, 1.7, 0.2, -Math.PI / 2, options.screens, screenMap);
    addScreen(group, 2.2, 0.7, 3.3, 1.7, 0.2, Math.PI / 2, options.screens, screenMap);
    [-1.6, 1.6].forEach((x) => {
      const lounge = box(1.5, 0.42, 0.6, "#2c2426");
      lounge.position.set(x, 0.21, 1.4);
      group.add(lounge);
    });
    const loungeBack = box(2.2, 0.42, 0.6, "#2c2426");
    loungeBack.position.set(0, 0.21, 2.5);
    group.add(loungeBack);
    return;
  }

  addScreen(group, grandstand ? 3.2 : 3.8, 1.7, 0, 1.85, -2.96, 0, options.screens, screenMap);
  addPlayerDesk(group, -1.15, -0.35, options.screens, screenMap);
  addPlayerDesk(group, 1.15, -0.35, options.screens, screenMap);

  const caster = box(1.8, 0.72, 0.5, "#241c1e");
  caster.position.set(0, 0.36, 2.15);
  group.add(caster);
  addScreen(group, 0.7, 0.4, 0, 1.15, 1.85, 0, options.screens, screenMap);

  if (grandstand) {
    [0, 1, 2].forEach((step) => {
      [-3.35, 3.35].forEach((x) => {
        const seat = box(1.7, 0.32 + step * 0.28, 0.7, "#1c1718");
        seat.position.set(x, 0.16 + step * 0.22, 0.4 + step * 0.75);
        group.add(seat);
      });
    });
  }
}

function addFloor(group: THREE.Group, width: number, depth: number) {
  const floor = box(width, 0.08, depth, "#141110", { roughness: 0.92, metalness: 0.04 });
  floor.position.y = -0.04;
  group.add(floor);
  const inset = box(width - 0.35, 0.02, depth - 0.35, "#1d1818");
  inset.position.y = 0.01;
  group.add(inset);
}

function addWall(
  group: THREE.Group,
  width: number,
  height: number,
  depth: number,
  x: number,
  y: number,
  z: number,
  rotationY: number,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null
) {
  const wall = new THREE.Group();
  const shell = box(width, height, depth, options.brandedWalls ? options.brandColor : "#3a322e", {
    roughness: 0.78,
  });
  wall.add(shell);
  if (options.brandedWalls && brandMap && width > 1) {
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(Math.min(width * 0.72, 2.4), Math.min(height * 0.42, 1.1)),
      new THREE.MeshStandardMaterial({ map: brandMap, roughness: 0.62 })
    );
    face.position.z = depth / 2 + 0.012;
    wall.add(face);
  }
  wall.position.set(x, y, z);
  wall.rotation.y = rotationY;
  group.add(wall);
}

function addCounter(group: THREE.Group, x: number, z: number, color: string) {
  const counter = box(1.8, 0.95, 0.62, "#2a2422");
  counter.position.set(x, 0.48, z);
  const stripe = box(1.8, 0.08, 0.64, color);
  stripe.position.set(x, 0.92, z);
  group.add(counter, stripe);
}

function addPlinth(group: THREE.Group, x: number, z: number) {
  const plinth = box(0.55, 0.85, 0.55, "#2e2726");
  plinth.position.set(x, 0.43, z);
  const top = box(0.38, 0.28, 0.38, "#cbb59a", { roughness: 0.4, metalness: 0.2 });
  top.position.set(x, 0.95, z);
  group.add(plinth, top);
}

function addTruss(group: THREE.Group, y: number, span: number, z: number) {
  const metal = { roughness: 0.32, metalness: 0.72 };
  const beam = box(span, 0.08, 0.08, "#d9d0c6", metal);
  beam.position.set(0, y, z);
  group.add(beam);
  [-span / 2 + 0.2, 0, span / 2 - 0.2].forEach((x) => {
    const leg = box(0.07, y, 0.07, "#d9d0c6", metal);
    leg.position.set(x, y / 2, z);
    group.add(leg);
  });
}

function addLamp(group: THREE.Group, x: number, y: number, z: number) {
  const can = box(0.18, 0.22, 0.18, "#f3eee7", {
    emissive: "#fff1d6",
    emissiveIntensity: 0.8,
    metalness: 0.4,
    roughness: 0.3,
  });
  can.position.set(x, y, z);
  group.add(can);
}

function addPlayerDesk(
  group: THREE.Group,
  x: number,
  z: number,
  screens: boolean,
  screenMap: THREE.CanvasTexture | null
) {
  const desk = box(1.15, 0.72, 0.55, "#241c1e");
  desk.position.set(x, 0.36, z);
  group.add(desk);
  addScreen(group, 0.7, 0.42, x, 1.05, z - 0.05, 0, screens, screenMap);
}

function addScreen(
  group: THREE.Group,
  width: number,
  height: number,
  x: number,
  y: number,
  z: number,
  rotationY: number,
  on: boolean,
  screenMap: THREE.CanvasTexture | null
) {
  if (!on) return;
  const screen = new THREE.Group();
  screen.add(box(width, height, 0.06, "#100e0d", { metalness: 0.45, roughness: 0.35 }));
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 0.9, height * 0.82),
    new THREE.MeshStandardMaterial({
      color: "#2a1218",
      map: screenMap,
      emissive: "#ffc2d0",
      emissiveIntensity: 0.45,
      roughness: 0.42,
    })
  );
  face.position.z = 0.04;
  screen.add(face);
  screen.position.set(x, y, z);
  screen.rotation.y = rotationY;
  group.add(screen);
}

function box(
  width: number,
  height: number,
  depth: number,
  color: string,
  options?: { roughness?: number; metalness?: number; emissive?: string; emissiveIntensity?: number }
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshStandardMaterial({
      color,
      roughness: options?.roughness ?? 0.7,
      metalness: options?.metalness ?? 0.06,
      emissive: options?.emissive ?? "#000000",
      emissiveIntensity: options?.emissiveIntensity ?? 0,
    })
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function screenTitle(space: SpaceId) {
  if (space === "booth") return "BOOTH";
  if (space === "stage") return "LIVE";
  return "ARENA";
}

function makeBrandTexture(color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = color;
  context.fillRect(0, 0, 1024, 512);
  const ink = isLight(color) ? "#1c1416" : "#f7f1ea";
  context.fillStyle = ink;
  context.font = "500 120px Georgia, serif";
  context.fillText("AUMSH", 72, 280);
  context.globalAlpha = 0.72;
  context.font = "28px sans-serif";
  context.fillText("VENTURES", 78, 340);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeScreenTexture(label: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const gradient = context.createLinearGradient(0, 0, 1024, 512);
  gradient.addColorStop(0, "#2a1018");
  gradient.addColorStop(1, "#120c0e");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1024, 512);
  context.fillStyle = "#d9a8b4";
  context.fillRect(0, 0, 1024, 10);
  context.fillStyle = "#f7f1ea";
  context.font = "500 132px Georgia, serif";
  context.fillText(label, 64, 300);
  context.globalAlpha = 0.7;
  context.font = "28px sans-serif";
  context.fillText("AUMSH VENTURES", 68, 360);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function isLight(hex: string) {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  return (red * 299 + green * 587 + blue * 114) / 1000 > 150;
}

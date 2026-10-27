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
    detail: "Basic stand with carpet flooring, a back wall, front reception, meeting tables, header logos, graphics, and one TV.",
    configs: [
      { id: "basic", label: "Basic stand" },
      { id: "pavilion", label: "Meeting pavilion" },
      { id: "island", label: "Island pavilion" },
    ],
  },
  {
    id: "stage",
    label: "Event stage",
    detail: "A live stage with LED backdrop, audience seating, and show truss.",
    configs: [
      { id: "keynote", label: "Keynote" },
      { id: "concert", label: "Concert" },
      { id: "conference", label: "Conference" },
    ],
  },
  {
    id: "arena",
    label: "eSports arena",
    detail: "A broadcast floor with an LED wall, player desks, and audience seating.",
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
  const graphicMap = makeGraphicTexture(options.brandColor, options.brandedWalls);
  const screenMap = options.screens ? makeScreenTexture(screenTitle(options)) : null;

  if (options.space === "booth") buildBooth(group, options, brandMap, graphicMap, screenMap);
  if (options.space === "stage") buildStage(group, options, brandMap, graphicMap, screenMap);
  if (options.space === "arena") buildArena(group, options, brandMap, graphicMap, screenMap);

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

const CARPET = "#2a78c8";
const WOOD = "#e8d5bc";
const WOOD_DARK = "#c9b08e";
const WHITE = "#f7f4ef";
const INK = "#241c1e";

function buildBooth(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  graphicMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  if (options.config === "island") {
    buildIsland(group, options, brandMap, graphicMap, screenMap);
    return;
  }
  if (options.config === "pavilion") {
    buildPavilion(group, options, brandMap, graphicMap, screenMap);
    return;
  }
  buildBasic(group, options, brandMap, graphicMap, screenMap);
}

function buildBasic(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  graphicMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  const floorY = addCarpet(group, 6.4, 5.2, CARPET, options.brandColor);
  addWallShell(group, 5.9, 2.55, 0.1, 0, floorY + 1.275, -2.42);
  addWallShell(group, 0.1, 2.55, 1.4, -2.95, floorY + 1.275, -1.72);
  addWallShell(group, 0.1, 2.55, 1.4, 2.95, floorY + 1.275, -1.72);

  addLogoSign(group, 5.4, 0.4, 0, floorY + 2.22, -2.34, 0, options.brandColor, brandMap);
  addGraphic(group, 1.85, 1.4, -1.45, floorY + 1.2, -2.34, 0, graphicMap);
  addTv(group, 1.5, 0.86, 1.3, floorY + 1.42, -2.33, 0, options.screens, screenMap);
  addGraphic(group, 1.05, 1.25, 2.86, floorY + 1.28, -1.7, Math.PI / 2, graphicMap);

  addFrontFascia(group, 6.0, 2.32, floorY, options.brandColor, brandMap);
  addReception(group, -1.85, floorY, 1.2, options.brandColor, 0, brandMap);
  addMeetingTable(group, -0.05, floorY, -0.05, 0);
  addMeetingTable(group, 1.75, floorY, 1.25, 0.25);
}

function buildPavilion(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  graphicMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  const floorY = addCarpet(group, 7.2, 6.2, CARPET, options.brandColor);
  addWallShell(group, 6.8, 2.9, 0.12, 0, floorY + 1.45, -2.9);
  addWallShell(group, 0.12, 2.9, 5.5, -3.4, floorY + 1.45, -0.2);
  addWallShell(group, 0.12, 2.9, 5.5, 3.4, floorY + 1.45, -0.2);

  addLogoSign(group, 3.1, 0.42, -1.2, floorY + 2.55, -2.8, 0, options.brandColor, brandMap);
  addGraphic(group, 2.15, 1.65, -1.15, floorY + 1.35, -2.8, 0, graphicMap);
  addTv(group, 1.7, 0.98, 1.55, floorY + 1.5, -2.8, 0, options.screens, screenMap);
  addGraphic(group, 1.55, 1.85, -3.3, floorY + 1.45, -0.35, -Math.PI / 2, graphicMap);
  addGraphic(group, 1.55, 1.85, 3.3, floorY + 1.45, 0.45, Math.PI / 2, graphicMap);
  addLogoSign(group, 0.72, 1.55, -3.05, floorY + 1.85, 2.15, 0, options.brandColor, brandMap);

  addFrontFascia(group, 6.5, 2.55, floorY, options.brandColor, brandMap);
  addReception(group, -2.15, floorY, 1.45, options.brandColor, 0, brandMap);
  addMeetingTable(group, -0.2, floorY, -0.25, 0);
  addMeetingTable(group, 1.55, floorY, 0.7, 0.2);
}

function buildIsland(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  graphicMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  const floorY = addCarpet(group, 8.1, 6.6, "#d8d2c8", options.brandColor);
  addCanopy(group, floorY + 3.05, 6.6, 4.4, options.brandColor);
  addLogoSign(group, 2.6, 0.42, 0, floorY + 3.42, 1.95, 0, options.brandColor, brandMap);
  addLightRing(group, -1.5, floorY + 2.55, -0.35, 0.42, options.brandColor);
  addLightRing(group, 0.35, floorY + 2.55, -0.9, 0.55, options.brandColor);
  addLightRing(group, 1.8, floorY + 2.55, 0.15, 0.36, options.brandColor);

  addReception(group, -1.65, floorY, 0.15, "#2a2624", 0.15, brandMap);
  addReception(group, 1.45, floorY, 1.2, WHITE, -0.35, brandMap);
  addPlinth(group, -2.15, floorY, -1.35);
  addPlinth(group, 0.15, floorY, -1.45);
  addPlinth(group, 2.45, floorY, -0.85);
  addGraphic(group, 1.35, 0.9, -2.7, floorY + 1.15, -1.7, Math.PI / 2, graphicMap);
  addTv(group, 1.2, 0.72, 2.7, floorY + 1.55, -2.05, 0.35, options.screens, screenMap);
  addLoungeSeat(group, -0.35, floorY, 1.85, Math.PI);
  addLoungeSeat(group, 0.45, floorY, 1.85, Math.PI);
  addLoungeSeat(group, -0.35, floorY, 2.55, 0);
  addLoungeSeat(group, 0.45, floorY, 2.55, 0);
}

function buildStage(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  graphicMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  const concert = options.config === "concert";
  const conference = options.config === "conference";
  addHallFloor(group, 10.4, 8.6);

  const deck = box(7.6, 0.42, conference ? 2.5 : 3.2, "#2a2422", { roughness: 0.5, metalness: 0.14 });
  deck.position.set(0, 0.21, -1.2);
  group.add(deck);
  const deckTop = 0.42;

  addBackdrop(group, 8, concert ? 3.5 : 3.05, 0, concert ? 1.95 : 1.7, -2.85);
  addLogoSign(group, 2.4, 0.36, 0, concert ? 3.5 : 3.05, -2.72, 0, options.brandColor, brandMap);
  addGraphic(group, 0.85, 1.5, -3.55, 1.7, -2.72, 0, graphicMap);
  addGraphic(group, 0.85, 1.5, 3.55, 1.7, -2.72, 0, graphicMap);
  addTruss(group, concert ? 3.85 : 3.4, 8.2, -0.45);

  if (conference) {
    addTv(group, 3.8, 1.55, 0, 1.85, -2.72, 0, options.screens, screenMap);
    const table = box(3.8, 0.08, 0.7, WHITE);
    table.position.set(0, deckTop + 0.74, -1.05);
    group.add(table);
    [-1.45, -0.72, 0, 0.72, 1.45].forEach((x) => addChair(group, x, deckTop, -1.5, 0));
    addSeatBank(group, 3, 8, 0, 1.25, 0);
    return;
  }

  if (concert) {
    addTv(group, 3.4, 1.75, 0, 1.95, -2.72, 0, options.screens, screenMap);
    addScreen(group, 1.15, 1.9, -2.85, 1.7, -1.15, -0.45, options.screens, screenMap);
    addScreen(group, 1.15, 1.9, 2.85, 1.7, -1.15, 0.45, options.screens, screenMap);
    [-1.7, 0, 1.7].forEach((x) => addLamp(group, x, 3.65, -0.45));
    addSeatBank(group, 3, 7, 0, 1.35, 0);
    return;
  }

  addTv(group, 4.6, 2.05, 0, 1.85, -2.72, 0, options.screens, screenMap);
  addScreen(group, 1.05, 1.35, -2.95, 1.7, -2.72, 0, options.screens, screenMap);
  addScreen(group, 1.05, 1.35, 2.95, 1.7, -2.72, 0, options.screens, screenMap);
  const podium = box(0.62, 1.08, 0.42, options.brandColor);
  podium.position.set(1.15, deckTop + 0.54, -0.55);
  group.add(podium);
  addSeatBank(group, 5, 9, 0, 0.95, 0);
}

function buildArena(
  group: THREE.Group,
  options: PreviewOptions,
  brandMap: THREE.CanvasTexture | null,
  graphicMap: THREE.CanvasTexture | null,
  screenMap: THREE.CanvasTexture | null
) {
  const grandstand = options.config === "grandstand";
  const fanZone = options.config === "fanzone";
  addHallFloor(group, 10.6, 9);
  addBackdrop(group, 8.4, 3.7, 0, 1.95, -3.4);
  addLogoSign(group, 2.3, 0.38, 0, 3.65, -3.28, 0, options.brandColor, brandMap);
  addGraphic(group, 0.9, 1.6, -3.85, 1.8, -3.28, 0, graphicMap);
  addGraphic(group, 0.9, 1.6, 3.85, 1.8, -3.28, 0, graphicMap);

  if (fanZone) {
    addTv(group, 4.4, 1.7, 0, 2.05, -3.28, 0, options.screens, screenMap);
    addScreen(group, 1.6, 0.85, -3.15, 1.7, 0.4, -Math.PI / 2, options.screens, screenMap);
    addScreen(group, 1.6, 0.85, 3.15, 1.7, 0.4, Math.PI / 2, options.screens, screenMap);
    addSofa(group, -1.7, 1.15, 0, "#241c22");
    addSofa(group, 1.7, 1.15, Math.PI, "#241c22");
    addSofa(group, 0, 2.45, Math.PI, "#241c22");
    addMeetingTable(group, -1.7, 0, 2.15, 0);
    addMeetingTable(group, 1.7, 0, 2.15, 0.4);
    return;
  }

  const stage = box(6.4, 0.38, 2.5, "#171417", { roughness: 0.45, metalness: 0.2 });
  stage.position.set(0, 0.19, -1.45);
  group.add(stage);
  const stageTop = 0.38;
  const lip = box(6.5, 0.05, 0.08, options.brandColor, {
    emissive: options.brandColor,
    emissiveIntensity: 0.7,
    roughness: 0.35,
  });
  lip.position.set(0, stageTop, -0.22);
  group.add(lip);

  addLedCluster(group, 1.9, -3.28, options.screens, screenMap);
  addPlayerDesk(group, -1.25, -1.55, stageTop, options.screens, screenMap);
  addPlayerDesk(group, 1.25, -1.55, stageTop, options.screens, screenMap);

  if (grandstand) {
    addSeatBank(group, 5, 6, 0, 0.85, 0);
    addSeatBank(group, 4, 5, -3.55, -0.4, -Math.PI / 2);
    addSeatBank(group, 4, 5, 3.55, -0.4, Math.PI / 2);
    return;
  }

  const caster = box(1.7, 0.72, 0.5, INK);
  caster.position.set(0, 0.36, 2.15);
  group.add(caster);
  addScreen(group, 0.7, 0.4, 0, 1.12, 1.9, 0, options.screens, screenMap);
  addSeatBank(group, 3, 8, 0, 0.7, 0);
}

function addCarpet(group: THREE.Group, width: number, depth: number, carpet: string, accent: string) {
  const base = box(width, 0.14, depth, "#1a1614", { roughness: 0.84 });
  base.position.y = 0.07;
  const pile = box(width - 0.16, 0.03, depth - 0.16, carpet, { roughness: 0.98 });
  pile.position.y = 0.155;
  const front = box(width + 0.02, 0.04, 0.06, accent, {
    emissive: accent,
    emissiveIntensity: 0.7,
    roughness: 0.35,
  });
  front.position.set(0, 0.13, depth / 2 - 0.02);
  const back = box(width + 0.02, 0.04, 0.06, accent, {
    emissive: accent,
    emissiveIntensity: 0.35,
    roughness: 0.35,
  });
  back.position.set(0, 0.13, -depth / 2 + 0.02);
  group.add(base, pile, front, back);
  return 0.17;
}

function addHallFloor(group: THREE.Group, width: number, depth: number) {
  const slab = box(width, 0.08, depth, "#12100f", { roughness: 0.92 });
  slab.position.y = -0.04;
  const inset = box(width - 0.45, 0.02, depth - 0.45, "#1c1819");
  inset.position.y = 0.01;
  group.add(slab, inset);
}

function addWallShell(
  group: THREE.Group,
  width: number,
  height: number,
  depth: number,
  x: number,
  y: number,
  z: number
) {
  const wall = box(width, height, depth, WHITE, { roughness: 0.84 });
  wall.position.set(x, y, z);
  group.add(wall);
}

function addBackdrop(
  group: THREE.Group,
  width: number,
  height: number,
  x: number,
  y: number,
  z: number
) {
  const wall = box(width, height, 0.12, "#161314", { roughness: 0.8 });
  wall.position.set(x, y, z);
  group.add(wall);
}

function addFrontFascia(
  group: THREE.Group,
  span: number,
  z: number,
  floorY: number,
  color: string,
  brandMap: THREE.CanvasTexture | null
) {
  [-span / 2 + 0.06, span / 2 - 0.06].forEach((x) => {
    const post = box(0.08, 2.75, 0.08, WHITE);
    post.position.set(x, floorY + 1.375, z);
    group.add(post);
  });
  addLogoSign(group, span - 0.16, 0.48, 0, floorY + 2.78, z, 0, color, brandMap);
}

function addLogoSign(
  group: THREE.Group,
  width: number,
  height: number,
  x: number,
  y: number,
  z: number,
  rotationY: number,
  color: string,
  brandMap: THREE.CanvasTexture | null
) {
  const sign = new THREE.Group();
  sign.add(box(width, height, 0.08, color, { roughness: 0.5 }));
  if (brandMap) {
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(Math.min(width * 0.86, 2.2), height * 0.7),
      new THREE.MeshStandardMaterial({ map: brandMap, roughness: 0.48 })
    );
    face.position.z = 0.046;
    sign.add(face);
  }
  sign.position.set(x, y, z);
  sign.rotation.y = rotationY;
  group.add(sign);
}

function addGraphic(
  group: THREE.Group,
  width: number,
  height: number,
  x: number,
  y: number,
  z: number,
  rotationY: number,
  map: THREE.CanvasTexture | null
) {
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshStandardMaterial({
      color: "#ffffff",
      map: map ?? undefined,
      roughness: 0.68,
    })
  );
  panel.position.set(x, y, z);
  panel.rotation.y = rotationY;
  panel.castShadow = true;
  panel.receiveShadow = true;
  group.add(panel);
}

function addReception(
  group: THREE.Group,
  x: number,
  floorY: number,
  z: number,
  color: string,
  rotationY: number,
  brandMap: THREE.CanvasTexture | null
) {
  const desk = new THREE.Group();
  const body = box(1.55, 1.02, 0.58, WHITE, { roughness: 0.62 });
  body.position.y = 0.51;
  const cap = box(1.62, 0.06, 0.64, color, { roughness: 0.45 });
  cap.position.y = 1.05;
  const kick = box(1.55, 0.08, 0.58, INK);
  kick.position.y = 0.04;
  desk.add(body, cap, kick);
  if (brandMap) {
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.28),
      new THREE.MeshStandardMaterial({ map: brandMap, roughness: 0.5 })
    );
    face.position.set(0, 0.62, 0.3);
    desk.add(face);
  }
  desk.position.set(x, floorY, z);
  desk.rotation.y = rotationY;
  group.add(desk);
}

function addMeetingTable(group: THREE.Group, x: number, floorY: number, z: number, rotationY: number) {
  const table = new THREE.Group();
  const topY = 0.74;
  const top = box(1.12, 0.05, 0.72, WOOD, { roughness: 0.52 });
  top.position.y = topY;
  [
    [-0.46, -0.26],
    [0.46, -0.26],
    [-0.46, 0.26],
    [0.46, 0.26],
  ].forEach(([lx, lz]) => {
    const leg = box(0.05, topY - 0.025, 0.05, WOOD_DARK);
    leg.position.set(lx, (topY - 0.025) / 2, lz);
    table.add(leg);
  });
  table.add(top);
  addChair(table, 0, 0, 0.58, Math.PI);
  addChair(table, 0, 0, -0.58, 0);
  addChair(table, 0.78, 0, 0, Math.PI / 2);
  addChair(table, -0.78, 0, 0, -Math.PI / 2);
  table.position.set(x, floorY, z);
  table.rotation.y = rotationY;
  group.add(table);
}

function addChair(
  parent: THREE.Object3D,
  x: number,
  floorY: number,
  z: number,
  rotationY: number,
  color = WOOD
) {
  const chair = new THREE.Group();
  const legH = 0.44;
  [
    [-0.15, -0.15],
    [0.15, -0.15],
    [-0.15, 0.15],
    [0.15, 0.15],
  ].forEach(([lx, lz]) => {
    const leg = box(0.035, legH, 0.035, WOOD_DARK);
    leg.position.set(lx, legH / 2, lz);
    chair.add(leg);
  });
  const seat = box(0.4, 0.045, 0.38, color);
  seat.position.y = legH;
  const back = box(0.4, 0.4, 0.04, color);
  back.position.set(0, legH + 0.2, -0.17);
  chair.add(seat, back);
  chair.position.set(x, floorY, z);
  chair.rotation.y = rotationY;
  parent.add(chair);
}

function addLoungeSeat(group: THREE.Group, x: number, floorY: number, z: number, rotationY: number) {
  const seat = new THREE.Group();
  const base = box(0.52, 0.4, 0.52, WHITE, { roughness: 0.55 });
  base.position.y = 0.28;
  const back = box(0.52, 0.42, 0.06, WHITE);
  back.position.set(0, 0.58, -0.23);
  seat.add(base, back);
  seat.position.set(x, floorY, z);
  seat.rotation.y = rotationY;
  group.add(seat);
}

function addSofa(group: THREE.Group, x: number, z: number, rotationY: number, color: string) {
  const sofa = new THREE.Group();
  const base = box(1.7, 0.38, 0.64, color);
  base.position.y = 0.28;
  const back = box(1.7, 0.46, 0.1, color);
  back.position.set(0, 0.6, -0.27);
  sofa.add(base, back);
  sofa.position.set(x, 0, z);
  sofa.rotation.y = rotationY;
  group.add(sofa);
}

function addCanopy(group: THREE.Group, y: number, span: number, depth: number, accent: string) {
  const slab = box(span, 0.1, depth, "#d7c3a2", { roughness: 0.62 });
  slab.position.set(0, y, -0.25);
  group.add(slab);
  const count = 16;
  for (let index = 0; index < count; index += 1) {
    const slat = box(0.07, 0.48, depth - 0.35, "#c4a574", { roughness: 0.55 });
    const x = -span / 2 + 0.35 + index * ((span - 0.7) / (count - 1));
    slat.position.set(x, y + 0.28, -0.25);
    group.add(slat);
  }
  const glow = box(span + 0.08, 0.045, 0.07, accent, {
    emissive: accent,
    emissiveIntensity: 1.1,
    roughness: 0.3,
  });
  glow.position.set(0, y - 0.04, -0.25 + depth / 2);
  group.add(glow);
}

function addLightRing(group: THREE.Group, x: number, y: number, z: number, radius: number, color: string) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.045, 10, 28),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.95,
      roughness: 0.32,
      metalness: 0.25,
    })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.set(x, y, z);
  ring.castShadow = true;
  group.add(ring);
}

function addPlinth(group: THREE.Group, x: number, floorY: number, z: number) {
  const plinth = box(0.62, 0.78, 0.62, "#2a2624");
  plinth.position.set(x, floorY + 0.39, z);
  const top = box(0.42, 0.2, 0.42, "#f4f0ea", { roughness: 0.35, metalness: 0.18 });
  top.position.set(x, floorY + 0.86, z);
  const glow = box(0.68, 0.045, 0.68, "#fff1d6", { emissive: "#fff1d6", emissiveIntensity: 0.45 });
  glow.position.set(x, floorY + 0.03, z);
  group.add(plinth, top, glow);
}

function addSeatBank(
  group: THREE.Group,
  rows: number,
  cols: number,
  x: number,
  z: number,
  rotationY: number
) {
  const bank = new THREE.Group();
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const seatX = (col - (cols - 1) / 2) * 0.48;
      const seatZ = row * 0.56;
      const cushion = box(0.4, 0.22, 0.36, row % 2 === 0 ? "#2a2326" : "#3a3134");
      cushion.position.set(seatX, 0.16 + row * 0.11, seatZ);
      const backrest = box(0.4, 0.28, 0.05, "#161314");
      backrest.position.set(seatX, 0.34 + row * 0.11, seatZ + 0.16);
      bank.add(cushion, backrest);
    }
  }
  bank.position.set(x, 0, z);
  bank.rotation.y = rotationY;
  group.add(bank);
}

function addLedCluster(
  group: THREE.Group,
  y: number,
  z: number,
  on: boolean,
  screenMap: THREE.CanvasTexture | null
) {
  addTv(group, 3.2, 1.8, 0, y, z, 0, on, screenMap);
  addScreen(group, 1.4, 1.15, -2.5, y + 0.15, z, 0, on, screenMap);
  addScreen(group, 1.4, 1.15, 2.5, y + 0.15, z, 0, on, screenMap);
  addScreen(group, 2.3, 0.7, 0, y + 1.4, z, 0, on, screenMap);
}

function addPlayerDesk(
  group: THREE.Group,
  x: number,
  z: number,
  floorY: number,
  screens: boolean,
  screenMap: THREE.CanvasTexture | null
) {
  const desk = box(1.25, 0.72, 0.55, "#181518");
  desk.position.set(x, floorY + 0.36, z);
  group.add(desk);
  addScreen(group, 0.62, 0.36, x, floorY + 0.92, z - 0.04, 0, screens, screenMap);
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

function addTv(
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
  const screen = new THREE.Group();
  screen.add(box(width, height, 0.07, "#100e0d", { metalness: 0.45, roughness: 0.35 }));
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 0.9, height * 0.82),
    new THREE.MeshStandardMaterial({
      color: on ? "#2a1218" : "#161214",
      map: on ? (screenMap ?? undefined) : null,
      emissive: on ? "#ffc2d0" : "#000000",
      emissiveIntensity: on ? 0.45 : 0,
      roughness: 0.42,
    })
  );
  face.position.z = 0.042;
  screen.add(face);
  screen.position.set(x, y, z);
  screen.rotation.y = rotationY;
  group.add(screen);
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
  addTv(group, width, height, x, y, z, rotationY, true, screenMap);
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

function screenTitle(options: PreviewOptions) {
  if (options.space === "stage") return "LIVE";
  if (options.space === "arena") return "ARENA";
  if (options.config === "pavilion") return "MEET";
  if (options.config === "island") return "ISLAND";
  return "STAND";
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

function makeGraphicTexture(color: string, branded: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1280;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = branded ? color : "#f3efe8";
  context.fillRect(0, 0, 1024, 1280);
  const ink = branded && !isLight(color) ? "rgba(247,241,234,0.9)" : "rgba(28,20,22,0.82)";
  context.strokeStyle = ink;
  context.lineWidth = 6;
  context.strokeRect(70, 150, 880, 460);
  context.beginPath();
  context.arc(280, 390, 110, 0, Math.PI * 2);
  context.moveTo(460, 280);
  context.lineTo(860, 280);
  context.moveTo(460, 390);
  context.lineTo(760, 390);
  context.moveTo(460, 500);
  context.lineTo(680, 500);
  context.stroke();
  context.strokeRect(70, 700, 420, 460);
  context.strokeRect(540, 700, 410, 210);
  context.strokeRect(540, 950, 410, 210);
  context.fillStyle = ink;
  context.font = "600 64px Georgia, serif";
  context.fillText(branded ? "AUMSH" : "GRAPHICS", 80, 110);
  context.font = "28px sans-serif";
  context.fillText("EXHIBITION GRAPHICS", 84, 1240);
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

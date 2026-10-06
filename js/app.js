// ============================================================================
// 🍉🐾👑 Critter Suika Watermelon Merge! (100% Zero-Text Calibrated Edition)
// 8 Smiling Critter Evolution Tiers • Pre-Seeded Chain-Merge Jars • Smart Spawner
// Sub-Stepped 2D Circle Physics • Visual Evolution Wheel • Zero Overflow Punishment
// ============================================================================

const W = 820;
const H = 540;

// Crystal Candy Jar Geometry
const JAR_LEFT = 215;
const JAR_RIGHT = 625;
const JAR_TOP = 96;
const JAR_BOTTOM = 508;
const DROP_Y = 62;
const GRAVITY = 0.42;

// 8 Evolution Tiers (Smallest Berry -> Giant Golden Watermelon King!)
const TIERS = [
  {
    tier: 0,
    id: 'picky',
    img: 'icons/picky.jpg',
    r: 20,
    fruit: '🍒',
    color: '#fb7185',
    rim: '#be123c',
    skyTop: '#fff1f2',
    skyBot: '#ffe4e6'
  },
  {
    tier: 1,
    id: 'bobby',
    img: 'icons/bobby.jpg',
    r: 27,
    fruit: '🍓',
    color: '#f43f5e',
    rim: '#9f1239',
    skyTop: '#ffe4e6',
    skyBot: '#fbcfe8'
  },
  {
    tier: 2,
    id: 'kickin',
    img: 'icons/kickin.jpg',
    r: 35,
    fruit: '🍊',
    color: '#eab308',
    rim: '#a16207',
    skyTop: '#fef9c3',
    skyBot: '#fde68a'
  },
  {
    tier: 3,
    id: 'hoppy',
    img: 'icons/hoppy.jpg',
    r: 44,
    fruit: '🍏',
    color: '#22c55e',
    rim: '#15803d',
    skyTop: '#dcfce7',
    skyBot: '#bbf7d0'
  },
  {
    tier: 4,
    id: 'bubba',
    img: 'icons/bubba.jpg',
    r: 55,
    fruit: '🫐',
    color: '#38bdf8',
    rim: '#0369a1',
    skyTop: '#e0f2fe',
    skyBot: '#bae6fd'
  },
  {
    tier: 5,
    id: 'catnap',
    img: 'icons/catnap.jpg',
    r: 67,
    fruit: '🍇',
    color: '#8b5cf6',
    rim: '#5b21b6',
    skyTop: '#ede9fe',
    skyBot: '#ddd6fe'
  },
  {
    tier: 6,
    id: 'craftycorn',
    img: 'icons/craftycorn.jpg',
    r: 81,
    fruit: '🍑',
    color: '#a855f7',
    rim: '#6b21a8',
    skyTop: '#f3e8ff',
    skyBot: '#e9d5ff'
  },
  {
    tier: 7,
    id: 'dogday',
    img: 'icons/dogday.jpg',
    r: 96,
    fruit: '🍉',
    color: '#ff922b',
    rim: '#c2410c',
    skyTop: '#fef3c7',
    skyBot: '#fed7aa'
  }
];

// Top Bar 8 Stage Themes & Pre-Seeded Jar Layouts (Calibrated so chain merges start right away!)
const STAGES = [
  // Stage 0: DogDay Sunny Orchard (Target Tiers: 4, 5, 6)
  {
    hostIdx: 7,
    starTargets: [4, 5, 6],
    initialOrbs: [
      { x: 345, y: 465, tier: 3 },
      { x: 445, y: 465, tier: 2 },
      { x: 305, y: 405, tier: 1 },
      { x: 395, y: 405, tier: 2 },
      { x: 505, y: 465, tier: 1 }
    ]
  },
  // Stage 1: Hoppy Berry Bounce (Target Tiers: 4, 5, 6)
  {
    hostIdx: 3,
    starTargets: [4, 5, 6],
    initialOrbs: [
      { x: 330, y: 460, tier: 2 },
      { x: 420, y: 460, tier: 3 },
      { x: 510, y: 460, tier: 2 },
      { x: 375, y: 395, tier: 1 },
      { x: 465, y: 395, tier: 2 }
    ]
  },
  // Stage 2: Bobby Strawberry Jar (Target Tiers: 4, 5, 6)
  {
    hostIdx: 1,
    starTargets: [4, 5, 6],
    initialOrbs: [
      { x: 350, y: 455, tier: 3 },
      { x: 470, y: 455, tier: 2 },
      { x: 310, y: 390, tier: 2 },
      { x: 415, y: 390, tier: 1 },
      { x: 520, y: 455, tier: 1 }
    ]
  },
  // Stage 3: PickyPiggy Fruit Feast (Target Tiers: 4, 5, 6)
  {
    hostIdx: 0,
    starTargets: [4, 5, 6],
    initialOrbs: [
      { x: 355, y: 455, tier: 3 },
      { x: 465, y: 455, tier: 2 },
      { x: 320, y: 390, tier: 1 },
      { x: 415, y: 390, tier: 2 },
      { x: 520, y: 455, tier: 2 }
    ]
  },
  // Stage 4: Bubba Blueberry Splash (Target Tiers: 5, 6, 7)
  {
    hostIdx: 4,
    starTargets: [5, 6, 7],
    initialOrbs: [
      { x: 350, y: 450, tier: 4 },
      { x: 470, y: 450, tier: 3 },
      { x: 340, y: 380, tier: 2 },
      { x: 430, y: 380, tier: 3 },
      { x: 525, y: 450, tier: 2 }
    ]
  },
  // Stage 5: CraftyCorn Rainbow Melon (Target Tiers: 5, 6, 7)
  {
    hostIdx: 6,
    starTargets: [5, 6, 7],
    initialOrbs: [
      { x: 355, y: 450, tier: 4 },
      { x: 475, y: 450, tier: 3 },
      { x: 350, y: 380, tier: 3 },
      { x: 445, y: 380, tier: 2 },
      { x: 530, y: 450, tier: 1 }
    ]
  },
  // Stage 6: KickinChicken Golden Citrus (Target Tiers: 5, 6, 7)
  {
    hostIdx: 2,
    starTargets: [5, 6, 7],
    initialOrbs: [
      { x: 345, y: 450, tier: 4 },
      { x: 475, y: 450, tier: 3 },
      { x: 330, y: 380, tier: 2 },
      { x: 425, y: 380, tier: 2 },
      { x: 515, y: 450, tier: 3 }
    ]
  },
  // Stage 7: CatNap Dream Watermelon Finale (Target Tiers: 5, 6, 7)
  {
    hostIdx: 5,
    starTargets: [5, 6, 7],
    initialOrbs: [
      { x: 350, y: 445, tier: 4 },
      { x: 485, y: 445, tier: 4 },
      { x: 360, y: 375, tier: 2 },
      { x: 465, y: 375, tier: 3 }
    ]
  }
];

// ============================================================================
// WebAudio Cute Sound Synthesizer
// ============================================================================
class SoundBox {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.14, gainVal = 0.14, slideFreq = null) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (slideFreq) {
        osc.frequency.exponentialRampToValueAtTime(slideFreq, now + duration);
      }
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (_) {}
  }

  playDrop() {
    this.playTone(360, 'sine', 0.11, 0.13, 210);
  }

  playMerge(tier) {
    const base = 330 + tier * 65;
    this.playTone(base, 'triangle', 0.18, 0.18, base * 1.5);
  }

  playStar() {
    this.playTone(587, 'sine', 0.12, 0.15, 880);
    setTimeout(() => this.playTone(880, 'sine', 0.18, 0.15, 1174), 70);
  }

  playShake() {
    this.playTone(180, 'sine', 0.22, 0.16, 420);
  }

  playWin() {
    [523, 659, 784, 1046].forEach((n, i) => {
      setTimeout(() => this.playTone(n, 'triangle', 0.22, 0.16), i * 110);
    });
  }
}

const sfx = new SoundBox();

// ============================================================================
// Game State & Image Preloader
// ============================================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const critterImages = {};
TIERS.forEach((t) => {
  const img = new Image();
  img.src = t.img;
  critterImages[t.id] = img;
});

let currentLevel = 0;
let completedLevels = new Set();
let unlockedTiers = new Set();
let starsEarned = 0;
let hasDroppedThisLevel = false;
let levelWon = false;
let sandboxKeepPlaying = false;
let dropCooldown = 0;
let animTick = 0;
let jarShakeOffset = 0;

// Active Entities
let clawX = (JAR_LEFT + JAR_RIGHT) / 2;
let currentDrop = { tier: 0, isRainbow: false };
let nextDrop = { tier: 1, isRainbow: false };
let orbs = []; // `{ id, x, y, vx, vy, tier, r, isRainbow, scalePop, merged }`
let particles = [];
let shockwaves = [];
let nextOrbId = 1;

// ============================================================================
// DOM Elements & UI Builders
// ============================================================================
const levelNavBar = document.getElementById('levelNavBar');
const sideCritterImg = document.getElementById('sideCritterImg');
const critterPowerBadge = document.getElementById('critterPowerBadge');
const targetSlotsRow = document.getElementById('targetSlotsRow');
const floatingToast = document.getElementById('floatingToast');

const btnSwapOrb = document.getElementById('btnSwapOrb');
const btnRainbowOrb = document.getElementById('btnRainbowOrb');
const btnShakeJar = document.getElementById('btnShakeJar');
const btnPopSmall = document.getElementById('btnPopSmall');
const btnResetLevel = document.getElementById('btnResetLevel');
const btnSoundToggle = document.getElementById('btnSoundToggle');

const winModal = document.getElementById('winModal');
const winCritterImg = document.getElementById('winCritterImg');
const winPowerBadge = document.getElementById('winPowerBadge');
const btnWinReplay = document.getElementById('btnWinReplay');
const btnWinKeepPlaying = document.getElementById('btnWinKeepPlaying');
const btnWinNext = document.getElementById('btnWinNext');

const finaleModal = document.getElementById('finaleModal');
const finaleCrittersGrid = document.getElementById('finaleCrittersGrid');
const btnFinaleClose = document.getElementById('btnFinaleClose');

function renderTopBar() {
  levelNavBar.innerHTML = '';
  STAGES.forEach((st, idx) => {
    const host = TIERS[st.hostIdx];
    const btn = document.createElement('button');
    btn.className = 'level-pill' +
      (idx === currentLevel ? ' active' : '') +
      (completedLevels.has(idx) ? ' completed' : '');
    btn.setAttribute('aria-label', host.id);

    const img = document.createElement('img');
    img.src = host.img;
    img.alt = '';
    btn.appendChild(img);

    const badge = document.createElement('span');
    badge.className = 'pill-stars';
    badge.textContent = completedLevels.has(idx) ? '⭐⭐⭐' : host.fruit;
    btn.appendChild(badge);

    btn.addEventListener('click', () => {
      sfx.playDrop();
      loadLevel(idx);
    });
    levelNavBar.appendChild(btn);
  });
}

function updateVisualHUD() {
  const st = STAGES[currentLevel];
  const host = TIERS[st.hostIdx];
  sideCritterImg.src = host.img;
  critterPowerBadge.textContent = host.fruit;

  // Count how many of the stage's 3 `starTargets` have been unlocked
  let earned = 0;
  st.starTargets.forEach((tIdx) => {
    if (unlockedTiers.has(tIdx)) earned++;
  });
  starsEarned = earned;

  for (let i = 0; i < 3; i++) {
    const slot = document.getElementById(`starSlot${i}`);
    if (slot) {
      slot.classList.toggle('collected', i < starsEarned);
    }
  }

  targetSlotsRow.innerHTML = '';
  st.starTargets.forEach((tIdx) => {
    const tierObj = TIERS[tIdx];
    const achieved = unlockedTiers.has(tIdx);
    const pill = document.createElement('div');
    pill.className = 'hud-target-pill' + (achieved ? ' popped' : '');
    pill.textContent = achieved ? '⭐' : tierObj.fruit;
    targetSlotsRow.appendChild(pill);
  });

  btnRainbowOrb.classList.toggle('active', currentDrop.isRainbow);
}

let toastTimer = null;
function showEmojiToast(emojis) {
  floatingToast.textContent = emojis;
  floatingToast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    floatingToast.classList.add('hidden');
  }, 1100);
}

// ============================================================================
// Smart Spawner (Picks Tiers 0..3 That Match Exposed Top Orbs in the Jar!)
// ============================================================================
function pickSmartDropTier() {
  // Find small/medium orbs (tiers 0..3) near the top of the jar so player gets fun chain merges!
  const candidates = orbs
    .filter((o) => o.tier <= 3)
    .sort((a, b) => a.y - b.y)
    .slice(0, 4)
    .map((o) => o.tier);

  if (candidates.length > 0 && Math.random() < 0.72) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  return Math.floor(Math.random() * 4); // Tier 0, 1, 2, or 3
}

// ============================================================================
// Level Initialization
// ============================================================================
function loadLevel(idx) {
  currentLevel = (idx + STAGES.length) % STAGES.length;
  const st = STAGES[currentLevel];

  winModal.classList.add('hidden');
  finaleModal.classList.add('hidden');

  unlockedTiers = new Set([0, 1, 2, 3]);
  starsEarned = 0;
  hasDroppedThisLevel = false;
  levelWon = false;
  sandboxKeepPlaying = false;
  dropCooldown = 0;
  clawX = (JAR_LEFT + JAR_RIGHT) / 2;

  orbs = [];
  particles = [];
  shockwaves = [];

  // Spawn pre-seeded pyramid of Critter Orbs inside the jar
  st.initialOrbs.forEach((init) => {
    const t = TIERS[init.tier];
    orbs.push({
      id: nextOrbId++,
      x: init.x,
      y: init.y,
      vx: 0,
      vy: 0,
      tier: init.tier,
      r: t.r,
      isRainbow: false,
      scalePop: 1.0,
      merged: false
    });
  });

  currentDrop = { tier: pickSmartDropTier(), isRainbow: false };
  nextDrop = { tier: pickSmartDropTier(), isRainbow: false };

  renderTopBar();
  updateVisualHUD();
}

// ============================================================================
// Dropping, Merging & Toy Boost Powers
// ============================================================================
function dropCurrentOrb() {
  if ((levelWon && !sandboxKeepPlaying) || dropCooldown > 0) return;

  hasDroppedThisLevel = true;
  dropCooldown = 18;
  sfx.playDrop();

  const tierObj = TIERS[currentDrop.tier];
  const r = currentDrop.isRainbow ? 26 : tierObj.r;
  const clampedX = Math.max(JAR_LEFT + r + 4, Math.min(JAR_RIGHT - r - 4, clawX));

  orbs.push({
    id: nextOrbId++,
    x: clampedX,
    y: JAR_TOP + 12,
    vx: (Math.random() - 0.5) * 0.6,
    vy: 2.5,
    tier: currentDrop.tier,
    r,
    isRainbow: currentDrop.isRainbow,
    scalePop: 1.15,
    merged: false
  });

  currentDrop = nextDrop;
  nextDrop = { tier: pickSmartDropTier(), isRainbow: false };
  updateVisualHUD();
}

function triggerMerge(orbA, orbB, targetTier) {
  orbA.merged = true;
  orbB.merged = true;

  const newTier = Math.min(TIERS.length - 1, targetTier);
  const tierObj = TIERS[newTier];
  const mx = (orbA.x + orbB.x) * 0.5;
  const my = (orbA.y + orbB.y) * 0.5;

  const mergedOrb = {
    id: nextOrbId++,
    x: Math.max(JAR_LEFT + tierObj.r, Math.min(JAR_RIGHT - tierObj.r, mx)),
    y: Math.min(JAR_BOTTOM - tierObj.r, my),
    vx: (orbA.vx + orbB.vx) * 0.35,
    vy: -2.2,
    tier: newTier,
    r: tierObj.r,
    isRainbow: false,
    scalePop: 1.38,
    merged: false
  };
  orbs.push(mergedOrb);

  // Give nearby orbs a gentle celebratory nudge so chain merges happen naturally!
  orbs.forEach((other) => {
    if (other === mergedOrb || other.merged) return;
    const dx = other.x - mx;
    const dy = other.y - my;
    const dist = Math.hypot(dx, dy);
    if (dist > 0 && dist < tierObj.r + other.r + 45) {
      other.vx += (dx / dist) * 2.2;
      other.vy -= 1.8;
    }
  });

  sfx.playMerge(newTier);
  spawnBurst(mx, my, tierObj.fruit, 10);
  if (newTier >= 5) {
    spawnBurst(mx, my, '⭐', 8);
  }
  shockwaves.push({
    x: mx,
    y: my,
    r: tierObj.r * 0.5,
    maxR: tierObj.r * 1.9,
    color: tierObj.color,
    alpha: 1.0
  });

  const wasUnlocked = unlockedTiers.has(newTier);
  unlockedTiers.add(newTier);

  const st = STAGES[currentLevel];
  if (!wasUnlocked && st.starTargets.includes(newTier)) {
    sfx.playStar();
    showEmojiToast(`${tierObj.fruit}⭐🥳`);
  }

  updateVisualHUD();
  checkStageWin();
}

function checkStageWin() {
  if (levelWon) return;
  const st = STAGES[currentLevel];
  const allTargetsMet = st.starTargets.every((tIdx) => unlockedTiers.has(tIdx));
  if (!allTargetsMet) return;

  levelWon = true;
  completedLevels.add(currentLevel);
  renderTopBar();
  updateVisualHUD();
  sfx.playWin();
  showEmojiToast('🎉🍉👑🎉');

  setTimeout(() => {
    if (completedLevels.size === STAGES.length) {
      showFinaleModal();
    } else {
      const host = TIERS[st.hostIdx];
      winCritterImg.src = host.img;
      winPowerBadge.textContent = host.fruit;
      winModal.classList.remove('hidden');
    }
  }, 900);
}

function showFinaleModal() {
  finaleCrittersGrid.innerHTML = '';
  TIERS.forEach((t) => {
    const badge = document.createElement('div');
    badge.className = 'finale-critter-tile';
    const img = document.createElement('img');
    img.src = t.img;
    img.alt = '';
    const sp = document.createElement('span');
    sp.textContent = t.fruit;
    badge.appendChild(img);
    badge.appendChild(sp);
    finaleCrittersGrid.appendChild(badge);
  });
  finaleModal.classList.remove('hidden');
}

function shakeCandyJar() {
  sfx.playShake();
  jarShakeOffset = 14;
  showEmojiToast('🌪️🍉✨');
  orbs.forEach((o) => {
    o.vx += (Math.random() - 0.5) * 9;
    o.vy = -5.5 - Math.random() * 4.5;
  });
}

function popSmallOrbsHelper() {
  // Pop up to 4 small orbs (tier <= 2) to clear space and let big orbs touch!
  const smalls = orbs
    .filter((o) => !o.merged && o.tier <= 2)
    .sort((a, b) => a.tier - b.tier || a.y - b.y)
    .slice(0, 4);

  if (smalls.length === 0) {
    shakeCandyJar();
    return;
  }

  sfx.playStar();
  showEmojiToast('💣🍒✨');
  smalls.forEach((o) => {
    o.merged = true;
    const t = TIERS[o.tier];
    spawnBurst(o.x, o.y, t.fruit, 7);
    shockwaves.push({
      x: o.x,
      y: o.y,
      r: 10,
      maxR: 48,
      color: t.color,
      alpha: 0.9
    });
  });
  orbs = orbs.filter((o) => !o.merged);
}

function spawnBurst(x, y, emoji, count = 8) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const speed = 2.0 + Math.random() * 4.8;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.8,
      emoji,
      size: 18 + Math.random() * 9,
      life: 1.0
    });
  }
}

// ============================================================================
// Sub-Stepped 2D Circle Physics Engine
// ============================================================================
function updatePhysics() {
  animTick++;
  if (dropCooldown > 0) dropCooldown--;
  if (jarShakeOffset > 0.2) jarShakeOffset *= 0.82;
  else jarShakeOffset = 0;

  // Apply gravity & velocity
  orbs.forEach((o) => {
    o.vy += GRAVITY;
    o.vx *= 0.992;
    o.vy *= 0.992;
    o.x += o.vx;
    o.y += o.vy;
    if (o.scalePop > 1.0) {
      o.scalePop = Math.max(1.0, o.scalePop - 0.04);
    }
  });

  // 8 Sub-steps of Circle-Circle & Jar-Wall Collision Resolution
  const SUBSTEPS = 8;
  for (let step = 0; step < SUBSTEPS; step++) {
    for (let i = 0; i < orbs.length; i++) {
      const a = orbs[i];
      if (a.merged) continue;

      // Jar Walls & Floor
      if (a.x - a.r < JAR_LEFT) {
        a.x = JAR_LEFT + a.r;
        a.vx = Math.abs(a.vx) * 0.45;
      } else if (a.x + a.r > JAR_RIGHT) {
        a.x = JAR_RIGHT - a.r;
        a.vx = -Math.abs(a.vx) * 0.45;
      }

      if (a.y + a.r > JAR_BOTTOM) {
        a.y = JAR_BOTTOM - a.r;
        a.vy = -Math.abs(a.vy) * 0.28;
        a.vx *= 0.92;
      }

      // Circle-Circle Collisions & Merges
      for (let j = i + 1; j < orbs.length; j++) {
        const b = orbs[j];
        if (b.merged || a.merged) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        const minDist = a.r + b.r;

        if (dist < minDist) {
          // Check if Rainbow Universal Merge Orb touched any orb!
          if (a.isRainbow || b.isRainbow) {
            const target = a.isRainbow ? b : a;
            triggerMerge(a, b, target.tier + 1);
            break;
          }

          // Check if two identical tiers touched!
          if (a.tier === b.tier && a.tier < TIERS.length - 1) {
            triggerMerge(a, b, a.tier + 1);
            break;
          }

          // Elastic Positional Separation
          const nx = dist > 0.001 ? dx / dist : 1;
          const ny = dist > 0.001 ? dy / dist : 0;
          const overlap = minDist - dist;

          // Weight separation by inverse radius so big watermelons feel heavy
          const totalR = a.r + b.r;
          const ratioA = b.r / totalR;
          const ratioB = a.r / totalR;

          a.x -= nx * overlap * ratioA;
          a.y -= ny * overlap * ratioA;
          b.x += nx * overlap * ratioB;
          b.y += ny * overlap * ratioB;

          // Velocity impulse along normal
          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const velAlongNormal = rvx * nx + rvy * ny;
          if (velAlongNormal < 0) {
            const restitution = 0.25;
            const impulse = -(1 + restitution) * velAlongNormal * 0.5;
            a.vx -= impulse * nx * ratioA;
            a.vy -= impulse * ny * ratioA;
            b.vx += impulse * nx * ratioB;
            b.vy += impulse * ny * ratioB;
          }
        }
      }
    }
  }

  orbs = orbs.filter((o) => !o.merged);

  // Kid-Friendly Anti-Overflow Safety: if orbs pile too high near JAR_TOP, automatically pop smallest orbs!
  const overflowCount = orbs.filter((o) => o.y - o.r < JAR_TOP + 22 && Math.abs(o.vy) < 1.5).length;
  if (overflowCount >= 2 && orbs.length > 7) {
    popSmallOrbsHelper();
  }

  // Update shockwaves
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const sw = shockwaves[i];
    sw.r += 7;
    sw.alpha -= 0.06;
    if (sw.alpha <= 0 || sw.r >= sw.maxR) {
      shockwaves.splice(i, 1);
    }
  }

  // Update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.vy += 0.16;
    pt.life -= 0.03;
    if (pt.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// ============================================================================
// Canvas Rendering (100% Zero Text, Full Opaque Emojis)
// ============================================================================
function drawScene() {
  const st = STAGES[currentLevel];
  const host = TIERS[st.hostIdx];

  // 1. Soft Stage Backdrop
  ctx.fillStyle = '#0f2942';
  ctx.fillRect(0, 0, W, H);

  // 2. Left Panel: Visual 8-Tier Evolution Ladder (100% Zero Text)
  drawEvolutionLadder();

  // 3. Right Panel: Next Critter Orb Preview + Stage Targets
  drawRightSidebar();

  // 4. Center Crystal Candy Jar (with optional shake offset)
  ctx.save();
  const shakeX = jarShakeOffset ? Math.sin(animTick * 0.9) * jarShakeOffset : 0;
  ctx.translate(shakeX, 0);

  const jarGrad = ctx.createLinearGradient(0, JAR_TOP, 0, JAR_BOTTOM);
  jarGrad.addColorStop(0, host.skyTop);
  jarGrad.addColorStop(1, host.skyBot);
  ctx.fillStyle = jarGrad;
  roundRect(ctx, JAR_LEFT, JAR_TOP, JAR_RIGHT - JAR_LEFT, JAR_BOTTOM - JAR_TOP, 24);
  ctx.fill();

  // Dotted Top Rim Line
  ctx.save();
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.38)';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(JAR_LEFT + 14, JAR_TOP + 24);
  ctx.lineTo(JAR_RIGHT - 14, JAR_TOP + 24);
  ctx.stroke();
  ctx.restore();

  // Vertical Dotted Drop Aim Line & Cloud Claw (`☁️`)
  if (dropCooldown === 0) {
    const activeTier = TIERS[currentDrop.tier];
    const dropR = currentDrop.isRainbow ? 26 : activeTier.r;
    const cx = Math.max(JAR_LEFT + dropR + 4, Math.min(JAR_RIGHT - dropR - 4, clawX));

    ctx.save();
    ctx.strokeStyle = currentDrop.isRainbow ? '#a855f7' : activeTier.color;
    ctx.lineWidth = 3.5;
    ctx.setLineDash([7, 7]);
    ctx.beginPath();
    ctx.moveTo(cx, DROP_Y + 10);
    ctx.lineTo(cx, JAR_BOTTOM - 12);
    ctx.stroke();
    ctx.restore();

    // Cute Cloud Holder above the Jar
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('☁️', cx, DROP_Y - 24);
    ctx.restore();

    drawCritterFruitOrb(cx, DROP_Y + 4, dropR * 0.88, currentDrop.tier, currentDrop.isRainbow);
  }

  // 5. All Bouncing Critter Orbs Inside the Jar
  orbs.forEach((o) => {
    drawCritterFruitOrb(o.x, o.y, o.r * o.scalePop, o.tier, o.isRainbow);
  });

  // 6. Glossy Crystal Jar Glass Rim Overlay
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(JAR_LEFT, JAR_TOP);
  ctx.lineTo(JAR_LEFT, JAR_BOTTOM - 22);
  ctx.arcTo(JAR_LEFT, JAR_BOTTOM, JAR_LEFT + 22, JAR_BOTTOM, 22);
  ctx.lineTo(JAR_RIGHT - 22, JAR_BOTTOM);
  ctx.arcTo(JAR_RIGHT, JAR_BOTTOM, JAR_RIGHT, JAR_BOTTOM - 22, 22);
  ctx.lineTo(JAR_RIGHT, JAR_TOP);
  ctx.stroke();

  // Glass reflection highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  roundRect(ctx, JAR_LEFT + 10, JAR_TOP + 20, 8, JAR_BOTTOM - JAR_TOP - 48, 4);
  ctx.fill();

  // 7. Shockwaves & Emoji Particles
  shockwaves.forEach((sw) => {
    ctx.save();
    ctx.strokeStyle = sw.color;
    ctx.globalAlpha = Math.max(0, sw.alpha);
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });

  particles.forEach((pt) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, pt.life);
    ctx.fillStyle = '#ffffff';
    ctx.font = `${Math.round(pt.size)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pt.emoji, pt.x, pt.y);
    ctx.restore();
  });

  ctx.restore();

  // 8. Animated Finger Tutorial Guide (Before first drop)
  if (!hasDroppedThisLevel) {
    drawVisualTutorialGuide();
  }
}

function drawCritterFruitOrb(x, y, r, tierIdx, isRainbow) {
  ctx.save();
  ctx.translate(x, y);

  if (isRainbow) {
    const grad = ctx.createLinearGradient(-r, -r, r, r);
    grad.addColorStop(0, '#ef4444');
    grad.addColorStop(0.33, '#eab308');
    grad.addColorStop(0.66, '#22c55e');
    grad.addColorStop(1, '#a855f7');
    ctx.fillStyle = grad;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.font = '26px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌈', 0, 1);
    ctx.restore();
    return;
  }

  const t = TIERS[tierIdx % TIERS.length];

  // Outer Fruit Sphere
  ctx.fillStyle = t.color;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = Math.max(3, r * 0.08);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Inner Critter Portrait
  const img = critterImages[t.id];
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.save();
    const ir = r * 0.78;
    ctx.beginPath();
    ctx.arc(0, 0, ir, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, -ir, -ir, ir * 2, ir * 2);
    ctx.restore();
  }

  // Glossy shine
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.beginPath();
  ctx.arc(-r * 0.32, -r * 0.32, r * 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Fruit Badge on Bottom-Right + Crown on Tier 7 King DogDay!
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#ffffff';
  ctx.font = `${Math.max(14, Math.round(r * 0.48))}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(t.fruit, r * 0.62, r * 0.58);

  if (tierIdx === 7) {
    ctx.font = `${Math.round(r * 0.52)}px sans-serif`;
    ctx.fillText('👑', 0, -r * 0.82);
  }

  ctx.restore();
}

function drawEvolutionLadder() {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeStyle = 'rgba(125, 211, 252, 0.35)';
  ctx.lineWidth = 3;
  roundRect(ctx, 22, 24, 166, H - 48, 22);
  ctx.fill();
  ctx.stroke();

  // Draw all 8 tiers in a 2-column visual evolution zig-zag (`🍒 -> 🍓 -> ... -> 🍉👑`)
  TIERS.forEach((t, idx) => {
    const row = Math.floor(idx / 2);
    const col = idx % 2;
    const cx = 66 + col * 78;
    const cy = 82 + row * 112;
    const unlocked = unlockedTiers.has(idx);

    if (unlocked) {
      ctx.save();
      ctx.fillStyle = 'rgba(250, 204, 21, 0.25)';
      ctx.beginPath();
      ctx.arc(cx, cy, 31, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawCritterFruitOrb(cx, cy, 24, idx, false);
  });
  ctx.restore();
}

function drawRightSidebar() {
  ctx.save();
  // Next Waiting Orb Card (Tap to Swap!)
  const nx = 724;
  const ny = 128;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.strokeStyle = '#ffd54f';
  ctx.lineWidth = 3.5;
  roundRect(ctx, nx - 68, ny - 74, 136, 148, 24);
  ctx.fill();
  ctx.stroke();

  drawCritterFruitOrb(nx, ny - 8, 34, nextDrop.tier, nextDrop.isRainbow);

  ctx.globalAlpha = 1;
  ctx.fillStyle = '#ffffff';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🔄', nx, ny + 46);

  // Stage Star Goal Pyramid Card on Bottom-Right
  const gx = 724;
  const gy = 365;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeStyle = 'rgba(125, 211, 252, 0.35)';
  ctx.lineWidth = 3;
  roundRect(ctx, gx - 68, gy - 125, 136, 250, 24);
  ctx.fill();
  ctx.stroke();

  const st = STAGES[currentLevel];
  st.starTargets.forEach((tIdx, i) => {
    const ty = gy - 72 + i * 74;
    const done = unlockedTiers.has(tIdx);
    drawCritterFruitOrb(gx - 18, ty, 24, tIdx, false);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.font = '26px sans-serif';
    ctx.fillText(done ? '⭐' : '🔒', gx + 32, ty);
  });

  ctx.restore();
}

function drawVisualTutorialGuide() {
  const swing = Math.sin(animTick * 0.05) * 110;
  clawX = (JAR_LEFT + JAR_RIGHT) * 0.5 + swing;

  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#ffffff';
  ctx.font = '38px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('👆', clawX, 155);
  ctx.restore();
}

function roundRect(context, x, y, w, h, r) {
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

// ============================================================================
// Pointer & Touch Controls (Slide Claw & Release to Drop)
// ============================================================================
function getCanvasCoords(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: ((clientX - rect.left) / rect.width) * W,
    y: ((clientY - rect.top) / rect.height) * H
  };
}

function swapActiveDrop() {
  const tmp = currentDrop;
  currentDrop = nextDrop;
  nextDrop = tmp;
  sfx.playDrop();
  updateVisualHUD();
  showEmojiToast('🔄🍉');
}

let isDraggingClaw = false;

canvas.addEventListener('pointerdown', (e) => {
  if (levelWon && !sandboxKeepPlaying) return;
  const pt = getCanvasCoords(e);

  // Tap on Next Waiting Orb card on the right swaps orbs!
  if (Math.hypot(pt.x - 724, pt.y - 128) < 68) {
    swapActiveDrop();
    return;
  }

  hasDroppedThisLevel = true;
  isDraggingClaw = true;
  if (pt.x >= JAR_LEFT - 20 && pt.x <= JAR_RIGHT + 20) {
    clawX = pt.x;
  }
});

window.addEventListener('pointermove', (e) => {
  if (levelWon && !sandboxKeepPlaying) return;
  const pt = getCanvasCoords(e);
  if (isDraggingClaw || hasDroppedThisLevel) {
    if (pt.x >= JAR_LEFT && pt.x <= JAR_RIGHT) {
      clawX = pt.x;
    }
  }
});

window.addEventListener('pointerup', () => {
  if (!isDraggingClaw) return;
  isDraggingClaw = false;
  dropCurrentOrb();
});

// ============================================================================
// Left Dock Toy Buttons & Modal Controls
// ============================================================================
btnSwapOrb.addEventListener('click', () => {
  swapActiveDrop();
});

btnRainbowOrb.addEventListener('click', () => {
  currentDrop.isRainbow = !currentDrop.isRainbow;
  sfx.playStar();
  updateVisualHUD();
  showEmojiToast(currentDrop.isRainbow ? '🌈🍉' : '🍒');
});

btnShakeJar.addEventListener('click', () => {
  shakeCandyJar();
});

btnPopSmall.addEventListener('click', () => {
  popSmallOrbsHelper();
});

btnResetLevel.addEventListener('click', () => {
  sfx.playDrop();
  loadLevel(currentLevel);
  showEmojiToast('🔁✨');
});

btnSoundToggle.addEventListener('click', () => {
  sfx.enabled = !sfx.enabled;
  btnSoundToggle.textContent = sfx.enabled ? '🔊' : '🔇';
  btnSoundToggle.classList.toggle('muted', !sfx.enabled);
  if (sfx.enabled) sfx.playDrop();
});

btnWinReplay.addEventListener('click', () => {
  sfx.playDrop();
  loadLevel(currentLevel);
});

if (btnWinKeepPlaying) {
  btnWinKeepPlaying.addEventListener('click', () => {
    sfx.playStar();
    sandboxKeepPlaying = true;
    winModal.classList.add('hidden');
    showEmojiToast('🍉👑✨');
  });
}

btnWinNext.addEventListener('click', () => {
  sfx.playStar();
  loadLevel((currentLevel + 1) % STAGES.length);
});

btnFinaleClose.addEventListener('click', () => {
  sfx.playWin();
  completedLevels.clear();
  loadLevel(0);
});

// ============================================================================
// Main Loop
// ============================================================================
function gameLoop() {
  updatePhysics();
  drawScene();
  requestAnimationFrame(gameLoop);
}

loadLevel(0);
requestAnimationFrame(gameLoop);

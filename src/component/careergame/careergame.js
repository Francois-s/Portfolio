import React, { useEffect, useRef, useState, useCallback } from 'react';
import './careergame.css';
import { useLanguage } from '../../i18n/LanguageContext';

import logoEpitech from '../../img/logos/epitech.svg';
import logoBnp from '../../img/logos/bnp-real-estate.svg';
import logoSaintDominique from '../../img/logos/saint-dominique.svg';
import logoCrpn from '../../img/logos/crpn.svg';
import logoFreelance from '../../img/logos/freelance.svg';
import logoOpenclassrooms from '../../img/logos/openclassrooms.svg';
import logoPenguinWorld from '../../img/logos/penguin-world.svg';
import logoWildWeb from '../../img/logos/wild-web.svg';
import logoNaissance from '../../img/logos/naissance.svg';
import playerPhoto from '../../img/profile-photo.jpg';

const LOGO_MAP = {
    naissance: logoNaissance,
    epitech: logoEpitech,
    'bnp-real-estate': logoBnp,
    'saint-dominique': logoSaintDominique,
    crpn: logoCrpn,
    freelance: logoFreelance,
    openclassrooms: logoOpenclassrooms,
    'penguin-world': logoPenguinWorld,
    'wild-web': logoWildWeb,
};

const CANVAS_W = 920;
const CANVAS_H = 260;
const GROUND_Y = CANVAS_H - 46;

const BASE_SPEED = 3.1;
const MAX_SPEED = 5.2;
const SPEED_RAMP = 0.00032;

const GRAVITY = 0.58;
const JUMP_FORCE = 12.4;
const MAX_JUMPS = 2;

const OBSTACLE_W = 28;
const OBSTACLE_H = 38;
const OBSTACLE_MIN_GAP = 460;
const OBSTACLE_MAX_GAP = 700;

const FIRST_MILESTONE_WORLD_X = 120;
const MILESTONE_WORLD_INTERVAL = 900;
const MILESTONE_BANNER_W = 230;
const MILESTONE_BANNER_H = 128;
// Banners scroll in the slow parallax layer (bgX, ~0.45x world speed) so they
// stay readable; the finish line must wait long enough in worldX terms for the
// last banner to actually be on screen, or the ending arrives before it's seen.
const FINISH_BUFFER = 1500;

const CONFETTI_COLORS = ['#14b8a6', '#0c4a6e', '#f43f5e', '#fbbf24', '#ffffff'];

const BEST_SCORE_KEY = 'portfolio-career-game-best';

const CareerGame = () => {
    const { t } = useLanguage();
    const milestones = t.game.milestones;

    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const gameRef = useRef(null);
    const imagesRef = useRef({});
    const playerImageRef = useRef(null);
    const lastUiUpdateRef = useRef(0);
    const isVisibleRef = useRef(false);

    const [phase, setPhase] = useState('idle'); // idle | playing | gameover | finished
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [latest, setLatest] = useState(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        try {
            var stored = window.localStorage.getItem(BEST_SCORE_KEY);
            if (stored) setBestScore(parseInt(stored, 10) || 0);
        } catch (e) { /* ignore storage errors */ }
    }, []);

    useEffect(() => {
        Object.keys(LOGO_MAP).forEach((key) => {
            const img = new window.Image();
            img.src = LOGO_MAP[key];
            imagesRef.current[key] = img;
        });
        const pImg = new window.Image();
        pImg.src = playerPhoto;
        playerImageRef.current = pImg;
    }, []);

    const createGameState = useCallback((phase) => ({
        worldX: 0,
        bgX: 0,
        speed: BASE_SPEED,
        playerY: 0,
        velocityY: 0,
        isJumping: false,
        jumpCount: 0,
        obstacles: phase === 'playing' ? [{ worldX: 600, w: OBSTACLE_W, h: OBSTACLE_H }] : [],
        nextObstacleWorldX: 600,
        milestoneIndex: 0,
        nextMilestoneWorldX: FIRST_MILESTONE_WORLD_X,
        banners: [],
        finishWorldX: null,
        finishYearLabel: '',
        phase,
    }), []);

    useEffect(() => {
        gameRef.current = createGameState('idle');
    }, [createGameState]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const jump = useCallback(() => {
        const g = gameRef.current;
        if (!g) return;
        if (g.phase === 'playing' && g.jumpCount < MAX_JUMPS) {
            g.isJumping = true;
            g.velocityY = g.jumpCount === 0 ? JUMP_FORCE : JUMP_FORCE * 0.82;
            g.jumpCount += 1;
        }
    }, []);

    const startGame = useCallback(() => {
        gameRef.current = createGameState('playing');
        setLatest(null);
        setScore(0);
        setConfetti([]);
        setPhase('playing');
    }, [createGameState]);

    const endGame = useCallback((nextPhase, finalScore) => {
        const g = gameRef.current;
        if (g) g.phase = nextPhase;
        setPhase(nextPhase);
        setScore(finalScore);
        if (nextPhase === 'finished') {
            setConfetti(Array.from({ length: 18 }).map((_, i) => ({
                id: i,
                left: 8 + Math.random() * 84,
                delay: Math.random() * 0.35,
                duration: 1.7 + Math.random() * 0.9,
                color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                rotate: Math.random() * 360,
                drift: (Math.random() - 0.5) * 70,
            })));
        }
        setBestScore((prev) => {
            const next = Math.max(prev, finalScore);
            try { window.localStorage.setItem(BEST_SCORE_KEY, String(next)); } catch (e) { /* ignore */ }
            return next;
        });
    }, []);

    // main loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || prefersReducedMotion) return undefined;
        const ctx = canvas.getContext('2d');

        function drawRoundedRect(x, y, w, h, r) {
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x, y, w, h, r);
            } else {
                ctx.rect(x, y, w, h);
            }
        }

        function render() {
            const g = gameRef.current;
            ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

            // sky
            const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
            skyGrad.addColorStop(0, '#0d3f3c');
            skyGrad.addColorStop(1, '#0b2e2c');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, CANVAS_W, GROUND_Y);

            // ground
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
            ctx.strokeStyle = 'rgba(94,234,212,0.45)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, GROUND_Y);
            ctx.lineTo(CANVAS_W, GROUND_Y);
            ctx.stroke();

            if (!g) {
                requestAnimationFrameSafe();
                return;
            }

            // ---- background parallax dots (decorative) ----
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            for (let i = 0; i < 14; i++) {
                const bx = (i * 140 - (g.bgX % 140) + CANVAS_W) % CANVAS_W;
                ctx.beginPath();
                ctx.arc(bx, 30 + (i % 3) * 22, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // ---- milestone banners (background layer, parallax) ----
            g.banners.forEach((b) => {
                const screenX = b.worldX - g.bgX;
                if (screenX < -MILESTONE_BANNER_W || screenX > CANVAS_W + MILESTONE_BANNER_W) return;
                const by = 22;
                ctx.save();
                ctx.globalAlpha = 0.96;
                ctx.fillStyle = 'rgba(255,255,255,0.96)';
                drawRoundedRect(screenX, by, MILESTONE_BANNER_W, MILESTONE_BANNER_H, 14);
                ctx.fill();
                ctx.strokeStyle = 'rgba(20,184,166,0.5)';
                ctx.lineWidth = 1.5;
                drawRoundedRect(screenX, by, MILESTONE_BANNER_W, MILESTONE_BANNER_H, 14);
                ctx.stroke();

                const img = imagesRef.current[b.milestone.logo];
                const logoBoxW = MILESTONE_BANNER_W - 36;
                const logoBoxH = 54;
                const logoBoxX = screenX + 18;
                const logoBoxY = by + 16;
                if (img && img.complete && img.naturalWidth > 0) {
                    const scale = Math.min(logoBoxW / img.naturalWidth, logoBoxH / img.naturalHeight);
                    const drawW = img.naturalWidth * scale;
                    const drawH = img.naturalHeight * scale;
                    ctx.drawImage(
                        img,
                        logoBoxX + (logoBoxW - drawW) / 2,
                        logoBoxY + (logoBoxH - drawH) / 2,
                        drawW,
                        drawH
                    );
                } else {
                    ctx.fillStyle = '#0c4a6e';
                    drawRoundedRect(logoBoxX + logoBoxW / 2 - 20, logoBoxY + (logoBoxH - 40) / 2, 40, 40, 10);
                    ctx.fill();
                }

                const centerX = screenX + MILESTONE_BANNER_W / 2;
                ctx.fillStyle = '#0b0b12';
                ctx.font = 'bold 12px Segoe UI, Arial, sans-serif';
                ctx.textAlign = 'center';
                wrapTextCentered(ctx, b.milestone.org, centerX, by + logoBoxH + 26, MILESTONE_BANNER_W - 24, 15);
                ctx.fillStyle = '#0c4a6e';
                ctx.font = 'bold 12px Segoe UI, Arial, sans-serif';
                ctx.fillText(b.milestone.year, centerX, by + MILESTONE_BANNER_H - 12);
                ctx.restore();
            });

            // ---- finish line ----
            if (g.finishWorldX !== null) {
                const fx = g.finishWorldX - g.worldX;
                if (fx > -40 && fx < CANVAS_W + 40) {
                    for (let i = 0; i < 6; i++) {
                        ctx.fillStyle = i % 2 === 0 ? '#fff' : '#0b0b12';
                        ctx.fillRect(fx, GROUND_Y - (i + 1) * 12, 14, 12);
                    }
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 13px Segoe UI, Arial, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(g.finishYearLabel, fx + 7, GROUND_Y - 90);
                }
            }

            // ---- obstacles (foreground) ----
            ctx.fillStyle = '#f43f5e';
            g.obstacles.forEach((o) => {
                const ox = o.worldX - g.worldX;
                if (ox < -OBSTACLE_W || ox > CANVAS_W + OBSTACLE_W) return;
                const oy = GROUND_Y - o.h;
                drawRoundedRect(ox, oy, o.w, o.h, 8);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(ox + 9, oy + 12, 2.4, 0, Math.PI * 2);
                ctx.arc(ox + o.w - 9, oy + 12, 2.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#f43f5e';
            });

            // ---- player ----
            const px = 90;
            const py = GROUND_Y - 30 - g.playerY;
            const grad = ctx.createLinearGradient(px - 16, py - 16, px + 16, py + 16);
            grad.addColorStop(0, '#0c4a6e');
            grad.addColorStop(1, '#14b8a6');

            const photo = playerImageRef.current;
            if (photo && photo.complete && photo.naturalWidth > 0) {
                ctx.save();
                drawRoundedRect(px - 16, py - 16, 32, 32, 10);
                ctx.clip();
                const s = Math.max(32 / photo.naturalWidth, 32 / photo.naturalHeight);
                const dw = photo.naturalWidth * s;
                const dh = photo.naturalHeight * s;
                ctx.drawImage(photo, px - dw / 2, py - dh / 2, dw, dh);
                ctx.restore();
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                drawRoundedRect(px - 16, py - 16, 32, 32, 10);
                ctx.stroke();
            } else {
                ctx.fillStyle = grad;
                drawRoundedRect(px - 16, py - 16, 32, 32, 10);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 11px Segoe UI, Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('FS', px, py + 4);
            }

            requestAnimationFrameSafe();
        }

        function wrapTextCentered(context, text, cx, y, maxWidth, lineHeight) {
            const words = text.split(' ');
            let line = '';
            let lineY = y;
            let linesDrawn = 0;
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                if (context.measureText(testLine).width > maxWidth && line !== '' && linesDrawn < 1) {
                    context.fillText(line.trim(), cx, lineY);
                    line = words[n] + ' ';
                    lineY += lineHeight;
                    linesDrawn++;
                } else {
                    line = testLine;
                }
            }
            context.fillText(line.trim(), cx, lineY);
        }

        function requestAnimationFrameSafe() {
            rafRef.current = requestAnimationFrame(update);
        }

        function update() {
            const g = gameRef.current;
            if (g && g.phase === 'playing') {
                g.speed = Math.min(MAX_SPEED, BASE_SPEED + g.worldX * SPEED_RAMP);
                g.worldX += g.speed;
                g.bgX += g.speed * 0.45;

                // physics
                if (g.isJumping) {
                    g.playerY += g.velocityY;
                    g.velocityY -= GRAVITY;
                    if (g.playerY <= 0) {
                        g.playerY = 0;
                        g.velocityY = 0;
                        g.isJumping = false;
                        g.jumpCount = 0;
                    }
                }

                // spawn obstacles
                if (g.worldX + CANVAS_W > g.nextObstacleWorldX) {
                    g.obstacles.push({ worldX: g.nextObstacleWorldX, w: OBSTACLE_W, h: OBSTACLE_H });
                    g.nextObstacleWorldX += OBSTACLE_MIN_GAP + Math.random() * (OBSTACLE_MAX_GAP - OBSTACLE_MIN_GAP);
                }
                g.obstacles = g.obstacles.filter((o) => o.worldX - g.worldX > -60);

                // collision — hitbox intentionally a bit smaller than the visual sprite, so
                // near-misses read as fair
                const px = 90, pw = 30;
                const playerBottom = GROUND_Y - g.playerY;
                for (let i = 0; i < g.obstacles.length; i++) {
                    const o = g.obstacles[i];
                    const ox = o.worldX - g.worldX;
                    const oTop = GROUND_Y - o.h;
                    const overlapX = ox < px + pw / 2 - 4 && ox + o.w > px - pw / 2 + 4;
                    const overlapY = playerBottom > oTop + 12;
                    if (overlapX && overlapY) {
                        endGame('gameover', Math.floor(g.worldX / 5));
                        break;
                    }
                }

                // milestones
                if (g.milestoneIndex < milestones.length && g.worldX > g.nextMilestoneWorldX) {
                    const m = milestones[g.milestoneIndex];
                    g.banners.push({ worldX: g.bgX + CANVAS_W + 40, milestone: m });
                    g.milestoneIndex += 1;
                    g.nextMilestoneWorldX += MILESTONE_WORLD_INTERVAL;
                    setLatest(m);
                    if (g.milestoneIndex >= milestones.length) {
                        g.finishWorldX = g.worldX + FINISH_BUFFER;
                        g.finishYearLabel = m.year;
                    }
                }
                g.banners = g.banners.filter((b) => b.worldX - g.bgX > -MILESTONE_BANNER_W - 60);

                // finish line reached
                if (g.finishWorldX !== null && g.worldX >= g.finishWorldX) {
                    endGame('finished', Math.floor(g.worldX / 5));
                }

                // throttled score UI update
                const now = performance.now();
                if (now - lastUiUpdateRef.current > 120) {
                    lastUiUpdateRef.current = now;
                    setScore(Math.floor(g.worldX / 5));
                }
            }
            render();
        }

        rafRef.current = requestAnimationFrame(update);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefersReducedMotion, endGame, milestones]);

    // keyboard controls — only act while the game section is in view, so
    // Space doesn't hijack page scrolling elsewhere on the site
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.code !== 'Space' && e.code !== 'ArrowUp') return;
            if (!isVisibleRef.current) return;
            e.preventDefault();
            if (phase === 'playing') {
                jump();
            } else {
                startGame();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [phase, jump, startGame]);

    const handleStageInteract = () => {
        if (phase === 'idle' || phase === 'gameover' || phase === 'finished') {
            startGame();
        } else {
            jump();
        }
    };

    if (prefersReducedMotion) {
        return (
            <section className="career-game" id="About">
                <div className="game-head">
                    <h2 className="section-title">{t.about.title}</h2>
                    <p className="section-subtitle">{t.game.subtitle}</p>
                </div>
                <MilestoneList t={t} milestones={milestones} />
            </section>
        );
    }

    return (
        <section className="career-game" id="About" ref={sectionRef}>
            <div className="game-head">
                <h2 className="section-title">{t.about.title}</h2>
                <p className="section-subtitle">{t.game.subtitle}</p>
            </div>

            <div className="game-stage">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    className="game-canvas"
                    onClick={handleStageInteract}
                    onTouchStart={(e) => { e.preventDefault(); handleStageInteract(); }}
                />

                {phase === 'idle' && (
                    <div className="game-idle-hint">
                        <span className="game-idle-kbd">{t.game.spaceKey}</span>
                        <p>{t.game.startHint}</p>
                    </div>
                )}

                {phase === 'gameover' && (
                    <div className="game-overlay">
                        <h3>{t.game.gameOver}</h3>
                        <p className="game-hint">{t.game.gameOverHint}</p>
                        <p className="game-score-line">{t.game.score} : {score}</p>
                        <button type="button" className="btn btn-primary" onClick={startGame}>{t.game.restart}</button>
                    </div>
                )}

                {phase === 'finished' && (
                    <div className="game-overlay">
                        {confetti.map((c) => (
                            <span
                                key={c.id}
                                className="confetti-piece"
                                style={{
                                    left: `${c.left}%`,
                                    animationDelay: `${c.delay}s`,
                                    animationDuration: `${c.duration}s`,
                                    backgroundColor: c.color,
                                    '--confetti-drift': `${c.drift}px`,
                                    '--confetti-rotate': `${c.rotate}deg`,
                                }}
                            />
                        ))}
                        <h3>🏁 {t.game.finished}</h3>
                        <p className="game-hint">{t.game.finishedHint}</p>
                        <p className="game-score-line">{t.game.score} : {score}</p>
                        <div className="game-overlay-actions">
                            <button type="button" className="btn btn-primary" onClick={startGame}>{t.game.restart}</button>
                            <a href="#contact" className="btn btn-outline-dark">{t.nav.contact}</a>
                        </div>
                    </div>
                )}

                {phase === 'playing' && (
                    <div className="game-hud">
                        <span>{t.game.score} : {score}</span>
                        <span>{t.game.best} : {bestScore}</span>
                    </div>
                )}
            </div>

            {phase === 'playing' && (
                <button type="button" className="game-jump-btn" onClick={jump}>⤒ {t.game.jumpHint}</button>
            )}

            <div className="game-latest" aria-live="polite">
                {latest ? (
                    <>
                        <span className="game-latest-year">{latest.year} · {t.game[latest.type]}</span>
                        <strong className="game-latest-org">{latest.org}</strong>
                        <span className="game-latest-text">{latest.text}</span>
                    </>
                ) : (
                    <span className="game-latest-empty">{t.game.jumpHint}</span>
                )}
            </div>

            <details className="game-fallback">
                <summary>{t.game.viewList}</summary>
                <MilestoneList t={t} milestones={milestones} />
            </details>
        </section>
    );
};

const MilestoneList = ({ t, milestones }) => (
    <ul className="game-fallback-list">
        {milestones.map((m, i) => (
            <li key={m.org + m.year + i}>
                <span className="gf-year">{m.year} · {t.game[m.type]}</span>
                <strong className="gf-org">{m.org}</strong>
                <span className="gf-text">{m.text}</span>
            </li>
        ))}
    </ul>
);

export default CareerGame;

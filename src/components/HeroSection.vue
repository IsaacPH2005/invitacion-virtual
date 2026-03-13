<template>
    <section class="hero-section">
        <!-- ════════════════════════════
             PORTADA HERO
        ════════════════════════════ -->
        <div class="portada-hero">
            <img :src="portadaUrl" alt="Bautizo" class="portada-img" />
            <div class="portada-overlay"></div>

            <!-- Partículas decorativas -->
            <div class="particulas">
                <span v-for="n in 14" :key="n" class="particula" :style="particulaStyle(n)">✦</span>
            </div>

            <div class="portada-content">
                <div class="portada-cruz" data-aos="zoom-in" data-aos-duration="1000">✝</div>

                <p class="portada-eyebrow" data-aos="fade-down" data-aos-delay="100">
                    Con la Gracia de Dios
                </p>

                <p class="portada-celebramos" data-aos="fade-down" data-aos-delay="200">
                    Celebramos el Bautizo de
                </p>

                <h1 class="portada-nombre" data-aos="zoom-in-up" data-aos-delay="300">
                    {{ nombreBebe }}
                </h1>

                <div class="portada-flores" data-aos="fade-up" data-aos-delay="400">
                    🌸 · 🌸 · 🌸
                </div>

                <div class="portada-pills" data-aos="fade-up" data-aos-delay="500">
                    <span class="pill">
                        <CalendarDays :size="15" class="pill-icon-svg" />
                        {{ fecha }}
                    </span>
                    <span class="pill">
                        <Church :size="15" class="pill-icon-svg" />
                        {{ lugarCorto }}
                    </span>
                    <span class="pill">
                        <Clock :size="15" class="pill-icon-svg" />
                        {{ hora }}
                    </span>
                </div>

                <button
                    class="portada-cta"
                    @click="scrollAbajo"
                    data-aos="fade-up"
                    data-aos-delay="650"
                >
                    <span>Ver Invitación</span>
                    <ChevronDown :size="18" class="cta-arrow-icon" />
                </button>
            </div>

            <div class="scroll-mouse">
                <div class="scroll-dot"></div>
            </div>
        </div>

        <!-- ════════════════════════════
             CARD INVITACIÓN
        ════════════════════════════ -->
        <div ref="cardRef" class="card-wrapper">
            <div class="card-inner">
                <!-- Cruz flotante -->
                <div class="header" data-aos="fade-down">
                    <div class="cross-deco">✝</div>
                    <p class="gracia-texto">Con la Gracia de Dios</p>
                    <div class="header-linea">
                        <span></span><span class="header-flor">🌸</span><span></span>
                    </div>
                </div>

                <!-- Foto bebé -->
                <div class="foto-bebe-wrapper" data-aos="zoom-in" data-aos-delay="100">
                    <span class="paloma paloma-left">🕊️</span>
                    <div class="foto-bebe">
                        <img
                            :src="fotoBebe || 'https://i.pravatar.cc/200?img=47'"
                            :alt="nombreBebe"
                            class="bebe-img"
                        />
                        <div class="foto-ring r1"></div>
                        <div class="foto-ring r2"></div>
                        <div class="foto-ring r3"></div>
                    </div>
                    <span class="paloma paloma-right">🕊️</span>
                </div>

                <!-- Nombre -->
                <div class="titulo-bloque" data-aos="fade-up" data-aos-delay="150">
                    <p class="celebramos">celebramos el Bautizo de</p>
                    <h2 class="nombre">{{ nombreBebe }}</h2>
                    <div class="linea-flores">🌸 · 🌸 · 🌸</div>
                </div>

                <!-- Detalles del evento -->
                <div class="evento-box" data-aos="fade-up" data-aos-delay="200">
                    <div class="evento-item">
                        <div class="evento-icon-wrap">
                            <CalendarDays :size="20" class="ev-icon" />
                        </div>
                        <div>
                            <p class="evento-label">Fecha</p>
                            <p class="evento-valor">{{ fecha }}</p>
                        </div>
                    </div>

                    <div class="evento-sep">·</div>

                    <div class="evento-item">
                        <div class="evento-icon-wrap">
                            <Church :size="20" class="ev-icon" />
                        </div>
                        <div>
                            <p class="evento-label">Lugar</p>
                            <p class="evento-valor">{{ lugarCorto }}</p>
                        </div>
                    </div>

                    <div class="evento-sep">·</div>

                    <div class="evento-item">
                        <div class="evento-icon-wrap">
                            <Clock :size="20" class="ev-icon" />
                        </div>
                        <div>
                            <p class="evento-label">Hora</p>
                            <p class="evento-valor">{{ hora }}</p>
                        </div>
                    </div>
                </div>

                <!-- Padres -->
                <div class="padres-bloque" data-aos="fade-up" data-aos-delay="250">
                    <p class="padres-invitan">Sus padres les invitan a compartir</p>
                    <p class="padres-invitan">este momento de fe y amor</p>

                    <div class="padres-nombres">
                        <div class="padre" data-aos="fade-right" data-aos-delay="300">
                            <div class="foto-padre-ring">
                                <img
                                    :src="fotoPadre || 'https://i.pravatar.cc/80?img=11'"
                                    :alt="nombrePadre"
                                    class="foto-padre-img"
                                />
                            </div>
                            <p class="padre-nombre">{{ nombrePadre }}</p>
                            <p class="padre-rol">
                                <UserRound
                                    :size="11"
                                    style="display: inline; margin-right: 3px"
                                />Papá
                            </p>
                        </div>

                        <div class="corazon-centro" data-aos="zoom-in" data-aos-delay="350">
                            <span class="corazon">💗</span>
                        </div>

                        <div class="padre" data-aos="fade-left" data-aos-delay="300">
                            <div class="foto-padre-ring">
                                <img
                                    :src="fotoMadre || 'https://i.pravatar.cc/80?img=25'"
                                    :alt="nombreMadre"
                                    class="foto-padre-img"
                                />
                            </div>
                            <p class="padre-nombre">{{ nombreMadre }}</p>
                            <p class="padre-rol">
                                <UserRound
                                    :size="11"
                                    style="display: inline; margin-right: 3px"
                                />Mamá
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Botón RSVP -->
                <button
                    class="btn-rsvp"
                    @click="irARSVP"
                    data-aos="zoom-in-up"
                    data-aos-delay="400"
                >
                    <Mail :size="18" class="btn-icon-svg" />
                    <span>Confirmar Asistencia</span>
                    <ArrowRight :size="18" class="btn-flecha-svg" />
                </button>

                <!-- Pie -->
                <div class="pie" data-aos="fade-up" data-aos-delay="450">
                    <Star :size="13" class="pie-star" />
                    <span class="pie-texto">Recepción a continuación del Bautizo</span>
                    <Star :size="13" class="pie-star" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AOS from 'aos';
import {
    CalendarDays,
    Church,
    Clock,
    Mail,
    ArrowRight,
    ChevronDown,
    UserRound,
    Star,
} from 'lucide-vue-next';

const props = defineProps({
    nombreBebe: { type: String, default: 'Sofía Valentina' },
    fecha: { type: String, default: 'Sábado, 15 de Abril de 2025' },
    lugar: { type: String, default: 'Parroquia San José · 11:00 AM' },
    nombrePadre: { type: String, default: 'Carlos Martínez' },
    nombreMadre: { type: String, default: 'Lucía Romero' },
    fotoBebe: { type: String, default: '' },
    fotoPadre: { type: String, default: '' },
    fotoMadre: { type: String, default: '' },
    rsvpSectionId: { type: String, default: 'rsvp-section' },
    portadaUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90',
    },
});

const emit = defineEmits(['ir-a-rsvp']);

const lugarCorto = computed(() => props.lugar.split('·')[0].trim());
const hora = computed(() => {
    const p = props.lugar.split('·');
    return p.length > 1 ? p[1].trim() : '14:45 PM';
});

const cardRef = ref(null);

function scrollAbajo() {
    cardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function irARSVP() {
    emit('ir-a-rsvp');
    const el = document.getElementById(props.rsvpSectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Re-inicializar AOS cuando el componente monta (por si está en SPA)
onMounted(() => {
    AOS.refresh();
});

function particulaStyle(n) {
    const positions = [
        { top: '8%', left: '5%' },
        { top: '15%', right: '8%' },
        { top: '25%', left: '3%' },
        { top: '35%', right: '5%' },
        { top: '55%', left: '6%' },
        { top: '65%', right: '4%' },
        { top: '70%', left: '10%' },
        { top: '80%', right: '9%' },
        { top: '12%', left: '18%' },
        { top: '20%', right: '15%' },
        { top: '45%', left: '2%' },
        { top: '50%', right: '2%' },
        { top: '88%', left: '14%' },
        { top: '92%', right: '12%' },
    ];
    const p = positions[(n - 1) % positions.length];
    const delay = ((n * 0.7) % 3).toFixed(1);
    const size = (0.6 + (n % 3) * 0.22).toFixed(2);
    return { ...p, animationDelay: `${delay}s`, fontSize: `${size}rem`, position: 'absolute' };
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --rosa: #c0607a;
    --rosa-deep: #7a2e48;
    --dorado: #c9974a;
    --texto: #3d2030;
    --texto-soft: #8a6070;
    --borde: rgba(192, 96, 122, 0.25);
    --card-bg: rgba(255, 252, 253, 0.6);
    --blur: blur(18px);
    --shadow: 0 20px 70px rgba(120, 40, 70, 0.18);
    --radius: 28px;
}

.hero-section {
    font-family: 'EB Garamond', serif;
    color: var(--texto);
    position: relative;
}

/* ═══ PORTADA ═══ */
.portada-hero {
    position: relative;
    width: 100%;
    height: 100svh;
    min-height: 580px;
    max-height: 820px;
    overflow: hidden;
}

.portada-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
    display: block;
    animation: kenburns 18s ease-in-out infinite alternate;
}

@keyframes kenburns {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.1) translateX(-1.5%);
    }
}

.portada-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        160deg,
        rgba(55, 12, 32, 0.5) 0%,
        rgba(100, 30, 58, 0.68) 50%,
        rgba(20, 5, 15, 0.86) 100%
    );
}

/* Partículas */
.particulas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}
.particula {
    color: rgba(255, 215, 180, 0.45);
    animation: flotar-particula 4s ease-in-out infinite alternate;
}
@keyframes flotar-particula {
    from {
        transform: translateY(0) rotate(0deg);
        opacity: 0.3;
    }
    to {
        transform: translateY(-14px) rotate(18deg);
        opacity: 0.75;
    }
}

/* Contenido portada */
.portada-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 1.5rem;
    gap: 0.85rem;
}

.portada-cruz {
    font-size: 2.4rem;
    color: rgba(255, 215, 180, 0.92);
    text-shadow: 0 0 28px rgba(255, 180, 130, 0.6);
    animation: flotar 3s ease-in-out infinite;
}

@keyframes flotar {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}

.portada-eyebrow {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 0.95rem;
    color: rgba(255, 215, 190, 0.9);
    letter-spacing: 4px;
    text-transform: uppercase;
}

.portada-celebramos {
    font-size: 1.05rem;
    font-style: italic;
    color: rgba(255, 210, 225, 0.85);
    letter-spacing: 2px;
}

.portada-nombre {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.1rem, 7vw, 4.2rem);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 3px;
    line-height: 1.1;
    text-shadow:
        0 2px 28px rgba(0, 0, 0, 0.75),
        0 0 90px rgba(210, 130, 165, 0.45);
}

.portada-flores {
    color: rgba(255, 200, 215, 0.85);
    font-size: 1rem;
    letter-spacing: 7px;
}

/* Pills */
.portada-pills {
    display: flex;
    gap: 0.65rem;
    flex-wrap: wrap;
    justify-content: center;
}

.pill {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    background: rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.28);
    color: white;
    padding: 0.48rem 1.1rem;
    border-radius: 50px;
    font-family: 'EB Garamond', serif;
    font-size: 0.88rem;
    letter-spacing: 0.5px;
    transition: background 0.2s;
}

.pill:hover {
    background: rgba(255, 255, 255, 0.2);
}

.pill-icon-svg {
    color: rgba(255, 200, 180, 0.9);
    flex-shrink: 0;
}

/* CTA */
.portada-cta {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-top: 0.3rem;
    padding: 0.9rem 2.4rem;
    background: linear-gradient(135deg, rgba(210, 110, 145, 0.9), rgba(140, 40, 75, 0.95));
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 190, 215, 0.35);
    color: white;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 2.5px;
    cursor: pointer;
    box-shadow: 0 6px 30px rgba(140, 40, 75, 0.55);
    transition:
        transform 0.22s,
        box-shadow 0.22s;
}

.portada-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 38px rgba(140, 40, 75, 0.65);
}

.cta-arrow-icon {
    animation: bounce-y 1.6s ease-in-out infinite;
}

@keyframes bounce-y {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(7px);
    }
}

/* Scroll mouse */
.scroll-mouse {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    width: 26px;
    height: 44px;
    border: 2px solid rgba(255, 255, 255, 0.42);
    border-radius: 14px;
    display: flex;
    justify-content: center;
    padding-top: 6px;
}

.scroll-dot {
    width: 5px;
    height: 5px;
    background: white;
    border-radius: 50%;
    animation: scrollDown 2s ease-in-out infinite;
}

@keyframes scrollDown {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    80% {
        transform: translateY(16px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 0;
    }
}

/* ═══ CARD ═══ */
.card-wrapper {
    position: relative;
    z-index: 1;
    padding: 2.5rem 1rem 3.5rem;
    display: flex;
    justify-content: center;
    /* Fondo suave degradado para la sección */
    background: linear-gradient(180deg, #fdf0f4 0%, #fef8fb 100%);
}

.card-inner {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
    padding: 2.8rem 2.4rem 2.4rem;
    background: var(--card-bg);
    backdrop-filter: var(--blur);
    border-radius: var(--radius);
    border: 1px solid rgba(210, 150, 175, 0.3);
    box-shadow:
        var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

/* Header */
.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    width: 100%;
}

.cross-deco {
    font-size: 2.2rem;
    color: var(--dorado);
    text-shadow: 0 1px 10px rgba(200, 150, 70, 0.45);
    animation: flotar 3s ease-in-out infinite;
}

.gracia-texto {
    font-family: 'Cinzel', serif;
    font-size: 0.68rem;
    letter-spacing: 4.5px;
    text-transform: uppercase;
    color: var(--dorado);
}

.header-linea {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
    margin-top: 0.3rem;
}

.header-linea span:first-child,
.header-linea span:last-child {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--borde), transparent);
}

.header-flor {
    font-size: 0.85rem;
}

/* Foto bebé */
.foto-bebe-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2.8rem;
}

.paloma {
    font-size: 1.75rem;
    position: absolute;
    animation: flotar 2.8s ease-in-out infinite;
}

.paloma-left {
    left: 0;
    animation-delay: 0.5s;
}
.paloma-right {
    right: 0;
    animation-delay: 1s;
    transform: scaleX(-1);
    display: inline-block;
}

.foto-bebe {
    position: relative;
    width: 152px;
    height: 152px;
    flex-shrink: 0;
}

.bebe-img {
    width: 136px;
    height: 136px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    top: 8px;
    left: 8px;
    border: 4px solid white;
    box-shadow: 0 8px 28px rgba(200, 100, 130, 0.45);
}

.foto-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    animation: pulse-ring 2.5s ease-out infinite;
}

.r1 {
    border: 2px solid rgba(220, 140, 170, 0.65);
}
.r2 {
    border: 1.5px solid rgba(220, 140, 170, 0.4);
    animation-delay: 0.85s;
}
.r3 {
    border: 1px solid rgba(220, 140, 170, 0.2);
    animation-delay: 1.7s;
}

@keyframes pulse-ring {
    0% {
        transform: scale(0.93);
        opacity: 1;
    }
    100% {
        transform: scale(1.24);
        opacity: 0;
    }
}

/* Título */
.titulo-bloque {
    text-align: center;
}

.celebramos {
    font-size: 0.92rem;
    color: var(--texto-soft);
    font-style: italic;
    letter-spacing: 1.5px;
    margin-bottom: 0.25rem;
}

.nombre {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 5vw, 2.8rem);
    font-weight: 700;
    color: var(--rosa-deep);
    letter-spacing: 2px;
    line-height: 1.1;
    text-shadow: 1px 2px 0 rgba(255, 255, 255, 0.85);
}

.linea-flores {
    margin-top: 0.5rem;
    color: var(--rosa);
    font-size: 0.9rem;
    letter-spacing: 5px;
}

/* Evento box */
.evento-box {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 0.9rem;
    background: rgba(255, 255, 255, 0.65);
    border-radius: 20px;
    padding: 1.2rem 1.4rem;
    width: 100%;
    border: 1px solid rgba(220, 170, 190, 0.45);
    box-shadow: 0 4px 20px rgba(210, 130, 160, 0.1);
    flex-wrap: wrap;
}

.evento-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    text-align: left;
}

.evento-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.12), rgba(201, 151, 74, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.ev-icon {
    color: var(--rosa-deep);
}

.evento-label {
    font-family: 'Cinzel', serif;
    font-size: 0.54rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--dorado);
    margin-bottom: 2px;
}

.evento-valor {
    font-size: 0.84rem;
    color: var(--texto);
    font-weight: 600;
}

.evento-sep {
    color: rgba(200, 140, 160, 0.5);
    font-size: 1.5rem;
    align-self: center;
}

/* Padres */
.padres-bloque {
    text-align: center;
    width: 100%;
}

.padres-invitan {
    font-size: 0.88rem;
    color: var(--texto-soft);
    font-style: italic;
    line-height: 1.7;
}

.padres-nombres {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.8rem;
    margin-top: 1.2rem;
}

.padre {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.38rem;
}

.foto-padre-ring {
    width: 74px;
    height: 74px;
    border-radius: 50%;
    border: 3px solid rgba(210, 140, 165, 0.6);
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(200, 100, 130, 0.3);
    transition:
        transform 0.25s,
        box-shadow 0.25s;
}

.foto-padre-ring:hover {
    transform: scale(1.07);
    box-shadow: 0 10px 26px rgba(200, 100, 130, 0.42);
}

.foto-padre-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.padre-nombre {
    font-family: 'Cinzel', serif;
    font-size: 0.82rem;
    color: var(--rosa-deep);
    font-weight: 600;
}

.padre-rol {
    font-size: 0.7rem;
    color: var(--dorado);
    font-style: italic;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
    gap: 2px;
}

.corazon-centro {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
}

.corazon {
    font-size: 1.85rem;
    animation: latir 1.3s ease-in-out infinite;
}

@keyframes latir {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.25);
    }
}

/* Botón RSVP */
.btn-rsvp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.15rem 2rem;
    background: linear-gradient(135deg, #3d1a28 0%, #6e2a45 50%, #9a3d58 100%);
    color: white;
    border: none;
    border-radius: 18px;
    font-family: 'Cinzel', serif;
    font-size: 0.93rem;
    font-weight: 600;
    letter-spacing: 2.5px;
    cursor: pointer;
    box-shadow:
        0 8px 30px rgba(80, 20, 45, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
    position: relative;
    overflow: hidden;
    transition:
        transform 0.22s,
        box-shadow 0.22s;
}

/* Shimmer effect */
.btn-rsvp::after {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
    transform: skewX(-20deg);
    animation: shimmer 3.5s ease-in-out infinite;
}

@keyframes shimmer {
    0% {
        left: -75%;
    }
    100% {
        left: 125%;
    }
}

.btn-rsvp:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 40px rgba(80, 20, 45, 0.58);
}

.btn-rsvp:active {
    transform: scale(0.98);
}

.btn-icon-svg {
    flex-shrink: 0;
}

.btn-flecha-svg {
    margin-left: auto;
    transition: transform 0.28s;
    flex-shrink: 0;
}

.btn-rsvp:hover .btn-flecha-svg {
    transform: translateX(5px);
}

/* Pie */
.pie {
    display: flex;
    align-items: center;
    gap: 0.7rem;
}

.pie-star {
    color: var(--dorado);
    flex-shrink: 0;
}

.pie-texto {
    font-family: 'EB Garamond', serif;
    font-size: 0.82rem;
    font-style: italic;
    color: var(--texto-soft);
    letter-spacing: 1px;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 480px) {
    .portada-hero {
        max-height: 680px;
    }

    .card-wrapper {
        padding: 1.8rem 0.75rem 2.8rem;
    }
    .card-inner {
        padding: 2rem 1.3rem;
        gap: 1.3rem;
    }

    .nombre {
        font-size: 1.75rem;
    }

    .evento-box {
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
    }
    .evento-sep {
        display: none;
    }

    .padres-nombres {
        gap: 1rem;
    }

    .paloma-left {
        left: 0;
    }
    .paloma-right {
        right: 0;
    }

    .foto-bebe-wrapper {
        padding: 0 2.2rem;
    }

    .btn-rsvp {
        font-size: 0.8rem;
        letter-spacing: 1.5px;
        padding: 1rem 1.4rem;
    }

    .pill {
        font-size: 0.8rem;
        padding: 0.42rem 0.85rem;
    }
}

@media (max-width: 360px) {
    .portada-nombre {
        font-size: 1.9rem;
    }
    .nombre {
        font-size: 1.55rem;
    }
    .portada-pills {
        gap: 0.45rem;
    }
    .pill {
        font-size: 0.74rem;
        padding: 0.38rem 0.7rem;
    }
}
</style>

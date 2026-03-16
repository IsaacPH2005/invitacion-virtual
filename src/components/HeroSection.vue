<template>
    <section class="hero-section">
        <!-- PORTADA HERO -->
        <div class="portada-hero">
            <img :src="portadaUrl" alt="Bautizo" class="portada-img" />
            <div class="portada-overlay"></div>
            <div class="particulas">
                <span v-for="n in 14" :key="n" class="particula" :style="particulaStyle(n)">✦</span>
            </div>
            <div class="portada-content">
                <div class="eyebrow-wrap" data-aos="fade-down" data-aos-delay="80">
                    <span class="eyebrow-line"></span>
                    <p class="portada-eyebrow">Con la Gracia de Dios</p>
                    <span class="eyebrow-line"></span>
                </div>
                <p class="portada-celebramos" data-aos="fade-down" data-aos-delay="200">
                    Celebramos el Bautizo de
                </p>
                <h1 class="portada-nombre" data-aos="zoom-in-up" data-aos-delay="300">
                    {{ nombreBebe }}
                </h1>
                <div class="portada-pills" data-aos="fade-up" data-aos-delay="500">
                    <span class="pill">
                        <CalendarDays :size="14" class="pill-icon-svg" />
                        {{ fecha }}
                    </span>
                    <span class="pill">
                        <Church :size="14" class="pill-icon-svg" />
                        {{ lugarCorto }}
                    </span>
                    <span class="pill">
                        <Clock :size="14" class="pill-icon-svg" />
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
            <div class="scroll-indicator" @click="scrollAbajo">
                <div class="scroll-track"><div class="scroll-dot"></div></div>
                <span class="scroll-label">Desliza</span>
            </div>
        </div>

        <!-- CARD INVITACIÓN -->
        <div ref="cardRef" class="card-wrapper">
            <div class="card-inner">
                <!-- Header -->
                <div class="header" data-aos="fade-down">
                    <div class="cross-wrap">
                        <div class="cross-halo"></div>
                        <Cross :size="30" class="cross-icon" />
                        <div class="cross-glow"></div>
                    </div>
                    <p class="gracia-texto">Con la Gracia de Dios</p>
                    <div class="header-linea">
                        <span class="header-linea-trazo"></span>
                        <Flower2 :size="14" class="header-flor-icon" />
                        <span class="header-linea-trazo"></span>
                    </div>
                </div>

                <!-- FOTO BEBÉ -->
                <div class="foto-bebe-wrapper" data-aos="zoom-in" data-aos-delay="100">
                    <div class="paloma paloma-left">
                        <Bird :size="30" class="bird-icon bird-left" />
                    </div>
                    <div class="hex-container">
                        <div class="hex-glow"></div>
                        <div class="hex-frame">
                            <div class="hex-inner">
                                <img
                                    :src="fotoBebe || '/bautizada/keyla1.png'"
                                    :alt="nombreBebe"
                                    class="bebe-img"
                                />
                            </div>
                        </div>
                        <div class="orbit">
                            <Star
                                v-for="s in 6"
                                :key="s"
                                :size="10"
                                class="orbit-star"
                                :style="orbitStyle(s)"
                                fill="currentColor"
                            />
                        </div>
                        <div class="hex-badge">
                            <Droplets :size="11" />
                            Bautizo
                        </div>
                    </div>
                    <div class="paloma paloma-right">
                        <Bird :size="30" class="bird-icon bird-right" />
                    </div>
                </div>

                <!-- Nombre -->
                <div class="titulo-bloque" data-aos="fade-up" data-aos-delay="150">
                    <p class="celebramos">celebramos el Bautizo de</p>
                    <h2 class="nombre">{{ nombreBebe }}</h2>
                    <div class="linea-flores">
                        <Flower :size="13" class="flor-icon" fill="currentColor" />
                        <span class="linea-flores-sep">·</span>
                        <Flower :size="13" class="flor-icon" fill="currentColor" />
                        <span class="linea-flores-sep">·</span>
                        <Flower :size="13" class="flor-icon" fill="currentColor" />
                    </div>
                </div>

                <!-- Detalles evento -->
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
                    <div class="evento-sep-line"></div>
                    <div class="evento-item">
                        <div class="evento-icon-wrap"><Church :size="20" class="ev-icon" /></div>
                        <div>
                            <p class="evento-label">Lugar</p>
                            <p class="evento-valor">{{ lugarCorto }}</p>
                        </div>
                    </div>
                    <div class="evento-sep-line"></div>
                    <div class="evento-item">
                        <div class="evento-icon-wrap"><Clock :size="20" class="ev-icon" /></div>
                        <div>
                            <p class="evento-label">Hora</p>
                            <p class="evento-valor">{{ hora }}</p>
                        </div>
                    </div>
                </div>

                <!-- PADRES -->
                <div class="padres-bloque" data-aos="fade-up" data-aos-delay="250">
                    <p class="padres-invitan">Sus padres les invitan a compartir</p>
                    <p class="padres-invitan">este momento de fe y amor</p>
                    <div class="padres-nombres">
                        <div class="padre-card" data-aos="fade-right" data-aos-delay="300">
                            <div class="padre-card-bg"></div>
                            <div class="padre-foto-wrap">
                                <div class="padre-foto-ring">
                                    <img
                                        :src="fotoPadre || '/papas/papa.jpeg'"
                                        :alt="nombrePadre"
                                        class="foto-padre-img"
                                    />
                                </div>
                                <div class="padre-rol-badge padre-badge-azul">
                                    <UserRound :size="9" /> Papa
                                </div>
                            </div>
                            <p class="padre-nombre">{{ nombrePadre }}</p>
                            <div class="padre-linea"></div>
                        </div>
                        <div class="corazon-centro" data-aos="zoom-in" data-aos-delay="350">
                            <div class="corazon-wrap">
                                <Heart :size="34" class="corazon-icon" fill="currentColor" />
                                <div class="corazon-ring cr1"></div>
                                <div class="corazon-ring cr2"></div>
                            </div>
                        </div>
                        <div class="padre-card" data-aos="fade-left" data-aos-delay="300">
                            <div class="padre-card-bg"></div>
                            <div class="padre-foto-wrap">
                                <div class="padre-foto-ring">
                                    <img
                                        :src="fotoMadre || '/papas/mama.jpeg'"
                                        :alt="nombreMadre"
                                        class="foto-padre-img"
                                    />
                                </div>
                                <div class="padre-rol-badge padre-badge-rosa">
                                    <UserRound :size="9" /> Mama
                                </div>
                            </div>
                            <p class="padre-nombre">{{ nombreMadre }}</p>
                            <div class="padre-linea"></div>
                        </div>
                    </div>
                </div>

                <!-- ══════════════════════════════
                     PADRINOS DE BAUTIZO
                ══════════════════════════════ -->
                <div class="padrinos-bloque" data-aos="fade-up" data-aos-delay="320">
                    <div class="padrinos-header">
                        <div class="padrinos-ornamento">
                            <span class="padr-linea"></span>
                            <div class="padrinos-icon-wrap bautizo-color">
                                <Droplets :size="16" class="padrinos-icon-svg" />
                            </div>
                            <span class="padr-linea"></span>
                        </div>
                        <h3 class="padrinos-titulo">Padrinos de Bautizo</h3>
                    </div>
                    <div class="padrinos-grid">
                        <div
                            class="padrino-card bautizo-card"
                            data-aos="fade-up"
                            data-aos-delay="360"
                        >
                            <div class="padrino-avatar bautizo-avatar">
                                <UserRound :size="28" class="padrino-avatar-icon" />
                            </div>
                            <div class="padrino-info">
                                <p class="padrino-nombre">Juan Pablo Luna Huallpa</p>
                                <span class="padrino-rol bautizo-rol">
                                    <Droplets :size="10" /> Padrino de Bautizo
                                </span>
                            </div>
                        </div>
                        <div
                            class="padrino-card bautizo-card"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <div class="padrino-avatar bautizo-avatar">
                                <UserRound :size="28" class="padrino-avatar-icon" />
                            </div>
                            <div class="padrino-info">
                                <p class="padrino-nombre">Víctor Hugo Luna Huallpa</p>
                                <span class="padrino-rol bautizo-rol">
                                    <Droplets :size="10" /> Padrino de Bautizo
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ══════════════════════════════
                     PADRINOS DE CORTE DE PELO
                ══════════════════════════════ -->
                <div class="padrinos-bloque" data-aos="fade-up" data-aos-delay="420">
                    <div class="padrinos-header">
                        <div class="padrinos-ornamento">
                            <span class="padr-linea"></span>
                            <div class="padrinos-icon-wrap corte-color">
                                <Scissors :size="16" class="padrinos-icon-svg" />
                            </div>
                            <span class="padr-linea"></span>
                        </div>
                        <h3 class="padrinos-titulo">Padrinos de Corte de Pelo</h3>
                    </div>
                    <div class="padrinos-grid">
                        <div
                            class="padrino-card corte-card"
                            data-aos="fade-up"
                            data-aos-delay="460"
                        >
                            <div class="padrino-avatar corte-avatar">
                                <UserRound :size="28" class="padrino-avatar-icon" />
                            </div>
                            <div class="padrino-info">
                                <p class="padrino-nombre">Patricia Sara Huallpa Quispe</p>
                                <span class="padrino-rol corte-rol">
                                    <Scissors :size="10" /> Madrina de Corte
                                </span>
                            </div>
                        </div>
                        <div
                            class="padrino-card corte-card"
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            <div class="padrino-avatar corte-avatar">
                                <UserRound :size="28" class="padrino-avatar-icon" />
                            </div>
                            <div class="padrino-info">
                                <p class="padrino-nombre">Pablo Huallpa Carvajal</p>
                                <span class="padrino-rol corte-rol">
                                    <Scissors :size="10" /> Padrino de Corte
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Separador bíblico -->
                <div class="cita-mini" data-aos="fade-up" data-aos-delay="530">
                    <BookOpen :size="15" class="cita-mini-icon" />
                    <p class="cita-mini-texto">"Dejen que los niños vengan a mí" — Mt 19:14</p>
                </div>

                <!-- Botón RSVP -->
                <button
                    class="btn-rsvp"
                    @click="irARSVP"
                    data-aos="zoom-in-up"
                    data-aos-delay="560"
                >
                    <Mail :size="18" class="btn-icon-svg" />
                    <span>Confirmar Asistencia</span>
                    <ArrowRight :size="18" class="btn-flecha-svg" />
                </button>

                <!-- Pie -->
                <div class="pie" data-aos="fade-up" data-aos-delay="600">
                    <Sparkles :size="13" class="pie-star" />
                    <span class="pie-texto">Recepción a continuación del Bautizo</span>
                    <Sparkles :size="13" class="pie-star" />
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
    Heart,
    Bird,
    Cross,
    Flower,
    Flower2,
    Droplets,
    Sparkles,
    BookOpen,
    Scissors,
} from 'lucide-vue-next';

const props = defineProps({
    nombreBebe: { type: String, default: 'Keila Tamara' },
    fecha: { type: String, default: 'Sábado, 15 de Abril de 2025' },
    lugar: { type: String, default: 'Iglesia Santa Ana de Cala Cala · 2:45 PM' },
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
    return p.length > 1 ? p[1].trim() : '2:45 PM';
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

onMounted(() => AOS.refresh());

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
    return {
        ...p,
        animationDelay: `${((n * 0.7) % 3).toFixed(1)}s`,
        fontSize: `${(0.6 + (n % 3) * 0.22).toFixed(2)}rem`,
        position: 'absolute',
    };
}

function orbitStyle(i) {
    const angle = (i - 1) * 60;
    const radius = 72;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return {
        position: 'absolute',
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        animationDelay: `${(i - 1) * 0.25}s`,
    };
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

.hero-section {
    font-family: 'EB Garamond', serif;
    color: #3d2030;
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
        rgba(55, 12, 32, 0.52) 0%,
        rgba(100, 30, 58, 0.7) 50%,
        rgba(20, 5, 15, 0.88) 100%
    );
}
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
.eyebrow-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.eyebrow-line {
    width: 35px;
    height: 1px;
    background: rgba(255, 215, 180, 0.5);
    flex-shrink: 0;
}
.portada-eyebrow {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 0.88rem;
    color: rgba(255, 215, 190, 0.9);
    letter-spacing: 4px;
    text-transform: uppercase;
    white-space: nowrap;
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
    color: #fff;
    letter-spacing: 3px;
    line-height: 1.1;
    text-shadow:
        0 2px 28px rgba(0, 0, 0, 0.75),
        0 0 90px rgba(210, 130, 165, 0.45);
}
.portada-pills {
    display: flex;
    gap: 0.55rem;
    flex-wrap: wrap;
    justify-content: center;
}
.pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.28);
    color: white;
    padding: 0.45rem 0.95rem;
    border-radius: 50px;
    font-family: 'EB Garamond', serif;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    transition: background 0.2s;
    min-height: 40px;
}
.pill:hover {
    background: rgba(255, 255, 255, 0.22);
}
.pill-icon-svg {
    color: rgba(255, 200, 180, 0.9);
    flex-shrink: 0;
}
.portada-cta {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-top: 0.3rem;
    padding: 0.95rem 2.5rem;
    background: linear-gradient(135deg, rgba(210, 110, 145, 0.9), rgba(140, 40, 75, 0.95));
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 190, 215, 0.35);
    color: white;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.83rem;
    font-weight: 600;
    letter-spacing: 2.5px;
    cursor: pointer;
    box-shadow: 0 6px 30px rgba(140, 40, 75, 0.55);
    transition:
        transform 0.22s,
        box-shadow 0.22s;
    min-height: 52px;
    -webkit-tap-highlight-color: transparent;
}
.portada-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 42px rgba(140, 40, 75, 0.68);
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
.scroll-indicator {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    animation: fade-in-scroll 1s ease 1.8s both;
    -webkit-tap-highlight-color: transparent;
}
@keyframes fade-in-scroll {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}
.scroll-track {
    width: 26px;
    height: 42px;
    border: 2px solid rgba(255, 255, 255, 0.55);
    border-radius: 13px;
    display: flex;
    justify-content: center;
    padding-top: 6px;
    backdrop-filter: blur(6px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
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
.scroll-label {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.65);
}

/* ═══ CARD WRAPPER ═══ */
.card-wrapper {
    position: relative;
    z-index: 1;
    padding: 3rem 1rem 4rem;
    display: flex;
    justify-content: center;
    background: linear-gradient(180deg, #fceef4 0%, #fdf5f9 40%, #fef8fb 100%);
}
.card-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse 60% 40% at 20% 30%, rgba(192, 96, 122, 0.07) 0%, transparent 70%),
        radial-gradient(ellipse 50% 35% at 80% 70%, rgba(201, 151, 74, 0.06) 0%, transparent 70%);
    pointer-events: none;
}
.card-inner {
    position: relative;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.7rem;
    padding: 3rem 2.6rem 2.6rem;
    background: rgba(255, 252, 253, 0.72);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 32px;
    border: 1px solid rgba(230, 180, 200, 0.4);
    box-shadow:
        0 24px 80px rgba(120, 40, 70, 0.16),
        0 4px 20px rgba(120, 40, 70, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.82),
        inset 0 -1px 0 rgba(192, 96, 122, 0.06);
}
.card-inner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent,
        #c9974a 30%,
        #e8c47a 50%,
        #c9974a 70%,
        transparent
    );
    border-radius: 0 0 2px 2px;
}

/* ═══ HEADER ═══ */
.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    width: 100%;
}
.cross-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
}
.cross-halo {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201, 151, 74, 0.18) 0%, transparent 70%);
    border: 1px solid rgba(201, 151, 74, 0.2);
    animation: glow-pulse 3s ease-in-out infinite;
}
.cross-icon {
    color: #c9974a;
    filter: drop-shadow(0 2px 10px rgba(200, 150, 70, 0.6));
    animation: flotar 3s ease-in-out infinite;
    position: relative;
    z-index: 1;
}
.cross-glow {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201, 151, 74, 0.25) 0%, transparent 70%);
    animation: glow-pulse 2.5s ease-in-out infinite;
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
@keyframes glow-pulse {
    0%,
    100% {
        transform: scale(0.9);
        opacity: 0.6;
    }
    50% {
        transform: scale(1.35);
        opacity: 1;
    }
}
.gracia-texto {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #c9974a;
}
.header-linea {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
    margin-top: 0.3rem;
}
.header-linea-trazo {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(192, 96, 122, 0.3), transparent);
}
.header-flor-icon {
    color: #c0607a;
    flex-shrink: 0;
}

/* ═══ FOTO BEBÉ ═══ */
.foto-bebe-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3rem;
    width: 100%;
}
.paloma {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}
.paloma-left {
    left: 0;
}
.paloma-right {
    right: 0;
}
.bird-icon {
    color: rgba(201, 151, 74, 0.85);
    filter: drop-shadow(0 2px 6px rgba(200, 150, 70, 0.3));
    animation: bird-float 3s ease-in-out infinite;
}
.bird-left {
    animation-delay: 0.5s;
}
.bird-right {
    animation-name: bird-float-right;
    animation-delay: 1s;
}
@keyframes bird-float {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}
@keyframes bird-float-right {
    0%,
    100% {
        transform: scaleX(-1) translateY(0);
    }
    50% {
        transform: scaleX(-1) translateY(-8px);
    }
}
.hex-container {
    position: relative;
    width: 185px;
    height: 185px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.hex-glow {
    position: absolute;
    width: 210px;
    height: 210px;
    background: radial-gradient(
        circle,
        rgba(201, 151, 74, 0.45) 0%,
        rgba(192, 96, 122, 0.22) 50%,
        transparent 70%
    );
    border-radius: 50%;
    animation: glow-pulse 2.5s ease-in-out infinite;
}
.hex-frame {
    position: relative;
    z-index: 2;
    width: 162px;
    height: 162px;
    clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
    background: linear-gradient(135deg, #c9974a, #f0d890, #c9974a);
    padding: 4px;
    filter: drop-shadow(0 10px 28px rgba(180, 120, 40, 0.6));
    transition: transform 0.35s;
}
.hex-frame:hover {
    transform: scale(1.06) rotate(3deg);
}
.hex-inner {
    width: 100%;
    height: 100%;
    clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
    overflow: hidden;
    background: #fff;
}
.bebe-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
}
.hex-frame:hover .bebe-img {
    transform: scale(1.09);
}
.orbit {
    position: absolute;
    inset: 0;
    animation: orbit-spin 14s linear infinite;
    pointer-events: none;
}
@keyframes orbit-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.orbit-star {
    color: #c9974a;
    opacity: 0.85;
    animation: star-twinkle 1.5s ease-in-out infinite alternate;
}
@keyframes star-twinkle {
    from {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.25);
    }
}
.hex-badge {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #7a2e48, #c0607a);
    color: white;
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 1.5px;
    padding: 0.3rem 0.9rem;
    border-radius: 20px;
    white-space: nowrap;
    z-index: 3;
    box-shadow: 0 4px 16px rgba(120, 40, 70, 0.45);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    display: flex;
    align-items: center;
    gap: 4px;
}

/* ═══ TÍTULO ═══ */
.titulo-bloque {
    text-align: center;
}
.celebramos {
    font-size: 0.93rem;
    color: #8a6070;
    font-style: italic;
    letter-spacing: 1.5px;
    margin-bottom: 0.28rem;
}
.nombre {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.75rem, 5vw, 2.9rem);
    font-weight: 700;
    color: #7a2e48;
    letter-spacing: 2px;
    line-height: 1.1;
    text-shadow: 1px 2px 0 rgba(255, 255, 255, 0.9);
}
.linea-flores {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.65rem;
}
.flor-icon {
    color: #c0607a;
}
.linea-flores-sep {
    color: #c0607a;
    font-size: 0.8rem;
    opacity: 0.45;
}

/* ═══ EVENTO BOX ═══ */
.evento-box {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    background: rgba(255, 255, 255, 0.72);
    border-radius: 22px;
    border: 1px solid rgba(220, 170, 190, 0.5);
    box-shadow:
        0 4px 24px rgba(210, 130, 160, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    overflow: hidden;
}
.evento-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    text-align: center;
    padding: 1.2rem 0.5rem;
    transition: background 0.2s;
}
.evento-item:hover {
    background: rgba(255, 240, 248, 0.6);
}
.evento-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 13px;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.13), rgba(201, 151, 74, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.ev-icon {
    color: #7a2e48;
}
.evento-label {
    font-family: 'Cinzel', serif;
    font-size: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #c9974a;
    margin-bottom: 1px;
}
.evento-valor {
    font-size: 0.82rem;
    color: #3d2030;
    font-weight: 600;
    line-height: 1.3;
}
.evento-sep-line {
    width: 1px;
    align-self: stretch;
    background: linear-gradient(to bottom, transparent, rgba(210, 150, 170, 0.45), transparent);
    flex-shrink: 0;
}

/* ═══ PADRES ═══ */
.padres-bloque {
    text-align: center;
    width: 100%;
}
.padres-invitan {
    font-size: 0.9rem;
    color: #8a6070;
    font-style: italic;
    line-height: 1.75;
}
.padres-nombres {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
}
.padre-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.3rem 1rem 1rem;
    border-radius: 22px;
    border: 1px solid rgba(210, 150, 175, 0.38);
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(14px);
    box-shadow:
        0 8px 30px rgba(180, 80, 120, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    min-width: 112px;
    transition:
        transform 0.3s,
        box-shadow 0.3s;
    overflow: hidden;
}
.padre-card:hover {
    transform: translateY(-7px) scale(1.03);
    box-shadow:
        0 18px 44px rgba(180, 80, 120, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
.padre-card-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(
        160deg,
        rgba(255, 240, 248, 0.75) 0%,
        rgba(255, 255, 255, 0.2) 100%
    );
}
.padre-foto-wrap {
    position: relative;
    z-index: 1;
}
.padre-foto-ring {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(135deg, #c9974a, #f0d890, #c0607a);
    box-shadow: 0 6px 22px rgba(200, 100, 130, 0.4);
    transition: transform 0.3s;
}
.padre-card:hover .padre-foto-ring {
    transform: rotate(8deg) scale(1.06);
}
.foto-padre-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2.5px solid white;
    display: block;
}
.padre-rol-badge {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 0.2rem 0.65rem;
    border-radius: 20px;
    font-family: 'Cinzel', serif;
    font-size: 0.55rem;
    font-weight: 600;
    letter-spacing: 1px;
    white-space: nowrap;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    color: white;
    z-index: 2;
}
.padre-badge-azul {
    background: linear-gradient(135deg, #3a6ea8, #5b9bd5);
    box-shadow: 0 3px 10px rgba(58, 110, 168, 0.4);
}
.padre-badge-rosa {
    background: linear-gradient(135deg, #c0607a, #e0849a);
    box-shadow: 0 3px 10px rgba(192, 96, 122, 0.4);
}
.padre-nombre {
    position: relative;
    z-index: 1;
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    color: #7a2e48;
    font-weight: 600;
    margin-top: 0.55rem;
    text-align: center;
    line-height: 1.3;
}
.padre-linea {
    position: relative;
    z-index: 1;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #c9974a, transparent);
    border-radius: 2px;
}
.corazon-centro {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
}
.corazon-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.corazon-icon {
    color: #e05080;
    animation: latir 1.3s ease-in-out infinite;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 3px 12px rgba(220, 80, 120, 0.5));
}
@keyframes latir {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.28);
    }
}
.corazon-ring {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(220, 100, 140, 0.35);
    animation: corazon-pulse 2s ease-out infinite;
}
.cr1 {
    width: 52px;
    height: 52px;
}
.cr2 {
    width: 74px;
    height: 74px;
    animation-delay: 0.5s;
}
@keyframes corazon-pulse {
    0% {
        transform: scale(0.8);
        opacity: 1;
    }
    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}

/* ═══ PADRINOS ═══ */
.padrinos-bloque {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}
.padrinos-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.38rem;
}
.padrinos-ornamento {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    width: 100%;
}
.padr-linea {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(192, 96, 122, 0.25), transparent);
}
.padrinos-icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.bautizo-color {
    background: linear-gradient(135deg, rgba(58, 110, 168, 0.18), rgba(91, 155, 213, 0.14));
    border: 1px solid rgba(58, 110, 168, 0.3);
}
.corte-color {
    background: linear-gradient(135deg, rgba(201, 151, 74, 0.18), rgba(240, 216, 144, 0.14));
    border: 1px solid rgba(201, 151, 74, 0.3);
}
.padrinos-icon-svg {
    color: #7a2e48;
}
.padrinos-titulo {
    font-family: 'Cinzel', serif;
    font-size: 0.78rem;
    font-weight: 700;
    color: #7a2e48;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    text-align: center;
}
.padrinos-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.7rem;
    width: 100%;
}
.padrino-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-radius: 16px;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    box-shadow:
        0 4px 18px rgba(120, 40, 70, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.85);
    transition:
        transform 0.25s,
        box-shadow 0.25s;
}
.padrino-card:hover {
    transform: translateY(-3px);
    box-shadow:
        0 10px 28px rgba(120, 40, 70, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.85);
}
.bautizo-card {
    border-color: rgba(58, 110, 168, 0.22);
}
.corte-card {
    border-color: rgba(201, 151, 74, 0.28);
}
.padrino-avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.bautizo-avatar {
    background: linear-gradient(135deg, rgba(58, 110, 168, 0.18), rgba(91, 155, 213, 0.12));
    border: 1.5px solid rgba(58, 110, 168, 0.3);
}
.corte-avatar {
    background: linear-gradient(135deg, rgba(201, 151, 74, 0.18), rgba(240, 216, 144, 0.12));
    border: 1.5px solid rgba(201, 151, 74, 0.3);
}
.padrino-avatar-icon {
    color: #7a2e48;
    opacity: 0.7;
}
.padrino-info {
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    min-width: 0;
}
.padrino-nombre {
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    font-weight: 600;
    color: #3d2030;
    line-height: 1.3;
    word-break: break-word;
}
.padrino-rol {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-family: 'EB Garamond', serif;
    font-size: 0.72rem;
    font-style: italic;
    border-radius: 20px;
    padding: 0.15rem 0.55rem;
    white-space: nowrap;
}
.bautizo-rol {
    color: #3a6ea8;
    background: rgba(58, 110, 168, 0.1);
}
.corte-rol {
    color: #9a7020;
    background: rgba(201, 151, 74, 0.12);
}

/* ═══ CITA MINI ═══ */
.cita-mini {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 0.85rem 1.4rem;
    background: linear-gradient(135deg, rgba(255, 245, 238, 0.9), rgba(255, 238, 226, 0.7));
    border: 1px solid rgba(201, 151, 74, 0.28);
    border-radius: 50px;
    width: 100%;
}
.cita-mini-icon {
    color: #c9974a;
    flex-shrink: 0;
    opacity: 0.8;
}
.cita-mini-texto {
    font-family: 'EB Garamond', serif;
    font-size: 0.9rem;
    font-style: italic;
    color: #8a6070;
    letter-spacing: 0.5px;
    text-align: center;
}

/* ═══ BTN RSVP ═══ */
.btn-rsvp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.2rem 2rem;
    background: linear-gradient(135deg, #3d1a28 0%, #6e2a45 50%, #9a3d58 100%);
    color: white;
    border: none;
    border-radius: 18px;
    font-family: 'Cinzel', serif;
    font-size: 0.94rem;
    font-weight: 600;
    letter-spacing: 2.5px;
    cursor: pointer;
    box-shadow:
        0 8px 32px rgba(80, 20, 45, 0.52),
        inset 0 1px 0 rgba(255, 255, 255, 0.14);
    position: relative;
    overflow: hidden;
    transition:
        transform 0.22s,
        box-shadow 0.22s;
    min-height: 54px;
    -webkit-tap-highlight-color: transparent;
}
.btn-rsvp::after {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
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
    box-shadow: 0 16px 44px rgba(80, 20, 45, 0.6);
}
.btn-rsvp:active {
    transform: scale(0.98);
}
.btn-icon-svg {
    flex-shrink: 0;
}
.btn-flecha-svg {
    margin-left: auto;
    flex-shrink: 0;
    transition: transform 0.28s;
}
.btn-rsvp:hover .btn-flecha-svg {
    transform: translateX(5px);
}

/* PIE */
.pie {
    display: flex;
    align-items: center;
    gap: 0.7rem;
}
.pie-star {
    color: #c9974a;
    flex-shrink: 0;
}
.pie-texto {
    font-family: 'EB Garamond', serif;
    font-size: 0.84rem;
    font-style: italic;
    color: #8a6070;
    letter-spacing: 1px;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 480px) {
    .portada-hero {
        max-height: 680px;
    }
    .portada-nombre {
        font-size: clamp(1.7rem, 8vw, 2.8rem);
    }
    .eyebrow-line {
        width: 20px;
    }
    .card-wrapper {
        padding: 1.8rem 0.75rem 3rem;
    }
    .card-inner {
        padding: 2rem 1.3rem 2rem;
        gap: 1.35rem;
        border-radius: 26px;
    }
    .nombre {
        font-size: 1.65rem;
    }
    .evento-box {
        flex-direction: column;
    }
    .evento-item {
        flex-direction: row;
        text-align: left;
        padding: 0.9rem 1rem;
    }
    .evento-sep-line {
        width: auto;
        height: 1px;
        align-self: auto;
        background: linear-gradient(to right, transparent, rgba(210, 150, 170, 0.4), transparent);
    }
    .padres-nombres {
        gap: 0.55rem;
    }
    .padre-card {
        min-width: 92px;
        padding: 1rem 0.7rem 0.85rem;
    }
    .padre-foto-ring {
        width: 70px;
        height: 70px;
    }
    .foto-bebe-wrapper {
        padding: 0 2rem;
    }
    .hex-container {
        width: 152px;
        height: 152px;
    }
    .hex-frame {
        width: 134px;
        height: 134px;
    }
    .btn-rsvp {
        font-size: 0.82rem;
        letter-spacing: 1.5px;
        padding: 1rem 1.2rem;
    }
    .pill {
        font-size: 0.78rem;
        padding: 0.4rem 0.8rem;
    }
    .cita-mini {
        padding: 0.75rem 1rem;
    }
    .cita-mini-texto {
        font-size: 0.82rem;
    }
    /* Padrinos en mobile: 1 columna */
    .padrinos-grid {
        grid-template-columns: 1fr;
    }
    .padrino-card {
        padding: 0.75rem 0.85rem;
    }
    .padrino-nombre {
        font-size: 0.68rem;
    }
}
@media (max-width: 360px) {
    .portada-nombre {
        font-size: 1.6rem;
    }
    .nombre {
        font-size: 1.45rem;
    }
    .portada-pills {
        gap: 0.4rem;
    }
    .pill {
        font-size: 0.72rem;
        padding: 0.36rem 0.65rem;
    }
    .padre-card {
        min-width: 80px;
    }
    .hex-container {
        width: 138px;
        height: 138px;
    }
    .hex-frame {
        width: 122px;
        height: 122px;
    }
    .card-inner {
        padding: 1.8rem 1rem 1.8rem;
    }
    .padrino-nombre {
        font-size: 0.64rem;
    }
}
@media (prefers-reduced-motion: reduce) {
    .portada-img,
    .particula,
    .hex-frame,
    .orbit,
    .scroll-dot,
    .corazon-icon,
    .cross-icon,
    .bird-icon,
    .btn-rsvp::after {
        animation: none !important;
    }
}
</style>

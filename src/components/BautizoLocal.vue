<template>
    <section class="recepcion-section">
        <div class="portada-hero">
            <img :src="portadaUrl" alt="Salón de Recepción" class="portada-img" />
            <div class="portada-overlay"></div>
            <div class="particulas" aria-hidden="true">
                <span v-for="n in 12" :key="n" class="particula" :style="particulaStyle(n)">✦</span>
            </div>
            <div class="portada-content">
                <div class="eyebrow-wrap" data-aos="fade-down" data-aos-delay="80">
                    <span class="eyebrow-line"></span>
                    <p class="portada-eyebrow">Celebración</p>
                    <span class="eyebrow-line"></span>
                </div>
                <h1 class="portada-titulo" data-aos="zoom-in-up" data-aos-delay="240">
                    Recepción<br />del Bautizo
                </h1>
                <p class="portada-sub" data-aos="fade-up" data-aos-delay="360">
                    A continuación de la Ceremonia
                </p>
                <div class="portada-pills" data-aos="fade-up" data-aos-delay="480">
                    <span class="pill">
                        <Clock :size="14" class="pill-svg" />
                        {{ horaInicio }}
                    </span>
                    <span class="pill">
                        <MapPin :size="14" class="pill-svg" />
                        {{ lugarCorto }}
                    </span>
                </div>
                <button
                    class="portada-cta"
                    @click="scrollAbajo"
                    data-aos="fade-up"
                    data-aos-delay="620"
                >
                    Ver detalles
                    <ChevronDown :size="18" class="cta-arrow-svg" />
                </button>
            </div>
            <div class="scroll-indicator" @click="scrollAbajo">
                <div class="scroll-track"><div class="scroll-dot"></div></div>
                <span class="scroll-label">Desliza</span>
            </div>
        </div>

        <div ref="cuerpoRef" class="recepcion-body">
            <!-- ENCABEZADO -->
            <div class="seccion-header" data-aos="fade-up">
                <div class="ornamento">
                    <Sparkles :size="15" class="orn-icon" />
                    <GlassWater :size="24" class="orn-icon-center" />
                    <Sparkles :size="15" class="orn-icon" />
                </div>
                <h2 class="seccion-titulo">Recepción</h2>
                <p class="seccion-sub">Celebremos juntos este momento especial</p>
                <div class="linea-deco">
                    <span class="linea-trazo"></span>
                    <Flower :size="14" class="linea-flor-icon" fill="currentColor" />
                    <span class="linea-trazo"></span>
                </div>
            </div>

            <!-- CARD SALÓN -->
            <div class="salon-card" data-aos="fade-up" data-aos-delay="80">
                <div class="salon-img-wrap">
                    <img :src="portadaUrl" :alt="nombreSalon" class="salon-img" />
                    <div class="salon-img-overlay"></div>
                    <div class="salon-img-badge">
                        <GlassWater :size="13" />
                        Recepción
                    </div>
                </div>
                <div class="salon-info">
                    <div class="salon-nombre-bloque">
                        <div class="salon-badge">
                            <Star :size="11" fill="currentColor" />
                            Salón de Eventos
                        </div>
                        <h3 class="salon-nombre">{{ nombreSalon }}</h3>
                        <p class="salon-direccion">
                            <MapPin :size="12" class="inline-icon" />
                            {{ direccionSalon }}
                        </p>
                    </div>
                    <div class="info-grid">
                        <div
                            class="info-item"
                            v-for="(dato, idx) in datosSalon"
                            :key="dato.label"
                            data-aos="fade-up"
                            :data-aos-delay="80 + idx * 55"
                        >
                            <div class="info-icono-wrap">
                                <component :is="dato.iconComp" :size="17" class="info-svg" />
                            </div>
                            <div class="info-texto">
                                <p class="info-label">{{ dato.label }}</p>
                                <p class="info-valor">{{ dato.valor }}</p>
                            </div>
                        </div>
                    </div>
                    <a :href="googleMapsUrl" target="_blank" rel="noopener" class="btn-mapa">
                        <Navigation :size="15" />
                        Cómo llegar al salón
                        <ExternalLink :size="12" class="btn-ext-icon" />
                    </a>
                </div>
            </div>

            <!-- MAPA -->
            <div class="mapa-card" data-aos="fade-up" data-aos-delay="120">
                <div class="mapa-header">
                    <div class="mapa-icon-wrap">
                        <Compass :size="20" class="mapa-svg" />
                    </div>
                    <div class="mapa-header-texto">
                        <h4 class="mapa-titulo">Cómo llegar al Salón</h4>
                        <p class="mapa-sub">{{ direccionSalon }}</p>
                    </div>
                    <a :href="googleMapsUrl" target="_blank" rel="noopener" class="mapa-abrir-btn">
                        Abrir
                        <ExternalLink
                            :size="10"
                            style="margin-left: 3px; display: inline; vertical-align: middle"
                        />
                    </a>
                </div>
                <div class="mapa-frame-wrap">
                    <iframe
                        :src="googleMapsEmbed"
                        class="mapa-iframe"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Ubicación del Salón"
                    ></iframe>
                    <div class="mapa-pin-badge">
                        <MapPin :size="16" class="pin-svg" fill="currentColor" />
                    </div>
                </div>
                <a :href="googleMapsUrl" target="_blank" rel="noopener" class="mapa-btn-full">
                    <Navigation :size="15" />
                    Abrir ruta en Google Maps
                    <ExternalLink :size="13" class="btn-ext-icon" />
                </a>
            </div>

            <!-- GALERÍA DE FOTOS -->
            <div class="galeria-card" data-aos="fade-up" data-aos-delay="160">
                <h3 class="galeria-titulo">Conoce el Salón</h3>
                <div class="galeria-grid">
                    <img
                        v-for="n in 6"
                        :key="n"
                        :src="`/local/local${n}.jpeg`"
                        :alt="`Foto del local ${n}`"
                        class="galeria-img"
                        loading="lazy"
                    />
                </div>
            </div>

            <!-- CITA -->
            <div class="cita-bloque" data-aos="fade-up">
                <div class="cita-linea"></div>
                <div class="cita-contenido">
                    <Heart :size="22" class="cita-heart" fill="currentColor" />
                    <p class="cita-texto">
                        "La familia es el primer lugar donde aprendemos<br />
                        a amar y ser amados"
                    </p>
                </div>
                <div class="cita-linea"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AOS from 'aos';
import {
    Clock,
    MapPin,
    ChevronDown,
    GlassWater,
    Sparkles,
    Navigation,
    ExternalLink,
    Compass,
    Star,
    PartyPopper,
    Flower,
    Heart,
} from 'lucide-vue-next';

const props = defineProps({
    nombreSalon: { type: String, default: 'RYN' },
    direccionSalon: { type: String, default: 'Vicente Rojo y Arturo Daza (Zona Temporal)' },
    horaInicio: { type: String, default: '~3:30 PM' },
    horaFin: { type: String, default: '~7:00 PM' },
    latitud: { type: Number, default: -17.356681 },
    longitud: { type: Number, default: -66.161519 },
    portadaUrl: {
        type: String,
        default: '/local/local5.jpeg',
    },
    googleMapsLink: {
        type: String,
        default: 'https://maps.app.goo.gl/Eb9UELAiLxqYKLMg7',
    },
    googleMapsEmbedUrl: {
        type: String,
        default: 'https://maps.google.com/maps?q=-17.356681,-66.161519&z=18&output=embed&hl=es',
    },
});

const cuerpoRef = ref(null);
function scrollAbajo() {
    cuerpoRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
onMounted(() => AOS.refresh());

const lugarCorto = computed(() => props.nombreSalon.split(' ').slice(0, 3).join(' '));
const googleMapsUrl = computed(() => props.googleMapsLink);
const googleMapsEmbed = computed(() => props.googleMapsEmbedUrl);

const datosSalon = computed(() => [
    { iconComp: Clock, label: 'Hora', valor: `${props.horaInicio} – ${props.horaFin}` },
    { iconComp: MapPin, label: 'Dirección', valor: props.direccionSalon },
    { iconComp: GlassWater, label: 'Tipo', valor: 'Recepción privada' },
    { iconComp: PartyPopper, label: 'Ocasión', valor: 'Bautizo Keila Tamara' },
]);

function particulaStyle(n) {
    const pos = [
        { top: '7%', left: '4%' },
        { top: '14%', right: '7%' },
        { top: '26%', left: '2%' },
        { top: '38%', right: '3%' },
        { top: '54%', left: '6%' },
        { top: '66%', right: '5%' },
        { top: '76%', left: '9%' },
        { top: '84%', right: '8%' },
        { top: '11%', left: '17%' },
        { top: '20%', right: '14%' },
        { top: '45%', left: '1%' },
        { top: '50%', right: '1%' },
    ];
    const p = pos[(n - 1) % pos.length];
    return {
        ...p,
        position: 'absolute',
        animationDelay: `${((n * 0.65) % 3).toFixed(1)}s`,
        fontSize: `${(0.58 + (n % 3) * 0.2).toFixed(2)}rem`,
    };
}
</script>

<style scoped>
/*
  PALETA (sin :root — scoped no lo soporta):
  rosa       = #c0607a
  rosa-deep  = #7a2e48
  rosa-pale  = rgba(255,235,242,0.9)
  dorado     = #c9974a
  texto      = #3d2030
  texto-soft = #8a6070
  borde      = rgba(192,96,122,0.22)
  card-bg    = rgba(253,248,245,0.82)
*/
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.recepcion-section {
    font-family: 'EB Garamond', serif;
    color: #3d2030;
    background: linear-gradient(180deg, #fdf0f4 0%, #fef8fb 100%);
    position: relative;
}
.inline-icon {
    display: inline;
    vertical-align: middle;
}

/* ═══ PORTADA ═══ */
.portada-hero {
    position: relative;
    width: 100%;
    height: 100svh;
    min-height: 540px;
    max-height: 760px;
    overflow: hidden;
}
.portada-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
    display: block;
    animation: kenburns 18s ease-in-out infinite alternate;
}
@keyframes kenburns {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.09) translateX(-1%);
    }
}
.portada-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        165deg,
        rgba(45, 8, 22, 0.5) 0%,
        rgba(80, 22, 48, 0.7) 55%,
        rgba(20, 4, 12, 0.88) 100%
    );
}
.particulas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}
.particula {
    color: rgba(255, 218, 160, 0.42);
    animation: flotar-p 4s ease-in-out infinite alternate;
}
@keyframes flotar-p {
    from {
        transform: translateY(0) rotate(0deg);
        opacity: 0.28;
    }
    to {
        transform: translateY(-14px) rotate(16deg);
        opacity: 0.7;
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
    padding: 2rem 1.25rem;
    gap: 0.9rem;
}

.eyebrow-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.eyebrow-line {
    width: 34px;
    height: 1px;
    background: rgba(255, 215, 180, 0.52);
    flex-shrink: 0;
}
.portada-eyebrow {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 0.86rem;
    color: rgba(255, 215, 180, 0.92);
    letter-spacing: 4.5px;
    text-transform: uppercase;
    white-space: nowrap;
}
.portada-titulo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.9rem, 6.5vw, 4rem);
    font-weight: 700;
    color: #fff;
    letter-spacing: 2.5px;
    line-height: 1.12;
    text-shadow:
        0 2px 28px rgba(0, 0, 0, 0.72),
        0 0 80px rgba(210, 130, 165, 0.38);
}
.portada-sub {
    font-size: 1rem;
    color: rgba(255, 215, 230, 0.88);
    font-style: italic;
    letter-spacing: 2px;
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
    gap: 0.42rem;
    background: rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.28);
    color: white;
    padding: 0.45rem 1rem;
    border-radius: 50px;
    font-family: 'EB Garamond', serif;
    font-size: 0.86rem;
    letter-spacing: 0.5px;
    min-height: 40px;
    transition: background 0.2s;
}
.pill:hover {
    background: rgba(255, 255, 255, 0.22);
}
.pill-svg {
    color: rgba(255, 200, 180, 0.9);
    flex-shrink: 0;
}

.portada-cta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 2.3rem;
    margin-top: 0.3rem;
    background: linear-gradient(135deg, rgba(210, 110, 140, 0.9), rgba(148, 45, 80, 0.95));
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 190, 210, 0.35);
    color: white;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 2.5px;
    cursor: pointer;
    box-shadow: 0 6px 30px rgba(148, 45, 80, 0.52);
    transition:
        transform 0.22s,
        box-shadow 0.22s;
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
}
.portada-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 38px rgba(148, 45, 80, 0.65);
}
.cta-arrow-svg {
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
    bottom: 24px;
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
        transform: translateX(-50%) translateY(10px);
    }
    to {
        opacity: 0.82;
        transform: translateX(-50%) translateY(0);
    }
}
.scroll-track {
    width: 26px;
    height: 42px;
    border: 2px solid rgba(255, 255, 255, 0.48);
    border-radius: 13px;
    display: flex;
    justify-content: center;
    padding-top: 6px;
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255, 0.08);
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
    color: rgba(255, 255, 255, 0.58);
}

/* ═══ CUERPO ═══ */
.recepcion-body {
    max-width: 780px;
    margin: 0 auto;
    padding: 2.8rem 1rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
}

.seccion-header {
    text-align: center;
}
.ornamento {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    margin-bottom: 0.65rem;
}
.orn-icon {
    color: #c9974a;
    opacity: 0.7;
}
.orn-icon-center {
    color: #c9974a;
}
.seccion-titulo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #7a2e48;
    letter-spacing: 2px;
    text-shadow: 1px 2px 0 rgba(255, 255, 255, 0.8);
}
.seccion-sub {
    font-size: 1rem;
    color: #8a6070;
    font-style: italic;
    margin-top: 0.38rem;
}
.linea-deco {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.9rem;
    margin-top: 0.9rem;
}
.linea-trazo {
    flex: 1;
    max-width: 90px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9974a, transparent);
}
.linea-flor-icon {
    color: #c0607a;
    flex-shrink: 0;
}

/* ─── Card base ─── */
.salon-card,
.mapa-card {
    background: rgba(253, 248, 245, 0.82);
    backdrop-filter: blur(18px);
    border-radius: 26px;
    border: 1px solid rgba(192, 96, 122, 0.22);
    box-shadow:
        0 16px 60px rgba(140, 50, 80, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
}

/* ═══ CARD SALÓN ═══ */
.salon-img-wrap {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
}
.salon-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
    display: block;
    transition: transform 0.5s;
}
.salon-card:hover .salon-img {
    transform: scale(1.04);
}
.salon-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(45, 8, 22, 0.65) 0%, transparent 55%);
}
.salon-img-badge {
    position: absolute;
    bottom: 12px;
    left: 14px;
    background: linear-gradient(135deg, #7a2e48, #c0607a);
    color: white;
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 1.5px;
    padding: 0.28rem 0.85rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 3px 12px rgba(120, 40, 70, 0.4);
}

.salon-info {
    padding: 1.5rem 1.5rem 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
.salon-nombre-bloque {
    border-bottom: 1px solid rgba(192, 96, 122, 0.22);
    padding-bottom: 0.9rem;
}
.salon-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: linear-gradient(135deg, rgba(201, 151, 74, 0.14), rgba(220, 175, 80, 0.1));
    border: 1px solid rgba(201, 151, 74, 0.3);
    color: #c9974a;
    font-family: 'Cinzel', serif;
    font-size: 0.57rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 0.26rem 0.8rem;
    border-radius: 20px;
    margin-bottom: 0.5rem;
}
.salon-nombre {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.15rem, 3.5vw, 1.65rem);
    font-weight: 700;
    color: #7a2e48;
    letter-spacing: 1px;
    line-height: 1.2;
}
.salon-direccion {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.83rem;
    color: #8a6070;
    font-style: italic;
    margin-top: 0.3rem;
}

/* Info grid */
.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
}
.info-item {
    display: flex;
    align-items: flex-start;
    gap: 0.62rem;
    background: rgba(255, 246, 249, 0.92);
    border: 1px solid rgba(210, 160, 175, 0.28);
    border-radius: 14px;
    padding: 0.85rem 0.9rem;
    transition:
        box-shadow 0.2s,
        transform 0.2s;
}
.info-item:hover {
    box-shadow: 0 5px 18px rgba(192, 96, 122, 0.13);
    transform: translateY(-2px);
}
.info-icono-wrap {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.12), rgba(201, 151, 74, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
}
.info-svg {
    color: #7a2e48;
}
.info-label {
    font-family: 'Cinzel', serif;
    font-size: 0.52rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #c9974a;
    margin-bottom: 2px;
}
.info-valor {
    font-size: 0.86rem;
    font-weight: 600;
    color: #3d2030;
    line-height: 1.35;
    word-break: break-word;
}

.btn-mapa {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #e8899a, #c05575);
    color: white;
    text-decoration: none;
    padding: 0.85rem 1.5rem;
    border-radius: 14px;
    font-family: 'Cinzel', serif;
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 1px;
    box-shadow: 0 5px 18px rgba(192, 85, 117, 0.36);
    transition:
        transform 0.22s,
        box-shadow 0.22s;
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
}
.btn-mapa:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(192, 85, 117, 0.42);
}
.btn-ext-icon {
    flex-shrink: 0;
    opacity: 0.75;
}

/* ═══ MAPA ═══ */
.mapa-header {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1.1rem 1.4rem;
    background: rgba(255, 243, 248, 0.82);
    border-bottom: 1px solid rgba(192, 96, 122, 0.22);
}
.mapa-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.14), rgba(201, 151, 74, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
}
.mapa-svg {
    color: #7a2e48;
}
.mapa-header-texto {
    flex: 1;
    min-width: 0;
}
.mapa-titulo {
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    color: #7a2e48;
    font-weight: 700;
    letter-spacing: 1px;
}
.mapa-sub {
    font-size: 0.73rem;
    color: #8a6070;
    font-style: italic;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mapa-abrir-btn {
    flex-shrink: 0;
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: #c0607a;
    text-decoration: none;
    padding: 0.32rem 0.85rem;
    border: 1.5px solid rgba(192, 96, 122, 0.4);
    border-radius: 50px;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    white-space: nowrap;
    min-height: 36px;
}
.mapa-abrir-btn:hover {
    background: rgba(255, 235, 242, 0.9);
}

.mapa-frame-wrap {
    position: relative;
}
.mapa-iframe {
    width: 100%;
    height: 300px;
    border: none;
    display: block;
    filter: saturate(0.78) sepia(0.1) hue-rotate(310deg);
}
.mapa-pin-badge {
    position: absolute;
    top: 12px;
    right: 14px;
    background: white;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.2);
    animation: ping 2s ease-in-out infinite;
    pointer-events: none;
}
.pin-svg {
    color: #c0607a;
}
@keyframes ping {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
}

.mapa-btn-full {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem 1.2rem;
    background: rgba(255, 255, 255, 0.82);
    color: #7a2e48;
    border: 1.5px solid rgba(192, 96, 122, 0.38);
    padding: 0.82rem 1.2rem;
    border-radius: 14px;
    font-family: 'Cinzel', serif;
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    transition: all 0.2s;
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
}
.mapa-btn-full:hover {
    background: rgba(255, 235, 242, 0.9);
    transform: translateY(-1px);
}

/* ═══ GALERÍA ═══ */
.galeria-card {
    background: rgba(253, 248, 245, 0.82);
    backdrop-filter: blur(18px);
    border-radius: 26px;
    border: 1px solid rgba(192, 96, 122, 0.22);
    box-shadow:
        0 16px 60px rgba(140, 50, 80, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
    padding: 1.8rem 1.5rem;
    text-align: center;
}
.galeria-titulo {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #7a2e48;
    margin-bottom: 1.2rem;
    letter-spacing: 1px;
}
.galeria-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.8rem;
}
.galeria-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(140, 50, 80, 0.1);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
}
.galeria-img:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 24px rgba(140, 50, 80, 0.2);
}

/* ═══ CITA ═══ */
.cita-bloque {
    display: flex;
    align-items: center;
    gap: 1.1rem;
    padding: 0 0.5rem;
}
.cita-linea {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9974a, transparent);
}
.cita-contenido {
    text-align: center;
    flex-shrink: 0;
    max-width: 340px;
}
.cita-heart {
    color: #c0607a;
    opacity: 0.7;
    margin: 0 auto 0.5rem;
    display: block;
    animation: latir 1.8s ease-in-out infinite;
}
@keyframes latir {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.18);
    }
}
.cita-texto {
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    font-style: italic;
    color: #8a6070;
    line-height: 1.65;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 520px) {
    .portada-hero {
        max-height: 640px;
    }
    .portada-content {
        gap: 0.7rem;
        padding: 1.5rem 1rem;
    }
    .eyebrow-line {
        width: 22px;
    }
    .recepcion-body {
        padding: 2rem 0.75rem 3rem;
        gap: 2rem;
    }
    .salon-img-wrap {
        height: 180px;
    }
    .salon-info {
        padding: 1.25rem 1.1rem 1.5rem;
    }
    .info-grid {
        grid-template-columns: 1fr;
        gap: 0.6rem;
    }
    .mapa-iframe {
        height: 240px;
    }
    .mapa-header {
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .mapa-btn-full {
        margin: 0.85rem 0.9rem;
    }
    .galeria-card {
        padding: 1.5rem 1rem;
    }
    .galeria-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.6rem;
    }
    .galeria-img {
        height: 130px;
    }
    .cita-bloque {
        flex-direction: column;
        gap: 0.5rem;
    }
    .cita-linea {
        flex: none;
        width: 80px;
        height: 1px;
    }
}
@media (max-width: 360px) {
    .portada-titulo {
        font-size: 1.6rem;
    }
    .salon-nombre {
        font-size: 1.1rem;
    }
    .seccion-titulo {
        font-size: 1.5rem;
    }
    .info-valor {
        font-size: 0.8rem;
    }
}
@media (prefers-reduced-motion: reduce) {
    .portada-img,
    .cta-arrow-svg,
    .scroll-dot,
    .mapa-pin-badge,
    .cita-heart,
    .particula {
        animation: none !important;
    }
}
</style>

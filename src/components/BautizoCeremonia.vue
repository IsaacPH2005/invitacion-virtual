<template>
    <section class="iglesia-section">
        <!-- ════════════════════════════════════
             PORTADA HERO
        ════════════════════════════════════ -->
        <div class="portada-hero">
            <img :src="portadaUrl" alt="Parroquia" class="portada-img" />
            <div class="portada-overlay"></div>

            <div class="portada-content">
                <p class="portada-eyebrow" data-aos="fade-down" data-aos-delay="100">
                    ✦ Ceremonia de Bautizo ✦
                </p>
                <h1 class="portada-titulo" data-aos="zoom-in-up" data-aos-delay="250">
                    {{ nombreIglesia }}
                </h1>
                <p class="portada-sub" data-aos="fade-up" data-aos-delay="380">
                    Diócesis de {{ diocesis }}
                </p>

                <div class="portada-pills" data-aos="fade-up" data-aos-delay="500">
                    <span class="pill">
                        <CalendarDays :size="14" class="pill-svg" />{{ fechaBautizo }}
                    </span>
                    <span class="pill">
                        <Clock :size="14" class="pill-svg" />Misa · {{ horaMisa }}
                    </span>
                </div>

                <button
                    class="portada-cta"
                    @click="scrollAbajo"
                    data-aos="fade-up"
                    data-aos-delay="650"
                >
                    Ver detalles
                    <ChevronDown :size="18" class="cta-arrow-svg" />
                </button>
            </div>

            <div class="scroll-indicator">
                <div class="scroll-dot"></div>
            </div>
        </div>

        <!-- ════════════════════════════════════
             CUERPO
        ════════════════════════════════════ -->
        <div ref="cuerpoRef" class="iglesia-body">
            <!-- ENCABEZADO -->
            <div class="seccion-header" data-aos="fade-up">
                <div class="ornamento">
                    <Sparkles :size="16" class="orn-icon" />
                    <Church :size="22" class="orn-icon-center" />
                    <Sparkles :size="16" class="orn-icon" />
                </div>
                <h2 class="seccion-titulo">Lugar de la Ceremonia</h2>
                <p class="seccion-sub">Te esperamos para celebrar juntos este momento de gracia</p>
                <div class="linea-deco">
                    <span class="linea-trazo"></span>
                    <span class="linea-flor">🌸</span>
                    <span class="linea-trazo"></span>
                </div>
            </div>

            <!-- GALERÍA + INFO -->
            <div class="iglesia-card" data-aos="fade-up" data-aos-delay="100">
                <!-- Galería -->
                <div class="galeria">
                    <div
                        class="galeria-principal"
                        :style="{ backgroundImage: `url(${fotos[fotoActiva]})` }"
                    >
                        <button class="galeria-arrow left" @click="prevFoto">
                            <ChevronLeft :size="20" />
                        </button>
                        <button class="galeria-arrow right" @click="nextFoto">
                            <ChevronRight :size="20" />
                        </button>
                        <div class="galeria-overlay-bottom">
                            <span class="galeria-badge">
                                <MapPin
                                    :size="13"
                                    style="
                                        display: inline;
                                        margin-right: 4px;
                                        vertical-align: middle;
                                    "
                                />
                                {{ nombreIglesia }}
                            </span>
                            <span class="galeria-counter"
                                >{{ fotoActiva + 1 }} / {{ fotos.length }}</span
                            >
                        </div>
                    </div>

                    <div class="galeria-thumbs">
                        <button
                            v-for="(foto, i) in fotos"
                            :key="i"
                            class="thumb"
                            :class="{ activo: fotoActiva === i }"
                            @click="fotoActiva = i"
                            :style="{ backgroundImage: `url(${foto})` }"
                        ></button>
                    </div>
                </div>

                <!-- Información -->
                <div class="iglesia-info">
                    <div class="info-nombre-bloque">
                        <h3 class="info-nombre">{{ nombreIglesia }}</h3>
                        <p class="info-diocesis">
                            <Landmark
                                :size="13"
                                style="display: inline; margin-right: 5px; vertical-align: middle"
                            />
                            Diócesis de {{ diocesis }}
                        </p>
                    </div>

                    <div class="info-grid">
                        <div
                            class="info-item"
                            v-for="(dato, idx) in datosIglesia"
                            :key="dato.label"
                            data-aos="fade-up"
                            :data-aos-delay="100 + idx * 60"
                        >
                            <div class="info-icono-wrap">
                                <component :is="dato.iconComp" :size="18" class="info-svg" />
                            </div>
                            <div>
                                <p class="info-label">{{ dato.label }}</p>
                                <p class="info-valor">{{ dato.valor }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Vestimenta -->
                    <div class="nota-vestimenta" data-aos="fade-up" data-aos-delay="300">
                        <div class="nota-icon-wrap">
                            <Shirt :size="20" class="nota-svg" />
                        </div>
                        <div>
                            <p class="nota-titulo">Vestimenta sugerida</p>
                            <p class="nota-texto">{{ notaVestimenta }}</p>
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div class="acciones" data-aos="fade-up" data-aos-delay="350">
                        <a :href="googleMapsUrl" target="_blank" class="btn-accion primario">
                            <Navigation :size="15" />
                            Cómo llegar
                        </a>
                        <a
                            :href="`https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`"
                            target="_blank"
                            class="btn-accion secundario"
                        >
                            <Share2 :size="15" />
                            Compartir
                        </a>
                    </div>

                    <!-- Confirmar -->
                    <button
                        class="btn-confirmar"
                        @click="irARSVP"
                        data-aos="zoom-in-up"
                        data-aos-delay="400"
                    >
                        <Mail :size="18" class="btn-icon-svg" />
                        <span>Confirmar Asistencia</span>
                        <ArrowRight :size="18" class="btn-flecha-svg" />
                    </button>
                </div>
            </div>

            <!-- MAPA -->
            <div class="mapa-card" data-aos="fade-up" data-aos-delay="150">
                <div class="mapa-header">
                    <div class="mapa-icon-wrap">
                        <Compass :size="22" class="mapa-svg" />
                    </div>
                    <div>
                        <h4 class="mapa-titulo">¿Cómo llegar?</h4>
                        <p class="mapa-sub">{{ direccion }}</p>
                    </div>
                    <a :href="googleMapsUrl" target="_blank" class="mapa-abrir-btn">
                        Abrir <ExternalLink :size="11" style="display: inline; margin-left: 3px" />
                    </a>
                </div>

                <div class="mapa-frame-wrap">
                    <iframe
                        :src="googleMapsEmbed"
                        class="mapa-iframe"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div class="mapa-pin-badge">
                        <MapPin :size="18" class="pin-svg" />
                    </div>
                </div>

                <div class="transporte-grid">
                    <div
                        class="transporte-item"
                        v-for="(t, idx) in transportes"
                        :key="t.titulo"
                        data-aos="fade-up"
                        :data-aos-delay="200 + idx * 80"
                    >
                        <div class="transporte-icon-wrap">
                            <component :is="t.iconComp" :size="22" class="trans-svg" />
                        </div>
                        <p class="transporte-titulo">{{ t.titulo }}</p>
                        <p class="transporte-desc">{{ t.desc }}</p>
                    </div>
                </div>
            </div>

            <!-- CITA BÍBLICA -->
            <div class="cita-bloque" data-aos="fade-up" data-aos-delay="100">
                <div class="cita-linea"></div>
                <div class="cita-contenido">
                    <BookOpen :size="28" class="cita-book-icon" />
                    <p class="cita-texto">
                        Dejen que los niños vengan a mí, y no se lo impidan, porque el reino de los
                        cielos es de quienes son como ellos.
                    </p>
                    <p class="cita-ref">— Mateo 19:14</p>
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
    CalendarDays,
    Clock,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Church,
    MapPin,
    Navigation,
    Share2,
    Mail,
    ArrowRight,
    Compass,
    ExternalLink,
    Sparkles,
    Landmark,
    Shirt,
    Car,
    Bus,
    PersonStanding,
    BookOpen,
} from 'lucide-vue-next';

const props = defineProps({
    nombreIglesia: { type: String, default: 'Iglesia Santa Ana de Cala Cala' },
    diocesis: { type: String, default: 'Cochabamba' },
    horaMisa: { type: String, default: '2:45 PM' },
    fechaBautizo: { type: String, default: 'Sábado, 15 de Abril de 2025' },
    direccion: { type: String, default: 'Cala Cala, Cochabamba, Bolivia' },
    parroco: { type: String, default: 'Párroco de Santa Ana' },
    notaVestimenta: {
        type: String,
        default: 'Vestimenta formal. Se sugiere tonos claros y colores pastel.',
    },
    latitud: { type: Number, default: -17.3895 },
    longitud: { type: Number, default: -66.1568 },
    rsvpSectionId: { type: String, default: 'rsvp-section' },
    portadaUrl: {
        type: String,
        default: './iglesia1.jpg',
    },
    fotosIglesia: {
        type: Array,
        default: () => ['./iglesia1.jpg', './iglesia2.jpg', './iglesia3.jpg', './iglesia4.jpg'],
    },
});

const emit = defineEmits(['ir-a-rsvp']);

// Galería
const fotoActiva = ref(0);
const fotos = computed(() => props.fotosIglesia);
function nextFoto() {
    fotoActiva.value = (fotoActiva.value + 1) % fotos.value.length;
}
function prevFoto() {
    fotoActiva.value = (fotoActiva.value - 1 + fotos.value.length) % fotos.value.length;
}

const cuerpoRef = ref(null);
function scrollAbajo() {
    cuerpoRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function irARSVP() {
    emit('ir-a-rsvp');
    const el = document.getElementById(props.rsvpSectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(() => AOS.refresh());

const datosIglesia = computed(() => [
    { iconComp: Clock, label: 'Hora de la Misa', valor: props.horaMisa },
    { iconComp: CalendarDays, label: 'Fecha', valor: props.fechaBautizo },
    { iconComp: MapPin, label: 'Dirección', valor: props.direccion },
    { iconComp: Landmark, label: 'Párroco', valor: props.parroco },
]);

const googleMapsUrl = computed(
    () => `https://www.google.com/maps/search/?api=1&query=${props.latitud},${props.longitud}`
);
const googleMapsEmbed = computed(
    () => `https://maps.google.com/maps?q=${props.latitud},${props.longitud}&z=16&output=embed`
);
const whatsappMsg = computed(
    () =>
        `¡Estás invitado al Bautizo de Keila Tamara Castro Luna! 🌸\n⛪ ${props.nombreIglesia}\n📍 ${props.direccion}\n🕐 ${props.horaMisa} | ${props.fechaBautizo}\n\nVer ubicación: ${googleMapsUrl.value}`
);

const transportes = [
    { iconComp: Car, titulo: 'En auto', desc: 'Estacionamiento disponible en la calle lateral' },
    { iconComp: Bus, titulo: 'Transporte', desc: 'Varias líneas pasan frente a la parroquia' },
    { iconComp: PersonStanding, titulo: 'A pie', desc: 'A 5 min del parque central caminando' },
];
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
    --rosa-pale: rgba(255, 235, 242, 0.88);
    --dorado: #c9974a;
    --texto: #3d2030;
    --texto-soft: #8a6070;
    --borde: rgba(192, 96, 122, 0.22);
    --card-bg: rgba(253, 248, 245, 0.78);
    --blur: blur(16px);
    --shadow: 0 16px 60px rgba(140, 50, 80, 0.18);
    --radius: 28px;
}

.iglesia-section {
    font-family: 'EB Garamond', serif;
    color: var(--texto);
    position: relative;
    z-index: 1;
    background: linear-gradient(180deg, #fdf0f4 0%, #fef8fb 100%);
}

/* ═══ PORTADA ═══ */
.portada-hero {
    position: relative;
    width: 100%;
    height: 100svh;
    min-height: 560px;
    max-height: 760px;
    overflow: hidden;
}

.portada-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    display: block;
    animation: kenburns 16s ease-in-out infinite alternate;
}

@keyframes kenburns {
    from {
        transform: scale(1) translateX(0);
    }
    to {
        transform: scale(1.09) translateX(-1.2%);
    }
}

.portada-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        165deg,
        rgba(45, 8, 22, 0.52) 0%,
        rgba(80, 22, 48, 0.7) 55%,
        rgba(22, 4, 12, 0.86) 100%
    );
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
    gap: 1rem;
}

.portada-eyebrow {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 1rem;
    color: rgba(255, 215, 180, 0.92);
    letter-spacing: 5px;
    text-transform: uppercase;
}

.portada-titulo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.8rem, 5.5vw, 3.6rem);
    font-weight: 700;
    color: #fff;
    letter-spacing: 2.5px;
    line-height: 1.15;
    text-shadow:
        0 2px 28px rgba(0, 0, 0, 0.7),
        0 0 80px rgba(200, 120, 150, 0.35);
}

.portada-sub {
    font-size: 1.05rem;
    color: rgba(255, 215, 230, 0.88);
    font-style: italic;
    letter-spacing: 2px;
}

.portada-pills {
    display: flex;
    gap: 0.7rem;
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
    margin-top: 0.4rem;
    padding: 0.88rem 2.4rem;
    background: linear-gradient(135deg, rgba(210, 110, 140, 0.9), rgba(148, 45, 80, 0.95));
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 190, 210, 0.35);
    color: white;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.83rem;
    font-weight: 600;
    letter-spacing: 2.5px;
    cursor: pointer;
    box-shadow: 0 6px 30px rgba(148, 45, 80, 0.52);
    transition:
        transform 0.22s,
        box-shadow 0.22s;
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
    bottom: 26px;
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

/* ═══ CUERPO ═══ */
.iglesia-body {
    max-width: 780px;
    margin: 0 auto;
    padding: 3rem 1rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 2.6rem;
}

/* Header sección */
.seccion-header {
    text-align: center;
}

.ornamento {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    margin-bottom: 0.7rem;
}
.orn-icon {
    color: var(--dorado);
    opacity: 0.7;
}
.orn-icon-center {
    color: var(--dorado);
}

.seccion-titulo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.65rem, 4vw, 2.5rem);
    font-weight: 700;
    color: var(--rosa-deep);
    letter-spacing: 2px;
    text-shadow: 1px 2px 0 rgba(255, 255, 255, 0.8);
}

.seccion-sub {
    font-size: 1.05rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-top: 0.4rem;
}

.linea-deco {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}
.linea-trazo {
    flex: 1;
    max-width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--dorado), transparent);
}

/* ═══ CARD IGLESIA ═══ */
.iglesia-card {
    background: var(--card-bg);
    backdrop-filter: var(--blur);
    border-radius: var(--radius);
    border: 1px solid var(--borde);
    box-shadow:
        var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
}

/* Galería */
.galeria {
    position: relative;
}

.galeria-principal {
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center;
    position: relative;
    transition: background-image 0.5s ease;
}

.galeria-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.38);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    z-index: 2;
}
.galeria-arrow.left {
    left: 12px;
}
.galeria-arrow.right {
    right: 12px;
}
.galeria-arrow:hover {
    background: rgba(255, 255, 255, 0.42);
}

.galeria-overlay-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.85rem 1.1rem;
    background: linear-gradient(to top, rgba(45, 8, 22, 0.82), transparent);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.galeria-badge {
    color: white;
    font-size: 0.85rem;
    font-style: italic;
    letter-spacing: 0.8px;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}
.galeria-counter {
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.74rem;
    letter-spacing: 1px;
}

.galeria-thumbs {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem 0.9rem;
    background: rgba(255, 242, 247, 0.75);
    border-bottom: 1px solid var(--borde);
}
.thumb {
    flex: 1;
    height: 60px;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    border: 2.5px solid transparent;
    cursor: pointer;
    transition: all 0.22s;
    opacity: 0.55;
}
.thumb.activo {
    border-color: var(--rosa);
    opacity: 1;
    transform: scale(1.06);
    box-shadow: 0 3px 14px rgba(192, 96, 122, 0.35);
}
.thumb:hover:not(.activo) {
    opacity: 0.82;
}

/* Info */
.iglesia-info {
    padding: 1.8rem 2rem 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
}

.info-nombre-bloque {
    border-bottom: 1px solid var(--borde);
    padding-bottom: 1rem;
}

.info-nombre {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.3rem, 3.5vw, 1.75rem);
    font-weight: 700;
    color: var(--rosa-deep);
    letter-spacing: 1.2px;
    line-height: 1.2;
}

.info-diocesis {
    font-size: 0.84rem;
    color: var(--dorado);
    font-style: italic;
    letter-spacing: 1.8px;
    margin-top: 0.35rem;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
}

.info-item {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    background: rgba(255, 246, 249, 0.9);
    border: 1px solid rgba(210, 160, 175, 0.28);
    border-radius: 16px;
    padding: 0.95rem 1rem;
    transition:
        box-shadow 0.2s,
        transform 0.2s;
}
.info-item:hover {
    box-shadow: 0 6px 20px rgba(192, 96, 122, 0.15);
    transform: translateY(-2px);
}

.info-icono-wrap {
    width: 36px;
    height: 36px;
    border-radius: 11px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.13), rgba(201, 151, 74, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
}
.info-svg {
    color: var(--rosa-deep);
}

.info-label {
    font-family: 'Cinzel', serif;
    font-size: 0.54rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--dorado);
    margin-bottom: 3px;
}
.info-valor {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--texto);
    line-height: 1.35;
}

/* Vestimenta */
.nota-vestimenta {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    background: linear-gradient(135deg, rgba(255, 238, 215, 0.9), rgba(255, 225, 195, 0.72));
    border: 1px solid rgba(200, 155, 100, 0.38);
    border-radius: 16px;
    padding: 1rem 1.15rem;
}
.nota-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    flex-shrink: 0;
    background: rgba(200, 150, 70, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;
}
.nota-svg {
    color: #a07030;
}
.nota-titulo {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #a07030;
    margin-bottom: 3px;
}
.nota-texto {
    font-size: 0.9rem;
    color: #7a5020;
    font-style: italic;
    line-height: 1.55;
}

/* Acciones */
.acciones {
    display: flex;
    gap: 0.8rem;
}

.btn-accion {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
    cursor: pointer;
}
.btn-accion.primario {
    background: linear-gradient(135deg, #e8899a, #c05575);
    color: white;
    border: none;
    box-shadow: 0 4px 18px rgba(192, 85, 117, 0.38);
}
.btn-accion.secundario {
    background: rgba(255, 255, 255, 0.75);
    color: var(--rosa-deep);
    border: 1.5px solid rgba(192, 96, 122, 0.4);
}
.btn-accion:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(192, 85, 117, 0.32);
}

/* Confirmar */
.btn-confirmar {
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
    font-size: 0.95rem;
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
.btn-confirmar::after {
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
.btn-confirmar:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 40px rgba(80, 20, 45, 0.58);
}
.btn-confirmar:active {
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
.btn-confirmar:hover .btn-flecha-svg {
    transform: translateX(5px);
}

/* ═══ MAPA ═══ */
.mapa-card {
    background: var(--card-bg);
    backdrop-filter: var(--blur);
    border-radius: var(--radius);
    border: 1px solid var(--borde);
    box-shadow:
        var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
}

.mapa-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1.15rem 1.5rem;
    background: rgba(255, 243, 248, 0.78);
    border-bottom: 1px solid var(--borde);
}
.mapa-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 13px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.14), rgba(201, 151, 74, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
}
.mapa-svg {
    color: var(--rosa-deep);
}
.mapa-titulo {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: var(--rosa-deep);
    font-weight: 700;
    letter-spacing: 1px;
}
.mapa-sub {
    font-size: 0.77rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-top: 2px;
}
.mapa-abrir-btn {
    margin-left: auto;
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--rosa);
    text-decoration: none;
    padding: 0.35rem 0.9rem;
    border: 1.5px solid rgba(192, 96, 122, 0.4);
    border-radius: 50px;
    transition: background 0.2s;
    white-space: nowrap;
    display: flex;
    align-items: center;
}
.mapa-abrir-btn:hover {
    background: var(--rosa-pale);
}

.mapa-frame-wrap {
    position: relative;
}
.mapa-iframe {
    width: 100%;
    height: 300px;
    border: none;
    display: block;
    filter: saturate(0.75) sepia(0.12) hue-rotate(310deg);
}
.mapa-pin-badge {
    position: absolute;
    top: 12px;
    right: 14px;
    background: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.2);
    animation: ping 2s ease-in-out infinite;
    pointer-events: none;
}
.pin-svg {
    color: var(--rosa);
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

/* Transporte */
.transporte-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.transporte-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.4rem;
    padding: 1.2rem 0.7rem;
    border-top: 1px solid var(--borde);
    border-right: 1px solid rgba(210, 150, 170, 0.15);
    background: rgba(255, 250, 252, 0.6);
}
.transporte-item:last-child {
    border-right: none;
}

.transporte-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.1), rgba(201, 151, 74, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.2rem;
}
.trans-svg {
    color: var(--rosa-deep);
}
.transporte-titulo {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--rosa-deep);
    text-transform: uppercase;
    letter-spacing: 1px;
}
.transporte-desc {
    font-size: 0.71rem;
    color: var(--texto-soft);
    font-style: italic;
    line-height: 1.4;
}

/* ═══ CITA ═══ */
.cita-bloque {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 0 0.5rem;
}
.cita-linea {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--dorado), transparent);
}
.cita-contenido {
    text-align: center;
    max-width: 380px;
    flex-shrink: 0;
}
.cita-book-icon {
    color: var(--dorado);
    opacity: 0.6;
    margin: 0 auto 0.5rem;
    display: block;
}
.cita-texto {
    font-family: 'EB Garamond', serif;
    font-size: 1.02rem;
    font-style: italic;
    color: var(--texto-soft);
    line-height: 1.65;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
}
.cita-ref {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    color: var(--dorado);
    margin-top: 0.5rem;
    letter-spacing: 2px;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 520px) {
    .portada-titulo {
        font-size: clamp(1.5rem, 5vw, 2.4rem);
    }
    .portada-hero {
        max-height: 640px;
    }
    .info-grid {
        grid-template-columns: 1fr;
    }
    .acciones {
        flex-direction: column;
    }
    .transporte-grid {
        grid-template-columns: 1fr;
    }
    .transporte-item {
        flex-direction: row;
        text-align: left;
        gap: 0.9rem;
        border-right: none;
    }
    .transporte-icon-wrap {
        flex-shrink: 0;
    }
    .cita-bloque {
        flex-direction: column;
        gap: 0.6rem;
    }
    .cita-linea {
        width: 80px;
    }
    .iglesia-info {
        padding: 1.4rem 1.2rem 1.6rem;
    }
    .galeria-principal {
        height: 220px;
    }
    .btn-confirmar {
        font-size: 0.85rem;
        letter-spacing: 1.5px;
    }
    .mapa-header {
        flex-wrap: wrap;
    }
}

@media (max-width: 360px) {
    .info-nombre {
        font-size: 1.2rem;
    }
    .pill {
        font-size: 0.78rem;
        padding: 0.4rem 0.8rem;
    }
}
</style>

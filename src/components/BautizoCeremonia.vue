<template>
    <section class="iglesia-section">
        <div class="portada-hero">
            <img :src="portadaUrl" alt="Parroquia" class="portada-img" />
            <div class="portada-overlay"></div>
            <div class="portada-content">
                <div class="eyebrow-wrap" data-aos="fade-down" data-aos-delay="80">
                    <span class="eyebrow-line"></span>
                    <p class="portada-eyebrow">Ceremonia de Bautizo</p>
                    <span class="eyebrow-line"></span>
                </div>
                <h1 class="portada-titulo" data-aos="zoom-in-up" data-aos-delay="250">
                    {{ nombreIglesia }}
                </h1>
                <div class="portada-pills" data-aos="fade-up" data-aos-delay="500">
                    <span class="pill">
                        <CalendarDays :size="14" class="pill-svg" />
                        {{ fechaBautizo }}
                    </span>
                    <span class="pill">
                        <Clock :size="14" class="pill-svg" />
                        Misa · {{ horaMisa }}
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
            <div class="scroll-indicator" @click="scrollAbajo">
                <div class="scroll-track"><div class="scroll-dot"></div></div>
                <span class="scroll-label">Desliza</span>
            </div>
        </div>

        <div ref="cuerpoRef" class="iglesia-body">
            <!-- ENCABEZADO -->
            <div class="seccion-header" data-aos="fade-up">
                <div class="ornamento">
                    <Sparkles :size="16" class="orn-icon" />
                    <Church :size="24" class="orn-icon-center" />
                    <Sparkles :size="16" class="orn-icon" />
                </div>
                <h2 class="seccion-titulo">Lugar de la Ceremonia</h2>
                <p class="seccion-sub">Te esperamos para celebrar juntos este momento de gracia</p>
            </div>

            <!-- CARD IGLESIA -->
            <div class="iglesia-card" data-aos="fade-up" data-aos-delay="100">
                <!-- Galería -->
                <div class="galeria">
                    <div
                        class="galeria-principal"
                        :style="{ backgroundImage: `url(${fotos[fotoActiva]})` }"
                    >
                        <button class="galeria-arrow left" @click="prevFoto" aria-label="Anterior">
                            <ChevronLeft :size="20" />
                        </button>
                        <button
                            class="galeria-arrow right"
                            @click="nextFoto"
                            aria-label="Siguiente"
                        >
                            <ChevronRight :size="20" />
                        </button>
                        <div class="galeria-dots">
                            <button
                                v-for="(_, i) in fotos"
                                :key="i"
                                class="galeria-dot"
                                :class="{ activo: fotoActiva === i }"
                                @click="fotoActiva = i"
                                :aria-label="`Foto ${i + 1}`"
                            ></button>
                        </div>
                        <div class="galeria-overlay-bottom">
                            <span class="galeria-badge">
                                <MapPin :size="12" class="inline-icon" />
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
                            :aria-label="`Ver foto ${i + 1}`"
                        ></button>
                    </div>
                </div>

                <!-- Info -->
                <div class="iglesia-info">
                    <div class="info-nombre-bloque">
                        <div class="info-badge-iglesia">
                            <Church :size="12" />
                            Iglesia Católica
                        </div>
                        <h3 class="info-nombre">{{ nombreIglesia }}</h3>
                    </div>
                    <div class="info-grid">
                        <div
                            class="info-item"
                            v-for="(dato, idx) in datosIglesia"
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
                    <div class="acciones" data-aos="fade-up" data-aos-delay="330">
                        <a
                            :href="googleMapsUrl"
                            target="_blank"
                            rel="noopener"
                            class="btn-accion primario"
                        >
                            <Navigation :size="15" />
                            Cómo llegar
                        </a>
                        <a
                            :href="`https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`"
                            target="_blank"
                            rel="noopener"
                            class="btn-accion secundario"
                        >
                            <Share2 :size="15" />
                            Compartir
                        </a>
                    </div>
                    <button
                        class="btn-confirmar"
                        @click="irARSVP"
                        data-aos="zoom-in-up"
                        data-aos-delay="390"
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
                        <Compass :size="21" class="mapa-svg" />
                    </div>
                    <div class="mapa-header-texto">
                        <h4 class="mapa-titulo">Cómo llegar</h4>
                        <p class="mapa-sub">{{ direccion }}</p>
                    </div>
                    <a :href="googleMapsUrl" target="_blank" rel="noopener" class="mapa-abrir-btn">
                        Abrir
                        <ExternalLink :size="11" class="inline-icon" style="margin-left: 3px" />
                    </a>
                </div>
                <div class="mapa-frame-wrap">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.9132176643297!2d-66.1675589108469!3d-17.36790841593695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3743f9616da71%3A0x1533a314ede96e1c!2sIglesia%20Santa%20Ana%20de%20Cala%20Cala!5e0!3m2!1ses!2sbo!4v1773672218714!5m2!1ses!2sbo"
                        class="mapa-iframe"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Iglesia Santa Ana de Cala Cala"
                    ></iframe>
                    <div class="mapa-pin-badge">
                        <MapPin :size="17" class="pin-svg" fill="currentColor" />
                    </div>
                </div>
                <div class="mapa-acciones">
                    <a :href="googleMapsUrl" target="_blank" rel="noopener" class="mapa-btn-ruta">
                        <Navigation :size="14" />
                        Ver ruta completa
                    </a>
                    <a
                        href="https://maps.app.goo.gl/zpM5F3g2rF5BQYkw8"
                        target="_blank"
                        rel="noopener"
                        class="mapa-btn-goo"
                    >
                        <MapPin :size="14" />
                        Abrir en Google Maps
                    </a>
                </div>
                <div class="transporte-grid">
                    <div
                        class="transporte-item"
                        v-for="(t, idx) in transportes"
                        :key="t.titulo"
                        data-aos="fade-up"
                        :data-aos-delay="180 + idx * 70"
                    >
                        <div class="transporte-icon-wrap">
                            <component :is="t.iconComp" :size="21" class="trans-svg" />
                        </div>
                        <div class="trans-texto">
                            <p class="transporte-titulo">{{ t.titulo }}</p>
                            <p class="transporte-desc">{{ t.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CITA BÍBLICA -->
            <div class="cita-bloque" data-aos="fade-up" data-aos-delay="100">
                <div class="cita-linea"></div>
                <div class="cita-contenido">
                    <BookOpen :size="26" class="cita-book-icon" />
                    <p class="cita-texto">
                        "Dejen que los niños vengan a mí, y no se lo impidan, porque el reino de los
                        cielos es de quienes son como ellos."
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
    Flower,
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
    rsvpSectionId: { type: String, default: 'rsvp-section' },
    portadaUrl: { type: String, default: './iglesia1.jpg' },
    fotosIglesia: {
        type: Array,
        default: () => ['./iglesia1.jpg', './iglesia2.jpg', './iglesia3.jpg', './iglesia4.jpg'],
    },
});

const emit = defineEmits(['ir-a-rsvp']);

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

const googleMapsUrl = computed(() => 'https://maps.app.goo.gl/zpM5F3g2rF5BQYkw8');

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
/*
  PALETA (sin :root — scoped no lo soporta):
  rosa       = #c0607a
  rosa-deep  = #7a2e48
  rosa-pale  = rgba(255,235,242,0.88)
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

.iglesia-section {
    font-family: 'EB Garamond', serif;
    color: #3d2030;
    position: relative;
    background: linear-gradient(180deg, #fdf0f4 0%, #fef8fb 100%);
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
        rgba(22, 4, 12, 0.88) 100%
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
    padding: 2rem 1.25rem;
    gap: 0.9rem;
}

.eyebrow-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.eyebrow-line {
    width: 36px;
    height: 1px;
    background: rgba(255, 215, 180, 0.55);
    flex-shrink: 0;
}
.portada-eyebrow {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 0.85rem;
    color: rgba(255, 215, 180, 0.92);
    letter-spacing: 4px;
    text-transform: uppercase;
    white-space: nowrap;
}
.portada-titulo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.65rem, 5.5vw, 3.6rem);
    font-weight: 700;
    color: #fff;
    letter-spacing: 2px;
    line-height: 1.15;
    text-shadow:
        0 2px 28px rgba(0, 0, 0, 0.7),
        0 0 80px rgba(200, 120, 150, 0.35);
}
.portada-sub {
    font-size: 0.96rem;
    color: rgba(255, 215, 230, 0.88);
    font-style: italic;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
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
    padding: 0.45rem 1rem;
    border-radius: 50px;
    font-family: 'EB Garamond', serif;
    font-size: 0.86rem;
    letter-spacing: 0.5px;
    transition: background 0.2s;
    min-height: 40px;
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
    margin-top: 0.3rem;
    padding: 0.9rem 2.2rem;
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
    opacity: 0.85;
    animation: fade-in-scroll 1s ease 1.8s both;
    -webkit-tap-highlight-color: transparent;
}
@keyframes fade-in-scroll {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(12px);
    }
    to {
        opacity: 0.85;
        transform: translateX(-50%) translateY(0);
    }
}
.scroll-track {
    width: 26px;
    height: 42px;
    border: 2px solid rgba(255, 255, 255, 0.5);
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
    color: rgba(255, 255, 255, 0.6);
}

/* ═══ CUERPO ═══ */
.iglesia-body {
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
    font-size: clamp(1.55rem, 4vw, 2.4rem);
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

/* ═══ CARD IGLESIA ═══ */
.iglesia-card {
    background: rgba(253, 248, 245, 0.82);
    backdrop-filter: blur(18px);
    border-radius: 26px;
    border: 1px solid rgba(192, 96, 122, 0.22);
    box-shadow:
        0 16px 60px rgba(140, 50, 80, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
}

/* Galería */
.galeria {
    position: relative;
}
.galeria-principal {
    width: 100%;
    height: 280px;
    background-size: cover;
    background-position: center;
    position: relative;
    transition: background-image 0.45s ease;
}
.galeria-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.38);
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    z-index: 2;
    -webkit-tap-highlight-color: transparent;
}
.galeria-arrow.left {
    left: 10px;
}
.galeria-arrow.right {
    right: 10px;
}
.galeria-arrow:hover {
    background: rgba(255, 255, 255, 0.42);
}
.galeria-dots {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 2;
}
.galeria-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.45);
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;
    min-width: 8px;
}
.galeria-dot.activo {
    background: white;
    width: 22px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.galeria-overlay-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.8rem 1rem;
    background: linear-gradient(to top, rgba(45, 8, 22, 0.82), transparent);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.galeria-badge {
    color: white;
    font-size: 0.82rem;
    font-style: italic;
    letter-spacing: 0.8px;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    gap: 4px;
}
.galeria-counter {
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.72rem;
    letter-spacing: 1px;
}
.galeria-thumbs {
    display: flex;
    gap: 0.45rem;
    padding: 0.7rem 0.85rem;
    background: rgba(255, 242, 247, 0.78);
    border-bottom: 1px solid rgba(192, 96, 122, 0.22);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}
.galeria-thumbs::-webkit-scrollbar {
    display: none;
}
.thumb {
    flex-shrink: 0;
    width: 60px;
    height: 56px;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    border: 2.5px solid transparent;
    cursor: pointer;
    transition: all 0.22s;
    opacity: 0.52;
    scroll-snap-align: start;
    -webkit-tap-highlight-color: transparent;
}
.thumb.activo {
    border-color: #c0607a;
    opacity: 1;
    transform: scale(1.07);
    box-shadow: 0 3px 14px rgba(192, 96, 122, 0.35);
}
.thumb:hover:not(.activo) {
    opacity: 0.82;
}

/* Info */
.iglesia-info {
    padding: 1.6rem 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
}
.info-nombre-bloque {
    border-bottom: 1px solid rgba(192, 96, 122, 0.22);
    padding-bottom: 0.9rem;
}
.info-badge-iglesia {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.12), rgba(201, 151, 74, 0.1));
    border: 1px solid rgba(192, 96, 122, 0.25);
    color: #7a2e48;
    font-family: 'Cinzel', serif;
    font-size: 0.57rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 0.26rem 0.8rem;
    border-radius: 20px;
    margin-bottom: 0.5rem;
}
.info-nombre {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.2rem, 3.5vw, 1.7rem);
    font-weight: 700;
    color: #7a2e48;
    letter-spacing: 1px;
    line-height: 1.2;
}
.info-diocesis {
    font-size: 0.83rem;
    color: #c9974a;
    font-style: italic;
    letter-spacing: 1.8px;
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    gap: 5px;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
}
.info-item {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    background: rgba(255, 246, 249, 0.92);
    border: 1px solid rgba(210, 160, 175, 0.28);
    border-radius: 15px;
    padding: 0.88rem 0.9rem;
    transition:
        box-shadow 0.2s,
        transform 0.2s;
}
.info-item:hover {
    box-shadow: 0 6px 20px rgba(192, 96, 122, 0.14);
    transform: translateY(-2px);
}
.info-icono-wrap {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.13), rgba(201, 151, 74, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
}
.info-svg {
    color: #7a2e48;
}
.info-texto {
    min-width: 0;
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

/* Vestimenta (oculta, conservada por si se activa) */
.nota-vestimenta {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    background: linear-gradient(135deg, rgba(255, 238, 215, 0.92), rgba(255, 225, 195, 0.74));
    border: 1px solid rgba(200, 155, 100, 0.38);
    border-radius: 15px;
    padding: 0.95rem 1.1rem;
}
.nota-icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: 11px;
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
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #a07030;
    margin-bottom: 3px;
}
.nota-texto {
    font-size: 0.88rem;
    color: #7a5020;
    font-style: italic;
    line-height: 1.55;
}

/* Acciones */
.acciones {
    display: flex;
    gap: 0.75rem;
}
.btn-accion {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.48rem;
    padding: 0.82rem 1rem;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
    cursor: pointer;
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
}
.btn-accion.primario {
    background: linear-gradient(135deg, #e8899a, #c05575);
    color: white;
    border: none;
    box-shadow: 0 4px 18px rgba(192, 85, 117, 0.38);
}
.btn-accion.secundario {
    background: rgba(255, 255, 255, 0.78);
    color: #7a2e48;
    border: 1.5px solid rgba(192, 96, 122, 0.4);
}
.btn-accion:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(192, 85, 117, 0.3);
}

/* Confirmar */
.btn-confirmar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.72rem;
    padding: 1.1rem 1.8rem;
    background: linear-gradient(135deg, #3d1a28 0%, #6e2a45 50%, #9a3d58 100%);
    color: white;
    border: none;
    border-radius: 17px;
    font-family: 'Cinzel', serif;
    font-size: 0.92rem;
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
    min-height: 52px;
    -webkit-tap-highlight-color: transparent;
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
    background: rgba(253, 248, 245, 0.82);
    backdrop-filter: blur(18px);
    border-radius: 26px;
    border: 1px solid rgba(192, 96, 122, 0.22);
    box-shadow:
        0 16px 60px rgba(140, 50, 80, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
}
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
    font-size: 0.74rem;
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
    background: rgba(255, 235, 242, 0.88);
}

.mapa-frame-wrap {
    position: relative;
}
.mapa-iframe {
    width: 100%;
    height: 320px;
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

.mapa-acciones {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    padding: 1rem 1.2rem;
    border-bottom: 1px solid rgba(192, 96, 122, 0.22);
    background: rgba(255, 248, 252, 0.7);
}
.mapa-btn-ruta,
.mapa-btn-goo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.75rem 0.8rem;
    border-radius: 14px;
    font-family: 'Cinzel', serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-decoration: none;
    cursor: pointer;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
    min-height: 46px;
    -webkit-tap-highlight-color: transparent;
}
.mapa-btn-ruta {
    background: linear-gradient(135deg, #e8899a, #c05575);
    color: white;
    box-shadow: 0 4px 16px rgba(192, 85, 117, 0.32);
    border: none;
}
.mapa-btn-goo {
    background: rgba(255, 255, 255, 0.82);
    color: #7a2e48;
    border: 1.5px solid rgba(192, 96, 122, 0.35);
}
.mapa-btn-ruta:hover,
.mapa-btn-goo:hover {
    transform: translateY(-2px);
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
    gap: 0.38rem;
    padding: 1.1rem 0.6rem;
    border-top: 1px solid rgba(192, 96, 122, 0.22);
    border-right: 1px solid rgba(210, 150, 170, 0.15);
    background: rgba(255, 250, 252, 0.62);
    transition: background 0.2s;
}
.transporte-item:hover {
    background: rgba(255, 240, 248, 0.85);
}
.transporte-item:last-child {
    border-right: none;
}
.transporte-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 13px;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.1), rgba(201, 151, 74, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.1rem;
}
.trans-svg {
    color: #7a2e48;
}
.transporte-titulo {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    font-weight: 700;
    color: #7a2e48;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.transporte-desc {
    font-size: 0.7rem;
    color: #8a6070;
    font-style: italic;
    line-height: 1.4;
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
    max-width: 360px;
    flex-shrink: 0;
}
.cita-book-icon {
    color: #c9974a;
    opacity: 0.6;
    margin: 0 auto 0.5rem;
    display: block;
}
.cita-texto {
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    font-style: italic;
    color: #8a6070;
    line-height: 1.65;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
}
.cita-ref {
    font-family: 'Cinzel', serif;
    font-size: 0.68rem;
    color: #c9974a;
    margin-top: 0.45rem;
    letter-spacing: 2px;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 520px) {
    .portada-hero {
        max-height: 640px;
    }
    .portada-titulo {
        font-size: clamp(1.4rem, 5.5vw, 2.2rem);
    }
    .eyebrow-line {
        width: 22px;
    }
    .portada-content {
        gap: 0.75rem;
        padding: 1.5rem 1rem;
    }
    .iglesia-body {
        padding: 2rem 0.75rem 3.2rem;
        gap: 2rem;
    }
    .galeria-principal {
        height: 210px;
    }
    .galeria-arrow {
        width: 38px;
        height: 38px;
    }
    .info-grid {
        grid-template-columns: 1fr;
        gap: 0.6rem;
    }
    .iglesia-info {
        padding: 1.3rem 1.1rem 1.6rem;
    }
    .acciones {
        flex-direction: column;
    }
    .btn-accion {
        min-height: 50px;
    }
    .btn-confirmar {
        font-size: 0.82rem;
        letter-spacing: 1.5px;
    }
    .mapa-iframe {
        height: 260px;
    }
    .mapa-header {
        flex-wrap: wrap;
        gap: 0.6rem;
    }
    .mapa-acciones {
        grid-template-columns: 1fr;
    }
    .transporte-grid {
        grid-template-columns: 1fr;
    }
    .transporte-item {
        flex-direction: row;
        text-align: left;
        gap: 0.85rem;
        border-right: none;
        padding: 0.9rem 1rem;
    }
    .transporte-icon-wrap {
        flex-shrink: 0;
        margin-bottom: 0;
    }
    .cita-bloque {
        flex-direction: column;
        gap: 0.55rem;
    }
    .cita-linea {
        flex: none;
        width: 80px;
        height: 1px;
    }
}
@media (max-width: 360px) {
    .portada-titulo {
        font-size: 1.35rem;
    }
    .info-nombre {
        font-size: 1.15rem;
    }
    .pill {
        font-size: 0.76rem;
        padding: 0.38rem 0.75rem;
    }
    .btn-confirmar {
        font-size: 0.76rem;
        padding: 1rem 1.2rem;
    }
}
@media (prefers-reduced-motion: reduce) {
    .portada-img,
    .cta-arrow-svg,
    .scroll-dot,
    .mapa-pin-badge,
    .btn-confirmar::after {
        animation: none !important;
    }
}
</style>

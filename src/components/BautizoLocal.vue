<template>
    <section class="local-section">
        <!-- ════════════════════════════════════
             PORTADA HERO
        ════════════════════════════════════ -->
        <div class="portada-hero">
            <div
                class="portada-bg"
                :style="{ backgroundImage: `url(${fotosLocal[heroActivo]})` }"
            ></div>
            <div class="portada-overlay"></div>

            <!-- Partículas -->
            <div class="particulas" aria-hidden="true">
                <span v-for="n in 10" :key="n" class="particula" :style="particulaStyle(n)">✦</span>
            </div>

            <div class="portada-content">
                <p class="portada-eyebrow" data-aos="fade-down" data-aos-delay="100">
                    ✦ Recepción & Festejo ✦
                </p>
                <p class="portada-etiqueta" data-aos="fade-down" data-aos-delay="220">
                    Salón de Eventos
                </p>
                <h1 class="portada-nombre" data-aos="zoom-in-up" data-aos-delay="340">
                    {{ nombreLocal }}
                </h1>
                <p class="portada-slogan" data-aos="fade-up" data-aos-delay="460">"{{ slogan }}"</p>

                <div class="portada-pills" data-aos="fade-up" data-aos-delay="580">
                    <span class="pill">
                        <CalendarDays :size="13" class="pill-svg" />15 Abr 2025
                    </span>
                    <span class="pill">
                        <Clock :size="13" class="pill-svg" />A partir de las 3:30 PM
                    </span>
                    <span class="pill">
                        <Users :size="13" class="pill-svg" />{{ capacidad }} invitados
                    </span>
                </div>

                <button
                    class="portada-cta"
                    @click="scrollAbajo"
                    data-aos="fade-up"
                    data-aos-delay="700"
                >
                    <span>Ver detalles</span>
                    <ChevronDown :size="18" class="cta-arrow-svg" />
                </button>
            </div>

            <!-- Controles galería hero -->
            <div class="portada-controls">
                <button class="ctrl-btn" @click="prevFoto">
                    <ChevronLeft :size="16" />
                </button>
                <div class="ctrl-dots">
                    <button
                        v-for="(f, i) in fotosLocal"
                        :key="i"
                        class="dot"
                        :class="{ activo: heroActivo === i }"
                        @click="
                            heroActivo = i;
                            resetTimer();
                        "
                    ></button>
                </div>
                <button class="ctrl-btn" @click="nextFoto">
                    <ChevronRight :size="16" />
                </button>
            </div>

            <div class="scroll-mouse">
                <div class="scroll-dot"></div>
            </div>
        </div>

        <!-- ════════════════════════════════════
             CUERPO
        ════════════════════════════════════ -->
        <div ref="cuerpoRef" class="local-body">
            <!-- ENCABEZADO -->
            <div class="seccion-header" data-aos="fade-up">
                <div class="ornamento">
                    <Sparkles :size="15" class="orn-icon" />
                    <GlassWater :size="22" class="orn-icon-center" />
                    <Sparkles :size="15" class="orn-icon" />
                </div>
                <h2 class="seccion-titulo">Recepción & Festejo</h2>
                <p class="seccion-sub">
                    A continuación de la Misa · Continúa la celebración con nosotros
                </p>
                <div class="aviso-misa" data-aos="zoom-in" data-aos-delay="150">
                    <Church :size="16" class="aviso-icon" />
                    <span
                        >La recepción inicia tras la Misa de Bautizo a las
                        <strong>2:45 PM</strong></span
                    >
                </div>
                <div class="linea-deco">
                    <span class="linea-trazo"></span>
                    <span class="linea-flor">🌸</span>
                    <span class="linea-trazo"></span>
                </div>
            </div>

            <!-- TARJETA PRINCIPAL -->
            <div class="local-card" data-aos="fade-up" data-aos-delay="100">
                <!-- Info rápida -->
                <div class="quick-info">
                    <div
                        class="qi-item"
                        v-for="(q, idx) in quickInfo"
                        :key="q.label"
                        data-aos="fade-up"
                        :data-aos-delay="80 + idx * 55"
                    >
                        <div class="qi-icon-wrap">
                            <component :is="q.iconComp" :size="18" class="qi-svg" />
                        </div>
                        <p class="qi-label">{{ q.label }}</p>
                        <p class="qi-valor">{{ q.valor }}</p>
                    </div>
                </div>

                <!-- PROGRAMA TIMELINE -->
                <div class="bloque programa-bloque">
                    <div class="bloque-titulo">
                        <div class="bloque-icon-wrap">
                            <CalendarClock :size="17" class="bloque-svg" />
                        </div>
                        <h4>Programa de la Recepción</h4>
                    </div>

                    <div class="timeline">
                        <div
                            class="tl-item"
                            v-for="(evento, i) in programa"
                            :key="i"
                            :class="{ destacado: evento.destacado }"
                            data-aos="fade-right"
                            :data-aos-delay="60 + i * 55"
                        >
                            <div class="tl-hora">{{ evento.hora }}</div>
                            <div class="tl-linea">
                                <div class="tl-punto"></div>
                                <div class="tl-trazo" v-if="i < programa.length - 1"></div>
                            </div>
                            <div class="tl-detalle">
                                <div
                                    class="tl-icon-wrap"
                                    :class="{ 'tl-icon-destacado': evento.destacado }"
                                >
                                    <component :is="evento.iconComp" :size="15" class="tl-svg" />
                                </div>
                                <div>
                                    <p class="tl-nombre">{{ evento.nombre }}</p>
                                    <p class="tl-desc" v-if="evento.desc">{{ evento.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AMENIDADES -->
                <div class="bloque amenidades-bloque">
                    <div class="bloque-titulo">
                        <div class="bloque-icon-wrap">
                            <Star :size="17" class="bloque-svg" />
                        </div>
                        <h4>Incluye en la Recepción</h4>
                    </div>
                    <div class="amenidades-grid">
                        <div
                            class="amen-item"
                            v-for="(a, idx) in amenidades"
                            :key="a.texto"
                            data-aos="zoom-in"
                            :data-aos-delay="50 + idx * 40"
                        >
                            <div class="amen-icon-wrap">
                                <component :is="a.iconComp" :size="20" class="amen-svg" />
                            </div>
                            <span class="amen-texto">{{ a.texto }}</span>
                        </div>
                    </div>
                </div>

                <!-- DRESS CODE -->
                <div class="dresscode-banner" data-aos="fade-up">
                    <div class="dc-left">
                        <div class="dc-icon-wrap">
                            <Shirt :size="20" class="dc-svg" />
                        </div>
                        <div>
                            <p class="dc-label">Código de Vestimenta</p>
                            <p class="dc-valor">{{ dresscode }}</p>
                        </div>
                    </div>
                    <div class="dc-colores">
                        <span
                            v-for="color in coloresSugeridos"
                            :key="color"
                            class="dc-chip"
                            :style="{ background: color }"
                        ></span>
                    </div>
                </div>

                <!-- CONFIRMACIÓN + CONTACTOS -->
                <div class="bloque confirmacion-bloque">
                    <div class="bloque-titulo">
                        <div class="bloque-icon-wrap">
                            <ClipboardList :size="17" class="bloque-svg" />
                        </div>
                        <h4>Confirmar Asistencia</h4>
                    </div>
                    <p class="confirm-texto">
                        Por favor confirma antes del <strong>{{ fechaLimite }}</strong>
                    </p>
                    <div class="contactos">
                        <a
                            :href="`tel:${telefonoPapa}`"
                            class="contacto-btn tel"
                            data-aos="fade-right"
                            data-aos-delay="100"
                        >
                            <div class="ct-icon-wrap tel-wrap">
                                <Phone :size="18" class="ct-svg" />
                            </div>
                            <div>
                                <p class="ct-label">Llamar a Papá</p>
                                <p class="ct-val">{{ telefonoPapa }}</p>
                            </div>
                        </a>
                        <a
                            :href="`https://wa.me/${whatsappMama}`"
                            target="_blank"
                            class="contacto-btn wa"
                            data-aos="fade-left"
                            data-aos-delay="100"
                        >
                            <div class="ct-icon-wrap wa-wrap">
                                <MessageCircle :size="18" class="ct-svg" />
                            </div>
                            <div>
                                <p class="ct-label">WhatsApp Mamá</p>
                                <p class="ct-val">{{ telefonoMama }}</p>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- BOTONES -->
                <div class="acciones-local">
                    <a
                        :href="mapsUrl"
                        target="_blank"
                        class="btn-local maps"
                        data-aos="fade-up"
                        data-aos-delay="80"
                    >
                        <Navigation :size="15" /> Ver en Google Maps
                    </a>
                    <a
                        :href="whatsappInvitacion"
                        target="_blank"
                        class="btn-local compartir"
                        data-aos="fade-up"
                        data-aos-delay="160"
                    >
                        <Share2 :size="15" /> Compartir
                    </a>
                </div>
            </div>

            <!-- GALERÍA -->
            <div class="galeria-card" data-aos="fade-up" data-aos-delay="120">
                <div class="galeria-header">
                    <div class="galeria-icon-wrap">
                        <Camera :size="20" class="galeria-svg" />
                    </div>
                    <div>
                        <h4 class="galeria-titulo">{{ nombreLocal }}</h4>
                        <p class="galeria-sub">Galería del Salón</p>
                    </div>
                </div>

                <div
                    class="galeria-grande"
                    :style="{ backgroundImage: `url(${fotosLocal[galeriaActiva]})` }"
                >
                    <button class="gal-arrow left" @click="prevGaleria">
                        <ChevronLeft :size="20" />
                    </button>
                    <button class="gal-arrow right" @click="nextGaleria">
                        <ChevronRight :size="20" />
                    </button>
                    <div class="gal-counter">{{ galeriaActiva + 1 }} / {{ fotosLocal.length }}</div>
                </div>

                <div class="galeria-thumbs">
                    <button
                        v-for="(foto, i) in fotosLocal"
                        :key="i"
                        class="gal-thumb"
                        :class="{ activo: galeriaActiva === i }"
                        :style="{ backgroundImage: `url(${foto})` }"
                        @click="galeriaActiva = i"
                    ></button>
                </div>
            </div>

            <!-- MAPA -->
            <div class="mapa-card" data-aos="fade-up" data-aos-delay="140">
                <div class="mapa-header">
                    <div class="mapa-icon-wrap">
                        <MapPin :size="20" class="mapa-svg" />
                    </div>
                    <div>
                        <h4 class="mapa-titulo">{{ nombreLocal }}</h4>
                        <p class="mapa-dir">{{ direccionLocal }}</p>
                    </div>
                    <a :href="mapsUrl" target="_blank" class="mapa-abrir">
                        Abrir <ExternalLink :size="11" style="display: inline; margin-left: 2px" />
                    </a>
                </div>
                <div class="mapa-frame-wrap">
                    <iframe
                        :src="mapsEmbed"
                        class="mapa-iframe"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div class="mapa-ping">
                        <MapPin :size="18" class="ping-svg" />
                    </div>
                </div>
                <div class="parking-nota">
                    <div class="parking-icon-wrap">
                        <ParkingCircle :size="18" class="parking-svg" />
                    </div>
                    <p>{{ notaParking }}</p>
                </div>
            </div>

            <!-- PIE -->
            <div class="local-pie" data-aos="fade-up" data-aos-delay="100">
                <div class="pie-deco">
                    <Sparkles :size="13" class="pie-spark" />
                    <Sparkles :size="13" class="pie-spark" />
                    <Sparkles :size="13" class="pie-spark" />
                </div>
                <p class="pie-mensaje">{{ mensajePie }}</p>
                <p class="pie-firma">— {{ firmaFamilia }}</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import AOS from 'aos';
import {
    CalendarDays,
    Clock,
    Users,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Church,
    Sparkles,
    GlassWater,
    CalendarClock,
    Star,
    Shirt,
    ClipboardList,
    Phone,
    MessageCircle,
    Navigation,
    Share2,
    Camera,
    MapPin,
    ExternalLink,
    ParkingCircle,
    UtensilsCrossed,
    Cake,
    Music2,
    Image,
    Gift,
    Car,
    Waves,
    PartyPopper,
} from 'lucide-vue-next';

const props = defineProps({
    nombreLocal: { type: String, default: 'Salón Los Jardines' },
    slogan: { type: String, default: 'Donde los recuerdos florecen' },
    direccionLocal: { type: String, default: 'Calle Rosales 456, Cala Cala, Cochabamba' },
    capacidad: { type: Number, default: 120 },
    dresscode: { type: String, default: 'Elegante · Tonos pastel y blancos' },
    fechaLimite: { type: String, default: '10 de Abril de 2025' },
    telefonoPapa: { type: String, default: '+591 7XXXXXXX' },
    telefonoMama: { type: String, default: '+591 7XXXXXXX' },
    whatsappMama: { type: String, default: '591XXXXXXXXX' },
    notaParking: {
        type: String,
        default: 'Estacionamiento gratuito disponible en el predio del salón y calles aledañas.',
    },
    mensajePie: {
        type: String,
        default:
            'Con todo nuestro amor, los esperamos para celebrar este día tan especial junto a ustedes.',
    },
    firmaFamilia: { type: String, default: 'La Familia Castro Luna' },
    latitud: { type: Number, default: -17.3895 },
    longitud: { type: Number, default: -66.1568 },
    coloresSugeridos: {
        type: Array,
        default: () => ['#f9e4eb', '#fce8d4', '#dff0e8', '#e8e4f9', '#fff5cc'],
    },
    fotosLocal: {
        type: Array,
        default: () => [
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=90',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=90',
            'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=90',
            'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&q=90',
        ],
    },
});

// Hero autoplay
const heroActivo = ref(0);
const galeriaActiva = ref(0);

function nextFoto() {
    heroActivo.value = (heroActivo.value + 1) % props.fotosLocal.length;
}
function prevFoto() {
    heroActivo.value = (heroActivo.value - 1 + props.fotosLocal.length) % props.fotosLocal.length;
}
function nextGaleria() {
    galeriaActiva.value = (galeriaActiva.value + 1) % props.fotosLocal.length;
}
function prevGaleria() {
    galeriaActiva.value =
        (galeriaActiva.value - 1 + props.fotosLocal.length) % props.fotosLocal.length;
}

let timer;
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextFoto, 4500);
}
onMounted(() => {
    resetTimer();
    AOS.refresh();
});
onUnmounted(() => clearInterval(timer));

const cuerpoRef = ref(null);
function scrollAbajo() {
    cuerpoRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function particulaStyle(n) {
    const pos = [
        { top: '10%', left: '4%' },
        { top: '18%', right: '6%' },
        { top: '30%', left: '2%' },
        { top: '40%', right: '3%' },
        { top: '60%', left: '5%' },
        { top: '72%', right: '5%' },
        { top: '14%', left: '15%' },
        { top: '22%', right: '12%' },
        { top: '50%', left: '1%' },
        { top: '55%', right: '1%' },
    ];
    const p = pos[(n - 1) % pos.length];
    const delay = ((n * 0.65) % 3).toFixed(1);
    const size = (0.65 + (n % 3) * 0.22).toFixed(2);
    return { ...p, position: 'absolute', animationDelay: `${delay}s`, fontSize: `${size}rem` };
}

// Info rápida con íconos Lucide
const quickInfo = [
    { iconComp: Clock, label: 'Inicio', valor: '~3:30 PM' },
    { iconComp: CalendarDays, label: 'Fecha', valor: '15 Abr 2025' },
    { iconComp: Church, label: 'Tras la', valor: 'Misa 2:45 PM' },
    { iconComp: MapPin, label: 'Zona', valor: 'Cala Cala' },
];

// Programa con íconos Lucide (tras la misa de 2:45 PM)
const programa = [
    {
        hora: '3:00',
        iconComp: Car,
        nombre: 'Llegada de invitados',
        desc: 'Recibimiento con cóctel de bienvenida',
        destacado: false,
    },
    {
        hora: '3:30',
        iconComp: UtensilsCrossed,
        nombre: 'Almuerzo de celebración',
        desc: 'Menú especial para adultos y niños',
        destacado: true,
    },
    {
        hora: '5:00',
        iconComp: Cake,
        nombre: 'Pastel de Bautizo',
        desc: 'Momento de corte y brindis familiar',
        destacado: true,
    },
    {
        hora: '5:30',
        iconComp: Image,
        nombre: 'Sesión de fotos',
        desc: 'Recuerdos con la familia y padrinos',
        destacado: false,
    },
    {
        hora: '6:00',
        iconComp: Music2,
        nombre: 'Música y baile',
        desc: 'Animación y sorpresas para los niños',
        destacado: false,
    },
    {
        hora: '7:30',
        iconComp: Gift,
        nombre: 'Recuerditos',
        desc: 'Entrega de souvenirs para los invitados',
        destacado: false,
    },
    {
        hora: '8:00',
        iconComp: PartyPopper,
        nombre: 'Cierre del festejo',
        desc: null,
        destacado: false,
    },
];

// Amenidades con íconos Lucide
const amenidades = [
    { iconComp: UtensilsCrossed, texto: 'Almuerzo completo' },
    { iconComp: Cake, texto: 'Pastel de celebración' },
    { iconComp: Waves, texto: 'Brindis y bebidas' },
    { iconComp: Music2, texto: 'DJ y animación' },
    { iconComp: Sparkles, texto: 'Decoración temática' },
    { iconComp: Camera, texto: 'Fotógrafo profesional' },
    { iconComp: Star, texto: 'Zona para niños' },
    { iconComp: Gift, texto: 'Souvenir por invitado' },
];

const mapsUrl = computed(
    () => `https://www.google.com/maps/search/?api=1&query=${props.latitud},${props.longitud}`
);
const mapsEmbed = computed(
    () => `https://maps.google.com/maps?q=${props.latitud},${props.longitud}&z=16&output=embed`
);
const whatsappInvitacion = computed(
    () =>
        `https://wa.me/?text=${encodeURIComponent(
            `🌸 ¡Estás invitado al Bautizo de Keila Tamara Castro Luna!\n\n🥂 Recepción en ${props.nombreLocal}\n📍 ${props.direccionLocal}\n🕐 A partir de las 3:30 PM · Sábado 15 de Abril 2025\n(Tras la Misa a las 2:45 PM en Iglesia Santa Ana de Cala Cala)\n\nVer ubicación: ${mapsUrl.value}`
        )}`
);
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

.local-section {
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
    min-height: 580px;
    max-height: 800px;
    overflow: hidden;
}

.portada-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: background-image 0.8s ease;
    animation: kenburns 16s ease-in-out infinite alternate;
}

@keyframes kenburns {
    from {
        transform: scale(1) translateX(0);
    }
    to {
        transform: scale(1.09) translateX(-1.5%);
    }
}

.portada-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        160deg,
        rgba(45, 12, 28, 0.52) 0%,
        rgba(80, 22, 48, 0.7) 55%,
        rgba(22, 5, 14, 0.87) 100%
    );
}

.particulas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}
.particula {
    color: rgba(255, 218, 165, 0.45);
    animation: flotar-p 4s ease-in-out infinite alternate;
}
@keyframes flotar-p {
    from {
        transform: translateY(0) rotate(0deg);
        opacity: 0.3;
    }
    to {
        transform: translateY(-14px) rotate(12deg);
        opacity: 0.72;
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
    gap: 0.9rem;
}

.portada-eyebrow {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 1rem;
    color: rgba(255, 218, 175, 0.92);
    letter-spacing: 5px;
    text-transform: uppercase;
}

.portada-etiqueta {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(255, 200, 160, 0.8);
}

.portada-nombre {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.8rem, 6.5vw, 4rem);
    font-weight: 700;
    color: #fff;
    letter-spacing: 3px;
    line-height: 1.1;
    text-shadow:
        0 2px 28px rgba(0, 0, 0, 0.72),
        0 0 80px rgba(210, 130, 165, 0.4);
}

.portada-slogan {
    font-family: 'EB Garamond', serif;
    font-size: 1.05rem;
    font-style: italic;
    color: rgba(255, 215, 230, 0.85);
    letter-spacing: 2px;
}

.portada-pills {
    display: flex;
    gap: 0.65rem;
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
    padding: 0.46rem 1.05rem;
    border-radius: 50px;
    font-family: 'EB Garamond', serif;
    font-size: 0.87rem;
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
    margin-top: 0.3rem;
    padding: 0.88rem 2.4rem;
    background: linear-gradient(135deg, rgba(210, 110, 145, 0.9), rgba(148, 45, 80, 0.94));
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 190, 215, 0.35);
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

/* Controles */
.portada-controls {
    position: absolute;
    bottom: 58px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
}
.ctrl-btn {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}
.ctrl-btn:hover {
    background: rgba(255, 255, 255, 0.42);
}
.ctrl-dots {
    display: flex;
    gap: 6px;
}
.dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.38);
    border: none;
    cursor: pointer;
    transition:
        background 0.2s,
        transform 0.2s;
}
.dot.activo {
    background: white;
    transform: scale(1.35);
}

.scroll-mouse {
    position: absolute;
    bottom: 18px;
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
.local-body {
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
    font-size: 1rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-top: 0.4rem;
}

/* Aviso misa */
.aviso-misa {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    margin-top: 0.75rem;
    padding: 0.55rem 1.3rem;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.1), rgba(201, 151, 74, 0.1));
    border: 1px solid rgba(192, 96, 122, 0.28);
    border-radius: 50px;
    font-family: 'EB Garamond', serif;
    font-size: 0.9rem;
    color: var(--texto);
    font-style: italic;
}
.aviso-misa strong {
    color: var(--rosa);
    font-style: normal;
    font-weight: 700;
}
.aviso-icon {
    color: var(--dorado);
    flex-shrink: 0;
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

/* ═══ TARJETA ═══ */
.local-card {
    background: var(--card-bg);
    backdrop-filter: var(--blur);
    border-radius: var(--radius);
    border: 1px solid var(--borde);
    box-shadow:
        var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
}

/* Quick info */
.quick-info {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid var(--borde);
}
.qi-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.1rem 0.5rem;
    gap: 0.3rem;
    border-right: 1px solid var(--borde);
}
.qi-item:last-child {
    border-right: none;
}
.qi-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.12), rgba(201, 151, 74, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.1rem;
}
.qi-svg {
    color: var(--rosa-deep);
}
.qi-label {
    font-family: 'Cinzel', serif;
    font-size: 0.52rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--dorado);
}
.qi-valor {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--texto);
    line-height: 1.2;
}

/* Bloques */
.bloque {
    padding: 1.6rem 1.8rem;
    border-bottom: 1px solid var(--borde);
}
.bloque:last-of-type {
    border-bottom: none;
}

.bloque-titulo {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1.1rem;
}
.bloque-icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.13), rgba(201, 151, 74, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
}
.bloque-svg {
    color: var(--rosa-deep);
}
.bloque-titulo h4 {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--rosa-deep);
    letter-spacing: 1px;
}

/* Timeline */
.timeline {
    display: flex;
    flex-direction: column;
}

.tl-item {
    display: grid;
    grid-template-columns: 52px 24px 1fr;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.42rem 0;
}
.tl-item.destacado .tl-hora {
    color: var(--rosa);
    font-weight: 800;
}
.tl-item.destacado .tl-punto {
    width: 14px;
    height: 14px;
    background: var(--rosa);
    box-shadow: 0 0 0 3px rgba(192, 96, 122, 0.22);
}

.tl-hora {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--texto-soft);
    text-align: right;
    padding-top: 4px;
}

.tl-linea {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tl-punto {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(192, 96, 122, 0.5);
    flex-shrink: 0;
    margin-top: 5px;
}
.tl-trazo {
    flex: 1;
    width: 2px;
    min-height: 26px;
    background: linear-gradient(to bottom, rgba(192, 96, 122, 0.35), rgba(192, 96, 122, 0.08));
}

.tl-detalle {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    padding-bottom: 0.25rem;
}

.tl-icon-wrap {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    flex-shrink: 0;
    background: rgba(255, 246, 249, 0.9);
    border: 1px solid rgba(210, 160, 175, 0.28);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
}
.tl-icon-destacado {
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.15), rgba(192, 96, 122, 0.08));
    border-color: rgba(192, 96, 122, 0.3);
}
.tl-svg {
    color: var(--rosa-deep);
}
.tl-nombre {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--texto);
    line-height: 1.2;
}
.tl-desc {
    font-size: 0.74rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-top: 2px;
}

/* Amenidades */
.amenidades-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.65rem;
}
.amen-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: var(--rosa-pale);
    border-radius: 16px;
    padding: 0.9rem 0.4rem;
    border: 1px solid rgba(210, 160, 175, 0.3);
    gap: 0.35rem;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}
.amen-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(192, 96, 122, 0.18);
}
.amen-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 13px;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.14), rgba(201, 151, 74, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
}
.amen-svg {
    color: var(--rosa-deep);
}
.amen-texto {
    font-family: 'Cinzel', serif;
    font-size: 0.56rem;
    color: var(--texto);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.3px;
    text-transform: uppercase;
}

/* Dress code */
.dresscode-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem 1.8rem;
    background: linear-gradient(135deg, rgba(255, 238, 215, 0.9), rgba(255, 225, 195, 0.72));
    border-top: 1px solid var(--borde);
    border-bottom: 1px solid var(--borde);
    gap: 1rem;
}
.dc-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.dc-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    flex-shrink: 0;
    background: rgba(200, 150, 70, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;
}
.dc-svg {
    color: #a07030;
}
.dc-label {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #a07030;
    margin-bottom: 2px;
}
.dc-valor {
    font-size: 0.9rem;
    font-weight: 600;
    color: #6a4010;
}
.dc-colores {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
}
.dc-chip {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2.5px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
}

/* Confirmación */
.confirm-texto {
    font-size: 0.88rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-bottom: 1rem;
}
.confirm-texto strong {
    color: var(--rosa);
    font-style: normal;
}

.contactos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
}

.contacto-btn {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.9rem 1rem;
    border-radius: 16px;
    text-decoration: none;
    border: 1px solid var(--borde);
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}
.contacto-btn.tel {
    background: rgba(255, 240, 248, 0.9);
}
.contacto-btn.wa {
    background: rgba(218, 255, 232, 0.9);
    border-color: rgba(80, 185, 120, 0.3);
}
.contacto-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.ct-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.tel-wrap {
    background: rgba(192, 96, 122, 0.12);
}
.wa-wrap {
    background: rgba(37, 211, 102, 0.14);
}
.ct-svg {
    color: var(--rosa-deep);
}
.wa-wrap .ct-svg {
    color: #1a9e4c;
}
.ct-label {
    font-family: 'Cinzel', serif;
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--texto-soft);
    margin-bottom: 2px;
}
.ct-val {
    font-size: 0.87rem;
    font-weight: 600;
    color: var(--texto);
}

/* Botones */
.acciones-local {
    display: flex;
    gap: 0.8rem;
    padding: 1.4rem 1.8rem;
}
.btn-local {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}
.btn-local.maps {
    background: linear-gradient(135deg, #e8899a, #c05575);
    color: white;
    border: none;
    box-shadow: 0 4px 18px rgba(192, 85, 117, 0.38);
}
.btn-local.compartir {
    background: rgba(255, 255, 255, 0.8);
    color: var(--rosa-deep);
    border: 1.5px solid rgba(192, 96, 122, 0.4);
}
.btn-local:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(192, 85, 117, 0.32);
}

/* ═══ GALERÍA ═══ */
.galeria-card {
    background: var(--card-bg);
    backdrop-filter: var(--blur);
    border-radius: var(--radius);
    border: 1px solid var(--borde);
    box-shadow:
        var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
}
.galeria-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1.1rem 1.5rem;
    background: rgba(255, 243, 248, 0.78);
    border-bottom: 1px solid var(--borde);
}
.galeria-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 13px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.14), rgba(201, 151, 74, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
}
.galeria-svg {
    color: var(--rosa-deep);
}
.galeria-titulo {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: var(--rosa-deep);
    font-weight: 700;
    letter-spacing: 1px;
}
.galeria-sub {
    font-size: 0.77rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-top: 1px;
}

.galeria-grande {
    width: 100%;
    height: 320px;
    background-size: cover;
    background-position: center;
    position: relative;
    transition: background-image 0.45s ease;
}
.gal-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(6px);
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
.gal-arrow.left {
    left: 14px;
}
.gal-arrow.right {
    right: 14px;
}
.gal-arrow:hover {
    background: rgba(255, 255, 255, 0.45);
}
.gal-counter {
    position: absolute;
    bottom: 12px;
    right: 16px;
    color: rgba(255, 255, 255, 0.8);
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    letter-spacing: 1px;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}
.galeria-thumbs {
    display: flex;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    background: rgba(255, 242, 247, 0.72);
    overflow-x: auto;
}
.gal-thumb {
    flex-shrink: 0;
    width: 80px;
    height: 60px;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    border: 2.5px solid transparent;
    cursor: pointer;
    transition: all 0.22s;
    opacity: 0.55;
}
.gal-thumb.activo {
    border-color: var(--rosa);
    opacity: 1;
    transform: scale(1.06);
    box-shadow: 0 3px 14px rgba(192, 96, 122, 0.32);
}
.gal-thumb:hover:not(.activo) {
    opacity: 0.82;
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
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.14), rgba(201, 151, 74, 0.1));
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
.mapa-dir {
    font-size: 0.77rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-top: 2px;
}
.mapa-abrir {
    margin-left: auto;
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
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
.mapa-abrir:hover {
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
.mapa-ping {
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
    animation: latir 2s ease-in-out infinite;
    pointer-events: none;
}
.ping-svg {
    color: var(--rosa);
}
@keyframes latir {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
}

.parking-nota {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    padding: 0.95rem 1.5rem;
    background: rgba(255, 250, 225, 0.8);
    border-top: 1px solid rgba(210, 185, 120, 0.35);
}
.parking-icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    flex-shrink: 0;
    background: rgba(200, 175, 80, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
}
.parking-svg {
    color: #7a6020;
}
.parking-nota p {
    font-size: 0.82rem;
    color: #7a6020;
    font-style: italic;
    line-height: 1.5;
}

/* ═══ PIE ═══ */
.local-pie {
    text-align: center;
    padding: 0.5rem 1rem 1rem;
}
.pie-deco {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.7rem;
}
.pie-spark {
    color: var(--dorado);
}
.pie-mensaje {
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    font-style: italic;
    color: var(--texto-soft);
    line-height: 1.75;
    max-width: 420px;
    margin: 0 auto;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
}
.pie-firma {
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    color: var(--rosa);
    margin-top: 0.55rem;
    font-weight: 600;
    letter-spacing: 1px;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 540px) {
    .portada-hero {
        max-height: 680px;
    }
    .portada-nombre {
        font-size: clamp(1.6rem, 6vw, 2.5rem);
    }
    .quick-info {
        grid-template-columns: repeat(2, 1fr);
    }
    .qi-item:nth-child(2) {
        border-right: none;
    }
    .qi-item:nth-child(3) {
        border-top: 1px solid var(--borde);
    }
    .amenidades-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .contactos {
        grid-template-columns: 1fr;
    }
    .acciones-local {
        flex-direction: column;
        padding: 1.2rem;
    }
    .bloque {
        padding: 1.3rem 1.2rem;
    }
    .dresscode-banner {
        flex-direction: column;
        align-items: flex-start;
    }
    .galeria-grande {
        height: 230px;
    }
    .gal-thumb {
        width: 65px;
        height: 50px;
    }
    .aviso-misa {
        font-size: 0.82rem;
        padding: 0.5rem 1rem;
    }
    .tl-item {
        grid-template-columns: 46px 22px 1fr;
    }
}

@media (max-width: 360px) {
    .amenidades-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .pill {
        font-size: 0.78rem;
        padding: 0.38rem 0.75rem;
    }
    .quick-info {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

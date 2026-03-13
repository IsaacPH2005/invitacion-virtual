<template>
    <section class="rsvp-section">
        <!-- ════════════════════════════════════
             PORTADA HERO
        ════════════════════════════════════ -->
        <div class="portada-hero">
            <div class="portada-bg"></div>
            <div class="portada-overlay"></div>

            <div class="particulas" aria-hidden="true">
                <span v-for="n in 12" :key="n" class="particula" :style="particulaStyle(n)">✦</span>
            </div>

            <div class="portada-content">
                <!-- Sobre animado -->
                <div class="portada-sobre-wrap" data-aos="zoom-in" data-aos-delay="100">
                    <Mail :size="52" class="portada-sobre-svg" />
                    <div class="sobre-glow"></div>
                </div>

                <p class="portada-eyebrow" data-aos="fade-down" data-aos-delay="220">
                    ✦ Bautizo de Keila Tamara ✦
                </p>
                <h1 class="portada-titulo" data-aos="zoom-in-up" data-aos-delay="340">
                    Confirma tu<br />Asistencia
                </h1>
                <p class="portada-sub" data-aos="fade-up" data-aos-delay="460">
                    Tu presencia es nuestro mejor regalo
                </p>

                <!-- Countdown -->
                <div
                    class="portada-countdown"
                    v-if="diasRestantes >= 0"
                    data-aos="fade-up"
                    data-aos-delay="580"
                >
                    <div class="cd-bloque">
                        <span class="cd-num">{{ diasRestantes }}</span>
                        <span class="cd-label">días</span>
                    </div>
                    <div class="cd-div">·</div>
                    <div class="cd-bloque">
                        <span class="cd-texto">{{ fechaLimite }}</span>
                        <span class="cd-label">fecha límite</span>
                    </div>
                </div>

                <button
                    class="portada-cta"
                    @click="scrollAbajo"
                    data-aos="fade-up"
                    data-aos-delay="700"
                >
                    <span>Ir al formulario</span>
                    <ChevronDown :size="18" class="cta-arrow-svg" />
                </button>
            </div>

            <div class="scroll-mouse">
                <div class="scroll-dot"></div>
            </div>
        </div>

        <!-- ════════════════════════════════════
             CUERPO
        ════════════════════════════════════ -->
        <div ref="cuerpoRef" class="rsvp-body">
            <!-- Encabezado -->
            <div class="seccion-header" data-aos="fade-up">
                <div class="ornamento">
                    <Sparkles :size="14" class="orn-icon" />
                    <Mail :size="22" class="orn-icon-center" />
                    <Sparkles :size="14" class="orn-icon" />
                </div>
                <h2 class="seccion-titulo">Confirmar Asistencia</h2>
                <p class="seccion-sub">Tu presencia es nuestro mejor regalo</p>
                <div class="linea-deco">
                    <span class="linea-trazo"></span>
                    <span class="linea-flor">🌸</span>
                    <span class="linea-trazo"></span>
                </div>
            </div>

            <!-- ══ FORMULARIO ══ -->
            <div class="rsvp-card" v-if="!enviado" data-aos="fade-up" data-aos-delay="100">
                <!-- Banner fecha límite -->
                <div class="fecha-banner">
                    <div class="fb-icon-wrap">
                        <Timer :size="20" class="fb-svg" />
                    </div>
                    <div class="fb-texto">
                        <p class="fb-label">Confirma antes del</p>
                        <p class="fb-fecha">{{ fechaLimite }}</p>
                    </div>
                    <div class="fb-dias" v-if="diasRestantes >= 0">
                        <span class="fb-num">{{ diasRestantes }}</span>
                        <span class="fb-unit">días</span>
                    </div>
                </div>

                <!-- PASO 1 ─ Tus datos -->
                <div class="form-bloque" data-aos="fade-up" data-aos-delay="120">
                    <div class="bloque-titulo">
                        <div class="bt-numero">1</div>
                        <div class="bt-icon-wrap">
                            <UserRound :size="15" class="bt-svg" />
                        </div>
                        <h4>Tus Datos</h4>
                    </div>

                    <div class="campo-grid">
                        <div class="campo">
                            <label>Nombre completo <span class="req">*</span></label>
                            <div class="input-wrap" :class="{ 'has-error': errores.nombre }">
                                <div class="input-prefix-wrap">
                                    <Pencil :size="15" class="input-prefix-svg" />
                                </div>
                                <input
                                    v-model="form.nombre"
                                    type="text"
                                    placeholder="Ej: María García"
                                    @input="errores.nombre = false"
                                />
                            </div>
                            <p class="campo-error" v-if="errores.nombre">
                                Por favor ingresa tu nombre
                            </p>
                        </div>

                        <div class="campo">
                            <label>Teléfono / WhatsApp <span class="req">*</span></label>
                            <div class="input-wrap" :class="{ 'has-error': errores.telefono }">
                                <div class="input-prefix-wrap">
                                    <Phone :size="15" class="input-prefix-svg" />
                                </div>
                                <input
                                    v-model="form.telefono"
                                    type="tel"
                                    placeholder="+591 7XXXXXXX"
                                    @input="errores.telefono = false"
                                />
                            </div>
                            <p class="campo-error" v-if="errores.telefono">
                                Por favor ingresa tu teléfono
                            </p>
                        </div>
                    </div>

                    <!-- Toggle asistencia -->
                    <div class="asiste-bloque">
                        <label class="asiste-label"
                            >¿Podrás asistir? <span class="req">*</span></label
                        >
                        <div class="asiste-opciones">
                            <button
                                class="asiste-btn si"
                                :class="{ activo: form.asiste === true }"
                                @click="
                                    form.asiste = true;
                                    errores.asiste = false;
                                "
                            >
                                <PartyPopper :size="18" class="ab-svg" />
                                <span class="ab-texto">¡Sí asistiré!</span>
                                <div class="ab-check" v-if="form.asiste === true">
                                    <Check :size="13" />
                                </div>
                            </button>
                            <button
                                class="asiste-btn no"
                                :class="{ activo: form.asiste === false }"
                                @click="
                                    form.asiste = false;
                                    form.adultos = 0;
                                    form.ninos = 0;
                                "
                            >
                                <HeartCrack :size="18" class="ab-svg" />
                                <span class="ab-texto">No podré ir</span>
                                <div class="ab-check no-check" v-if="form.asiste === false">
                                    <Check :size="13" />
                                </div>
                            </button>
                        </div>
                        <p class="campo-error" v-if="errores.asiste">
                            Por favor indica si asistirás
                        </p>
                    </div>
                </div>

                <!-- PASO 2 ─ ¿Cuántos? -->
                <transition name="expand">
                    <div class="form-bloque" v-if="form.asiste === true" data-aos="fade-up">
                        <div class="bloque-titulo">
                            <div class="bt-numero">2</div>
                            <div class="bt-icon-wrap">
                                <Users :size="15" class="bt-svg" />
                            </div>
                            <h4>¿Cuántos asistirán?</h4>
                        </div>

                        <div class="contadores-grid">
                            <!-- Adultos -->
                            <div class="contador-card adultos">
                                <div class="cnt-top">
                                    <div class="cnt-icon-wrap adultos-icon">
                                        <UserRound :size="20" class="cnt-svg" />
                                    </div>
                                    <div>
                                        <p class="cnt-titulo">Adultos</p>
                                        <p class="cnt-sub">Mayores de 12 años</p>
                                    </div>
                                </div>
                                <div class="cnt-stepper">
                                    <button
                                        class="step-btn minus"
                                        @click="form.adultos = Math.max(1, form.adultos - 1)"
                                        :disabled="form.adultos <= 1"
                                    >
                                        <Minus :size="16" />
                                    </button>
                                    <div class="step-display">
                                        <span class="step-num">{{ form.adultos }}</span>
                                        <span class="step-unit">{{
                                            form.adultos === 1 ? 'persona' : 'personas'
                                        }}</span>
                                    </div>
                                    <button
                                        class="step-btn plus"
                                        @click="form.adultos = Math.min(20, form.adultos + 1)"
                                        :disabled="form.adultos >= 20"
                                    >
                                        <Plus :size="16" />
                                    </button>
                                </div>
                            </div>

                            <!-- Niños -->
                            <div class="contador-card ninos">
                                <div class="cnt-top">
                                    <div class="cnt-icon-wrap ninos-icon">
                                        <Baby :size="20" class="cnt-svg" />
                                    </div>
                                    <div>
                                        <p class="cnt-titulo">Niños</p>
                                        <p class="cnt-sub">Menores de 12 años</p>
                                    </div>
                                </div>
                                <div class="cnt-stepper">
                                    <button
                                        class="step-btn minus"
                                        @click="form.ninos = Math.max(0, form.ninos - 1)"
                                        :disabled="form.ninos <= 0"
                                    >
                                        <Minus :size="16" />
                                    </button>
                                    <div class="step-display">
                                        <span class="step-num">{{ form.ninos }}</span>
                                        <span class="step-unit">{{
                                            form.ninos === 1 ? 'niño' : 'niños'
                                        }}</span>
                                    </div>
                                    <button
                                        class="step-btn plus"
                                        @click="form.ninos = Math.min(15, form.ninos + 1)"
                                        :disabled="form.ninos >= 15"
                                    >
                                        <Plus :size="16" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Resumen total -->
                        <div class="resumen-total">
                            <div class="rt-pill adultos-pill">
                                <UserRound :size="14" class="rt-svg" />
                                <span class="rt-label">Adultos</span>
                                <span class="rt-num">{{ form.adultos }}</span>
                            </div>
                            <span class="rt-op">+</span>
                            <div class="rt-pill ninos-pill">
                                <Baby :size="14" class="rt-svg" />
                                <span class="rt-label">Niños</span>
                                <span class="rt-num">{{ form.ninos }}</span>
                            </div>
                            <span class="rt-op">=</span>
                            <div class="rt-pill total-pill">
                                <PartyPopper :size="14" class="rt-svg" />
                                <span class="rt-label">Total</span>
                                <span class="rt-num grande">{{ form.adultos + form.ninos }}</span>
                            </div>
                        </div>

                        <!-- Restricciones alimentarias -->
                        <div class="campo full">
                            <label>
                                <UtensilsCrossed
                                    :size="13"
                                    style="display: inline; margin-right: 5px; color: var(--dorado)"
                                />
                                ¿Alguna restricción alimentaria o alergia?
                            </label>
                            <div class="chips-wrap">
                                <button
                                    v-for="a in opcionesAlergias"
                                    :key="a"
                                    class="chip"
                                    :class="{ activo: form.alergias.includes(a) }"
                                    @click="toggleAlergia(a)"
                                >
                                    <Check
                                        :size="11"
                                        class="chip-check-svg"
                                        v-if="form.alergias.includes(a)"
                                    />
                                    {{ a }}
                                </button>
                            </div>
                        </div>

                        <!-- Transporte -->
                        <div class="campo full">
                            <label>
                                <Car
                                    :size="13"
                                    style="display: inline; margin-right: 5px; color: var(--dorado)"
                                />
                                ¿Necesitas transporte al evento?
                            </label>
                            <div class="asiste-opciones compact">
                                <button
                                    class="asiste-btn si small"
                                    :class="{ activo: form.transporte === true }"
                                    @click="form.transporte = true"
                                >
                                    <Car :size="15" class="ab-svg" /> Sí necesito
                                </button>
                                <button
                                    class="asiste-btn no small"
                                    :class="{ activo: form.transporte === false }"
                                    @click="form.transporte = false"
                                >
                                    <X :size="15" class="ab-svg" /> No necesito
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- PASO 3 ─ Mensaje -->
                <transition name="expand">
                    <div class="form-bloque" v-if="form.asiste !== null">
                        <div class="bloque-titulo">
                            <div class="bt-numero">{{ form.asiste ? '3' : '2' }}</div>
                            <div class="bt-icon-wrap">
                                <MessageCircle :size="15" class="bt-svg" />
                            </div>
                            <h4>
                                {{
                                    form.asiste
                                        ? 'Mensaje para los papás'
                                        : '¿Por qué no podrás asistir?'
                                }}
                            </h4>
                        </div>
                        <div class="campo full">
                            <textarea
                                v-model="form.mensaje"
                                :placeholder="
                                    form.asiste
                                        ? '¡Estamos muy emocionados de acompañarlos! 🌸'
                                        : 'Lamentablemente tengo un compromiso ese día...'
                                "
                                rows="3"
                                class="textarea-campo"
                            ></textarea>
                        </div>
                    </div>
                </transition>

                <!-- BOTÓN ENVIAR -->
                <transition name="expand">
                    <div class="form-acciones" v-if="form.asiste !== null">
                        <div class="pre-envio" v-if="form.asiste && form.adultos + form.ninos > 0">
                            <ClipboardList :size="17" class="pe-svg" />
                            <span class="pe-texto">
                                Confirmando
                                <strong
                                    >{{ form.adultos + form.ninos }} persona{{
                                        form.adultos + form.ninos !== 1 ? 's' : ''
                                    }}</strong
                                >
                                ({{ form.adultos }} adult{{ form.adultos !== 1 ? 'os' : 'o' }} +
                                {{ form.ninos }} niño{{ form.ninos !== 1 ? 's' : '' }})
                            </span>
                        </div>

                        <button
                            class="btn-enviar"
                            :class="{ cargando: enviando }"
                            @click="enviarFormulario"
                            :disabled="enviando"
                        >
                            <template v-if="!enviando">
                                <Mail :size="18" class="be-svg" />
                                <span>{{
                                    form.asiste ? 'Confirmar mi Asistencia' : 'Enviar Respuesta'
                                }}</span>
                                <ArrowRight :size="17" class="be-flecha" />
                            </template>
                            <template v-else>
                                <LoaderCircle :size="18" class="be-spinner-svg" />
                                <span>Enviando...</span>
                            </template>
                        </button>

                        <p class="form-nota">
                            <Lock
                                :size="11"
                                style="display: inline; margin-right: 4px; opacity: 0.6"
                            />
                            Tu información solo será usada para organizar el evento
                        </p>
                    </div>
                </transition>
            </div>

            <!-- ══ PANTALLA ÉXITO ══ -->
            <div class="exito-card" v-else>
                <div class="exito-sparkles" aria-hidden="true">
                    <span v-for="n in 10" :key="n" class="sparkle" :style="sparkleStyle(n)">✦</span>
                </div>

                <div class="exito-icono-wrap">
                    <component
                        :is="form.asiste ? PartyPopper : HeartHandshake"
                        :size="64"
                        class="exito-icono-svg"
                    />
                    <div class="exito-ring r1"></div>
                    <div class="exito-ring r2"></div>
                </div>

                <h3 class="exito-titulo">
                    {{ form.asiste ? '¡Gracias por confirmar!' : '¡Gracias por avisarnos!' }}
                </h3>
                <p class="exito-sub">
                    {{
                        form.asiste
                            ? `¡Te esperamos con mucha alegría, ${form.nombre.split(' ')[0]}!`
                            : `Lamentamos que no puedas venir, ${form.nombre.split(' ')[0]} 💔`
                    }}
                </p>

                <!-- Resumen tarjetas -->
                <div class="exito-resumen" v-if="form.asiste">
                    <div class="er-card adultos-card">
                        <UserRound :size="28" class="er-svg adultos-svg" />
                        <p class="er-label">Adultos</p>
                        <p class="er-num">{{ form.adultos }}</p>
                    </div>
                    <div class="er-card ninos-card">
                        <Baby :size="28" class="er-svg ninos-svg" />
                        <p class="er-label">Niños</p>
                        <p class="er-num">{{ form.ninos }}</p>
                    </div>
                    <div class="er-card total-card">
                        <PartyPopper :size="28" class="er-svg total-svg" />
                        <p class="er-label">Total</p>
                        <p class="er-num grande">{{ form.adultos + form.ninos }}</p>
                    </div>
                </div>

                <!-- Detalles evento -->
                <div class="exito-detalles" v-if="form.asiste">
                    <div class="ed-item">
                        <CalendarDays :size="15" class="ed-svg" />
                        <span>Sábado, 15 de Abril de 2025</span>
                    </div>
                    <div class="ed-item">
                        <Church :size="15" class="ed-svg" />
                        <span>Iglesia Santa Ana de Cala Cala · 2:45 PM</span>
                    </div>
                    <div class="ed-item">
                        <GlassWater :size="15" class="ed-svg" />
                        <span>Recepción en el Salón · ~3:30 PM</span>
                    </div>
                    <div class="ed-item" v-if="form.transporte">
                        <Car :size="15" class="ed-svg" />
                        <span>Transporte solicitado ✓</span>
                    </div>
                    <div class="ed-item" v-if="form.alergias.length">
                        <UtensilsCrossed :size="15" class="ed-svg" />
                        <span>Alergias: {{ form.alergias.join(', ') }}</span>
                    </div>
                </div>

                <button class="btn-modificar" @click="modificarRespuesta">
                    <Pencil :size="13" style="margin-right: 6px" />
                    Modificar mi respuesta
                </button>
            </div>

            <!-- PIE -->
            <div class="rsvp-pie" data-aos="fade-up">
                <div class="pie-linea">
                    <span class="pl-trazo"></span>
                    <Flower2 :size="16" class="pie-flor-svg" />
                    <span class="pl-trazo"></span>
                </div>
                <p class="pie-cita">"El amor en familia es la vida misma"</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AOS from 'aos';
import {
    Mail,
    ChevronDown,
    Sparkles,
    Timer,
    UserRound,
    Users,
    Phone,
    Pencil,
    PartyPopper,
    HeartCrack,
    Check,
    Baby,
    Minus,
    Plus,
    UtensilsCrossed,
    Car,
    X,
    MessageCircle,
    ClipboardList,
    ArrowRight,
    LoaderCircle,
    Lock,
    HeartHandshake,
    CalendarDays,
    Church,
    GlassWater,
    Flower2,
} from 'lucide-vue-next';

const props = defineProps({
    fechaLimite: { type: String, default: '10 de Abril de 2025' },
    fechaEvento: { type: String, default: '2025-04-15' },
    whatsappPapa: { type: String, default: '591XXXXXXXXX' },
    whatsappMama: { type: String, default: '591XXXXXXXXX' },
});

const enviado = ref(false);
const enviando = ref(false);
const cuerpoRef = ref(null);

const form = ref({
    nombre: '',
    telefono: '',
    asiste: null,
    adultos: 1,
    ninos: 0,
    alergias: [],
    transporte: false,
    mensaje: '',
});

const errores = ref({ nombre: false, telefono: false, asiste: false });

const opcionesAlergias = [
    'Vegetariano',
    'Vegano',
    'Sin gluten',
    'Sin lactosa',
    'Sin mariscos',
    'Sin nueces',
    'Sin huevo',
    'Otra',
];

function toggleAlergia(a) {
    const idx = form.value.alergias.indexOf(a);
    if (idx === -1) form.value.alergias.push(a);
    else form.value.alergias.splice(idx, 1);
}

const diasRestantes = computed(() => {
    return Math.ceil((new Date(props.fechaEvento) - new Date()) / (1000 * 60 * 60 * 24));
});

function scrollAbajo() {
    cuerpoRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validar() {
    let ok = true;
    if (!form.value.nombre.trim()) {
        errores.value.nombre = true;
        ok = false;
    }
    if (!form.value.telefono.trim()) {
        errores.value.telefono = true;
        ok = false;
    }
    if (form.value.asiste === null) {
        errores.value.asiste = true;
        ok = false;
    }
    return ok;
}

async function enviarFormulario() {
    if (!validar()) return;
    enviando.value = true;
    await new Promise(r => setTimeout(r, 1400));

    const { nombre, telefono, asiste, adultos, ninos, alergias, transporte, mensaje } = form.value;
    const total = adultos + ninos;
    const alergiasStr = alergias.length ? alergias.join(', ') : 'Ninguna';
    const transpStr = transporte ? 'Sí necesita' : 'No necesita';

    const texto = asiste
        ? `✅ *CONFIRMACIÓN DE ASISTENCIA*\n\n👤 *Nombre:* ${nombre}\n📞 *Teléfono:* ${telefono}\n\n🧑‍🤝‍🧑 *Adultos:* ${adultos}\n👶 *Niños:* ${ninos}\n🎊 *Total:* ${total} personas\n\n🍽️ *Alergias:* ${alergiasStr}\n🚗 *Transporte:* ${transpStr}${mensaje ? `\n\n💬 "${mensaje}"` : ''}`
        : `❌ *NO PODRÁ ASISTIR*\n\n👤 *Nombre:* ${nombre}\n📞 *Teléfono:* ${telefono}${mensaje ? `\n\n💬 Motivo: "${mensaje}"` : ''}`;

    enviando.value = false;
    enviado.value = true;
    window.open(`https://wa.me/${props.whatsappMama}?text=${encodeURIComponent(texto)}`, '_blank');
}

function modificarRespuesta() {
    enviado.value = false;
}

onMounted(() => AOS.refresh());

function particulaStyle(n) {
    const pos = [
        { top: '7%', left: '4%' },
        { top: '14%', right: '6%' },
        { top: '26%', left: '2%' },
        { top: '36%', right: '3%' },
        { top: '52%', left: '5%' },
        { top: '65%', right: '4%' },
        { top: '75%', left: '8%' },
        { top: '82%', right: '7%' },
        { top: '11%', left: '16%' },
        { top: '19%', right: '13%' },
        { top: '44%', left: '1%' },
        { top: '48%', right: '1%' },
    ];
    const p = pos[(n - 1) % pos.length];
    const delay = ((n * 0.6) % 3).toFixed(1);
    const size = (0.6 + (n % 3) * 0.2).toFixed(2);
    return { ...p, position: 'absolute', animationDelay: `${delay}s`, fontSize: `${size}rem` };
}

function sparkleStyle(n) {
    const pos = [
        { top: '8%', left: '6%' },
        { top: '12%', right: '8%' },
        { top: '25%', left: '3%' },
        { top: '28%', right: '4%' },
        { top: '60%', left: '5%' },
        { top: '65%', right: '6%' },
        { top: '80%', left: '10%' },
        { top: '82%', right: '9%' },
        { top: '45%', left: '2%' },
        { top: '48%', right: '2%' },
    ];
    const p = pos[(n - 1) % pos.length];
    const delay = ((n * 0.45) % 2.5).toFixed(1);
    return {
        ...p,
        position: 'absolute',
        color: 'rgba(201,151,74,0.4)',
        fontSize: '.95rem',
        animationDelay: `${delay}s`,
    };
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

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
    --rosa-pale: rgba(255, 235, 242, 0.9);
    --verde: #3a8a5e;
    --verde-pale: rgba(205, 242, 220, 0.92);
    --dorado: #c9974a;
    --texto: #3d2030;
    --texto-soft: #8a6070;
    --borde: rgba(192, 96, 122, 0.2);
    --card-bg: rgba(253, 248, 245, 0.78);
    --blur: blur(16px);
    --shadow: 0 16px 58px rgba(140, 50, 80, 0.18);
    --radius: 28px;
}

.rsvp-section {
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
    max-height: 740px;
    overflow: hidden;
}

.portada-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1400&q=90');
    background-size: cover;
    background-position: center 35%;
    animation: kenburns 18s ease-in-out infinite alternate;
}

@keyframes kenburns {
    from {
        transform: scale(1) translateX(0);
    }
    to {
        transform: scale(1.1) translateX(1%);
    }
}

.portada-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        165deg,
        rgba(45, 10, 25, 0.54) 0%,
        rgba(78, 20, 48, 0.72) 55%,
        rgba(22, 5, 14, 0.88) 100%
    );
}

.particulas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}
.particula {
    color: rgba(255, 218, 160, 0.45);
    animation: flotar-p 4s ease-in-out infinite alternate;
}
@keyframes flotar-p {
    from {
        transform: translateY(0) rotate(0deg);
        opacity: 0.3;
    }
    to {
        transform: translateY(-14px) rotate(16deg);
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
    gap: 1rem;
}

/* Sobre SVG */
.portada-sobre-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: flotar-sobre 3.5s ease-in-out infinite;
}
@keyframes flotar-sobre {
    0%,
    100% {
        transform: translateY(0) rotate(-4deg);
    }
    50% {
        transform: translateY(-12px) rotate(4deg);
    }
}
.portada-sobre-svg {
    color: rgba(255, 200, 150, 0.92);
    filter: drop-shadow(0 0 24px rgba(255, 180, 120, 0.55));
    position: relative;
    z-index: 1;
}
.sobre-glow {
    position: absolute;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(255, 180, 120, 0.3), transparent 70%);
    border-radius: 50%;
    animation: pulso-glow 2s ease-in-out infinite;
}
@keyframes pulso-glow {
    0%,
    100% {
        transform: scale(1);
        opacity: 0.6;
    }
    50% {
        transform: scale(1.4);
        opacity: 0;
    }
}

.portada-eyebrow {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 0.95rem;
    color: rgba(255, 215, 185, 0.9);
    letter-spacing: 5px;
    text-transform: uppercase;
}

.portada-titulo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.85rem, 6.5vw, 4rem);
    font-weight: 700;
    color: #fff;
    letter-spacing: 2px;
    line-height: 1.12;
    text-shadow:
        0 2px 30px rgba(0, 0, 0, 0.75),
        0 0 90px rgba(215, 130, 165, 0.38);
}

.portada-sub {
    font-size: 1.1rem;
    color: rgba(255, 215, 232, 0.85);
    font-style: italic;
    letter-spacing: 2px;
}

.portada-countdown {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 20px;
    padding: 1rem 2rem;
}
.cd-bloque {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
}
.cd-num {
    font-family: 'Cinzel', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    line-height: 1;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}
.cd-texto {
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    letter-spacing: 1px;
}
.cd-label {
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: rgba(255, 215, 190, 0.75);
}
.cd-div {
    color: rgba(255, 215, 180, 0.4);
    font-size: 1.8rem;
}

.portada-cta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 2.5rem;
    background: linear-gradient(135deg, rgba(212, 108, 145, 0.9), rgba(148, 42, 78, 0.95));
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 195, 215, 0.38);
    color: white;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 2.5px;
    cursor: pointer;
    box-shadow: 0 5px 30px rgba(148, 42, 78, 0.52);
    transition:
        transform 0.22s,
        box-shadow 0.22s;
}
.portada-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 38px rgba(148, 42, 78, 0.62);
}
.cta-arrow-svg {
    animation: bounce-y 1.7s ease-in-out infinite;
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

.scroll-mouse {
    position: absolute;
    bottom: 26px;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 48px;
    border: 2px solid rgba(255, 255, 255, 0.42);
    border-radius: 14px;
    display: flex;
    justify-content: center;
    padding-top: 7px;
}
.scroll-dot {
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    animation: scroll-d 2.2s ease-in-out infinite;
}
@keyframes scroll-d {
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
.rsvp-body {
    max-width: 680px;
    margin: 0 auto;
    padding: 3rem 1rem 3.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

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
    font-size: clamp(1.7rem, 4vw, 2.6rem);
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

/* ═══ RSVP CARD ═══ */
.rsvp-card {
    background: var(--card-bg);
    backdrop-filter: var(--blur);
    border-radius: var(--radius);
    border: 1px solid var(--borde);
    box-shadow:
        var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* Banner fecha */
.fecha-banner {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem 1.8rem;
    background: linear-gradient(135deg, rgba(255, 248, 195, 0.95), rgba(255, 230, 160, 0.8));
    border-bottom: 1px solid rgba(218, 185, 95, 0.42);
}
.fb-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 13px;
    flex-shrink: 0;
    background: rgba(200, 168, 60, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
}
.fb-svg {
    color: #9a7020;
}
.fb-label {
    font-family: 'Cinzel', serif;
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #9a7020;
    margin-bottom: 2px;
}
.fb-fecha {
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #6a4010;
}
.fb-dias {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 205, 80, 0.55);
    border-radius: 16px;
    padding: 0.5rem 1.2rem;
    border: 1px solid rgba(210, 165, 55, 0.48);
}
.fb-num {
    font-family: 'Cinzel', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #8a4008;
    line-height: 1;
}
.fb-unit {
    font-family: 'Cinzel', serif;
    font-size: 0.54rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #9a7020;
}

/* Form bloques */
.form-bloque {
    padding: 1.6rem 1.8rem;
    border-bottom: 1px solid var(--borde);
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
.form-bloque:last-of-type {
    border-bottom: none;
}

.bloque-titulo {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}
.bt-numero {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--rosa), var(--rosa-deep));
    color: rgb(0, 0, 0);
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(192, 96, 122, 0.3);
}
.bt-icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.12), rgba(201, 151, 74, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
}
.bt-svg {
    color: var(--rosa-deep);
}
.bloque-titulo h4 {
    font-family: 'Cinzel', serif;
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--rosa-deep);
    letter-spacing: 1px;
}

/* Campos */
.campo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}
.campo,
.campo.full {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
.campo label {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--dorado);
    font-weight: 600;
    display: flex;
    align-items: center;
}
.req {
    color: var(--rosa);
}

.input-wrap {
    display: flex;
    align-items: center;
    background: rgba(255, 252, 254, 0.95);
    border: 1.5px solid rgba(192, 140, 160, 0.35);
    border-radius: 13px;
    overflow: hidden;
    transition:
        border-color 0.22s,
        box-shadow 0.22s;
}
.input-wrap:focus-within {
    border-color: var(--rosa);
    box-shadow: 0 0 0 3px rgba(192, 96, 122, 0.12);
}
.input-wrap.has-error {
    border-color: #d84040;
    background: rgba(255, 232, 232, 0.88);
}
.input-prefix-wrap {
    padding: 0 0.75rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
}
.input-prefix-svg {
    color: rgba(160, 80, 100, 0.55);
}
.input-wrap input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 0.75rem 0.9rem 0.75rem 0;
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    color: var(--texto);
    width: 100%;
}
.campo-error {
    font-size: 0.72rem;
    color: #d04040;
    font-style: italic;
}

.textarea-campo {
    width: 100%;
    background: rgba(255, 252, 254, 0.95);
    border: 1.5px solid rgba(192, 140, 160, 0.35);
    border-radius: 13px;
    padding: 0.8rem 1rem;
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    color: var(--texto);
    resize: none;
    outline: none;
    transition:
        border-color 0.22s,
        box-shadow 0.22s;
}
.textarea-campo:focus {
    border-color: var(--rosa);
    box-shadow: 0 0 0 3px rgba(192, 96, 122, 0.12);
}

/* Asistencia toggle */
.asiste-bloque {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
}
.asiste-label {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--dorado);
    font-weight: 600;
}
.asiste-opciones {
    display: flex;
    gap: 0.8rem;
}
.asiste-opciones.compact {
    gap: 0.6rem;
}

.asiste-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.88rem 1rem;
    border-radius: 15px;
    border: 1.5px solid var(--borde);
    background: rgba(255, 252, 254, 0.9);
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    color: var(--texto);
    cursor: pointer;
    position: relative;
    transition: all 0.22s;
}
.asiste-btn.small {
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
    flex: unset;
}
.asiste-btn.si.activo {
    background: linear-gradient(135deg, rgba(195, 242, 218, 0.95), rgba(160, 228, 196, 0.88));
    border-color: rgba(70, 155, 110, 0.65);
    color: #155e38;
    font-weight: 600;
    box-shadow: 0 3px 14px rgba(70, 155, 110, 0.22);
}
.asiste-btn.no.activo {
    background: linear-gradient(135deg, rgba(255, 222, 228, 0.95), rgba(245, 198, 210, 0.88));
    border-color: rgba(198, 90, 108, 0.55);
    color: #7a1525;
    font-weight: 600;
}
.asiste-btn:hover:not(.activo) {
    background: var(--rosa-pale);
    border-color: rgba(192, 96, 122, 0.42);
    transform: translateY(-1px);
}
.ab-svg {
    flex-shrink: 0;
    color: inherit;
    opacity: 0.8;
}
.ab-texto {
    flex: 1;
}
.ab-check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--verde);
    flex-shrink: 0;
}
.ab-check.no-check {
    color: var(--rosa);
}

/* Contadores */
.contadores-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}
.contador-card {
    background: rgba(255, 252, 254, 0.95);
    border-radius: 18px;
    border: 1.5px solid var(--borde);
    padding: 1.1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition:
        box-shadow 0.22s,
        transform 0.22s;
}
.contador-card:hover {
    box-shadow: 0 5px 20px rgba(192, 96, 122, 0.15);
    transform: translateY(-1px);
}
.contador-card.adultos {
    border-color: rgba(150, 120, 198, 0.42);
}
.contador-card.ninos {
    border-color: rgba(90, 175, 135, 0.42);
}

.cnt-top {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}
.cnt-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 13px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.adultos-icon {
    background: rgba(150, 120, 198, 0.14);
}
.ninos-icon {
    background: rgba(90, 175, 135, 0.14);
}
.cnt-svg {
    color: var(--rosa-deep);
}

.cnt-titulo {
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    color: var(--texto);
    font-weight: 700;
}
.cnt-sub {
    font-size: 0.66rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-top: 1px;
}

.cnt-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50px;
    padding: 0.32rem;
    border: 1px solid rgba(200, 165, 180, 0.32);
}
.step-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
        transform 0.15s,
        box-shadow 0.15s;
}
.step-btn.minus {
    background: rgba(215, 152, 175, 0.28);
    color: var(--rosa);
}
.step-btn.plus {
    background: linear-gradient(135deg, #e8899a, #c05575);
    color: white;
    box-shadow: 0 3px 10px rgba(192, 85, 117, 0.35);
}
.step-btn:hover:not(:disabled) {
    transform: scale(1.14);
}
.step-btn:active:not(:disabled) {
    transform: scale(0.95);
}
.step-btn:disabled {
    opacity: 0.28;
    cursor: not-allowed;
    transform: none;
}

.step-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 54px;
}
.step-num {
    font-family: 'Cinzel', serif;
    font-size: 1.9rem;
    font-weight: 700;
    color: var(--rosa);
    line-height: 1;
}
.step-unit {
    font-size: 0.6rem;
    color: var(--texto-soft);
    font-style: italic;
    margin-top: 1px;
}

/* Resumen total */
.resumen-total {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    flex-wrap: wrap;
}
.rt-pill {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    border-radius: 50px;
    padding: 0.52rem 1rem;
    border: 1px solid transparent;
}
.adultos-pill {
    background: rgba(235, 225, 255, 0.88);
    border-color: rgba(150, 120, 198, 0.35);
}
.ninos-pill {
    background: rgba(210, 245, 228, 0.88);
    border-color: rgba(90, 175, 135, 0.35);
}
.total-pill {
    background: linear-gradient(135deg, rgba(255, 235, 242, 0.95), rgba(250, 222, 234, 0.88));
    border-color: rgba(192, 96, 122, 0.3);
    box-shadow: 0 2px 10px rgba(192, 96, 122, 0.12);
}
.rt-svg {
    opacity: 0.65;
    flex-shrink: 0;
}
.rt-label {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--texto-soft);
}
.rt-num {
    font-family: 'Cinzel', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--texto);
}
.rt-num.grande {
    font-size: 1.5rem;
    color: var(--rosa);
}
.rt-op {
    font-family: 'Cinzel', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--texto-soft);
}

/* Chips */
.chips-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.2rem;
}
.chip {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.38rem 0.9rem;
    border-radius: 50px;
    border: 1.5px solid rgba(192, 140, 165, 0.36);
    background: rgba(255, 252, 254, 0.92);
    font-family: 'EB Garamond', serif;
    font-size: 0.9rem;
    color: var(--texto);
    cursor: pointer;
    transition: all 0.2s;
}
.chip.activo {
    background: var(--verde-pale);
    border-color: rgba(70, 155, 110, 0.62);
    color: #155e38;
    font-weight: 600;
}
.chip:hover:not(.activo) {
    border-color: var(--rosa);
    background: var(--rosa-pale);
    transform: translateY(-1px);
}
.chip-check-svg {
    color: var(--verde);
    flex-shrink: 0;
}

/* Pre-envío */
.pre-envio {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    background: rgba(255, 248, 195, 0.88);
    border: 1px solid rgba(218, 185, 95, 0.45);
    border-radius: 12px;
    padding: 0.7rem 1rem;
    width: 100%;
}
.pe-svg {
    color: #9a7020;
    flex-shrink: 0;
}
.pe-texto {
    font-size: 0.88rem;
    color: #7a5010;
    font-style: italic;
    line-height: 1.4;
}
.pe-texto strong {
    color: #5a3808;
    font-style: normal;
}

/* Form acciones */
.form-acciones {
    padding: 1.5rem 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    align-items: center;
}

/* Botón enviar */
.btn-enviar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    padding: 1.15rem 2rem;
    background: linear-gradient(135deg, #3d1a28 0%, #6e2a45 50%, #9a3d58 100%);
    color: white;
    border: none;
    border-radius: 18px;
    font-family: 'Cinzel', serif;
    font-size: 0.92rem;
    font-weight: 600;
    letter-spacing: 2.5px;
    cursor: pointer;
    box-shadow:
        0 6px 30px rgba(80, 20, 45, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
    position: relative;
    overflow: hidden;
    transition:
        transform 0.22s,
        box-shadow 0.22s;
}
.btn-enviar::after {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
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
.btn-enviar:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(80, 20, 45, 0.58);
}
.btn-enviar:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
}
.btn-enviar.cargando {
    opacity: 0.72;
    cursor: not-allowed;
}
.be-svg {
    flex-shrink: 0;
}
.be-flecha {
    margin-left: auto;
    transition: transform 0.28s;
}
.btn-enviar:hover .be-flecha {
    transform: translateX(5px);
}
.be-spinner-svg {
    animation: spin 1s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.form-nota {
    font-family: 'EB Garamond', serif;
    font-size: 0.78rem;
    color: var(--texto-soft);
    font-style: italic;
    text-align: center;
}

/* Transición expand */
.expand-enter-active {
    transition: all 0.38s ease;
    overflow: hidden;
}
.expand-leave-active {
    transition: all 0.28s ease;
    overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
}
.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    max-height: 900px;
}

/* ═══ ÉXITO ═══ */
.exito-card {
    background: var(--card-bg);
    backdrop-filter: var(--blur);
    border-radius: var(--radius);
    border: 1px solid var(--borde);
    box-shadow:
        var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    animation: zoomIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.82);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.exito-sparkles {
    position: absolute;
    inset: 0;
    pointer-events: none;
}
.sparkle {
    animation: flotar-p 3s ease-in-out infinite alternate;
}

.exito-icono-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}
.exito-icono-svg {
    color: var(--rosa);
    filter: drop-shadow(0 0 20px rgba(192, 96, 122, 0.4));
    animation: latir 1.3s ease-in-out infinite;
    position: relative;
    z-index: 2;
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

.exito-ring {
    position: absolute;
    border-radius: 50%;
    animation: exito-pulse 2s ease-out infinite;
}
.exito-ring.r1 {
    width: 100px;
    height: 100px;
    border: 2px solid rgba(192, 96, 122, 0.5);
}
.exito-ring.r2 {
    width: 128px;
    height: 128px;
    border: 1.5px solid rgba(192, 96, 122, 0.25);
    animation-delay: 0.8s;
}
@keyframes exito-pulse {
    0% {
        transform: scale(0.9);
        opacity: 1;
    }
    100% {
        transform: scale(1.25);
        opacity: 0;
    }
}

.exito-titulo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.4rem, 4vw, 2rem);
    font-weight: 700;
    color: var(--rosa-deep);
    letter-spacing: 1px;
    position: relative;
    z-index: 1;
}
.exito-sub {
    font-size: 1.05rem;
    color: var(--texto-soft);
    font-style: italic;
    position: relative;
    z-index: 1;
}

.exito-resumen {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    z-index: 1;
}
.er-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    border-radius: 18px;
    padding: 1rem 1.3rem;
    border: 1px solid transparent;
    min-width: 90px;
}
.adultos-card {
    background: rgba(235, 225, 255, 0.92);
    border-color: rgba(150, 120, 198, 0.35);
}
.ninos-card {
    background: rgba(210, 245, 228, 0.92);
    border-color: rgba(90, 175, 135, 0.35);
}
.total-card {
    background: var(--rosa-pale);
    border-color: rgba(192, 96, 122, 0.3);
    box-shadow: 0 3px 14px rgba(192, 96, 122, 0.14);
}
.er-svg {
    flex-shrink: 0;
}
.adultos-svg {
    color: #7050c8;
}
.ninos-svg {
    color: #3a8a5e;
}
.total-svg {
    color: var(--rosa);
}
.er-label {
    font-family: 'Cinzel', serif;
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--texto-soft);
}
.er-num {
    font-family: 'Cinzel', serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--rosa-deep);
    line-height: 1;
}
.er-num.grande {
    font-size: 2.4rem;
    color: var(--rosa);
}

.exito-detalles {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 340px;
    background: rgba(255, 252, 254, 0.9);
    border-radius: 16px;
    padding: 1.1rem 1.3rem;
    border: 1px solid var(--borde);
    position: relative;
    z-index: 1;
}
.ed-item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    font-size: 0.9rem;
    color: var(--texto);
}
.ed-svg {
    color: var(--dorado);
    flex-shrink: 0;
}

.btn-modificar {
    display: flex;
    align-items: center;
    background: transparent;
    border: 1.5px solid rgba(192, 96, 122, 0.42);
    color: var(--rosa);
    padding: 0.68rem 1.7rem;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.22s;
    position: relative;
    z-index: 1;
}
.btn-modificar:hover {
    background: var(--rosa-pale);
    border-color: var(--rosa);
    transform: translateY(-1px);
}

/* PIE */
.rsvp-pie {
    text-align: center;
}
.pie-linea {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 0.7rem;
}
.pl-trazo {
    flex: 1;
    max-width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--dorado), transparent);
}
.pie-flor-svg {
    color: var(--dorado);
}
.pie-cita {
    font-family: 'Cinzel', serif;
    font-size: 0.88rem;
    font-style: italic;
    color: var(--rosa-deep);
    letter-spacing: 1px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 500px) {
    .portada-hero {
        max-height: 660px;
    }
    .portada-countdown {
        flex-direction: column;
        gap: 0.4rem;
    }
    .cd-div {
        display: none;
    }
    .campo-grid {
        grid-template-columns: 1fr;
    }
    .contadores-grid {
        grid-template-columns: 1fr;
    }
    .asiste-opciones {
        flex-direction: column;
    }
    .resumen-total {
        gap: 0.4rem;
    }
    .exito-resumen {
        flex-direction: column;
        align-items: center;
    }
    .form-bloque {
        padding: 1.3rem 1.2rem;
    }
    .form-acciones {
        padding: 1.3rem 1.2rem;
    }
    .btn-enviar {
        font-size: 0.82rem;
        letter-spacing: 1.5px;
    }
}
</style>

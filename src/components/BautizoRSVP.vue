<template>
    <section class="rsvp-section">
        <div class="portada-hero">
            <div class="portada-bg"></div>
            <div class="portada-overlay"></div>
            <div class="particulas" aria-hidden="true">
                <span v-for="n in 12" :key="n" class="particula" :style="particulaStyle(n)">✦</span>
            </div>
            <div class="portada-content">
                <div class="portada-sobre-wrap" data-aos="zoom-in" data-aos-delay="100">
                    <div class="sobre-anillo">
                        <Mail :size="44" class="portada-sobre-svg" />
                    </div>
                    <div class="sobre-glow"></div>
                </div>
                <div class="eyebrow-wrap" data-aos="fade-down" data-aos-delay="200">
                    <span class="eyebrow-line"></span>
                    <p class="portada-eyebrow">Bautizo de Keila Tamara</p>
                    <span class="eyebrow-line"></span>
                </div>
                <h1 class="portada-titulo" data-aos="zoom-in-up" data-aos-delay="320">
                    Confirma tu<br />Asistencia
                </h1>
                <p class="portada-sub" data-aos="fade-up" data-aos-delay="440">
                    Tu presencia es nuestro mejor regalo
                </p>
                <div
                    class="portada-countdown"
                    v-if="diasRestantes >= 0"
                    data-aos="fade-up"
                    data-aos-delay="560"
                >
                    <div class="cd-bloque-num">
                        <span class="cd-num">{{ diasRestantes }}</span>
                        <span class="cd-label">días</span>
                    </div>
                    <div class="cd-sep"></div>
                    <div class="cd-bloque-texto">
                        <span class="cd-sublabel">Confirma antes del</span>
                        <span class="cd-fecha">{{ fechaLimite }}</span>
                    </div>
                </div>
                <button
                    class="portada-cta"
                    @click="scrollAbajo"
                    data-aos="fade-up"
                    data-aos-delay="680"
                >
                    <span>Ir al formulario</span>
                    <ChevronDown :size="18" class="cta-arrow-svg" />
                </button>
            </div>
            <div class="scroll-indicator" @click="scrollAbajo">
                <div class="scroll-track"><div class="scroll-dot"></div></div>
                <span class="scroll-label">Desliza</span>
            </div>
        </div>

        <div ref="cuerpoRef" class="rsvp-body">
            <div class="seccion-header" data-aos="fade-up">
                <div class="ornamento">
                    <Sparkles :size="14" class="orn-icon" />
                    <Mail :size="22" class="orn-icon-center" />
                    <Sparkles :size="14" class="orn-icon" />
                </div>
                <h2 class="seccion-titulo">Confirmar Asistencia</h2>
                <p class="seccion-sub">Tu presencia es nuestro mejor regalo</p>
            </div>

            <!-- FORMULARIO -->
            <div class="rsvp-card" v-if="!enviado" data-aos="fade-up" data-aos-delay="80">
                <div class="fecha-banner">
                    <div class="fb-icon-wrap"><Timer :size="19" class="fb-svg" /></div>
                    <div class="fb-texto">
                        <p class="fb-label">Confirma antes del</p>
                        <p class="fb-fecha">{{ fechaLimite }}</p>
                    </div>
                    <div class="fb-dias" v-if="diasRestantes >= 0">
                        <span class="fb-num">{{ diasRestantes }}</span>
                        <span class="fb-unit">días</span>
                    </div>
                </div>

                <!-- PASO 1 -->
                <div class="form-bloque" data-aos="fade-up" data-aos-delay="100">
                    <div class="bloque-titulo">
                        <div class="bt-numero"><span>1</span></div>
                        <div class="bt-icon-wrap"><UserRound :size="14" class="bt-svg" /></div>
                        <h4>Tus Datos</h4>
                    </div>
                    <div class="campo-grid">
                        <div class="campo">
                            <label>Nombre completo <span class="req">*</span></label>
                            <div class="input-wrap" :class="{ 'has-error': errores.nombre }">
                                <div class="input-prefix-wrap">
                                    <Pencil :size="14" class="input-prefix-svg" />
                                </div>
                                <input
                                    v-model="form.nombre"
                                    type="text"
                                    placeholder="Ej: María García"
                                    autocomplete="name"
                                    @input="errores.nombre = false"
                                />
                            </div>
                            <p class="campo-error" v-if="errores.nombre">
                                <AlertCircle :size="11" class="err-icon" /> Por favor ingresa tu
                                nombre
                            </p>
                        </div>
                        <div class="campo">
                            <label
                                ><Phone :size="12" class="label-icon" /> WhatsApp
                                <span class="req">*</span></label
                            >
                            <div
                                class="input-wrap tel-wrap"
                                :class="{ 'has-error': errores.telefono }"
                            >
                                <div class="tel-prefix">
                                    <span class="tel-flag">🇧🇴</span>
                                    <span class="tel-code">+591</span>
                                </div>
                                <input
                                    v-model="form.telefono"
                                    type="tel"
                                    inputmode="numeric"
                                    placeholder="7XXXXXXX"
                                    maxlength="8"
                                    autocomplete="tel-national"
                                    @input="onTelefonoInput"
                                />
                                <div class="tel-check" v-if="telefonoValido">
                                    <CheckCircle2 :size="16" class="tel-check-svg" />
                                </div>
                            </div>
                            <p
                                class="campo-hint"
                                v-if="
                                    !errores.telefono && !telefonoValido && form.telefono.length > 0
                                "
                            >
                                <Info :size="11" class="hint-icon" /> 8 dígitos (ej: 70123456)
                            </p>
                            <p class="campo-hint valido" v-if="telefonoValido">
                                <CheckCircle2 :size="11" class="hint-icon" /> Número válido ✓
                            </p>
                            <p class="campo-error" v-if="errores.telefono">
                                <AlertCircle :size="11" class="err-icon" /> Ingresa 8 dígitos
                                válidos (7X o 6X)
                            </p>
                        </div>
                    </div>
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
                                <PartyPopper :size="20" class="ab-svg" />
                                <span class="ab-texto">¡Sí asistiré!</span>
                                <div class="ab-check" v-if="form.asiste === true">
                                    <Check :size="12" />
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
                                <HeartCrack :size="20" class="ab-svg" />
                                <span class="ab-texto">No podré ir</span>
                                <div class="ab-check no-check" v-if="form.asiste === false">
                                    <Check :size="12" />
                                </div>
                            </button>
                        </div>
                        <p class="campo-error" v-if="errores.asiste">
                            <AlertCircle :size="11" class="err-icon" /> Por favor indica si
                            asistirás
                        </p>
                    </div>
                </div>

                <!-- PASO 2 -->
                <transition name="expand">
                    <div class="form-bloque" v-if="form.asiste === true">
                        <div class="bloque-titulo">
                            <div class="bt-numero"><span>2</span></div>
                            <div class="bt-icon-wrap"><Users :size="14" class="bt-svg" /></div>
                            <h4>¿Cuántos asistirán?</h4>
                        </div>
                        <div class="contadores-grid">
                            <div class="contador-card adultos">
                                <div class="cnt-top">
                                    <div class="cnt-icon-wrap adultos-icon">
                                        <UserRound :size="19" class="cnt-svg" />
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
                            <div class="contador-card ninos">
                                <div class="cnt-top">
                                    <div class="cnt-icon-wrap ninos-icon">
                                        <Baby :size="19" class="cnt-svg" />
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
                        <div class="resumen-total">
                            <div class="rt-pill adultos-pill">
                                <UserRound :size="13" class="rt-svg" /><span class="rt-label"
                                    >Adultos</span
                                ><span class="rt-num">{{ form.adultos }}</span>
                            </div>
                            <span class="rt-op">+</span>
                            <div class="rt-pill ninos-pill">
                                <Baby :size="13" class="rt-svg" /><span class="rt-label">Niños</span
                                ><span class="rt-num">{{ form.ninos }}</span>
                            </div>
                            <span class="rt-op">=</span>
                            <div class="rt-pill total-pill">
                                <PartyPopper :size="13" class="rt-svg" /><span class="rt-label"
                                    >Total</span
                                ><span class="rt-num grande">{{ form.adultos + form.ninos }}</span>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- PASO 3 -->
                <transition name="expand">
                    <div class="form-bloque" v-if="form.asiste !== null">
                        <div class="bloque-titulo">
                            <div class="bt-numero">
                                <span>{{ form.asiste ? '3' : '2' }}</span>
                            </div>
                            <div class="bt-icon-wrap">
                                <MessageCircle :size="14" class="bt-svg" />
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
                            <ClipboardList :size="16" class="pe-svg" />
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
                        <div class="wa-destino-aviso">
                            <MessageCircle :size="14" class="wa-aviso-icon" />
                            <span>Se enviará por WhatsApp a papá 👨 y mamá 👩</span>
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
                                <span>Abriendo WhatsApp...</span>
                            </template>
                        </button>
                        <p class="form-nota">
                            <Lock :size="11" class="lock-icon" /> Tu información solo será usada
                            para organizar el evento
                        </p>
                    </div>
                </transition>
            </div>

            <!-- ÉXITO -->
            <div class="exito-card" v-else data-aos="zoom-in">
                <div class="exito-sparkles" aria-hidden="true">
                    <span v-for="n in 10" :key="n" class="sparkle" :style="sparkleStyle(n)">✦</span>
                </div>
                <div class="exito-icono-wrap">
                    <component
                        :is="form.asiste ? PartyPopper : HeartHandshake"
                        :size="58"
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
                <div class="exito-resumen" v-if="form.asiste">
                    <div class="er-card adultos-card">
                        <UserRound :size="26" class="er-svg adultos-svg" />
                        <p class="er-label">Adultos</p>
                        <p class="er-num">{{ form.adultos }}</p>
                    </div>
                    <div class="er-card ninos-card">
                        <Baby :size="26" class="er-svg ninos-svg" />
                        <p class="er-label">Niños</p>
                        <p class="er-num">{{ form.ninos }}</p>
                    </div>
                    <div class="er-card total-card">
                        <PartyPopper :size="26" class="er-svg total-svg" />
                        <p class="er-label">Total</p>
                        <p class="er-num grande">{{ form.adultos + form.ninos }}</p>
                    </div>
                </div>
                <div class="exito-detalles" v-if="form.asiste">
                    <div class="ed-item">
                        <CalendarDays :size="15" class="ed-svg" /><span
                            >Sábado, 18 de Abril de 2026</span
                        >
                    </div>
                    <div class="ed-item">
                        <Church :size="15" class="ed-svg" /><span
                            >Iglesia Santa Ana de Cala Cala · 2:45 PM</span
                        >
                    </div>
                    <div class="ed-item">
                        <GlassWater :size="15" class="ed-svg" /><span
                            >Recepción en el Salón · ~3:30 PM</span
                        >
                    </div>
                </div>
                <div class="exito-tel-confirmado">
                    <Phone :size="13" class="exito-tel-icon" />
                    <span
                        >WhatsApp: <strong>+591 {{ form.telefono }}</strong></span
                    >
                </div>
                <div class="exito-wa-aviso">
                    <MessageCircle :size="15" class="exito-wa-icon" />
                    <span>Respuesta enviada a papá 👨 y mamá 👩 por WhatsApp 🎉</span>
                </div>
                <button class="btn-modificar" @click="modificarRespuesta">
                    <Pencil :size="13" style="margin-right: 6px" /> Modificar mi respuesta
                </button>
            </div>

            <div class="rsvp-pie" data-aos="fade-up">
                <div class="pie-linea">
                    <span class="pl-trazo"></span>
                    <Flower2 :size="15" class="pie-flor-svg" />
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
    AlertCircle,
    CheckCircle2,
    Info,
} from 'lucide-vue-next';

const props = defineProps({
    fechaLimite: { type: String, default: '18 de Abril de 2026' },
    fechaEvento: { type: String, default: '2026-04-18' },
    // Solo los 8 dígitos bolivianos SIN el 591
    whatsappPapa: { type: String, default: '60767398' },
    whatsappMama: { type: String, default: '78330856' },
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
    mensaje: '',
});

const errores = ref({ nombre: false, telefono: false, asiste: false });

// ─── Teléfono Bolivia ────────────────────────────────────────────
function onTelefonoInput() {
    form.value.telefono = form.value.telefono.replace(/\D/g, '').slice(0, 8);
    errores.value.telefono = false;
}
const telefonoValido = computed(() => {
    const t = form.value.telefono;
    return t.length === 8 && (t[0] === '6' || t[0] === '7');
});
// ────────────────────────────────────────────────────────────────

const diasRestantes = computed(() =>
    Math.ceil((new Date(props.fechaEvento) - new Date()) / (1000 * 60 * 60 * 24))
);

function scrollAbajo() {
    cuerpoRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validar() {
    let ok = true;
    if (!form.value.nombre.trim()) {
        errores.value.nombre = true;
        ok = false;
    }
    if (!telefonoValido.value) {
        errores.value.telefono = true;
        ok = false;
    }
    if (form.value.asiste === null) {
        errores.value.asiste = true;
        ok = false;
    }
    return ok;
}

function construirMensaje() {
    const { nombre, telefono, asiste, adultos, ninos, mensaje } = form.value;
    const total = adultos + ninos;
    const telFormato = `+591 ${telefono}`;

    if (asiste) {
        return (
            `🎀 *CONFIRMACIÓN DE ASISTENCIA* 🎀\n` +
            `✨ Bautizo de Keila Tamara ✨\n\n` +
            `👤 *Nombre:* ${nombre}\n` +
            `📞 *WhatsApp:* ${telFormato}\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `👥 *Asistentes*\n` +
            `  🧑 Adultos: ${adultos}\n` +
            `  👶 Niños:   ${ninos}\n` +
            `  🎊 Total:   ${total} persona${total !== 1 ? 's' : ''}\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `📅 *Fecha:* Sábado 18 de Abril de 2026\n` +
            `🕐 *Hora:* 2:45 PM (Iglesia) · ~3:30 PM (Recepción)\n` +
            (mensaje ? `\n💬 *Mensaje:* "${mensaje}"\n` : '') +
            `━━━━━━━━━━━━━━━━━━\n` +
            `_Enviado desde la invitación digital_ 🌸`
        );
    } else {
        return (
            `❌ *NO PODRÁ ASISTIR*\n` +
            `✨ Bautizo de Keila Tamara ✨\n\n` +
            `👤 *Nombre:* ${nombre}\n` +
            `📞 *WhatsApp:* ${telFormato}\n` +
            (mensaje ? `\n💬 *Motivo:* "${mensaje}"\n` : '') +
            `\n_Enviado desde la invitación digital_ 🌸`
        );
    }
}

// ─── FIX: abre WA con <a> programático (no bloqueado por el navegador) ───
function abrirWA(numero, textoEncoded) {
    // Limpia cualquier prefijo: quita el + y asegura que empiece con 591
    const limpio = numero.replace(/\D/g, '');
    // Si ya trae 591 al inicio (11 dígitos) lo usa tal cual, si no lo agrega
    const numFinal = limpio.startsWith('591') ? limpio : `591${limpio}`;
    const url = `https://wa.me/${numFinal}?text=${textoEncoded}`;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function enviarFormulario() {
    if (!validar()) return;
    enviando.value = true;
    const encoded = encodeURIComponent(construirMensaje());
    await new Promise(r => setTimeout(r, 800));
    enviando.value = false;
    enviado.value = true;

    // Abre mamá inmediatamente
    abrirWA(props.whatsappMama, encoded);
    // Abre papá 1.2s después (para que el navegador no bloquee el segundo)
    setTimeout(() => abrirWA(props.whatsappPapa, encoded), 1200);
}
// ────────────────────────────────────────────────────────────────

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
    return {
        ...p,
        position: 'absolute',
        animationDelay: `${((n * 0.6) % 3).toFixed(1)}s`,
        fontSize: `${(0.6 + (n % 3) * 0.2).toFixed(2)}rem`,
    };
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
    return {
        ...p,
        position: 'absolute',
        color: 'rgba(201,151,74,0.4)',
        fontSize: '.95rem',
        animationDelay: `${((n * 0.45) % 2.5).toFixed(1)}s`,
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
.rsvp-section {
    font-family: 'EB Garamond', serif;
    color: #3d2030;
    background: linear-gradient(180deg, #fdf0f4 0%, #fef8fb 100%);
}

/* ═══ PORTADA ═══ */
.portada-hero {
    position: relative;
    width: 100%;
    height: 100svh;
    min-height: 560px;
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
        transform: scale(1);
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
    gap: 0.9rem;
}
.portada-sobre-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.sobre-anillo {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.22);
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
    filter: drop-shadow(0 0 20px rgba(255, 180, 120, 0.5));
    position: relative;
    z-index: 1;
}
.sobre-glow {
    position: absolute;
    width: 90px;
    height: 90px;
    background: radial-gradient(circle, rgba(255, 180, 120, 0.25), transparent 70%);
    border-radius: 50%;
    animation: pulso-glow 2.2s ease-in-out infinite;
}
@keyframes pulso-glow {
    0%,
    100% {
        transform: scale(1);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.5);
        opacity: 0;
    }
}
.eyebrow-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.eyebrow-line {
    width: 32px;
    height: 1px;
    background: rgba(255, 215, 180, 0.5);
    flex-shrink: 0;
}
.portada-eyebrow {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 0.85rem;
    color: rgba(255, 215, 185, 0.9);
    letter-spacing: 4px;
    text-transform: uppercase;
    white-space: nowrap;
}
.portada-titulo {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.9rem, 7vw, 4.2rem);
    font-weight: 700;
    color: #fff;
    letter-spacing: 2px;
    line-height: 1.12;
    text-shadow:
        0 2px 30px rgba(0, 0, 0, 0.75),
        0 0 90px rgba(215, 130, 165, 0.38);
}
.portada-sub {
    font-size: 1.05rem;
    color: rgba(255, 215, 232, 0.85);
    font-style: italic;
    letter-spacing: 2px;
}
.portada-countdown {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.11);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 18px;
    padding: 0.85rem 1.6rem;
}
.cd-bloque-num {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.cd-num {
    font-family: 'Cinzel', serif;
    font-size: 2.4rem;
    font-weight: 700;
    color: white;
    line-height: 1;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}
.cd-label {
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: rgba(255, 215, 190, 0.72);
}
.cd-sep {
    width: 1px;
    height: 42px;
    background: rgba(255, 255, 255, 0.25);
    flex-shrink: 0;
}
.cd-bloque-texto {
    display: flex;
    flex-direction: column;
    gap: 0.18rem;
    text-align: left;
}
.cd-sublabel {
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255, 215, 190, 0.7);
}
.cd-fecha {
    font-family: 'Cinzel', serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: white;
    letter-spacing: 0.8px;
}
.portada-cta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 2.4rem;
    margin-top: 0.2rem;
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
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
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
    opacity: 0.82;
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
.scroll-label {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.58);
}

/* ═══ CUERPO ═══ */
.rsvp-body {
    max-width: 680px;
    margin: 0 auto;
    padding: 2.8rem 1rem 3.5rem;
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
    font-size: clamp(1.65rem, 4vw, 2.5rem);
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

/* ═══ CARD ═══ */
.rsvp-card {
    background: rgba(253, 248, 245, 0.85);
    backdrop-filter: blur(18px);
    border-radius: 26px;
    border: 1px solid rgba(192, 96, 122, 0.22);
    box-shadow:
        0 16px 58px rgba(140, 50, 80, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.rsvp-card::before {
    content: '';
    display: block;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent,
        #c9974a 30%,
        #f0d880 50%,
        #c9974a 70%,
        transparent
    );
}
.fecha-banner {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, rgba(255, 248, 195, 0.96), rgba(255, 230, 160, 0.82));
    border-bottom: 1px solid rgba(218, 185, 95, 0.42);
}
.fb-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 12px;
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
    font-size: 0.54rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #9a7020;
    margin-bottom: 2px;
}
.fb-fecha {
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #6a4010;
}
.fb-dias {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 205, 80, 0.55);
    border-radius: 14px;
    padding: 0.45rem 1.1rem;
    border: 1px solid rgba(210, 165, 55, 0.48);
    flex-shrink: 0;
}
.fb-num {
    font-family: 'Cinzel', serif;
    font-size: 1.9rem;
    font-weight: 700;
    color: #8a4008;
    line-height: 1;
}
.fb-unit {
    font-family: 'Cinzel', serif;
    font-size: 0.52rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #9a7020;
}
.form-bloque {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(192, 96, 122, 0.18);
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
    gap: 0.6rem;
}
.bt-numero {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex-shrink: 0;
    background: linear-gradient(135deg, #c0607a, #7a2e48);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(192, 96, 122, 0.4);
}
.bt-numero span {
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    line-height: 1;
    display: block;
    -webkit-font-smoothing: antialiased;
}
.bt-icon-wrap {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(192, 96, 122, 0.12), rgba(201, 151, 74, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
}
.bt-svg {
    color: #7a2e48;
}
.bloque-titulo h4 {
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #7a2e48;
    letter-spacing: 1px;
}
.campo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9rem;
}
.campo,
.campo.full {
    display: flex;
    flex-direction: column;
    gap: 0.38rem;
}
.campo label {
    font-family: 'Cinzel', serif;
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #c9974a;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
}
.label-icon {
    color: #c9974a;
    flex-shrink: 0;
}
.req {
    color: #c0607a;
}
.input-wrap {
    display: flex;
    align-items: center;
    background: rgba(255, 252, 254, 0.96);
    border: 1.5px solid rgba(192, 140, 160, 0.35);
    border-radius: 13px;
    overflow: hidden;
    transition:
        border-color 0.22s,
        box-shadow 0.22s;
    min-height: 48px;
}
.input-wrap:focus-within {
    border-color: #c0607a;
    box-shadow: 0 0 0 3px rgba(192, 96, 122, 0.12);
}
.input-wrap.has-error {
    border-color: #d84040;
    background: rgba(255, 232, 232, 0.88);
}
.input-prefix-wrap {
    padding: 0 0.7rem;
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
    font-size: max(16px, 1rem);
    color: #3d2030;
    width: 100%;
}
.tel-wrap {
    border-radius: 13px;
}
.tel-prefix {
    display: flex;
    align-items: center;
    gap: 0.38rem;
    padding: 0 0.6rem 0 0.75rem;
    flex-shrink: 0;
    background: rgba(245, 235, 242, 0.8);
    border-right: 1.5px solid rgba(192, 140, 160, 0.28);
    min-height: 100%;
}
.tel-flag {
    font-size: 1.05rem;
    line-height: 1;
}
.tel-code {
    font-family: 'Cinzel', serif;
    font-size: 0.78rem;
    font-weight: 700;
    color: #7a2e48;
    letter-spacing: 0.5px;
    white-space: nowrap;
}
.tel-check {
    padding: 0 0.65rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
}
.tel-check-svg {
    color: #3a8a5e;
}
.campo-hint {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    color: #8a6070;
    font-style: italic;
}
.campo-hint.valido {
    color: #3a8a5e;
}
.hint-icon {
    flex-shrink: 0;
}
.campo-error {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    color: #d04040;
    font-style: italic;
}
.err-icon {
    flex-shrink: 0;
}
.textarea-campo {
    width: 100%;
    background: rgba(255, 252, 254, 0.96);
    border: 1.5px solid rgba(192, 140, 160, 0.35);
    border-radius: 13px;
    padding: 0.8rem 1rem;
    font-family: 'EB Garamond', serif;
    font-size: max(16px, 1rem);
    color: #3d2030;
    resize: none;
    outline: none;
    min-height: 88px;
    transition:
        border-color 0.22s,
        box-shadow 0.22s;
}
.textarea-campo:focus {
    border-color: #c0607a;
    box-shadow: 0 0 0 3px rgba(192, 96, 122, 0.12);
}
.asiste-bloque {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.asiste-label {
    font-family: 'Cinzel', serif;
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #c9974a;
    font-weight: 600;
}
.asiste-opciones {
    display: flex;
    gap: 0.75rem;
}
.asiste-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.48rem;
    padding: 0.95rem 1rem;
    border-radius: 15px;
    border: 1.5px solid rgba(192, 96, 122, 0.2);
    background: rgba(255, 252, 254, 0.9);
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    color: #3d2030;
    cursor: pointer;
    transition: all 0.22s;
    min-height: 56px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
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
    background: rgba(255, 235, 242, 0.9);
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
    color: #3a8a5e;
    flex-shrink: 0;
}
.ab-check.no-check {
    color: #c0607a;
}
.contadores-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9rem;
}
.contador-card {
    background: rgba(255, 252, 254, 0.96);
    border-radius: 18px;
    border: 1.5px solid rgba(192, 96, 122, 0.2);
    padding: 1.1rem 0.95rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    transition:
        box-shadow 0.22s,
        transform 0.22s;
}
.contador-card:hover {
    box-shadow: 0 5px 20px rgba(192, 96, 122, 0.14);
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
    gap: 0.6rem;
}
.cnt-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 12px;
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
    color: #7a2e48;
}
.cnt-titulo {
    font-family: 'Cinzel', serif;
    font-size: 0.82rem;
    color: #3d2030;
    font-weight: 700;
}
.cnt-sub {
    font-size: 0.64rem;
    color: #8a6070;
    font-style: italic;
    margin-top: 1px;
}
.cnt-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50px;
    padding: 0.3rem;
    border: 1px solid rgba(200, 165, 180, 0.32);
}
.step-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s;
    min-width: 44px;
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
}
.step-btn.minus {
    background: rgba(215, 152, 175, 0.28);
    color: #c0607a;
}
.step-btn.plus {
    background: linear-gradient(135deg, #e8899a, #c05575);
    color: white;
    box-shadow: 0 3px 10px rgba(192, 85, 117, 0.35);
}
.step-btn:hover:not(:disabled) {
    transform: scale(1.12);
}
.step-btn:active:not(:disabled) {
    transform: scale(0.92);
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
    min-width: 50px;
}
.step-num {
    font-family: 'Cinzel', serif;
    font-size: 1.85rem;
    font-weight: 700;
    color: #c0607a;
    line-height: 1;
}
.step-unit {
    font-size: 0.58rem;
    color: #8a6070;
    font-style: italic;
    margin-top: 1px;
}
.resumen-total {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    flex-wrap: wrap;
}
.rt-pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 50px;
    padding: 0.48rem 0.9rem;
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
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #8a6070;
}
.rt-num {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #3d2030;
}
.rt-num.grande {
    font-size: 1.45rem;
    color: #c0607a;
}
.rt-op {
    font-family: 'Cinzel', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #8a6070;
}
.pre-envio {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    background: rgba(255, 248, 195, 0.9);
    border: 1px solid rgba(218, 185, 95, 0.45);
    border-radius: 12px;
    padding: 0.7rem 0.95rem;
    width: 100%;
}
.pe-svg {
    color: #9a7020;
    flex-shrink: 0;
    margin-top: 2px;
}
.pe-texto {
    font-size: 0.88rem;
    color: #7a5010;
    font-style: italic;
    line-height: 1.45;
}
.pe-texto strong {
    color: #5a3808;
    font-style: normal;
}
.wa-destino-aviso {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(220, 245, 230, 0.88);
    border: 1px solid rgba(70, 155, 110, 0.35);
    border-radius: 10px;
    padding: 0.55rem 0.9rem;
    width: 100%;
}
.wa-aviso-icon {
    color: #25a244;
    flex-shrink: 0;
}
.wa-destino-aviso span {
    font-size: 0.82rem;
    color: #1a5e2a;
    font-style: italic;
}
.form-acciones {
    padding: 1.4rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    align-items: center;
}
.btn-enviar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    padding: 1.1rem 1.8rem;
    background: linear-gradient(135deg, #3d1a28 0%, #6e2a45 50%, #9a3d58 100%);
    color: white;
    border: none;
    border-radius: 17px;
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
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
    min-height: 54px;
    -webkit-tap-highlight-color: transparent;
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
    transform: scale(0.98);
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
    flex-shrink: 0;
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
    font-size: 0.76rem;
    color: #8a6070;
    font-style: italic;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
}
.lock-icon {
    flex-shrink: 0;
    opacity: 0.55;
}
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
    max-height: 800px;
}

/* ═══ ÉXITO ═══ */
.exito-card {
    background: rgba(253, 248, 245, 0.85);
    backdrop-filter: blur(18px);
    border-radius: 26px;
    border: 1px solid rgba(192, 96, 122, 0.22);
    box-shadow:
        0 16px 58px rgba(140, 50, 80, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.65);
    padding: 2.8rem 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    animation: zoomIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.84);
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
    color: #c0607a;
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
    width: 96px;
    height: 96px;
    border: 2px solid rgba(192, 96, 122, 0.5);
}
.exito-ring.r2 {
    width: 124px;
    height: 124px;
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
    font-size: clamp(1.35rem, 4vw, 2rem);
    font-weight: 700;
    color: #7a2e48;
    letter-spacing: 1px;
    position: relative;
    z-index: 1;
}
.exito-sub {
    font-size: 1.02rem;
    color: #8a6070;
    font-style: italic;
    position: relative;
    z-index: 1;
}
.exito-resumen {
    display: flex;
    gap: 0.75rem;
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
    gap: 0.32rem;
    border-radius: 18px;
    padding: 0.95rem 1.2rem;
    border: 1px solid transparent;
    min-width: 86px;
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
    background: rgba(255, 235, 242, 0.9);
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
    color: #c0607a;
}
.er-label {
    font-family: 'Cinzel', serif;
    font-size: 0.54rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #8a6070;
}
.er-num {
    font-family: 'Cinzel', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #7a2e48;
    line-height: 1;
}
.er-num.grande {
    font-size: 2.3rem;
    color: #c0607a;
}
.exito-detalles {
    display: flex;
    flex-direction: column;
    gap: 0.48rem;
    width: 100%;
    max-width: 340px;
    background: rgba(255, 252, 254, 0.9);
    border-radius: 16px;
    padding: 1.05rem 1.2rem;
    border: 1px solid rgba(192, 96, 122, 0.2);
    position: relative;
    z-index: 1;
}
.ed-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.9rem;
    color: #3d2030;
}
.ed-svg {
    color: #c9974a;
    flex-shrink: 0;
}
.exito-tel-confirmado {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(240, 235, 255, 0.88);
    border: 1px solid rgba(150, 120, 198, 0.35);
    border-radius: 10px;
    padding: 0.55rem 1rem;
    position: relative;
    z-index: 1;
}
.exito-tel-icon {
    color: #7050c8;
    flex-shrink: 0;
}
.exito-tel-confirmado span {
    font-size: 0.88rem;
    color: #3d2030;
    font-style: italic;
}
.exito-tel-confirmado strong {
    color: #7a2e48;
    font-style: normal;
}
.exito-wa-aviso {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(220, 245, 230, 0.9);
    border: 1px solid rgba(70, 155, 110, 0.38);
    border-radius: 12px;
    padding: 0.65rem 1rem;
    position: relative;
    z-index: 1;
}
.exito-wa-icon {
    color: #25a244;
    flex-shrink: 0;
}
.exito-wa-aviso span {
    font-size: 0.84rem;
    color: #1a5e2a;
    font-style: italic;
}
.btn-modificar {
    display: flex;
    align-items: center;
    background: transparent;
    border: 1.5px solid rgba(192, 96, 122, 0.42);
    color: #c0607a;
    padding: 0.7rem 1.7rem;
    border-radius: 50px;
    font-family: 'Cinzel', serif;
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.22s;
    position: relative;
    z-index: 1;
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
}
.btn-modificar:hover {
    background: rgba(255, 235, 242, 0.9);
    border-color: #c0607a;
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
    gap: 0.9rem;
    margin-bottom: 0.65rem;
}
.pl-trazo {
    flex: 1;
    max-width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9974a, transparent);
}
.pie-flor-svg {
    color: #c9974a;
}
.pie-cita {
    font-family: 'Cinzel', serif;
    font-size: 0.86rem;
    font-style: italic;
    color: #7a2e48;
    letter-spacing: 1px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 500px) {
    .portada-hero {
        max-height: 660px;
    }
    .portada-content {
        gap: 0.72rem;
        padding: 1.5rem 1rem;
    }
    .portada-countdown {
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.75rem 1.3rem;
    }
    .cd-sep {
        width: 60px;
        height: 1px;
    }
    .cd-bloque-texto {
        text-align: center;
    }
    .rsvp-body {
        padding: 2rem 0.75rem 3rem;
    }
    .form-bloque {
        padding: 1.25rem 1.1rem;
    }
    .form-acciones {
        padding: 1.25rem 1.1rem;
    }
    .fecha-banner {
        padding: 0.9rem 1.1rem;
    }
    .campo-grid {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    .contadores-grid {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    .asiste-opciones {
        flex-direction: column;
    }
    .asiste-btn {
        min-height: 54px;
    }
    .resumen-total {
        gap: 0.38rem;
    }
    .rt-pill {
        padding: 0.4rem 0.75rem;
    }
    .exito-card {
        padding: 2.2rem 1.2rem;
    }
    .exito-resumen {
        flex-direction: column;
        align-items: center;
    }
    .btn-enviar {
        font-size: 0.82rem;
        letter-spacing: 1.5px;
    }
    .tel-code {
        font-size: 0.72rem;
    }
}
@media (max-width: 360px) {
    .portada-titulo {
        font-size: 1.85rem;
    }
    .cd-num {
        font-size: 2rem;
    }
    .seccion-titulo {
        font-size: 1.55rem;
    }
    .step-num {
        font-size: 1.65rem;
    }
    .er-num {
        font-size: 1.55rem;
    }
    .er-num.grande {
        font-size: 2rem;
    }
}
@media (prefers-reduced-motion: reduce) {
    .portada-bg,
    .sobre-anillo,
    .cta-arrow-svg,
    .scroll-dot,
    .exito-icono-svg,
    .btn-enviar::after,
    .particula,
    .sparkle {
        animation: none !important;
    }
}
</style>

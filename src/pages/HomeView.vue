<template>
    <main class="bautizo-app">
        <!-- 🎵 Botón flotante de música -->
        <div class="music-control" @click="toggleMusic">
            <span class="music-icon">{{ isPlaying ? '🔊' : '🔇' }}</span>
            <input
                v-if="isPlaying"
                type="range"
                min="0"
                max="1"
                step="0.05"
                v-model="volumen"
                @input="cambiarVolumen"
                @click.stop
                class="volume-slider"
            />
        </div>

        <HeroSection
            nombreBebe="Keila Tamara Castro Luna"
            fecha="Sábado, 18 de Abril de 2026"
            lugar="Iglesia Santa Ana de Cala Cala · 14:45 PM"
            hora="14:45 PM"
            nombrePadre="Wilfredo Castro Butrón"
            nombreMadre="Paola Nelly Luna Huallpa"
            portadaUrl="/bautizada/keyla3.png"
        />

        <div class="separador">
            <span></span><span class="sep-icono">🕊️ 🌸 🕊️</span><span></span>
        </div>

        <BautizoCeremonia
            nombreIglesia="Iglesia Santa Ana de Cala Cala"
            diocesis="Cochabamba"
            horaMisa="14:45 PM"
            fechaBautizo="Sábado, 18 de Abril de 2026"
            direccion="Cala Cala, Cochabamba, Bolivia"
            :latitud="-17.3895"
            :longitud="-66.1568"
        />

        <div class="separador">
            <span></span><span class="sep-icono">🥂 🎉 🥂</span><span></span>
        </div>

        <BautizoLocal
            nombre-local="Salón Los Jardines"
            slogan="Donde los recuerdos florecen"
            direccion-local="Calle Rosales 456, Zona Sur, La Paz"
            :capacidad="120"
            dresscode="Elegante · Tonos pastel y blancos"
            fecha-limite="10 de Abril de 2025"
            telefono-papa="+591 71234567"
            telefono-mama="+591 76543210"
            whatsapp-mama="59176543210"
            nota-parking="Estacionamiento gratuito disponible en el predio del salón y calles aledañas."
            mensaje-pie="Con todo nuestro amor, los esperamos para celebrar este día tan especial junto a ustedes."
            firma-familia="La Familia Martínez–Romero"
            :latitud="-16.51"
            :longitud="-68.12"
        />

        <div class="separador">
            <span></span><span class="sep-icono">💌 ✦ 💌</span><span></span>
        </div>

        <div id="rsvp-section" ref="rsvpRef">
            <BautizoRSVP
                fecha-limite="18 de Abril de 2026"
                fecha-evento="2026-04-18"
                whatsapp-papa="60767398"
                whatsapp-mama="78330856"
            />
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Howl } from 'howler';
import HeroSection from '@/components/HeroSection.vue';
import BautizoCeremonia from '@/components/BautizoCeremonia.vue';
import BautizoLocal from '@/components/BautizoLocal.vue';
import BautizoRSVP from '@/components/BautizoRSVP.vue';

// ── Scroll RSVP ──────────────────────────────────────
const rsvpRef = ref(null);
function scrollARSVP() {
    rsvpRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Música ───────────────────────────────────────────
const isPlaying = ref(false);
const volumen = ref(0.6);
let sound = null;

onMounted(() => {
    sound = new Howl({
        src: ['/music/videoplayback.m4a'],
        loop: true,
        volume: volumen.value,
        autoplay: false,
        onplay: () => {
            isPlaying.value = true;
        },
        onpause: () => {
            isPlaying.value = false;
        },
        onstop: () => {
            isPlaying.value = false;
        },
    });

    // Arranca al primer click en cualquier parte de la página
    document.addEventListener('click', iniciarMusica, { once: true });
});

onUnmounted(() => {
    sound?.unload();
    document.removeEventListener('click', iniciarMusica);
});

function iniciarMusica() {
    if (sound && !isPlaying.value) {
        sound.play();
    }
}

function toggleMusic() {
    if (!sound) return;

    if (isPlaying.value) {
        sound.pause();
    } else {
        sound.play();
    }
}

function cambiarVolumen() {
    sound?.volume(parseFloat(volumen.value));
}
</script>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
html {
    scroll-behavior: smooth;
}
body {
    overflow-x: hidden;
}

.bautizo-app {
    position: relative;
    min-height: 100vh;
    width: 100%;
}

/* 🎵 Botón flotante */
.music-control {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 999;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(210, 150, 170, 0.4);
    border-radius: 2rem;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;
    user-select: none;
}
.music-control:hover {
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}
.music-icon {
    font-size: 1.3rem;
}
.volume-slider {
    width: 80px;
    accent-color: #d296aa;
    cursor: pointer;
}

.fondo-global {
    position: fixed;
    inset: 0;
    background-image: url('@/assets/fondo.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
}

.separador {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.8rem 2rem;
    max-width: 500px;
    margin: 0 auto;
}
.separador span:first-child,
.separador span:last-child {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(210, 150, 170, 0.55), transparent);
}
.sep-icono {
    font-size: 0.9rem;
    letter-spacing: 5px;
    white-space: nowrap;
}
</style>

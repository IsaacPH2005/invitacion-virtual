<template>
    <main class="bautizo-app">
        <!-- Fondo fijo compartido por toda la app -->
        <!-- <div class="fondo-global"></div> -->

        <!-- ① Invitación principal -->
        <!-- HeroSection emite "ir-a-rsvp" al presionar "Confirmar Asistencia" -->
        <HeroSection
            nombreBebe="Keila Tamara Castro Luna"
            fecha="Sábado, 18 de Abril de 2026"
            lugar="Iglesia Santa Ana de Cala Cala · 14:45 PM"
            hora="14:45 PM"
            nombrePadre="Wilfredo Castro Butrón"
            nombreMadre="Paola Nelly Luna Huallpa"
            portadaUrl="./bautizo.webp"
        />

        <div class="separador">
            <span></span><span class="sep-icono">🕊️ 🌸 🕊️</span><span></span>
        </div>

        <!-- ② Iglesia y misa -->
        <!-- BautizoCeremonia también emite "ir-a-rsvp" desde su botón Confirmar -->
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

        <!-- ③ Local de recepción -->
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

        <!-- ④ Confirmación de asistencia -->
        <!-- El id "rsvp-section" es el target del scroll desde HeroSection y BautizoCeremonia -->
        <div id="rsvp-section" ref="rsvpRef">
            <BautizoRSVP
                fecha-limite="10 de Abril de 2025"
                fecha-evento="2025-04-15"
                whatsapp-papa="59171234567"
                whatsapp-mama="59176543210"
            />
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import BautizoCeremonia from '@/components/BautizoCeremonia.vue';
import BautizoLocal from '@/components/BautizoLocal.vue';
import BautizoRSVP from '@/components/BautizoRSVP.vue';

// Ref al contenedor del RSVP para scroll programático
const rsvpRef = ref(null);

function scrollARSVP() {
    rsvpRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

/* Fondo fijo con los angelitos */
.fondo-global {
    position: fixed;
    inset: 0;
    background-image: url('@/assets/fondo.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
}

/* Separador entre secciones */
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

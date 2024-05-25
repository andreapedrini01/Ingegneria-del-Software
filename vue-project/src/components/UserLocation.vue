<template>
    <div class="user-location">
        <h1>La tua posizione</h1>
        <p>Latitudine: 100 </p>
        <p>Longitudine: 100 </p>
    </div>
</template>

<script>
    export default {
        name: 'UserLocation',
    }
</script>

<style scoped>
    .user-location {
        background-color: #333;
        padding: 20px;
        border-radius: 5px;
        width: 100%; /* Riduci la larghezza al 50% del contenitore padre */
        margin: 0 auto; /* Centra orizzontalmente */
        text-align: center;
        position: relative;
        top: 100px;
    }
</style>
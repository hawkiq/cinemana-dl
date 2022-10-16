<script setup>
import HelloWorld from './components/Home.vue'
import MainComponent from './components/Main.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logoc.png" width="125" height="125" /><hr>

    <div class="wrapper">
      <HelloWorld msg="Cinerama Downloader" />
    </div>
  </header>

  <main>
  <MainComponent/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

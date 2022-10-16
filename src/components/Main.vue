<script setup>
import SingleItem from "./SingleItem.vue";
import IconCommunity from "./icons/IconCommunity.vue";
import IconDocumentation from "./icons/IconDocumentation.vue";

import { useCinemana } from "../composable/cinemana";

defineProps({
  msg: String,
});

const {
  checkMovie,
  downloadWithAxios,
  files,
  errors,
  translations,
  loading,
  movieid,
} = useCinemana();
</script>

<template>
  <SingleItem>
    <template #icon>
      <IconCommunity />
    </template>
    <template #heading>Download</template>
    <div class="mb-3">
      <label for="link" class="form-label">Movie ID</label>
      <input
        type="text"
        class="form-control"
        id="link"
        placeholder="Put ID here you find it in Address bar"
        v-model="movieid"
        v-on:keyup.enter="checkMovie"
      />
    </div>

    <div class="mb-3 d-grid gap-2">
      <button
        class="btn"
        :class="[loading ? 'btn-warning' : 'btn-danger']"
        id="get"
        @click="checkMovie"
      >
        {{ loading ? "Waiting ....." : "Download" }}
      </button>
    </div>
    <div class="mb-3" ref="targetRef">
      <div class="row">
        <div v-if="errors.length > 0" class="alert alert-danger">
          Error Happened Try Again
        </div>
        <div class="col-md-6 placeholder-glow">
          <ul v-if="files.length > 0" class="list-group list-group-flush">
            <li
              v-for="file in files"
              :key="file.name"
              class="list-group-item list-group-item-dark list-group-item-action"
            >
              <div class="d-grid gap-2">
                <a
                  target="_blank"
                  :href="file.videoUrl"
                  class="btn btn-outline-success"
                >
                  {{ file.resolution }}
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-6 placeholder-glow">
          <ul v-if="translations.length > 0" class="list-group">
            <li
              v-for="trans in translations"
              :key="trans.name"
              class="list-group-item list-group-item-dark list-group-item-action"
            >
              <div v-if="trans.extention == 'srt'" class="d-grid gap-2">
                <a
                  href="#"
                  @click.prevent="
                    downloadWithAxios(
                      trans.file,
                      trans.name + '.' + trans.extention
                    )
                  "
                  class="btn btn-outline-primary"
                >
                  {{ trans.name.toUpperCase() }}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </SingleItem>

  <SingleItem>
    <template #icon>
      <IconDocumentation />
    </template>
    <template #heading>Where to find ID</template>

    <img src="../assets/explain.jpg" style="width: 100%" />
  </SingleItem>
</template>
<style>
.card,
.list-group {
  background-color: #212529 !important;
}
</style>

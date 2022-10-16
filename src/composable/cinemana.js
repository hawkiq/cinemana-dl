import axios from "axios";
import { ref } from "vue";


export function useCinemana() {
    const files = ref([]);
    const translations = ref([]);
    const errors = ref([]);
    const movieid = ref("");
    const loading = ref(false);

    function checkMovie() {
        if (movieid.value == "") {
            alert("Enter Movie ID Please");
        } else {
            loading.value = true;
            getAllLinks();
        }
    }

    function getAllLinks() {
        axios
            .get(
                "https://cinemana.shabakaty.com/api/android/transcoddedFiles/id/" +
                movieid.value
            )
            .then((response) => {
                if (typeof response.data === "undefined") {
                    console.log("This Movie has No Files");
                } else {
                    files.value = response.data;
                    loading.value = false;
                }
            })
            .catch((e) => {
                errors.value.push(e);
            });
        axios
            .get(
                "https://cinemana.shabakaty.com/api/android/translationFiles/id/" +
                movieid.value
            )
            .then((response) => {
                if (typeof response.data.translations === "undefined") {
                    console.log("This Movie has No Translations");
                } else {
                    translations.value = response.data.translations;
                    loading.value = false;
                }
            })
            .catch((e) => {
                errors.value.push(e);
            });
        //console.log(this.errors);
    }
    function forceFileDownload(response, title) {
        console.log(title);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", title);
        document.body.appendChild(link);
        link.click();
    }
    function downloadWithAxios(url, title) {
        axios({
            method: "get",
            url,
            responseType: "blob",
        })
            .then((response) => {
                forceFileDownload(response, title);
            })
            .catch(() => console.log("error occured"));
    }

    return {checkMovie,downloadWithAxios,files,errors,translations,loading,movieid}
}
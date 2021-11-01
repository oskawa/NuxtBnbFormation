<template>
  <div>
    <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <!-- 
  Nuxt permet de prefetch les autres pages, pour éviter que tout se charge on utilise
  nuxt-link ou router-link
  -->
      <nuxt-link :to="`/home/${home.objectID}`"
        ><Homecard :home="home"
      /></nuxt-link>
    </div>
  </div>
</template>

<script>
import homes from "~/data/homes";
export default {
  head() {
    return {
      title: "Homepage",
      meta: [
        {
          name: "description",
          content: "Ceci est la page principale!",
          hid: "description",
        },
      ],
    };
  },
  async asyncData({$dataAPI}){
    return{
      homes:(await $dataAPI.getHomes()).json.hits
    }
  },
  
};
</script>

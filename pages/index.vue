<template>
 <div class="app">
    <div class="app-container">
      <div class="app-hero">
        <h2>
          - Settle in somewhere new. Discover stays to live, work, or just relax.
        </h2>
      </div>
    </div>
    <SectionPremiumListings />
    <SectionRecentlyAdded class="app-background-grey" :homes="homes" />
    <SectionMore />
  </div>
</template>

<script>

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

<template>
  <div class="app-search-results-page">
    <div class="app-search-results">
      <div class="app-search-results-listing">
        <h2 class="app-title"> Stays in {{label}}</h2>
         <nuxt-link v-for="home in homes" :key="home.objectID" :to="`/home/${home.objectID}`" >
      <home-row :home="home" @mouseouver.native="hightlightMarker(home.objectID, true)" @mouseout.native="hightlightMarker(home.objectID, false)" class="app-house"/>
      </nuxt-link>
      </div>

      <div class="app-search-results-map">
        <div class="app-map" ref="map"></div>
      </div>
    </div>
     
  </div>
</template>


<script>
import HomeRow from "../components/HomeRow.vue";
export default {
    head(){
        return{
            title: `Locations autour de ${this.label}`
        }
    },
  components: { HomeRow },
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataAPI.getHomeByLocation(
      to.query.lat,
      to.query.lng,
      to.query.start,
      to.query.end
    )
    this.homes = data.json.hits,
      this.label = to.query.label,
      this.lat = to.query.lat,
      this.lng = to.query.lng
      this.updateMap()
    next();
  },
  async asyncData({ query, $dataAPI }) {
    const data = await $dataAPI.getHomeByLocation(query.lat, query.lng, query.start, query.end)
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    };
  },
  mounted(){
      this.updateMap()

  },
  methods:{
      hightlightMarker(homeId, isHighlighted){
          document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
      },
      updateMap(){
          this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())
      },
      getHomeMarkers(){
        if (this.homes.length == 0) return null
          return this.homes.map((home)=>{
              return{
                  ...home._geoloc,
                  pricePerNight:home.pricePerNight,
                  id: home.objectID
              }
          })
      }
  }
};
</script>

<style>
.marker{
    background: white;
    border:1px solid whitesmoke;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 10px;
}
.marker-hightlight{
    color: white !important;
    background-color:black;
    border-color:black;
}
</style>
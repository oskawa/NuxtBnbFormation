<template>
  <div class="app-container">
    <property-gallerye :images="home.images"></property-gallerye>
    <property-details :home="home"></property-details>
    <property-description :home="home"></property-description>
    <property-map :home="home"></property-map>
    <property-review :reviews="reviews"></property-review>
    <property-host :user="user"></property-host>
  </div>
</template>

<script>
import PropertyDescription from '../../components/PropertyDescription.vue';
import PropertyDetails from '../../components/PropertyDetails.vue';
import PropertyMap from '../../components/PropertyMap.vue';
import PropertyReview from '../../components/PropertyReview.vue';
import Shorttext from "../../components/Shorttext.vue";

export default {
  components: { Shorttext, PropertyDetails, PropertyDescription, PropertyMap, PropertyReview },
  // On choisit le layout qu'on veut afficher
  // layout: "blue",

  // Donnees à mettre dans le head du document
  head() {
    return {
      title: this.home.title,
    };
  },
  // Donnees à créer et récupérer

  // Lorsque le component se créé
  // On insère des varaibles et on utilise $ref associé à la div map
  
  //Component créé
  async asyncData({ params, $dataAPI, error }) {
    // On cherche la maison dans le fichier JSON qui correspond à la route indiquée


    const responses = await Promise.all([
        $dataAPI.getHome(params.id),
         $dataAPI.getReviewByHomeId(params.id),
         $dataAPI.getUsersByHomeId(params.id)
    ])

    const badResponse = responses.find((response)=> !response.ok)
    if(badResponse) return error({statusCode: reviewresponse.status,message: reviewresponse.status});
   
      return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user : responses[2].json.hits[0]
    };
  },

};
</script>
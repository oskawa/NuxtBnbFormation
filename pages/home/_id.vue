<template>
  <div class="app-container">
    <property-gallerye :images="home.images"></property-gallerye>
    <property-details :home="home"></property-details>
    <property-description :home="home"></property-description>
    <property-map :home="home"></property-map>
    <property-review :reviews="reviews"></property-review>
    <property-host :user="user"></property-host>
    <script type="application/ld+json" v-html="getSchema"></script>
  </div>
</template>

<script>
import PropertyDescription from '../../components/PropertyDescription.vue';
import PropertyDetails from '../../components/PropertyDetails.vue';
import PropertyMap from '../../components/PropertyMap.vue';
import PropertyReview from '../../components/PropertyReview.vue';
import Shorttext from "../../components/Shorttext.vue";

export default {
  computed:{
    getSchema(){
      return JSON.stringify({
        "@context": "http://schema.org",
        "@type": "BedAndBreafkfast",
        "name": this.home.title,
        "image":this.$img(this.home.images[0], {width:1200}, {provider: 'cloudinary'}),
        "address":{
          "@type" : "PostalAdress",
          "adressLocality": this.home.location.city,
          "adressRegion": this.home.location.state,
          "postalCode": this.home.location.zipcode,
          "streetAdress": this.home.loocation.address,
        },
        "aggregateRating":{
          "@type": "AggregateRating",
          "ratingValue": this.home.reviewValue,
          "reviewCount": this.home.reviewCount,
        }
      })
    }
  },
  components: { Shorttext, PropertyDetails, PropertyDescription, PropertyMap, PropertyReview },
  // On choisit le layout qu'on veut afficher
  // layout: "blue",

  // Donnees à mettre dans le head du document
  head() {
    return {
      title: this.home.title,
      meta:[
        {hid:'og-type', property: 'og-type', content:'website'},
        {hid: 'og-title', property: 'og-title', content: this.home.title},
        {hid: 'og-desc', property: 'og:description', content: this.home.description},
        {hid:'og-image', property: 'og:image', content: this.$img(this.home.images[0], {width:1200}, {provider: 'cloudinary'})},
        {hid: 'og-url', property: 'og:url', content: `${this.$config.rootUrl}/home/${this.home.objectID}`},
        {hid: 't-type', name: 'twitter:card', content: 'summary_large_image'}
      ]
    }
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
<template>
    <div class="max-w mx-auto flex flex-col p-10 center-items">
        <div class="space-y-4 text-gray-700 mb-6 max-w">
            <h2 class="name p-relative">{{property.name}}</h2>
            <h1 class="p-relative">{{property.id}}</h1>
            <div class="p-relative flex items-center jsutify-between p-5 rounded-lg bg-white">
                <div class="absolute -top-0.5 -left-0.5 z-10"><i class="fa-solid fa-file-invoice fa-2x"></i><span class="text-grey-700 text-bold ml-2">Description</span></div>
                <div class="flex-grow m-5"><p class="description ">{{property.description}}</p></div>
            </div>
        </div>
        <div class="space-y-4 bg-white rounded-lg p-5  max-w">
            <h3 class="text-lg font-bold mb-2 d-block">Contacts&info</h3>
            <ul class="space-y-3 d-block mx-auto">
            <li class="flex items-center"><i class="fa-solid fa-location-dot pr-5"></i><span>{{property.address}}</span></li>
            <hr>
            <li class="flex items-center"><i class="fa-solid fa-user pr-5"></i><span>{{client.name}}</span></li>
            <hr>
            <li class="flex items-center"><i class="fa-solid fa-envelope pr-5"></i><span>{{client.email}}</span></li>
            <hr>
            <li class="flex items-center"><i class="fa-solid fa-phone pr-5"></i><span>{{client.phone}}</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
//import {getclientbyid} from './clients.vue'
export default {
    components: {},
    name: 'MySite',
    data(){
        return {
        client: {
          id:"",
          name: "",
          email: "",
          phone: "",
          city: "",
          type: ""
        },
        property: {
            id: "",
            name: "",
            address: "",
            description: "",
            city: "",
            state: "",
            price: "",
            availability: "",
            listingType: "",
            ownerId: ""
        },
        }
    },
    methods: {
        async getpropbyid(id){
        try{
            const endpoint =`http://localhost:8080/api/v1/get-real-estate/${id}`;
            const response = await axios.get(endpoint);
            return response;
        } catch(e){
            return {id: 2,name:"ahmed",address: "dsdsd",description: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",city: "alger",state: "sdsd",price: 12323,availability: "s",listingType: "dsdsd",ownerId: 3};
        }
        },
    },
    async mounted() {
        //const id=this.$route.params.propId
        this.property= {id: 2,name:"ahmed",address: "dsdsd",description: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",city: "alger",state: "sdsd",price: 12323,availability: "s",listingType: "dsdsd",ownerId: 3};
        this.client= { id: 1,name: "ayoub",email: "ayoub@gmail.com",phone: "05232132332",city: 'alger',type: 'buyer' };
    }
    
}
</script>
<style scoped>
.description{
    text-align:left ;
    padding-left: 10px;
    max-width: 250px;
}
div >ul {
    list-style-type:none;
    max-width: 500px;
}
div >ul>li {
    margin-bottom: 5px;
}
</style>

<template>
<div>
    <div class="search">

    </div>
    <h2>Real Estate Listings</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">error fetching for sites</div>
    <div v-else class="wrapper d-grid gap-20">
        <div v-for="property in properties" :key="property.id" class="property bg-white rad-6" >
            <div @click="routetosite(property.id)">
            <div class="center-flex"><img src="@/assets/immobillier.png" width="150px" class="p-relative align-center"></div>
            <h2>{{property.name}}</h2>
            <div class="d-block info">
                <p class="price d-block">{{property.price}}</p>
                <i class="fa-solid fa-location-dot"></i>
                <span class="address">{{property.address}}</span>
            </div>
            <hr>
            </div>
        </div>
    </div>
</div>
</template>


<script>

import '../assets/framework.css'
export default {
    components: { },
    name: 'AllSites',
    methods: {
        async fetchproperties () {
            try {
                const response =await fetch("http://localhost:8080/api/v1/all")
                if(!response.ok) throw new Error("failed to fetch data");
                this.properties=await response.json();
            }catch (err){
                this.loading=false
                this.error=err.message;
            }finally{
                this.loading=false;
            }
        },
        routetosite (propid){
            this.$router.push({name: 'site', params: {propId: propid}});
        },
    },
    data() {
        return {
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
        properties: [{id: 2,name:"ahmed",address: "dsdsd",description: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet",city: "alger",state: "sdsd",price: 12323,availability: "s",listingType: "dsdsd",ownerId: 3}],
        client: {
          id:"",
          Name: "",
          phone: "",
          email: "",
          city: "",
          type: ""
        },
        loading: false,
        error: false
        }
    },
    mounted(){
            //this.fetchproperties();
    }
    }

    
</script>
<style scoped>
.wrapper{
    grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
}
@media (max-width:767px) {
    .wrapper{
        grid-template-columns: minmax(200px,1fr);
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        gap:10px;
    }
}
.property{
    flex: 0 0 33.3333333333%;
    align-items:center;
    justify-content:center;
    box-sizing: inherit;
    min-height: 250px;
    cursor: pointer;
    transition: 0.5s;
}
.property:hover{
    background-color: #c1c1c1 ;
    
}
.property .info{
    padding-left:auto ;
}
</style>

<template>
  <div class="clients-page d-flex main">
  <div>
  <h1 class="mb20">clients</h1>
  <div class="responsive-table">
  <table class="clients-table fs-15 w-full">
    <thead>
      <tr class="bg-gray-200">
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>City</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.id }}</td>
          <td>{{ client.name }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.city }}</td>
          <td><button @click="deleteclient(client.id)" class="delete-btn"><span class="fa-solid fa-trash"></span></button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <button @click="adduser =  !adduser" class="bg-blue c-white b-none btn-shape w-fit fs-14">Add User</button>
    <div class="center-flex mt20" v-if="adduser">
      <div class="bg-white rad-10 p20">
        <h2 class="mt0 mb20">Add a user</h2>
        <div class="d-block">
          <form @submit.prevent="addclient">
            
              <input type="text" v-model="client.name" class="d-block mb20 p10 w-full bg-gray-200 b-none rounded d-block" placeholder="Name" required />
            
            
              <input type="text" v-model="client.phone" class="d-block mb20 p10 w-full bg-gray-200 b-none rounded d-block" pattern="^[0-9]{10}$" placeholder="Phone" required />
            
            
              <input type="email" v-model="client.email" class="d-block mb20 p10 w-full bg-gray-200 b-none rounded d-block" placeholder="email" required />
            
            
              <input type="text" v-model="client.city" class="d-block mb20 p10 w-full bg-gray-200 b-none rounded d-block" placeholder="city" required/>
            
            <input type="submit" class="adduser bg-blue c-white b-none btn-shape w-fit fs-14 d-block" value="add user"/>
          </form>
        </div>
      </div>
    </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import '../assets/master.css'
export default {
  components: { },
  name: 'MyClients',
  data() {
      return {
        client: {
          id:"",
          name: "",
          email: "",
          phone: "",
          city: "",
          type: ""
        },
        clients: [
          { id: 1,name: "ayoub",email: "ayoub@gmail.com",phone: "05232132332",city: 'alger',type: 'buyer' },
          { id: 2,name: "mohamed",email: "mohamed@gmail.com",phone: "0693441422",city: 'belida',type: 'seller' },
        ],
        nextId: 3,
        adduser: false
      }
  },
  methods: {
    async fetchclients(){
      try {
        const endpoint =`http://localhost:8080/clients/`;
        const response = await axios.get(endpoint);
        if (response != null){
          this.clients= [...this.clients,...response];
        }
      }catch (error){
        console.log("error fetching for clients ",error);
      }
    },
    async deleteclient(id){
        this.clients=this.clients.filter(t => t.id !== id);
      try{
        const endpoint =`http://localhost:8080/delete/client/${id}`;
        await axios.get(endpoint);
        console.log("client deleted ",id);
      } catch(error){
        console.error("error deleting client ",error);
      }
    },
    async addclient(){
      const phonepattern= /^[0-9]{10}$/;
      if(!phonepattern.test(this.client.phone)){
        alert("correct the phone number!!!");
        return;
      }
      this.clients.push({...this.client,id: this.nextId});
      try{
        const endpoint =`http://localhost:8080/add/client`;
        await axios.post(endpoint,this.client).then(response => {
          this.clients.push(response.data);
        }).catch(error => { console.log("Error adding a user (fetching enpoint)",error)});
        console.log("client added ");
        
      } catch(error){
        console.error("error deleting client ",error);
      }
      this.client={};
    }
  },
  mounted(){
    this.fetchclients();
  }
  
}
export async function getclientbyid(id){
      try{
        const endpoint =`http://localhost:8080/client/${id}`;
        const response =await axios.get(endpoint);
        console.log("client fetched ",id);
        return response;
      } catch(error){
        return { id: 1,name: "ayoub",email: "ayoub@gmail.com",phone: "05232132332",city: 'alger',type: 'buyer' };
      }
    }
</script>
<style scoped>
.main{
  justify-content: center;
  
}
form{
  flex-direction: column;
  width:450px;
  align-self: center;
}
form div{
  margin:10px 0 10px 0 ;
  
}
form .adduser{
  transition: 0.3s; 
  margin-left: auto;
  cursor:pointer;
}
form .adduser:hover{
  background-color: var(--blue-alt-color);
}
.clients-page .responsive-table {
  overflow-x: auto;
}
.clients-page table {
  min-width: 1000px;
  border-spacing: 0;
}
.clients-page thead td {
  background-color: #eee;
  font-weight: bold;
}
.clients-page table td {
  padding: 15px;
}
.clients-page tbody td {
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  transition: 0.1s;
}
.clients-page table tbody tr td:last-child {
  border-right: 1px solid #eee;
}
.clients-page tbody tr:hover td {
  background-color: #faf7f7;
}
.clients-page table img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 2px;
  background-color: white;
}
.clients-page table img:not(:first-child) {
  margin-left: -20px;
}
.clients-page table .label {
  font-size: 13px;
}
</style>

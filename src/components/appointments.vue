<template>
  <div>
  <div class="appointments-page">
  <h1 class="mb20">appointments</h1>
  <div class="responsive-table">
  <table class="appointments-table fs-15 w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>name</th>
        <th>phone</th>
        <th>email</th>
        <th>city</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>{{ appointment.id }}</td>
          <td>{{ appointment.client.name}}</td>
          <td>{{ appointment.client.phone }}</td>
          <td>{{ appointment.client.email}}</td>
          <td>{{ appointment.client.city }}</td>
          <td>{{ appointment.date }}</td>
          <td><button @click="deleteappointment(appointment.id)" class="delete-btn"><span class="fa-solid fa-trash"></span></button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <button @click="addrdvb =  !addrdvb" class="bg-blue c-white b-none btn-shape w-fit fs-14">Add appointment</button>
    <div class="center-flex mt20" v-if="addrdvb">
      <div class="bg-white rounded p20">
        <h2 class="mt0 mb20">Add an appointment</h2>
        <div class="d-block">
          <form @submit.prevent="addrdv">
              <input type="text" v-model="appointment.client.name" class="d-block mb20 p10 bg-gray-200 b-none rounded d-block" placeholder="Name" required />
              <input type="text" v-model="appointment.client.phone" class="d-block mb20 p10 bg-gray-200 b-none rounded d-block" pattern="^[0-9]{10}$" placeholder="Phone" required />            
              <input type="email" v-model="appointment.client.email" class="d-block mb20 p10 bg-gray-200 b-none rounded d-block" placeholder="email" required />
              <input type="text" v-model="appointment.client.city" class="d-block mb20 p10 bg-gray-200 b-none rounded d-block" placeholder="city" required/>
              <input type="date" v-model="appointment.date" class="d-block mb20 p10 bg-gray-200 b-none rounded d-block" placeholder="date" required/>
            <input type="submit" class="addrdv bg-blue c-white b-none btn-shape w-fit fs-14 d-block" value="add to appointments"/>
          </form>
        </div>
      </div>
    </div>
</div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'MyRdv',
    methods: {
        async fetchappoinments() {
            try {
        const endpoint =`http://localhost:8080/api/v1/appointment/all`;
        const response = await axios.get(endpoint);
        if (response != null){
          this.appointments= [...this.appointments,...response];
          console.log(this.appointment);
        }
      }catch (error){
        console.log("error fetching for appointments ",error);
      }
        },
        async deleteappointment(id){
            this.appointments=this.appointments.filter((t => t.id !== id));
      try{
        const endpoint =`http://localhost:8080/api/v1/delete/${id}`;
        await axios.get(endpoint);
        
        console.log("appointment deleted ",id);
       }catch(error){
        console.error("error deleting appointment ",error);
      }
        },
    async addrdv(){
      const phonepattern= /^[0-9]{10}$/;
      if(!phonepattern.test(this.appointment.client.phone)){
        alert("correct the phone number!!!");
        return;
      }
      this.appointments.push({id: this.nextId,...this.appointment});
      console.log(this.appointment);
      try{
        const endpoint =`http://localhost:8080/api/v1/appointment/add`;
        await axios.post(endpoint,this.appointment).then(response => {
          this.appointments.push(response.data);
        }).catch(error => { console.log("Error adding an appointment (fetching enpoint)",error)});
        console.log("appointment added ");
        this.addrdvb=false;
      } catch(error){
        console.error("error deleting appointment ",error);
      }
      this.appointment={};
    }
    },
    data() {
        return {
        appointment: {
            id: "",
            client: {
                    id:"",
                    name: "",
                    email: "",
                    phone: "",
                    city: "",
                    type: ""
                },
            date: ""
        },
        appointments: [{id: 1,client: {id: 1,name: "ayoub",email: "ayoub@gmail.com",phone: "05232132332",city: 'alger',type: 'buyer'},date: "20/03/2025"}],
        addrdvb: false
        }
    },
    mounted(){
        this.fetchappoinments();
    }
}
</script>
<style scoped>
.appointments-page .responsive-table {
  overflow-x: auto;
}
.appointments-page table {
  min-width: 1000px;
  border-spacing: 0;
}
.appointments-page thead td {
  background-color: #eee;
  font-weight: bold;
}
.appointments-page table td {
  padding: 15px;
}
.appointments-page tbody td {
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  transition: 0.3s;
}
.appointments-page table tbody tr td:last-child {
  border-right: 1px solid #eee;
}
.appointments-page tbody tr:hover td {
  background-color: #faf7f7;
}
</style>
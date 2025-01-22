<template>
  <div>
  <div class="transactions-page">
  <h1 class="mb-20">Transactions</h1>
  <div class="responsive-table">
  <table class="transactions-table fs-15 w-full">
    <thead>
      <tr>
        <th>From</th>
        <th>To</th>
        <th>ID</th>
        <th>Total paied</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.from }}</td>
          <td>{{ transaction.to }}</td>
          <td>{{ transaction.estateId }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.date }}</td>
          <td><button @click="deletetransaction(transaction.id)" class="delete-btn"><span class="fa-solid fa-trash"></span></button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <button @click="showform = !showform" class="add-btn bg-blue-500 text-white px-4 py-2 rounded"><span class="fa-solid fa-plus"></span></button>

    <!-- Form Popup -->
    <div v-if="showform" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-5xl">
        <h2 class="text-xl font-bold mb-4">Submit Form</h2>

        <!-- Form -->
        <form @submit.prevent="add">
          <div class="grid grid-cols-7 gap-3 max-w">
            <!-- From -->
            <div class="col-span-2">
              <label for="from" class="block text-sm font-medium text-gray-700">From</label>
              <input
                type="text"
                id="from"
                v-model="transaction.from"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            <!-- To -->
            <div class="col-span-2">
              <label for="to" class="block text-sm font-medium text-gray-700">To</label>
              <input
                type="text"
                id="to"
                v-model="transaction.to"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            <!-- ID -->
            <div class="w-24">
              <label for="id" class="block text-sm font-medium text-gray-700">ID</label>
              <input
                type="number"
                id="id"
                v-model="transaction.estateId"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            <!-- Total Paid -->
            <div class="">
              <label for="totalPaid" class="block text-sm font-medium text-gray-700">Money</label>
              <input
                type="number"
                id="totalPaid"
                v-model="transaction.amount"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <!-- Date -->
            <div class="">
              <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                v-model="transaction.date"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="showform = false"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
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
  name: 'MyTransactions',
  data() {
      return {
        transactions: [
          { id: 1,from: "elise",to: "mark",estateId: "400",amount: 2000,date: '2024-12-05' },
          { id: 2,from: "emilie",to: "john",estateId: "2",amount: 4000,date: '2023-11-25' }
        ],
        showform: false,
        transaction: {
          id: 0,
          from: "",
          to: "",
          estateId: "",
          amount: 0,
          date: ""
        },
        id: 3
      }
  },
  methods: {
    async fetchtransactions(){
      try {
        const endpoint =`http://localhost:8080/api/v1/transactions/all`;
        const response = await axios.get(endpoint);
        if (response != null){
          this.transactions= [...this.transactions,...response];
        }
        
      }catch (error){
        console.log("error fetching for transactions ",error);
      }
    },
    async deletetransaction(id){
      this.transactions=this.transactions.filter((t => t.id !== id));
      try{
        const endpoint =`http://localhost:8080/api/v1/transactions/delete/${id}`;
        await axios.get(endpoint);
        
        console.log("transaction deleted ",id);
        id--;
       }catch(error){
        console.error("error deleting transaction ",error);
      }
    },
    async add() {
      // Example: Send form data to an API
      try {
        if(this.transactions.some(transaction => transaction == this.transaction)){
          throw new Error('transaction wtih the smae id already exists!');
        }
        
        const response = await fetch('https://example.com/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.transaction)
        });
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        const result = await response.json();
        this.transactions.push(result);
        this.showform=false;
        // Show success message (optional)
        alert('Form submitted successfully!');
      } catch (error) {
        this.transactions.push(this.transaction);
        console.error('Error submitting form:', error);

        // Show error message (optional)
        alert('Failed to submit form. Please try again.');
      }
    }
    },
  mounted() {
    this.fetchtransactions();
  }
}
</script>
<style scoped>
.transactions-page .responsive-table {
  overflow-x: auto;
}
.transactions-page table {
  min-width: 1000px;
  border-spacing: 0;
}
.transactions-page thead td {
  background-color: #eee;
  font-weight: bold;
}
.transactions-page table td {
  padding: 15px;
}
.transactions-page tbody td {
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  transition: 0.3s;
}
.transactions-page table tbody tr td:last-child {
  border-right: 1px solid #eee;
}
.transactions-page tbody tr:hover td {
  background-color: #faf7f7;
}
.transactions-page table img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 2px;
  background-color: white;
}
.transactions-page table img:not(:first-child) {
  margin-left: -20px;
}
.transactions-page table .label {
  font-size: 13px;
}
</style>
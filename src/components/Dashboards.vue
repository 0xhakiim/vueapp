<template>
   <div class="min-h-screen bg-gray-100 p-6 font-sans">
    <!-- Header Section -->
    <header class="text-center mb-10">
      <h1 class="text-4xl font-bold text-gray-800">Real Estate Agency Performance</h1>
      <p class="text-lg text-gray-600">Monthly Performance Overview</p>
    </header>

    <!-- Key Metrics Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 class="text-lg font-semibold text-gray-700">Total Properties Sold</h3>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ totalPropertiesSold }}</p>
        <p class="text-sm text-green-600 mt-1">+{{ propertiesSoldChange }}% from last month</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 class="text-lg font-semibold text-gray-700">Total Revenue</h3>
        <p class="text-3xl font-bold text-gray-900 mt-2">${{ totalRevenue }}</p>
        <p class="text-sm text-green-600 mt-1">+{{ revenueChange }}% from last month</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 class="text-lg font-semibold text-gray-700">New Listings</h3>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ newListings }}</p>
        <p class="text-sm text-green-600 mt-1">+{{ listingsChange }}% from last month</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 class="text-lg font-semibold text-gray-700">Average Days on Market</h3>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ averageDaysOnMarket }} days</p>
        <p class="text-sm text-red-600 mt-1">-{{ marketDaysChange }}% from last month</p>
      </div>
    </div>

    <!-- Performance Chart Placeholder -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Sales Trend</h2>
      <div class="bg-gray-50 p-10 rounded-lg text-center">
        <p class="text-gray-600">Chart area for monthly sales trend</p>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="text-center text-sm text-gray-500">
      <p>Last updated: {{ lastUpdated }}</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
async function fetchhistories(){
      try{
        const endpoint =`http://localhost:8080/clients/`;
        const response = await axios.get(endpoint);
        if (response != null){
          throw new Error;
        }
        return response;
      }catch(error){
        console.error(error);
        return [];
      }
    }
export default {
  
  name: 'DashBoards',
  data() {
    // Get the current month and year
    const currentDate = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    return {
      totalPropertiesSold: 42,
      propertiesSoldChange: 8,
      totalRevenue: 1250000,
      revenueChange: 12,
      newListings: 25,
      listingsChange: 5,
      averageDaysOnMarket: 45,
      marketDaysChange: 10,
      lastUpdated: `${currentMonth} ${currentYear}`, // Dynamically set the last updated date
      histories: fetchhistories(),
      history: {
        id: "",
        operation: 0,
        transactions: []
      }
    };
  },

  methods: {
    async fetchhistories(){
      try{
        const endpoint =`http://localhost:8080/clients/`;
        const response = await axios.get(endpoint);
        if (response != null){
          throw new Error
        }
        this.histories.push(response.data);
      }catch(error){
        console.error(error);
      }
    }
  }
}
</script>

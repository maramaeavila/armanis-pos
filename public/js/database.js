// class DatabaseAPI {
//   constructor() {
//     this.baseURL = window.API_BASE;
//     this.headers = {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     };
//   }

//   async request(endpoint, options = {}) {
//     try {
//       const response = await fetch(`${this.baseURL}${endpoint}`, {
//         headers: this.headers,
//         ...options,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("API request failed:", error);
//       throw error;
//     }
//   }

//   async getMembers() {
//     return await this.request("members");
//   }

//   async createMember(memberData) {
//     return await this.request("members", {
//       method: "POST",
//       body: JSON.stringify(memberData),
//     });
//   }

//   async updateMember(id, memberData) {
//     return await this.request(`members/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(memberData),
//     });
//   }

//   async deleteMember(id) {
//     return await this.request(`members/${id}`, {
//       method: "DELETE",
//     });
//   }

//   async getMemberships() {
//     return await this.request("memberships");
//   }

//   async createMembership(membershipData) {
//     return await this.request("memberships", {
//       method: "POST",
//       body: JSON.stringify(membershipData),
//     });
//   }

//   async getProducts() {
//     return await this.request("products");
//   }

//   async createProduct(productData) {
//     return await this.request("products", {
//       method: "POST",
//       body: JSON.stringify(productData),
//     });
//   }

//   async getTransactions() {
//     return await this.request("transactions");
//   }

//   async createTransaction(transactionData) {
//     return await this.request("transactions", {
//       method: "POST",
//       body: JSON.stringify(transactionData),
//     });
//   }

//   async getTransaction(id) {
//     return await this.request(`transactions/${id}`);
//   }

//   async getDashboardStats() {
//     return await this.request("dashboard/stats");
//   }
// }

// window.db = new DatabaseAPI();

// // Sample data for development (will be replaced by actual API calls)
// const sampleData = {
//   members: [
//     {
//       id: 1,
//       member_id: "GYM00001",
//       first_name: "John",
//       last_name: "Doe",
//       email: "john.doe@email.com",
//       phone: "+1-555-0123",
//       status: "active",
//       join_date: "2024-01-15",
//     },
//     {
//       id: 2,
//       member_id: "GYM00002",
//       first_name: "Jane",
//       last_name: "Smith",
//       email: "jane.smith@email.com",
//       phone: "+1-555-0124",
//       status: "active",
//       join_date: "2024-02-01",
//     },
//   ],

//   memberships: [
//     {
//       id: 1,
//       name: "Basic Monthly",
//       description: "Access to gym equipment and basic facilities",
//       price: 49.99,
//       duration_months: 1,
//       features: ["Gym Access", "Locker Room", "Basic Equipment"],
//     },
//     {
//       id: 2,
//       name: "Premium Annual",
//       description: "Full access with personal training sessions",
//       price: 599.99,
//       duration_months: 12,
//       features: [
//         "Full Gym Access",
//         "Personal Training",
//         "Group Classes",
//         "Nutrition Consultation",
//       ],
//     },
//   ],

//   products: [
//     {
//       id: 1,
//       name: "Protein Powder",
//       description: "Whey protein supplement",
//       price: 39.99,
//       stock_quantity: 25,
//       category: "Supplements",
//     },
//     {
//       id: 2,
//       name: "Water Bottle",
//       description: "Gym branded water bottle",
//       price: 12.99,
//       stock_quantity: 50,
//       category: "Accessories",
//     },
//   ],
// };

// window.sampleData = sampleData;

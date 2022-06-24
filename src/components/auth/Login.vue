<template>
  <div>
    <form @submit.prevent="loginSubmitHandler()">
      <div>
        <label>Email</label>
        <input type="email" name="email" v-model="email" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <div>
      <button @click="getProfileHandler()">GET PROFILE</button>
      <label for="name">Name: {{ user.name }}</label>
      <label for="email">Email: {{ user.email }}</label>
      <label for="password">Password: {{ user.password }}</label>
    </div>
    <h1>ADDING USER WITH AUTHENTICATION</h1>
    <form @submit.prevent="registerNewUser()">
      <div>
        <label>Email</label>
        <input type="email" name="email" v-model="newUser.email" required />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          v-model="newUser.password"
          required
        />
      </div>
      <div>
        <label>Name</label>
        <input type="text" name="name" v-model="newUser.name" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import api from "../../boot/api";

export default {
  name: "Log-in",
  data() {
    return {
      email: "",
      password: "",
      user: {},
      newUser: {
        email: "",
        name: "",
        password: "",
      },
    };
  },
  methods: {
    loginSubmitHandler() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      const response = api.post("/login", formData);

      response.then((res) => {
        localStorage.setItem("accessToken", res.data.access_token);
      });
    },
    registerNewUser() {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      const formData = {
        email: this.newUser.email,
        name: this.newUser.name,
        password: this.newUser.password,
      };
      const response = api.post("/register-with-authentication", formData);

      response.then(() => {
        alert("NEW USER HAS BEEN ADDED");
      });
    },
    getProfileHandler() {
      const response = api.get("/user");
      response.then((res) => {
        this.user = res.data;
      });
    },
  },
};
</script>

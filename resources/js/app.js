/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");
window.Vue = require("vue").default;

import Vue from "vue";
import moment from "moment";
// import { Form, HasError, AlertError } from "vform";
import VueProgressBar from "vue-progressbar";

window.Fire = new Vue();

// Sweet Alert Toast
import swal from "sweetalert2";
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
});

window.toast = toast;

// window.Form = Form;
// Vue.component(HasError.name, HasError);
// Vue.component(AlertError.name, AlertError);

import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: "/dashboard",
        component: require("./components/Dashboard.vue").default,
    },
    {
        path: "/profile",
        component: require("./components/Profile.vue").default,
    },
    {
        path: "/users",
        component: require("./components/Users.vue").default,
    },
    {
        path: "/developer",
        component: require("./components/Developer.vue").default,
    },
];

const router = new VueRouter({
    mode: "history",
    routes, // short for `routes: routes`
});

// UpperCase Filter
Vue.filter("uptext", function (text) {
    if (!text) return "";
    text = text.toString();
    return text.charAt(0).toUpperCase() + text.slice(1);
    // return text.toUpperCase();
});

// Date Format
Vue.filter("myDate", function (created) {
    return moment().format("MMMM Do YYYY, h:mm:ss a");
});

// Progress-Bar
Vue.use(VueProgressBar, {
    color: "rgb(143, 255, 199)",
    failedColor: "red",
    height: "2px",
});

window.Fire = new Vue();

Vue.component(
    "example-component",
    require("./components/ExampleComponent.vue").default
);

Vue.component(
    "passport-clients",
    require("./components/passport/Clients.vue").default
);

Vue.component(
    "passport-authorized-clients",
    require("./components/passport/AuthorizedClients.vue").default
);

Vue.component(
    "passport-personal-access-tokens",
    require("./components/passport/PersonalAccessTokens.vue").default
);

const app = new Vue({
    el: "#app",
    router,
});

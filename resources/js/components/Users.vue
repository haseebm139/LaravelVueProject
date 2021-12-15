<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>

                        <div class="card-tools">
                            <button
                                class="btn btn-success"
                                data-toggle="modal"
                                data-target="#addUser"
                            >
                                <i class="fa fa-plus-square fa-fw"></i>
                                Add New
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Register at</th>

                                    <th>Modify</th>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.type }}</td>
                                    <td>{{ user.created_at }}</td>
                                    <td>
                                        <span class="tag tag-success"
                                            >Approved</span
                                        >
                                    </td>
                                    <td>
                                        <a href="#">
                                            <i class="fa fa-edit green"></i>
                                        </a>
                                        /
                                        <a href="#">
                                            <i class="fa fa-trash red"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <!-- Modal -->
        <div
            class="modal fade"
            id="addUser"
            tabindex="-1"
            role="dialog"
            aria-labelledby="addUserLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addUserLabel">Add User</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <input
                                    type="text"
                                    v-model="form.name"
                                    name="name"
                                    placeholder="Name"
                                    class="form-control"
                                    :class="{
                                        'is-valid': form.errors.has('name'),
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="name"
                                ></has-error>
                            </div>

                            <div class="form-group">
                                <input
                                    v-model="form.email"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    :class="{
                                        'is-valid': form.errors.has('email'),
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="email"
                                ></has-error>
                            </div>

                            <div class="form-group">
                                <textarea
                                    id="bio"
                                    v-model="form.bio"
                                    name="bio"
                                    placeholder="Short Bio for User"
                                    :class="{
                                        'is-valid': form.errors.has('bio'),
                                    }"
                                ></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">
                                <select
                                    id="type"
                                    v-model="form.type"
                                    name="type"
                                    class="form-control form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example"
                                    :class="{
                                        'is-valid': form.errors.has('type'),
                                    }"
                                >
                                    <option value="" selected>
                                        Select User Role
                                    </option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                    <option value="Author">Author</option>
                                </select>

                                <has-error
                                    :form="form"
                                    field="type"
                                ></has-error>
                            </div>

                            <div class="form-group">
                                <input
                                    v-model="form.password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    :class="{
                                        'is-valid': form.errors.has('type'),
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="password"
                                ></has-error>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button v-on:click="createUser" class="btn btn-primary">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from "vform";

import { HasError, AlertError } from "vform/src/components/bootstrap5";
export default {
    components: {
        HasError,
        AlertError,
    },
    data() {
        return {
            users: {},
            form: new Form({
                name: "",
                password: "",
                email: "",
                type: "",
                bio: "",
                photo: "",
            }),
        };
    },
    methods: {
        loadUser() {
            axios.get("/api/user").then(({ data }) => (this.users = data.data));
        },
        createUser() {
            this.form.post("/api/user");
        },
    },
    created() {
        this.loadUser();
    },
};
</script>

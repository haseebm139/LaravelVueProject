<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" @click="newModal">
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
                                    <td>{{ user.type | uptext }}</td>
                                    <td>{{ user.created_at | myDate }}</td>
                                    <td>
                                        <span class="tag tag-success"
                                            >Approved</span
                                        >
                                    </td>
                                    <td>
                                        <a
                                            href="#"
                                            v-on:click="editModal(user)"
                                        >
                                            <i class="fa fa-edit green"></i>
                                        </a>
                                        /
                                        <a
                                            href="#"
                                            v-on:click="deleteUser(user.id)"
                                        >
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
                        <h5 class="modal-title" v-show="!editmode">
                            Create New User
                        </h5>
                        <h5 class="modal-title" v-show="editmode">
                            Update User's Info
                        </h5>

                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-show="!editmode" class="modal-body">
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
                    <div v-show="editmode" class="modal-body">
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
                                    id="bioEdit"
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
                                    id="typeEdit"
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
                            type="submit"
                            class="btn btn-danger"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            v-show="!editmode"
                            type="button"
                            class="btn btn-primary"
                            @click="createUser()"
                        >
                            Create
                        </button>
                        <button
                            v-show="editmode"
                            type="button"
                            class="btn btn-success"
                            @click="updateUser()"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

//
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
            editmode: false,
            users: {},
            form: new Form({
                id: "",
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
        updateUser() {
            this.$Progress.start();
            this.form
                .put("/api/user/" + this.form.id)
                .then(() => {
                    // Sucess
                    $("#addUser").modal("hide");
                    swal.fire(
                        "Update!",
                        "Your file has been Updated.",
                        "success"
                    );
                    Fire.$emit("AfterCreate");
                    this.$Progress.finish();
                })
                .catch(() => {
                    this.$Progress.fail();
                });
        },

        editModal(user) {
            this.editmode = true;
            this.form.reset();
            $("#addUser").modal("show");
            this.form.fill(user);
        },

        newModal() {
            this.editmode = false;
            this.form.reset();
            $("#addUser").modal("show");
        },

        loadUser() {
            axios.get("/api/user").then(({ data }) => (this.users = data.data));
        },
        createUser() {
            this.$Progress.start();
            this.form
                .post("/api/user")
                .then(() => {
                    Fire.$emit("AfterCreate");
                    $("#addUser").modal("hide");

                    toast.fire({
                        icon: "success",
                        title: "Signed in successfully",
                    });
                    this.$Progress.finish();
                })
                .catch(() => {});
        },

        deleteUser(id) {
            swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                // Send request to the server
                if (result.value) {
                    this.form
                        .delete("api/user/" + id)
                        .then(() => {
                            swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                            Fire.$emit("AfterCreate");
                        })
                        .catch((data) => {
                            Swal.fire("Failed!", data.message, "warning");
                        });
                }
            });
        },
    },
    created() {
        this.loadUser();
        Fire.$on("AfterCreate", () => {
            this.loadUser();
        });
    },
};
</script>

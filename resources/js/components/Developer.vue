<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <!-- <div class="card">
                    <div class="card-header">Developer Component</div>

                    <div class="card-body">I'm an Developer component.</div>
                </div> -->

                <passport-clients></passport-clients>
                <passport-authorized-clients></passport-authorized-clients>
                <passport-personal-access-tokens></passport-personal-access-tokens>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log("Component mounted.");
    },
};
</script>

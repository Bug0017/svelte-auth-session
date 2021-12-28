<script lang="ts">
    import Login from '$lib/components/Login.svelte';
    import Register from "$lib/components/Register.svelte";
    import {goto} from "$app/navigation"
    const redirectToProfile = ()=> {
        goto('/profile')
    }
</script>

<section>
    <Login on:success={redirectToProfile}/>
    <Register on:success={redirectToProfile}/>
</section>
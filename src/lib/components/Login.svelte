<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let email:string;
    let password: string;

    let error : string | undefined;
    const login = async () => {
        error = undefined;
        try {
            const res = await fetch('http://localhost:3000/api/auth/login' , {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
            });

            if (res.ok) {
                dispatch('success')
            } else {
               error = 'Error occured' 
            }
        } catch (err) {
            error = err.message;
        }
    }
</script>

<section> 
    <h1>Login</h1>
    <input type="text" bind:value={email} placeholder="Enter your email">
    <input type="password" bind:value={password} placeholder="Enter your password">
    <button type="submit" on:click={login}> 
        login
    </button>
</section>
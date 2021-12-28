<script context="module" lang="ts">
    export function load(ctx){
        console.log(ctx)
        return {
            props:{ctx}
        }
    }
</script>

<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let email:string;
    let password: string;
    let username:string;
    let error:string | undefined;
    const register = async () => {
        error = undefined;
       try {
            const res = await fetch('http://localhost:3000/api/auth/register' , {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
            });

            debugger;
            if(res.ok){
                dispatch('success')
            }else {
                error = 'Error occured!'
            }
        } catch(err){
            error = err.message;
        }
    }
</script>

<section> 
    <h1>Register</h1>
    <input type="text" bind:value={username} placeholder="Enter your usename">
    <input type="text" bind:value={email} placeholder="Enter your email">
    <input type="password" bind:value={password} placeholder="Enter your password">
    {#if error}
        <p>{error}</p>
    {/if}
    <button type="submit" on:click={register}> 
        Register
    </button>
</section>
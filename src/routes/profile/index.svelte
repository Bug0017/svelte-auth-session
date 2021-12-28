<script context="module" lang="ts">
    // your script goes here

    export async function load(ctx){

        if(!ctx.session.authenticated){
            return {
                status :302,
                redirect:'/'
            }
        }

        return {
            props : {
                ctx
            }
        }
    }
</script>

<script lang="ts">
    export let ctx
</script>

<section>
    {@debug ctx}
</section>
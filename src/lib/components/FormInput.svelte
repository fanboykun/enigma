<script lang="ts">
	import type { InputProps } from "$lib/types";

    export let props: InputProps
    
</script>
<div class="flex w-full gap-4 items-center justify-center p-4">
    <label for="{props.name}" class="text-lg text-gray-200">{props.label}</label>
    <input 
        type="text" 
        name="{props.name}" 
        id="{props.id}"
        class="rounded-md bg-slate-300 w-2/3 {props.class}">
</div>
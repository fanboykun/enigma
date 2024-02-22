<script lang="ts">
	import type { KeyboardType } from "$lib/types";
	import { currentKey, secondKey } from "$lib/functions/store";

    export let click: Function
    export let key: string|null
    export let type: KeyboardType
    let clicked = false
    $: {
        if($currentKey || $secondKey) {
            if(type === "ENCRYPTOR" && $currentKey === key) {
                clicked = true
            }else if(type === "DECRYPTOR" && $secondKey === key) {
                clicked = true
            }
            setTimeout(() => {
                clicked = false
            }, 2000)
        }else {
            clicked = false
        }
    }
</script>
<button 
    on:click={(e) => click(e, key, type)}
    type="button"
    class="{clicked ? 'text-teal-500 bg-teal-50' : 'bg-white'} w-14 h-14 rounded-full font-medium flex justify-center items-center text-[32px] p-2 border-2 border-teal-900">
        <slot />
</button>

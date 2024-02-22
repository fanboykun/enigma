<script lang="ts">
	import type { KeyboardType, Keys } from "$lib/types";
	import KeyboardButton from "./KeyboardButton.svelte";
	import { currentKey, secondKey } from "$lib/functions/store";
	import type { Socket } from "$lib/functions/socket";

    export let keyLines : string[]
    export let keyLineType: KeyboardType
    export let socket : Socket|null

    let mappedKeys : Keys = []
    if(keyLines) {
        mappedKeys.push(keyLines.slice(0, 10))
        mappedKeys.push(keyLines.slice(11, 19))
        mappedKeys.push(keyLines.slice(20, 26))
    }

    function handle(event: Event, key:string, type: KeyboardType) {
        if(type === "DECRYPTOR") return
        currentKey.set(key)
        secondKey.set(scramble(key))
        if(socket) {
            socket.send($secondKey)
        }
    }

    function scramble(key: string): string {
        let found:string = ''
        keyLines.map((v, i) => {
            if(v === key) {
                if(i > 0 && i < keyLines.length -1) {
                    return found =  keyLines[i-1]
                } else {
                    return found = v
                }
            }
        })
        return found
    }
    
    
</script>
<div class="flex items-center justify-center w-fit py-8 px-4 max-h-[50%] rounded-2xl flex-col gap-y-2 border-2 border-teal-400">
    {#each mappedKeys as keys, index}
        <div class="flex items-center justify-center w-fit gap-2">
            {#each keys as key, i}
                <KeyboardButton click={handle} key={key} type={keyLineType}>
                    {key}
                </KeyboardButton>
            {/each}
        </div>
    {/each}
</div>
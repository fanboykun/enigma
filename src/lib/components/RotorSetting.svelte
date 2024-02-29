<script lang="ts">
	import type { InputProps } from "$lib/types";
	import { onMount } from "svelte";
	import FormInput from "./FormInput.svelte";

    export let onCLose: Function
    let modalWp: HTMLDivElement

    const rotorInputSettingsBinding : InputProps[] = [
        {
            label: 'Rotor 1 Setting',
            name: 'rotor_1',
            id: 'rotor_1',
        },
        {
            label: 'Rotor 2 Setting',
            name: 'rotor_2',
            id: 'rotor_2',
        },
        {
            label: 'Rotor 3 Setting',
            name: 'rotor_3',
            id: 'rotor_3',
        }
    ]

    onMount( async () => {
        if(modalWp) document.body.addEventListener('click', hClickOutside)
    })

    const hClickOutside = (event : Event) => {
        const target = event.target as Node
        if(target.contains(modalWp)) {
            return onCLose()
        }
    }

</script>

<div class="absolute flex items-center justify-center inset-0 bg-slate-900/70">
    <div bind:this={modalWp} class="flex bg-slate-700 py-2 px-4 border-teal-500 rounded-xl drop-shadow-lg min-w-[50%] backdrop-blur-md">
        <div class="flex flex-col w-full">
            <div class="flex w-full items-center justify-center py-4">
                <h3 class="text-white font-bold text-2xl text-center w-full">Rotor Setting</h3>
                <button type="button" class="p-2 text-white font-bold text-2xl" on:click={() => { onCLose() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>                      
                </button>
            </div>
            {#each (rotorInputSettingsBinding) as rotorInput}
                <FormInput props={rotorInput}/>
            {/each}
        </div>
    </div>
</div>
<script lang="ts">
	import Keyboard from "$lib/components/Keyboard.svelte";
	import { EnigmaMachine } from "$lib/functions/enigma";
	import { Socket } from "$lib/functions/socket";
    import RotorSetting from "$lib/components/RotorSetting.svelte";
    import type { EnigmaConfiguration, Rotor } from "$lib/types";

    let openRotorSetting = false

    export const keyLines: string[] = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M'
    ]

    // export const socket = new Socket()
    // socket.listen()
    const socket = null

    function startEnigma(plaintext = "HELLO") {
        // Example usage
        const intialEnigmaConfig: EnigmaConfiguration = {
            rotorPosition: [0, 0, 0],
            rotorMappings: ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", "AJDKSIRUXBLHWTMCQGZNPYFVOE", "BDFHJLCPRTXVZNYEIWGAKMUSQO"],
            plugboardMappings: [["A", "E"], ["B", "T"], ["C", "Z"], ["D", "F"], ["V", "M"]]
        }
        const enigma = new EnigmaMachine(intialEnigmaConfig);

        let ciphertext = "";

        for (const letter of plaintext) {
            ciphertext += enigma.encrypt(letter);
        }
        return [plaintext,ciphertext]
    }
    const res = startEnigma("HELLO")
    console.log(res)

</script>

<div class="flex relative h-screen w-screen bg-[#202127] flex-col justify-center items-center gap-4">
    <div class="absolute top-0 w-full h-12 flex py-4 px-8">
        <button type="button" class="flex items-center py-4 gap-2 group" on:click={() => openRotorSetting = true}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-white animate-spin">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>          
            <span class="text-white text-2xl hidden group-hover:flex">Open Rotor Setting</span>
        </button>
    </div>
    {#if openRotorSetting}
        <RotorSetting onCLose={() => openRotorSetting = false} />
    {/if}
    <Keyboard {keyLines} keyLineType={"DECRYPTOR"} {socket} />
    <Keyboard {keyLines} keyLineType={"ENCRYPTOR"} {socket} />
</div>
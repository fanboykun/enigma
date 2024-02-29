import type { EnigmaConfiguration, Rotor } from "$lib/types";

export class EnigmaMachine {
    private plugboard: Map<string, string> = new Map<string, string>();
    private rotors: Rotor[] = [];
    private turnoverPosition:number = 26;

    constructor(config: EnigmaConfiguration) {
        // Initialize plugboard with default mappings
        this.setPlugboard(config.plugboardMappings)

        // Initialize rotors with default configurations
        if(typeof config.rotors !== 'undefined' && config.rotors.length != 0) {
            this.rotors = [...config.rotors]
        } else{
            if(config.rotorMappings && config.rotorPosition) {
                this.setRotorMappings(config.rotorPosition, config.rotorMappings)
            }
        }
    }

    setPlugboard(mapping: string[][]) {
        for (const [a, b] of mapping) {
            this.plugboard.set(a.toUpperCase(), b.toUpperCase());
            this.plugboard.set(b.toUpperCase(), a.toUpperCase());
        }
    }

    setRotorMappings(rotorPosition: number[], rotorMap: string[]) {
        for(let i = 0; i < rotorPosition.length; i++) {
            const rotor:Rotor = {
                wiring: rotorMap[i],
                turnoverPosition: this.turnoverPosition,
                position: rotorPosition[i],
                rotates: false
            }
            this.rotors.push(rotor)
        }
        // hard coded current rotating rotor
        this.rotors[0].rotates = true
    }

    encrypt(letter: string): string {
        // Pass through plugboard first
        let encryptedLetter = this.plugboard.get(letter) || letter;

        // Pass through rotors
        for (let i = 0; i < this.rotors.length; i++) {
            const rotor = this.rotors[i];
            const index = (letter.charCodeAt(0) - 65 + rotor.position) % 26;
            encryptedLetter = rotor.wiring[(encryptedLetter.charCodeAt(0) - 65 + index) % 26];
            this.rotate(rotor, i)
        }
        
        // Return the encrypted letter
        return encryptedLetter;
    }

    rotate(rotor: Rotor, i:number): void {
        if (rotor.rotates && rotor.position <= rotor.turnoverPosition) {
            rotor.position = (rotor.position + 1) % 26;

            if (rotor.position === rotor.turnoverPosition) {
                // Rotate the next rotor (to the left)
                if (i < this.rotors.length - 1) {
                    this.rotors[i + 1].position = (this.rotors[i + 1].position + 1) % 26;
                    this.rotors[i + 1].rotates = true
                }
                // set the rotor number 1/ rotor index 0
                else {
                    this.rotors[0].position = (this.rotors[0].position + 1) % 26;
                    this.rotors[0].rotates = true
                }
                rotor.rotates = false
            }
        }
    }
}


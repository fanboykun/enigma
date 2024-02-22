export class EnigmaMachine {
    private plugboard: Map<string, string>;
    private rotors: string[];
    private rotorPositions: number[];
    private rotorMappings: string[];

    constructor() {
        // Initialize plugboard with default mappings
        this.plugboard = new Map<string, string>();
        
        // Initialize rotors with default configurations
        this.rotors = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", "AJDKSIRUXBLHWTMCQGZNPYFVOE", "BDFHJLCPRTXVZNYEIWGAKMUSQO"];
        
        // Initialize rotor starting positions
        this.rotorPositions = [0, 0, 0];
        
        // Initialize rotor mappings
        this.rotorMappings = [];
    }

    setPlugboard(mapping: [string, string][]) {
        for (const [a, b] of mapping) {
            this.plugboard.set(a.toUpperCase(), b.toUpperCase());
            this.plugboard.set(b.toUpperCase(), a.toUpperCase());
        }
    }

    setRotorPositions(positions: number[]) {
        this.rotorPositions = positions.map(p => p % 26);
    }

    setRotorMappings(rotors: string[]) {
        this.rotorMappings = rotors;
    }

    encrypt(letter: string): string {
        // Pass through plugboard first
        let encryptedLetter = this.plugboard.get(letter) || letter;
        
        // Pass through rotors
        for (let i = 0; i < this.rotors.length; i++) {
            const index = (letter.charCodeAt(0) - 65 + this.rotorPositions[i]) % 26;
            encryptedLetter = this.rotors[i][(encryptedLetter.charCodeAt(0) - 65 + index) % 26];
        }
        
        // Return the encrypted letter
        return encryptedLetter;
    }
}


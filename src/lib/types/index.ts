export type KeyboardType = "ENCRYPTOR"|"DECRYPTOR"

export type Keys = string[][]

export type InputProps = {
    label: string,
    name: string,
    id: string,
    class?: string
}

export interface Rotor {
    wiring: string;
    position: number;
    turnoverPosition: number;
    rotates: boolean;
}

export type EnigmaConfiguration =  {
    rotors?: Rotor[]
    rotorPosition?: number[]
    rotorMappings?: string[]
    plugboardMappings: string[][]
}
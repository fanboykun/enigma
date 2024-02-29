export function roman() {
    type Rotor = { position:number, isRotating: boolean, mappings: string[], current: string }
    const plain = 'A'
    const rotors : Rotor[] = [
        {
            position: 1,
            isRotating: true,
            mappings: ["EKMFLGDQVZNTOWYHXUSPAIBRCJ"],
            current: 'A'
        },
        {
            position: 1,
            isRotating: false,
            mappings: ["AJDKSIRUXBLHWTMCQGZNPYFVOE"],
            current: 'A'
        },
        {
            position: 1,
            isRotating: false,
            mappings: ["BDFHJLCPRTXVZNYEIWGAKMUSQO"],
            current: 'A'
        },
    ]

    let scrambled = ''
    let idx:number|undefined
    let hasFoundId = false

    const plugboardProcess = () => {
        const plug = {'A': 'L'}
        const aftrPlg = plug[plain] ?? plug
        return aftrPlg
    }

    const rotorProcess = (aftrPlg: string, isRotated: boolean = false) => {
        const beginRotorProcess = ( rotor: Rotor, i: number ) => {
            if(!hasFoundId && typeof idx == 'undefined') {
                idx = rotor.mappings.toString().indexOf(aftrPlg.toUpperCase())
                if(typeof idx == 'undefined') return
                hasFoundId = true
            } else if(typeof idx != 'undefined') {
                scrambled = rotor.mappings.toString()[idx]
            }
            if(rotor.isRotating){
                const strMap = rotor.mappings.toString()
                const cuttedSrtring = strMap.slice(strMap.length - 1)
                rotor.mappings = [cuttedSrtring.concat(strMap.slice(0, strMap.length - 1))]
                rotor.position++
                if(rotor.position >= 26) {
                    rotor.isRotating = false
                    rotor.position = 1
                    i+1 === rotors.length ? rotors[0].isRotating = true : rotors[i+1].isRotating = true
                }
            }
        }

        if(isRotated) {
            for(let i = rotors.length; i >= 0; i--) {
               beginRotorProcess(rotors[i], i) 
            }
        }else {
            for(let i = 0; i < rotors.length; i++) {
               beginRotorProcess(rotors[i], i) 
            }
        }

    }
    
    const reflectProcess = () => {
        hasFoundId = false
        rotorProcess(scrambled)
    }

    const afterPlugProcess = plugboardProcess()
    rotorProcess(afterPlugProcess)
    reflectProcess()
    console.log(scrambled)

}
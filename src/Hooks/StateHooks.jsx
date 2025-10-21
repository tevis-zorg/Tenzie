import {useState} from 'react'

export const useDiceValue = () => {
    const [diceValue, setDiceValue] = useState ()

    return [diceValue, setDiceValue]
}
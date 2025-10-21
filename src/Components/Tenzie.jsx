import './Tenzie.css'
// Thrid party packages
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti'

//Hooks
import { useEffect, useRef } from 'react'
import { useDiceValue } from '../Hooks/StateHooks'
import { Button, RollButton} from './Child-Components/Die'

const Tenzie = () => {

    // Lazy Initialization
    const [diceVal, setDiceVal] = useDiceValue( () => generatesRandom() )
    const targetRef = useRef(null);

    const gameWon = diceVal.every(dice => dice.isHeld && dice.value === diceVal[0]?.value)

    function generatesRandom () {

         
      return Array(10)
            .fill(0)
            .map( () => (
              {
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
              }
            )
          ) 
    }

    const rollDice = () => {
      
      return (

        gameWon ?

        setDiceVal( generatesRandom() )
        :
        setDiceVal(
          prevDiceVal => 
            prevDiceVal.map(
              (items) => (
                items.isHeld ?
                items
                :
                {
                  ...items,
                  value: Math.ceil(Math.random() * 6)
                }
            )
          )
        )
      )

    }
    
    const holdDice = (diceId) => {

      setDiceVal( 
        prevDiceVal => 
          prevDiceVal.map(
            (diceValObj) => (
              diceValObj.id === diceId ?
              {
                ...diceValObj,
                isHeld: !diceValObj.isHeld,
              } :
              diceValObj
          )
        )
      )

      // console.log(diceId)

    }

    const onKeyFunction = (e) => {
      if (e.key === 'Enter' || e.key === ' ')
      {
        setDiceVal( generatesRandom() )
      }
    }

    useEffect(
      () => {
        if(gameWon && targetRef.current)
        {
          const timer = setTimeout(
            () => {
              targetRef.current.focus()
            }, 100
          )
          return () => clearTimeout(timer)
        }
      }, [gameWon]
    )


    // console.log(diceVal);

    const diceElement = diceVal.map (
      (btnItems) => {
        return (
          <Button
            key={btnItems.id}
            heldNum={btnItems.isHeld}
            buttonName={btnItems.value}
            // buttonHandler={holdDice}
            // buttonId={btnItems.id}
            buttonHandler={ () => holdDice(btnItems.id)}
          />
        )
      }
    )

  return (
    <main className='tenzie-zone'>

        <div aria-live='polite' className='sr-only'>
          {
            // This div section would only got displayed to "screen reader only" users
            // See assistive technology explation from website;
            gameWon 
            && 
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          }
        </div>

        <div className='tenzie-body'>

          <h1>
            Tenzies
          </h1>

          <p>
            Roll until dice are the same. Click each dice to freeze
            it at its current value between rolls.
          </p>

          <section className='dice-button-container'>

            { diceElement }

          </section>

          {
            gameWon 
            &&
            <ReactConfetti
              confettiSource={
                { x:854.4, y:175 }
              }
            />
          }

          <RollButton
            key={diceVal.id}
            className={"roll-button"}
            buttonName={gameWon ? "New Game" : "Roll"}
            heldButtonId={diceVal.isHeld}
            targetRef={targetRef}
            keyboardEvent={ (e) => onKeyFunction(e) }
            buttonHandler={rollDice}
          />

        </div>

    </main>
  )
}

export default Tenzie

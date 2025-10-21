export const Button = (props) => {

    const styles = {
        backgroundColor: props.heldNum ? "#59E391" : undefined
    }

    return (
        <button
            className="button-number"
            style={styles}
            // onClick={ () => props.buttonHandler(props.buttonId) }
            onClick={props.buttonHandler}
            aria-pressed={props.heldNum}
            aria-label={ `Die with value ${props.buttonName}, 
            ${props.heldNum ? "held" : "not held"}` }
        >
            {props.buttonName}
        </button>
    )
}

export const RollButton = (props) => {
    return (
        <button
            className={props.className}
            onClick={props.buttonHandler}
            ref={props.targetRef}
            onKeyDownCapture={props.keyboardEvent}
        >
            {props.buttonName}

        </button>
    )
}

const buttonArr = Array.from( { length:10 } )

export const DiceButton = (props) => {

    const stateVal = props

    return (

        <>
            {/* Iterates through 10 buttons */}
            <button
                className="button-number"
                onClick={ () => props.holdHandler(props.btnId)}
            >
                {props.btnName}
            </button>

        </>

    )
}

import { useDeferredValue, useEffect, useState } from 'react'
import { useHistory } from 'react-router'

const MIN_TIME_SUBMIT = 500

export default function ButtonSubmit({ isValid }: { isValid: boolean }) {
    const [time, setTime] = useState<number>(0)
    const [timeBack, setTimeBack] = useState<number>(MIN_TIME_SUBMIT)

    const deferredTime = useDeferredValue(time)
    const deferredTimeBack = useDeferredValue(timeBack)

    const history = useHistory()

    useEffect(() => {
        setInterval(() => {
            setTime((state) => Math.max(state - 10, 0))
        }, 10)
    }, [])

    useEffect(() => {
        setInterval(() => {
            setTimeBack((state) => Math.min(state + 10, MIN_TIME_SUBMIT))
        }, 10)
    }, [])

    const handleMouseDown = () => {
        setTime(MIN_TIME_SUBMIT)
        setTimeBack(0)
    }

    const handleMouseUp = () => {
        if (time === 0) {
            history.push('/login/step-2')
            return
        }
        setTimeBack(time)
        setTime(0)
    }

    return (
        <button
            className={`btn ${deferredTime ? 'btn-success' : 'btn-primary'} mt-auto`}
            type="submit"
            disabled={!isValid}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {deferredTime || deferredTimeBack !== MIN_TIME_SUBMIT
                ? `${deferredTime || deferredTimeBack} ms`
                : 'Hold to proceed'}
        </button>
    )
}

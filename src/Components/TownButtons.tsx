import { useCallback } from 'react'
import type { Town, TownTemperature } from './TheDoor'
import { PopupState } from '../enums.ts'

type TownButtonsProps = {
    answers: Town[]
    temperature: TownTemperature
    setPopup: (state: PopupState) => void
    setScore: (score: number | ((score: number) => number)) => void
}

export default function TownButtons({ answers, temperature, setPopup, setScore }: TownButtonsProps) {
    const checkAnswer = useCallback((index: number) => {
        if (index === temperature.index) {
            setPopup(PopupState.Success)
            setScore((score) => score + 1)
        } else {
            setPopup(PopupState.Failure)
            setScore((score) => score ? score - 1 : score)
        }
    }, [temperature, setPopup, setScore])

    return (
        <div className={'mt-5 grid grid-cols-2 gap-2.5 h-[7em] max-w-[25em]'}>
            {answers.map((town, index) =>
                <button
                    key={town.code}
                    style={{ overflowWrap: 'anywhere' }}
                    onClick={() => checkAnswer(index)}
                >
                    {town.nom}
                </button>
            )}
        </div>
    )
}

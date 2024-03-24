import { useState, useEffect, useCallback } from "react";
import TownButtons from "./TownButtons";
import Popup from "./Popup";
import Share from "./Share.tsx";
import { PopupState } from "../enums.ts";

export type Town = {
    code: string;
    nom: string;
    population: number;
};

export type TownTemperature = {
    town: string;
    temperature: number;
    index: number;
};

type MeteoConceptResponse = {
    forecast: {
        tmax: number;
    };
};

const DOOR = {
    OPEN: "/open_door.png",
    CLOSED: "/closed_door.png"
};

export default function TheDoor() {
    const [towns, setTowns] = useState<Town[]>([]);
    const [door, setDoor] = useState(DOOR.CLOSED);
    const [temperature, setTemperature] = useState<TownTemperature>({
        town: "",
        temperature: 0,
        index: 0
    });
    const [answers, setAnswers] = useState<Town[]>([]);
    const [popup, setPopup] = useState<PopupState>(PopupState.Closed);
    const [score, setScore] = useState(0);

    const updateTemperature = useCallback(
        (callback?: () => void) => {
            const town = towns[Math.floor(Math.random() * towns.length)];
            const townIndex = Math.floor(Math.random() * 4);

            void fetch(
                `${import.meta.env.VITE_METEO_CONCEPT_API_URL}?token=${import.meta.env.VITE_METEO_CONCEPT_API_KEY}&insee=${town.code}`,
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            )
                .then(response => response.json())
                .then((data: MeteoConceptResponse) => {
                    setTemperature({
                        town: town.nom,
                        temperature: data.forecast.tmax,
                        index: townIndex
                    });
                    if (callback) callback();
                    setAnswers(
                        Array(4)
                            .fill(0)
                            .map((_, index) =>
                                index === townIndex ? town : towns[Math.floor(Math.random() * towns.length)]
                            )
                    );
                });
        },
        [towns]
    );

    useEffect(() => {
        void fetch(import.meta.env.VITE_TOWNS_API_URL)
            .then(response => response.json())
            .then((towns: Town[]) => {
                setTowns(towns.filter(town => town.population > 10000 && Number(town.code) < 96000));
            });
    }, []);

    return (
        <div className={"h-screen w-screen flex flex-col items-center justify-center"}>
            <h1
                className={"text-[3.2em] leading-[1.1]"}
                style={{
                    textShadow: "2px 2px 2px pink",
                    filter: "drop-shadow(2px 2px 2px pink)"
                }}
            >
                The Door
            </h1>
            <p className={"pt-3 font-black text-xl"}>Score: {score}</p>
            <img
                className={"cursor-pointer ml-[7em] py-5"}
                alt={"Door"}
                src={door}
                onClick={() => {
                    if (door === DOOR.CLOSED)
                        updateTemperature(() => setDoor(door => (door === DOOR.CLOSED ? DOOR.OPEN : DOOR.CLOSED)));
                    else {
                        setDoor(door => (door === DOOR.CLOSED ? DOOR.OPEN : DOOR.CLOSED));
                        setAnswers([]);
                    }
                }}
            />
            <p
                className={"absolute text-5xl z-[-1]"}
                style={{
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                {temperature.temperature}°C
            </p>
            <p
                className={"font-bold"}
                hidden={answers.length === 0}
            >
                De quelle ville provient la température affichée ? 🤔
            </p>
            <TownButtons
                answers={answers}
                temperature={temperature}
                setPopup={setPopup}
                setScore={setScore}
            />
            <Popup
                open={popup != PopupState.Closed}
                close={() => {
                    if (popup == PopupState.Success) updateTemperature();
                    else {
                        setDoor(door => (door === DOOR.CLOSED ? DOOR.OPEN : DOOR.CLOSED));
                        setAnswers([]);
                    }
                    setPopup(PopupState.Closed);
                }}
                success={popup == PopupState.Success}
                answer={temperature.town}
            />
            <Share />
        </div>
    );
}

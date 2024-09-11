import { useState, useEffect } from "react";
import MemCard from "./MemCard";
import appleImage from "../images/apple.webp";
import bananaImage from "../images/banana.webp";
import grapesImage from "../images/grapes.png";
import mangoImage from "../images/mango.png";
import orangeImage from "../images/orange.png";
import pineappleImage from "../images/Pineapple.png";
import strawberryImage from "../images/strawberry.png";
import watermelonImage from "../images/watermelon.png";


function Cards() {
    const [items, setitems] = useState([
        { id: 1, img: appleImage, stat: '' },
        { id: 1, img: appleImage, stat: '' },
        { id: 2, img: bananaImage, stat: '' },
        { id: 2, img: bananaImage, stat: '' },
        { id: 3, img: grapesImage, stat: '' },
        { id: 3, img: grapesImage, stat: '' },
        { id: 4, img: mangoImage, stat: '' },
        { id: 4, img: mangoImage, stat: '' },
        { id: 5, img: orangeImage, stat: '' },
        { id: 5, img: orangeImage, stat: '' },
        { id: 6, img: pineappleImage, stat: '' },
        { id: 6, img: pineappleImage, stat: '' },
        { id: 7, img: strawberryImage, stat: '' },
        { id: 7, img: strawberryImage, stat: '' },
        { id: 8, img: watermelonImage, stat: '' },
        { id: 8, img: watermelonImage, stat: '' }].sort(() => Math.random() - 0.5))
    const [prev, setPrev] = useState(-1)
    const [gameCompleted, setGameCompleted] = useState(false)
    const [timer, setTimer] = useState(0); // Start from 0 seconds
    const [isTimerActive, setIsTimerActive] = useState(true);
    useEffect(() => {
        let interval;
        if (isTimerActive && !gameCompleted) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else if (gameCompleted) {
            clearInterval(interval); // Stop the timer when the game is completed
        }
        return () => clearInterval(interval); // Cleanup on unmount
    }, [isTimerActive, gameCompleted]);
    function check(current) {
        if (items[current].id == items[prev].id) {
            items[current].stat = "correct";
            items[prev].stat = "correct";
            setitems([...items])
            const allMatched = items.every(item => item.stat == "correct");
            if (allMatched) {
                setGameCompleted(true);
            }
            else {
                setPrev(-1)
            }
        }
        else {
            items[current].stat = "wrong";
            items[prev].stat = "wrong";
            setitems([...items])
            setTimeout(() => {
                items[current].stat = "";
                items[prev].stat = "";
                setitems([...items])
                setPrev(-1)
            }, 1000)
        }
    }
    function handleClick(id) {
        if (prev == -1) {
            items[id].stat = "active";
            setitems([...items])
            setPrev(id)
        } else {
            check(id)
        }

    }
    function restartGame() {
        const resetItems = items.map(item => ({ ...item, stat: 'active' }));
        setitems(resetItems);

        setTimeout(() => {
            const clearedItems = resetItems.map(item => ({ ...item, stat: '' }));
            setitems(clearedItems);
        }, 1000);

        setPrev(-1);
        setGameCompleted(false);
        setTimer(0); // Reset the timer to 0
        setIsTimerActive(true); // Restart the timer
    }
    return (
        <div className="container mx-auto p-4">
            {gameCompleted ? (<div className="text-center">
                <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold mb-4 animate-fade-in">
                    You completed the game in {timer} seconds!
                </h1>
                <button
                    onClick={restartGame}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    Start Again
                </button>
            </div>
            ) : (<div className="grid grid-cols-4 grid-rows-4 gap-2">
                {items.map((item, index) => (
                    <MemCard
                        key={index}
                        item={item}
                        handleClick={handleClick}
                        id={index}
                    />
                ))}
            </div>)}

        </div>
    );
}
export default Cards
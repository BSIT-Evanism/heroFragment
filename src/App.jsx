import useMousePosition from "./utils/useMousePosition.jsx";
import styles from "./main.module.scss"
import {motion, useMotionValue, useSpring} from "framer-motion";
import {useEffect, useRef, useState} from "react";

function App() {
    const [hover, setHover] = useState(false)
    const [tilt, setTilt] = useState(false)
    const {mouseTilt} = useMousePosition();
    const ref = useRef(null);

    const coords = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const xSpring = useSpring(coords.x)
    const ySpring = useSpring(coords.y)

    useEffect(() => {
        if (tilt) {
        coords.x.set(-1 * mouseTilt.xDeg)
        coords.y.set(mouseTilt.yDeg)
        } else {
        coords.x.set(0)
        coords.y.set(0)
        }
        console.log(xSpring,ySpring)
    }, [mouseTilt.yDeg]);

    // useEffect(() => {
    //     if (tilt) {
    //         ref.current.style.setProperty("--rotateX", -1 * mouseTilt.xDeg + "deg")
    //         ref.current.style.setProperty("--rotateY", mouseTilt.yDeg + "deg")
    //     } else {
    //         ref.current.style.setProperty("--rotateX", 0)
    //         ref.current.style.setProperty("--rotateY", 0)
    //     }
    //     console.log(xSpring,ySpring)
    // }, [mouseTilt.yDeg, mouseTilt.xDeg])


    return (
        <>
            <div className={styles.outerwrapper}>

                <motion.div className={styles.wrapper}
                            initial={{y: -100}}
                            animate={{y: 0}}
                            onMouseEnter={() => setTilt(true)}
                            onMouseLeave={() => setTilt(false)}
                            transition={{duration: 1.5, type: "spring", delay: 0.8}}
                >
                    <motion.div className={styles.hero}
                                style={{rotateX: xSpring, rotateY: ySpring}}
                         ref={ref}

                        // animate={{rotateX: mouseTilt.yDeg, rotateY: mouseTilt.xDeg}}
                    >
                        <div className={styles.inner}
                        >
                            hover me
                            <div
                                className={styles.contain}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                <div className={`${styles.float} ${hover && (styles.flow)}`}
                                ></div>
                            </div>
                            <motion.div className={styles.callFloat}
                            >
                                <div className={styles.ping}>
                                    <div className={styles.innerPing}/>
                                </div>

                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <div className={styles.footer}>
                <h1>A fragment of future
                    <p>(from my portfolio)<br/>
                        made with ❤️ by evan<br/>
                        <a href="https://bento.me/evansolanoy" target="_blank" rel="noreferrer">
                        <motion.div className={styles.btn}
                                    whileHover={{scale: 1.2}}
                                    transition={{duration: 0.5, type: "spring"}}
                        >Check my bento 🍱 instead for links</motion.div>
                        </a>
                    </p>
                </h1>
            </div>
        </>
    )
}

export default App

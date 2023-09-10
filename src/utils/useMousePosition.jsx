import {useMemo, useState} from "react";
import { useEffect } from "react";
import {useSpring} from "framer-motion";

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseTilt, setMouseTilt] = useState({xDeg: 0, yDeg: 0})

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const updateMouseTilt = useMemo(() => {
    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;
    const offsetX = ((mousePosition.x - middleX) / middleX) * 30;
    const offsetY = ((mousePosition.y - middleY) / middleY) * 30;
    setMouseTilt({xDeg: offsetY, yDeg: offsetX})
  },[mousePosition])

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition)
    return () => {
    window.removeEventListener("mousemove", updateMousePosition)

    }
  }, [])

  return {mousePosition, mouseTilt};

}

export default useMousePosition;

import { useEffect, useState } from "react"
import { ResizableBox, ResizableBoxProps } from "react-resizable"

import "./resizable.css"

interface ResizableProps {
  children?: React.ReactNode
  direction: "horizontal" | "vertical"
}

const Resizable: React.FC<ResizableProps> = ({ children, direction }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [width, setWidth] = useState(window.innerWidth * 0.75)

  let resizableProps!: ResizableBoxProps

  useEffect(() => {
    let timer: any
    const listener = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight)
        setInnerWidth(window.innerWidth)
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75)
        }
      }, 100)
    }

    window.addEventListener("resize", listener)

    return () => {
      window.removeEventListener("resize", listener)
    }
  }, [width])

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width)
      },
      resizeHandles: ["e"],
      width: width,
    }
  } else if (direction === "vertical") {
    resizableProps = {
      height: 300,
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      resizeHandles: ["s"],
      width: Infinity,
    }
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable

import { useEffect, useRef, useState } from "react"

const SunMonster = () => {
  const leftEye = useRef<HTMLDivElement>(null)
  const rightEye = useRef<HTMLDivElement>(null)
  const [blink, setBlink] = useState(false)

  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 200)
    }, 5000)
    return () => clearInterval(blinkInterval)
  }, [])

  const moveEye = (eye: HTMLDivElement, targetX: number, targetY: number) => {
    const rect = eye.getBoundingClientRect()
    const eyeCenterX = rect.left + rect.width / 2
    const eyeCenterY = rect.top + rect.height / 2
    const deltaX = targetX - eyeCenterX
    const deltaY = targetY - eyeCenterY
    const angle = Math.atan2(deltaY, deltaX)
    const radius = 12

    const pupil = eye.querySelector(".pupil") as HTMLDivElement
    if (pupil) {
      const moveX = Math.cos(angle) * radius
      const moveY = Math.sin(angle) * radius

      pupil.style.transform = `translate(${moveX}px, ${moveY}px)`
    }
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", onMouseMove)

    let animationFrameId: number
    const animate = () => {
      if (leftEye.current)
        moveEye(leftEye.current, mouse.current.x, mouse.current.y)
      if (rightEye.current)
        moveEye(rightEye.current, mouse.current.x, mouse.current.y)

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      className='position-relative d-flex justify-content-center align-items-center flex-column mb-4'
      style={{ width: 300, height: 300 }}
    >
      <img
        src='/sun.png'
        alt='Happy Sun'
        style={{
          width: 300,
          height: 300,
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <div
        className='d-flex position-absolute'
        style={{
          top: "36%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <div
          ref={leftEye}
          className='eye mx-2'
          style={{
            width: 52,
            height: 52,
            background: "#fff",
            borderRadius: "50%",
            position: "relative",
            border: "3px solid #333",
            overflow: "hidden",
            marginRight: 15,
            transform: "translateX(1px) translateY(2px)",
          }}
        >
          <div
            className='pupil'
            style={{
              width: 20,
              height: blink ? 4 : 20,
              background: "#333",
              borderRadius: blink ? 2 : "50%",
              position: "absolute",
              top: blink ? 24 : 16,
              left: 16,
              transition: "transform 0.1s, height 0.1s, top 0.1s",
            }}
          />
        </div>
        <div
          ref={rightEye}
          className='eye mx-2'
          style={{
            width: 52,
            height: 52,
            background: "#fff",
            borderRadius: "50%",
            position: "relative",
            border: "3px solid #333",
            overflow: "hidden",
            marginLeft: 15,
            transform: "translateX(-12px)",
          }}
        >
          <div
            className='pupil'
            style={{
              width: 20,
              height: blink ? 4 : 20,
              background: "#333",
              borderRadius: blink ? 2 : "50%",
              position: "absolute",
              top: blink ? 24 : 16,
              left: 16,
              transition: "transform 0.1s, height 0.1s, top 0.1s",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SunMonster

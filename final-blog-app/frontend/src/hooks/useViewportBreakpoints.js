import { useState, useEffect } from 'react'

const useViewportBreakpoints = () => {
  const [isBelow400px, setIsBelow400px] = useState(false)
  const [isBetween400and600px, setIsBetween400and600px] = useState(false)
  const [isBelow850px, setIsBelow850px] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth

      if (screenWidth < 400) {
        setIsBelow400px(true)
        setIsBetween400and600px(false)
        setIsBelow850px(true)
      } else if (screenWidth < 600) {
        setIsBelow400px(false)
        setIsBetween400and600px(true)
        setIsBelow850px(true)
      } else if (screenWidth < 850) {
        setIsBelow400px(false)
        setIsBetween400and600px(false)
        setIsBelow850px(true)
      } else {
        setIsBelow400px(false)
        setIsBetween400and600px(false)
        setIsBelow850px(false)
      }
    }

    handleResize() // Initial call

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isBelow400px, isBetween400and600px, isBelow850px }
}

export default useViewportBreakpoints

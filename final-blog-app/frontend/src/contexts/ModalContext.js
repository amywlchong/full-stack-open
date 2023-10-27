import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export const useModal = () => {
  return useContext(ModalContext)
}

export const ModalProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isNewBlogModalOpen, setIsNewBlogModalOpen] = useState(false)
  const value = {
    isLoginModalOpen,
    isNewBlogModalOpen,
    closeBlogModal: () => {
      setIsNewBlogModalOpen(false)
    },
    openBlogModal: () => {
      setIsNewBlogModalOpen(true)
    },
    closeLoginModal: () => {
      setIsLoginModalOpen(false)
    },
    openLoginModal: () => {
      setIsLoginModalOpen(true)
    },
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

import React from 'react'

function Main({ children }) {
  return (
    <main className="h-screen w-full overflow-y-auto">
      <div className="container grid px-2 md:px-6 mx-auto pb-20">{children}</div>
    </main>
  )
}

export default Main

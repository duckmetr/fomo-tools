import { Outlet } from 'react-router'

export const RootLayout = () => {
  return (
    <>
      <header>
        <h1>Root Layout</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

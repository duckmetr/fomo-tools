export const Header = () => {
  return (
    <header className="bg-neutral-800 text-background border-b">
      <div className="max-w-7xl mx-auto px-2 py-3">
        <a href="/" className="flex items-center gap-2">
          <img src="/images/logo/dog.jpg" alt="logo" className="h-10 w-10" />
          <h1 className="text-2xl font-semibold">Fomo Tools</h1>
        </a>
      </div>
    </header>
  )
}

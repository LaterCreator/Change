import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">Veganism - What & How</Link>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/sustainability">Sustainability</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/health">Health</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/recipes">Recipes</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/reflections">Reflections</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/chat">Chat</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


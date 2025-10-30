import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Vinyfy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium vinyl records for collectors and music lovers.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/new-arrivals" className="text-muted-foreground transition-colors hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-muted-foreground transition-colors hover:text-foreground">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/genres" className="text-muted-foreground transition-colors hover:text-foreground">
                  Genres
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground transition-colors hover:text-foreground">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground transition-colors hover:text-foreground">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/instagram" className="text-muted-foreground transition-colors hover:text-foreground">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="/twitter" className="text-muted-foreground transition-colors hover:text-foreground">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-muted-foreground transition-colors hover:text-foreground">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Vinyfy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

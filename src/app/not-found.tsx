import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stránka nenalezena – CodeKom',
  robots: { index: false },
}

const ODKAZY: [string, string][] = [
  ['/ukazky', 'Šablony webů'],
  ['/cenik', 'Ceník a kalkulačka'],
  ['/co-umime', 'Co umíme'],
  ['/kontakt', 'Kontakt'],
]

/** Česká stránka 404 místo výchozí anglické stránky Next.js. */
export default function NenalezenaStranka() {
  return (
    <div className="obal py-24 md:py-32">
      <p className="rubrika">Chyba 404</p>
      <h1 className="mt-2 text-[40px] md:text-[60px]">Tuhle stránku jsme nenašli</h1>
      <p className="mt-4 max-w-[36em] text-[18px] text-sediva">
        Adresa je možná překlepnutá, nebo stránka už neexistuje. Pokračujte na úvodní stránku nebo do jedné z hlavních částí webu.
      </p>
      <p className="mt-8">
        <Link href="/" className="tlacitko">
          Na úvodní stránku
        </Link>
      </p>
      <ul className="mt-10 flex flex-wrap gap-3">
        {ODKAZY.map(([href, text]) => (
          <li key={href}>
            <Link href={href} className="tlacitko-obrys">
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

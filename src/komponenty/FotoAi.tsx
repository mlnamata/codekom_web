import Image from 'next/image'
import { OdznakAi } from '@/komponenty/OdznakAi'

/** Fotka vytvořená umělou inteligencí s grafickým odznakem AI. */
export function FotoAi({ src, alt, priorita = false, className = '', pomer = 'aspect-[16/10]' }: { src: string; alt: string; priorita?: boolean; className?: string; pomer?: string }) {
  return (
    <figure className={`relative ${className}`}>
      <div className={`relative overflow-hidden rounded-3xl bg-plocha ${pomer}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1200px) 720px, (min-width: 768px) 60vw, 100vw" className="object-cover" priority={priorita} />
        <figcaption className="absolute bottom-3 right-3 z-10 m-0">
          <OdznakAi />
        </figcaption>
      </div>
    </figure>
  )
}

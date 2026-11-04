import Image from 'next/image'

/**
 * Grafický odznak pro fotografie vytvořené umělou inteligencí.
 * Zobrazuje kruhový symbol AI na skleněném podkladu.
 */
export function OdznakAi({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <span
      className="sklo-tmave inline-flex items-center justify-center rounded-full p-1.5 shadow-lg backdrop-blur-md"
      title="Ilustrační fotografie vytvořená umělou inteligencí"
      aria-label="AI – Ilustrační fotografie vytvořená umělou inteligencí"
    >
      <Image
        src="/brand/ai-odznak-oriznuty.png"
        alt=""
        width={24}
        height={24}
        className={`${className} object-contain`}
      />
      <span className="sr-only">Ilustrační fotografie vytvořená umělou inteligencí</span>
    </span>
  )
}

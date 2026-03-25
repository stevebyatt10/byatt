interface SplitTextProps {
  text: string
  className?: string
  wordClassName?: string
}

/**
 * Splits text into word spans with overflow:hidden wrappers.
 * Animate .word-inner children with GSAP for text reveal effects.
 */
export function SplitText({ text, className, wordClassName }: SplitTextProps) {
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="word">
          <span className={`word-inner ${wordClassName ?? ""}`}>
            {word}
          </span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  )
}

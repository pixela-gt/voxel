// Mask tokens:
//   # = digit        (0-9)
//   A = letter       (A-Za-z, case-preserving)
//   * = alphanumeric (A-Za-z0-9)
// Any other character is a literal appended once the raw input reaches that position.

// ponytail: hand-rolled, no deps. If a feature needs cursor preservation or
// token escaping (e.g. literal "#"), extend this signature.

const TOKEN: Record<string, RegExp> = {
  '#': /\d/,
  'A': /[A-Za-z]/,
  '*': /[A-Za-z0-9]/,
}

export function applyMask(raw: string, mask: string): string {
  if (!mask) return raw
  const out: string[] = []
  let ri = 0
  for (let mi = 0; mi < mask.length; mi++) {
    const m = mask[mi]
    const rx = TOKEN[m]
    if (rx) {
      if (ri >= raw.length) break
      const c = raw[ri]
      if (!rx.test(c)) break
      out.push(c)
      ri++
    } else {
      out.push(m)
    }
  }
  return out.join('')
}

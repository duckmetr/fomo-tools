export function useCustomEmoji(emojiList: Record<string, string>): (value: string) => string {
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(Object.keys(emojiList).map(escapeRegex).join('|'), 'g')

  return function transform(value: string): string {
    return value.replace(pattern, (match) => {
      const id = emojiList[match]
      return id ? `<tg-emoji emoji-id="${id}">${match}</tg-emoji>` : match
    })
  }
}

export const dateFormate = (config={}) => d => {
  const DEFAULT_RULE = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return new Date(d).toLocaleString('en-us', {
    ...DEFAULT_RULE,
    ...config
  })
}

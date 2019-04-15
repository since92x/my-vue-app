export const dateFormate = d => {
  return new Date(d).toLocaleString('en-us', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '-').replace(/,/, ' ')
}

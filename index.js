const mediate = queryFunc => (strings, ...raw) => ({ theme: { breakpoints, media }, ...props }) => {
  const values = Object.keys(raw).map(k => (typeof raw[k] === 'function' ? raw[k](props) : raw[k]))
  const sizes = values.reduce((acc, value) => {
    if (typeof value === 'string') return acc[0] === 0 ? acc : { ...acc, 0: 0 }
    if (typeof value === 'object')
      return {
        ...acc,
        ...Object.keys(value).reduce(
          (valAcc, key) =>
            isNaN(key) ? { ...valAcc, [key]: breakpoints[key] } : { ...valAcc, [key]: Number(key) },
          {}
        )
      }
    return acc
  }, {})
  return Object.keys(sizes)
    .sort((a, b) => (queryFunc(0).includes('max') ? sizes[b] - sizes[a] : sizes[a] - sizes[b]))
    .map(key => {
      const cssString = strings.reduce((acc, string, i) => {
        if (values[i]) {
          if (typeof values[i] === 'object' && values[i][key]) {
            return acc + string + values[i][key]
          }
          if (typeof values[i] === 'string' && sizes[key] === 0) return acc + string + values[i]
        }
        return acc + string
      }, '')
      if (Number(key) === 0 || breakpoints[key] === 0) return cssString
      return Number(key) === 0 ? cssString : `@media ${queryFunc(sizes[key], media)} {${cssString}}`
    })
}

export default mediate
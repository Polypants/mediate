## This is mediate:

```javascript

import mediate from 'mediate'

const media = mediate(size => `screen and (min-width: ${size}em)`)

const Box = styled.div`
  height: 200px;
  ${media`
    background: ${{ 0: 'tomato', sm: 'lime', 42: 'plum' }};
    width: ${({ flag }) { 0: '100px', lg: '300px' } : '200px'};
    & > p {
      margin: ${({ flag }) => ({ 0: flag ? '1rem' :'1.5rem', md: '2rem' })};
    }
  `}
`

...
```

```html
  <ThemeProvider
    theme={{ breakpoints: { sm: 30, md: 45, lg: 60 } }}
  >
    <Box flag>
      <p>Oh hey! hi, how's it going?<p>
    </Box>
  </ThemeProvider>

```
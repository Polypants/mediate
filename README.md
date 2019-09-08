# Styled Mediate 👩‍⚖️

Write dryer media queries in your `styled-components`💅. Include all of your CSS media query based values in one line. Only write as many CSS property names as you use.

## example

```javascript

import mediate from 'styled-mediate'

const media = mediate(size => `screen and (min-width: ${size}em)`)

const Example = styled.div`
  display: Flex;
  ${media`
    flex-direction: ${{ 0: 'column', md: 'row' }};
    flex-basis: ${({ flag }) => ({ 0: '100px', lg: '300px' } : '200px')};
    & > p {
      margin: ${
        ({ flag }) => ({ 0: flag ? '1rem' :'1.5rem', md: '2rem' })
      };
    }
  `}
`

...
```

```html
  <ThemeProvider theme={{ breakpoints: { sm: 30, md: 45, lg: 60 } }}>
    <Example flag>
      <p>Oh hey! hi, how's it going?<p>
    </Example>
  </ThemeProvider>

```

The resulting stylesheet will have it's media queries grouped by component (as usual) and will not include any empty media queries. Also, media queries will appear in their proper order for use with either min or max properties. All automatically.
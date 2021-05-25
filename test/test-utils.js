import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'

const mocks = []

const ApolloRenderer = ({ children }) => {
  return (
    <MockedProvider mocks={mocks}>
      <ColorModeProvider value='dark'>{children}</ColorModeProvider>
    </MockedProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ApolloRenderer,
    ...options,
  })

export * from '@testing-library/react'
export { customRender as render }

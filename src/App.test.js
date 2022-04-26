import { screen } from '@testing-library/react'
import App from './App'
import { render } from './utils/test'
it.skip('renders learn react link', async () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})

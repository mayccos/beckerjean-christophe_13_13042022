import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { loginReducer } from '../../features/login'
import { MemoryRouter } from 'react-router-dom'

export function render(ui, options) {
    const store = configureStore({
        reducer: {
            user: loginReducer,
        },
    })

    function Wrapper({ children }) {
        return (
            <MemoryRouter {...options}>
                <Provider store={store}>{children}</Provider>
            </MemoryRouter>
        )
    }
    rtlRender(ui, { wrapper: Wrapper })
}

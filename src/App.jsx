import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//import components
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Error from './pages/Error'
//import component css
import GlobalStyle from './utils/style/GlobalStyle'

/**
 * routes & renders pages
 * @returns {JSX}
 */
function App() {
    return (
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App

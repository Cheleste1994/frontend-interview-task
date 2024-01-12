import { BrowserRouter } from 'react-router-dom'
import Router from './pages/router'

export default function App() {
    return (
        <BrowserRouter>
            <header className="h-20 bg-primary flex items-center p-4">
                <h1 className="text-3xl text-black">Title</h1>
            </header>
            <main className="flex flex-col p-4 h-full">
                <Router />
            </main>
        </BrowserRouter>
    )
}

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import Public from './components/Public.js';
import Login from './features/auth/Login.js';
import DashLayout from './components/DashLayout.js';
import Welcome from './features/auth/Welcome.js';
import NotesList from './features/notes/NotesList.js';
import UsersList from './features/users/UsersList.js';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element = {<Public />}/>
                <Route path='login' element = {<Login/>} />
                
                <Route path='dash' element = {<DashLayout />}> 
                    <Route index element={<Welcome/>} />

                    <Route path='notes'>
                        <Route index element={<NotesList />} />
                    </Route>

                    <Route path='users'>
                        <Route index element={<UsersList />} />
                    </Route>
                </Route>
            </Route >
        </Routes>
    )
}

export default App;
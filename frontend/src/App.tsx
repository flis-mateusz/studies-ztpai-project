import {Route, Routes} from "react-router-dom";
import {AuthProvider} from './hooks/useAuth';
import {Login, Root} from "@/pages";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Root/>}>
                    <Route path="/login" element={<Login/>}/>
                    {/*<Route*/}
                    {/*    path="/protected"*/}
                    {/*    element={*/}
                    {/*        <RequireAuth>*/}
                    {/*            <ProtectedPage />*/}
                    {/*        </RequireAuth>*/}
                    {/*    }*/}
                    {/*/>*/}
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App

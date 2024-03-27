import {Route, Routes} from "react-router-dom";
import {AuthProvider} from '@hooks/useAuth';
import {Login, Root} from "@/pages";
import {AddAnnouncement} from "@pages/AddAnnouncement.tsx";
import {RequireAuth} from "@components/RequireAuth.tsx";
import {Announcements} from "@pages/Announcements.tsx";

async function delay() {
    await new Promise(resolve => setTimeout(resolve, 5000));
}


const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Root/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/add' element={
                        <RequireAuth>
                            <AddAnnouncement/>
                        </RequireAuth>
                    }/>
                    <Route path={'/announcements'} element={<Announcements/>}/>

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

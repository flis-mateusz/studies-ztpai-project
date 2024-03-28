import {Route, Routes} from "react-router-dom";
import {AuthProvider} from '@hooks/useAuth';
import {LoginPage, RootPage} from "@/pages";
import {AddAnnouncementPage} from "@pages/AddAnnouncementPage.tsx";
import {RequireAuth} from "@components/RequireAuth.tsx";
import {AnnouncementsPage} from "@pages/AnnouncementsPage.tsx";
import {ContactPage} from "@pages/ContactPage.tsx";


const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<RootPage/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path='/add' element={
                        <RequireAuth>
                            <AddAnnouncementPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'/announcements'} element={<AnnouncementsPage/>}/>
                    <Route path={'/contact'} element={<ContactPage/>}/>

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

import {Route, Routes} from "react-router-dom";
import {AuthProvider} from '@hooks/useAuth';
import {
    AddAnnouncementPage,
    AnnouncementsPage,
    ContactPage,
    HelpPage,
    LoginPage, ProfileAnnouncementsPage,
    ProfileEditPage,
    ProfilePage,
    RootPage
} from "@/pages";
import {RequireAuth} from "@components/RequireAuth.tsx";


const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<RootPage/>}>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path='add' element={
                        <RequireAuth>
                            <AddAnnouncementPage/>
                        </RequireAuth>
                    }/>
                    <Route path={'announcements'} element={<AnnouncementsPage/>}/>
                    <Route path={'profile'} element={
                        <RequireAuth>
                            <ProfilePage/>
                        </RequireAuth>
                    }>
                        <Route path={''} element={<ProfileEditPage/>}/>
                        <Route path={'announcements'} element={<ProfileAnnouncementsPage/>}/>
                        {/*<Route path={'support'} element={<ProfileAnnouncementsPage/>}/>*/}
                        {/*<Route path={'admin'} element={<ProfileAnnouncementsPage/>}/>*/}
                    </Route>
                    <Route path={'contact'} element={<ContactPage/>}/>
                    <Route path={'help'} element={<HelpPage/>}/>

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

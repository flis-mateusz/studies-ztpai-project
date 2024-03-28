import {Route, Routes} from "react-router-dom";
import {AuthProvider} from '@hooks/useAuth';
import {
    AnnouncementEditPage,
    AdminApprovalPage,
    AdminPage,
    AdminPetFeatures,
    AdminPetTypesPage,
    AdminReportsPage,
    AdminUsersPage,
    AnnouncementsPage,
    ContactPage,
    HelpPage,
    LoginPage,
    ProfileAnnouncementsPage,
    ProfileEditPage,
    ProfilePage,
    ProfileSupportPage,
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
                            <AnnouncementEditPage/>
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
                        <Route path={'support'} element={<ProfileSupportPage/>}/>

                        <Route path={'admin'} element={<AdminPage/>}>
                            <Route path={'approval'} element={<AdminApprovalPage/>}/>
                            <Route path={'reports'} element={<AdminReportsPage/>}/>
                            <Route path={'users'} element={<AdminUsersPage/>}/>
                            <Route path={'petTypes'} element={<AdminPetTypesPage/>}/>
                            <Route path={'petFeatures'} element={<AdminPetFeatures/>}/>
                        </Route>
                    </Route>
                    <Route path={'contact'} element={<ContactPage/>}/>
                    <Route path={'help'} element={<HelpPage/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App

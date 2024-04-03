import {Route, Routes} from "react-router-dom";
import {AuthProvider} from '@hooks/useAuth';
import {
    AdminApprovalPage,
    AdminPage,
    AdminPetFeatures,
    AdminPetTypesPage,
    AdminReportsPage,
    AdminUsersPage,
    AnnouncementEditPage,
    AnnouncementsPage,
    ContactPage,
    Layout,
    LoginPage,
    ProfileAnnouncementsPage,
    ProfileEditPage,
    ProfilePage
} from "@/pages";
import {RequireAuth} from "@components/RequireAuth.tsx";
import {IndexPage} from "@pages/IndexPage.tsx";
import {Suspense} from "react";


const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='' element={
                        <Suspense fallback={'loading'}>
                            <IndexPage/>
                        </Suspense>
                    }/>
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

                        <Route path={'admin'} element={<AdminPage/>}>
                            <Route path={'approval'} element={<AdminApprovalPage/>}/>
                            <Route path={'reports'} element={<AdminReportsPage/>}/>
                            <Route path={'users'} element={<AdminUsersPage/>}/>
                            <Route path={'petTypes'} element={<AdminPetTypesPage/>}/>
                            <Route path={'petFeatures'} element={<AdminPetFeatures/>}/>
                        </Route>
                    </Route>
                    <Route path={'contact'} element={<ContactPage/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App

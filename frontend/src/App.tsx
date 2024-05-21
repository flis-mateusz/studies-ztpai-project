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
import {AnnouncementPage} from "@pages/AnnouncementPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from "axios";
import TestUploads from "@pages/TestUploads.tsx";
import {RequireRole} from "@components/RequireRole.tsx";
import {USER_ROLES} from "@/interfaces/IUser.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: 0,
            retry: 0
        },
        mutations: {}
    }
})

axios.defaults.baseURL = 'http://localhost:8082';

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route path='' element={<IndexPage/>}/>
                        <Route path='test' element={<TestUploads/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path='add' element={
                            <RequireAuth>
                                <AnnouncementEditPage/>
                            </RequireAuth>
                        }/>
                        <Route path='edit/:announcementId' element={
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


                            <Route path={'admin'} element={
                                <RequireRole role={USER_ROLES.ROLE_ADMIN}>
                                    <AdminPage/>
                                </RequireRole>
                            }>
                                <Route path={'approval'} element={<AdminApprovalPage/>}/>
                                <Route path={'reports'} element={<AdminReportsPage/>}/>
                                <Route path={'users'} element={<AdminUsersPage/>}/>
                                <Route path={'petTypes'} element={<AdminPetTypesPage/>}/>
                                <Route path={'petFeatures'} element={<AdminPetFeatures/>}/>
                            </Route>
                        </Route>
                        <Route path={'contact'} element={<ContactPage/>}/>
                        <Route path={'announcement/:announcementId'} element={<AnnouncementPage/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App

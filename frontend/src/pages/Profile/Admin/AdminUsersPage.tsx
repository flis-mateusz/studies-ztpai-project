import '@styles/components/user-element.css'
import {Helmet} from "react-helmet-async";
import useGridLoaders from "@hooks/useGridLoaders.tsx";
import {useAxiosPaginatedQuery} from "@hooks/useAxiosPaginatedQuery.tsx";
import {useRef} from "react";
import {IUser} from "@/interfaces/IUser.ts";
import {UserElement} from "@components/UserElement.tsx";

export const AdminUsersPage = () => {
    const container = useRef<HTMLElement | null>(null)
    const loader = useGridLoaders({
        ref: container,
        useColumnNumberAsCount: true,
        loaderHeight: 173
    })

    const {query, pagination} = useAxiosPaginatedQuery<IUser>(
        `/api/admin/users`,
        6,
        {
            queryOptions: {
                queryKey: ['ADMIN_GET_USERS'],
                refetchOnMount: true
            }
        })

    return <>
        <Helmet><title>Użytkownicy</title></Helmet>

        <section className="panel-elements fit" ref={container}>
            {
                query.isPending || query.isFetching ?
                    loader
                    :
                    query.data ? query.data['hydra:member'].map((user, i) => (
                        <UserElement key={i} user={user}/>
                    )) : null
            }
        </section>
        {pagination}
    </>
}
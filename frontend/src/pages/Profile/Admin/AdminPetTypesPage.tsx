import '@styles/components/list-elements.css'
import {Helmet} from "react-helmet-async";
import {useAxiosQuery} from "@hooks/useAxiosQuery.tsx";
import {IHydraCollection} from "@/interfaces/Hydra.ts";
import {IAnimalType} from "@/interfaces/App.ts";
import {AnimatedLoader} from "@components/AnimatedLoader.tsx";
import {useState} from "react";
import {useAxiosMutation} from "@hooks/useAxiosMutation.tsx";
import {IconButton} from "@components/IconButton.tsx";

interface IPostData {
    name: string
}

export const AdminPetTypesPage = () => {
    const [value, setValue] = useState<string>('')

    const query = useAxiosQuery<IHydraCollection<IAnimalType>>('/api/admin/animal_types', {
        queryOptions: {
            queryKey: ['ADMIN_ANIMAL_TYPES'],
            refetchOnMount: true
        }
    })

    const postMutation = useAxiosMutation<IPostData, null>('/api/admin/animal_types', {
        method: 'POST',
        mutationOptions: {
            mutationKey: ['ANIMAL_FEATURE_POST']
        }
    })

    if (!query.data) {
        return <AnimatedLoader visible={true}/>
    }

    const handleAdd = () => {
        postMutation.mutate({
            name: value
        }, {
            onSuccess: async () => {
                query.refetch()
                setValue('')
            }
        })
    }

    const refetch = async () => {
        await query.refetch()
    }

    return <>
        <Helmet><title>Typy zwierząt</title></Helmet>

        <label className="icon-input right w100">
            <input type="text" className="main-input" placeholder="Dodaj typ" value={value}
                   onChange={e => {
                       setValue(e.target.value)
                   }}
            />
            <i className="material-icons action-add" onClick={handleAdd}>add_circle_outline</i>
        </label>
        <div className="list types">
            <div>
                <div className="action">
                    <span>Nazwa</span>
                </div>
                <div>
                    <span>Liczba użyć</span>
                </div>
            </div>
            {
                query.data['hydra:member']
                    .sort((type1, type2) => type1.announcements!.length < type2.announcements!.length ? 1 : -1)
                    .map((type, i) =>
                        <PetType type={type}
                                 key={i}
                                 refetch={refetch}
                        />
                    )
            }
        </div>
    </>
}

const PetType = ({type, refetch}: {
    type: IAnimalType,
    refetch: () => Promise<void>
}) => {
    const deleteMutation = useAxiosMutation<null, null>('/api/admin/animal_types/' + type.id, {
        method: 'DELETE',
        mutationOptions: {
            mutationKey: ['ANIMAL_FEATURE_DELETE', type.id]
        }
    })

    const handleDelete = () => {
        deleteMutation.mutate(null, {
            onSettled: () => refetch()
        })
    }

    return <div className={'list-element'}>
        <div className={`list-action ${deleteMutation.isPending ? 'visible' : ''}`}>
            <IconButton iconName={'delete_forever'} onClick={handleDelete} loading={deleteMutation.isPending}/>
            <span>{type.name}</span>
        </div>
        <div>
            <span>{type.announcements!.length}</span>
        </div>
    </div>
}
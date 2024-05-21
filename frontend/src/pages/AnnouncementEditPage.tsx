import {Helmet} from "react-helmet-async"

import '@styles/announcements/announcement-form.css'
import '@styles/components/custom-radio.css'
import '@styles/components/forms.css'
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {IAnnouncementForm, MainForm} from "@components/AnnouncementForm/MainForm.tsx";
import {useAxiosQuery} from "@hooks/useAxiosQuery.tsx";
import {IHydraCollection, IHydraExtension} from "@/interfaces/Hydra.ts";
import {
    IAnimalFeature,
    IAnimalType,
    IAnnouncement,
    IAnnouncementDetail,
    IAnnouncementUpload
} from "@/interfaces/App.ts";
import {IUploadedFile} from "@components/AnnouncementForm/AttachmentFormDropzoneWithPreview.tsx";
import {DefaultSwalToast} from "@/swal2/Popups.tsx";
import {useAxiosMutation} from "@hooks/useAxiosMutation.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {AnimatedLoader} from "@components/AnimatedLoader.tsx";
import {useAuth} from "@hooks/useAuth.tsx";
import {AxiosError} from "axios";
import {useAxiosFormPost} from "@hooks/useAxiosFormPost.tsx";

interface IPostAnnouncementData {
    animalType: string,
    announcementDetail: Omit<IAnnouncementDetail, 'announcementAnimalFeatures'> | {
        announcementAnimalFeatures: {
            feature: string
        }
    },
    uploads?: string[]
}

export const AnnouncementEditPage = () => {
    const params = useParams()
    const [announcementId, setAnnouncementId] = useState<number | null | string>(params.announcementId || null)
    const auth = useAuth()
    const navigate = useNavigate()

    const query = useAxiosQuery<IAnnouncement>(`/api/announcements/${announcementId}`, {
        queryOptions: {
            queryKey: ['ANNOUNCEMENT_EDIT', announcementId],
            refetchOnMount: true,
            enabled: !!announcementId
        }
    })

    const animalTypesQuery = useAxiosQuery<IHydraCollection<IAnimalType & IHydraExtension>>('/api/animal_types', {
        queryOptions: {
            queryKey: ['ANIMAL_TYPES'],
            refetchOnMount: true
        }
    })

    const animalFeaturesQuery = useAxiosQuery<IHydraCollection<IAnimalFeature>>('/api/animal_features', {
        queryOptions: {
            queryKey: ['ANIMAL_FEATURES'],
            refetchOnMount: true
        }
    })

    const postMutation = useAxiosMutation<IPostAnnouncementData, IAnnouncement>('/api/announcements', {
        method: 'POST',
        mutationOptions: {
            mutationKey: ['ADD_ANNOUNCEMENT'],
        }
    })

    const patchMutation = useAxiosMutation<IPostAnnouncementData>(`/api/announcements/${announcementId}`, {
        method: 'PATCH',
        mutationOptions: {
            mutationKey: ['EDIT_ANNOUNCEMENT'],
        }
    })

    const uploadsMutation = useAxiosFormPost(`/api/announcements/${announcementId}/uploads`, {
        mutationOptions: {
            mutationKey: ['ANNOUNCEMENT_UPLOADS']
        }
    })

    const [form, setForm] = useState<IAnnouncementForm>(
        {
            name: '',
            locality: '',
            price: '',
            description: '',
            age: '',
            gender: 'male',
            kind: '',
            ageType: 'year',
            animalType: null,
            animalTypeInputValue: ''
        })

    useEffect(() => {
        if (query.data) {
            setForm(prev => ({
                ...prev,
                ...query.data.announcementDetail,
                animalType: query.data.animalType.name
            }))
            setFiles([
                ...query.data.uploads
            ])
            setAnimalFeaturesState({
                ...Object.fromEntries(
                    query.data.announcementDetail.announcementAnimalFeatures.map(entry => [
                        (entry.feature as IAnimalFeature & IHydraExtension)['@id'], entry.isPositive
                    ])
                )
            })
        }
    }, [query.data]);

    const [files, setFiles] = useState<(IUploadedFile | IAnnouncementUpload)[]>([])
    const [animalFeaturesState, setAnimalFeaturesState] = useState<Record<string, boolean | null>>({})

    const handleAnimalFeaturesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setAnimalFeaturesState(prev => {
            const newState = {...prev}
            if (value === '0') {
                delete newState[name]
            } else {
                newState[name] = value === '2'
            }
            return newState
        })
    }

    const updateForm = (name: string, value: string | number | null) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const navigateToAnnouncement = () => {
        navigate(`/announcement/${announcementId}`)
    }

    const toDTO = () => {
        const animalFeatures = Object.entries(animalFeaturesState).map(([key, value]) => {
            return {
                feature: key,
                isPositive: value
            }
        })

        const uploads = files.filter(file =>
            !(file instanceof File)) as (IAnnouncementUpload & IHydraExtension)[]
        const uploads_jsonld = uploads.map(file => file['@id'])

        return {
            animalType: animalTypesQuery.data!['hydra:member'].find(option => option.name === form.animalType)!['@id'],
            announcementDetail: {
                ...form,
                price: form.price ? parseInt(form.price as string) : undefined,
                age: form.age ? parseInt(form.age as string) : undefined,
                announcementAnimalFeatures: animalFeatures
            },
            uploads: uploads_jsonld
        }
    }

    const uploadFiles = () => {
        const newFiles = files.filter((file) => file instanceof File) as IUploadedFile[]

        if (!newFiles.length) {
            navigateToAnnouncement()
            return
        }

        const formData = new FormData()
        newFiles.forEach((file) => formData.append('files[]', file))
        uploadsMutation.mutate(formData, {
            onSuccess: () => navigateToAnnouncement()
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        announcementId ?
            patchMutation.mutate(toDTO(), {
                onSuccess: uploadFiles,
                onError: () => query.refetch()
            })
            :
            postMutation.mutate(toDTO(), {
                onSuccess: (data) => {
                    setAnnouncementId(data.id)
                    uploadFiles()
                }
            })
    }

    const handleNewFile = (newFiles: IUploadedFile[]) => {
        const availableSlots = 5 - (files.length)

        if (availableSlots <= 0) {
            DefaultSwalToast.fire('', 'Możesz załączyć maksymalnie 5 zdjęć', 'error')
            return
        }

        const newUniqueFiles = newFiles.filter(file =>
            !files.some(existingFile =>
                existingFile instanceof File ?
                    existingFile.name === file.name
                    : false
            )
        )

        if (newUniqueFiles.length !== newFiles.length) {
            DefaultSwalToast.fire('', 'Niektóre pliki nie zostały dodane, ponieważ plik o tej samej nazwie już istnieje', 'info');
        }

        const filesToAdd = newUniqueFiles.slice(0, availableSlots)
        setFiles([...files, ...filesToAdd])

        if (filesToAdd.length > availableSlots) {
            DefaultSwalToast.fire('', 'Dodano tylko część plików z powodu limitu 5 zdjęć', 'info')
        }
    }

    const handleFileDelete = (file: IUploadedFile | IAnnouncementUpload) => {
        const updatedNewFiles = files.filter((existingFile) => {
            return file instanceof File ?
                file !== existingFile
                :
                existingFile instanceof File ? true : file.mediaObject.contentUrl !== existingFile.mediaObject.contentUrl
        });
        setFiles(updatedNewFiles);
    }

    if (query.error instanceof AxiosError && query.error.response?.status === 404) {
        return <div>Ogłoszenie nie istnieje lub zostało usunięte</div>
    }

    if (announcementId && query.isFetching) {
        return <AnimatedLoader visible={true}/>
    }

    if (query.data && (query.data.user.id && auth.user && query.data.user.id !== auth.user.id)) {
        return <div>Nie możesz edytować tego ogłoszenia</div>
    }

    return <>
        <Helmet><title>Formularz ogłoszenia</title></Helmet>

        <MainForm
            exists={!!announcementId}
            state={form}
            handleFormChange={handleFormChange}
            updateForm={updateForm}
            handleSubmit={handleSubmit}
            animalFeatures={animalFeaturesQuery.data}
            animalTypes={animalTypesQuery.data}

            files={files}
            handleNewFile={handleNewFile}
            handleFileDelete={handleFileDelete}

            animalFeaturesState={animalFeaturesState}
            handleAnimalFeaturesChange={handleAnimalFeaturesChange}
        />
    </>
}

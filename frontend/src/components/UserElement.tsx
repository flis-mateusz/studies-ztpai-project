import {AvatarWithLoader} from "@components/AvatarWithLoader.tsx";
import {IUser, USER_ROLES} from "@/interfaces/IUser.ts";
import {Autocomplete, Chip, TextField} from "@mui/material";
import {useState} from "react";
import {useAxiosMutation} from "@hooks/useAxiosMutation.tsx";
import {IconButton} from "@components/IconButton.tsx";

interface Props {
    user: IUser
}

interface IPatch {
    roles: string[]
}

const AVAILABLE_ROLES = Object.values(USER_ROLES)

export const UserElement = (props: Props) => {
    const patchRolesMutation = useAxiosMutation<IPatch, IUser>(`/api/admin/users/${props.user.id}`, {
        method: 'PATCH',
        mutationOptions: {
            mutationKey: ['ADMIN_PATCH_ROLES', props.user.id]
        }
    })

    const fixedRoles = [USER_ROLES.ROLE_USER as string]

    const filterFixedRoles = (roles: string[]) => {
        return roles.filter(role => fixedRoles.indexOf(role) === -1)
    }

    const [value, setValue] = useState(
        [
            ...fixedRoles,
            ...props.user.roles ? filterFixedRoles(props.user.roles) : []
        ]
    )

    const handleChange = (newRoles: string[]) => {
        const roles = filterFixedRoles(newRoles)

        setValue([
            ...fixedRoles,
            ...roles,
        ])

        patchRolesMutation.mutate({
            roles: roles
        })
    }

    return <div className="user">
        <div className="user-info">
            <div className="flex-center gap-10 w100">
                <AvatarWithLoader isLoading={false} mediaObject={props.user.avatar}/>
                <div className="user-data">
                    <div>{props.user.name} {props.user.surname}</div>
                    <div>{props.user.email}</div>
                    <div>tel. {props.user.phone}</div>
                </div>
            </div>
            <Autocomplete
                multiple
                disabled={patchRolesMutation.isPending}
                limitTags={2}
                className={'min'}
                id="multiple-limit-tags"
                options={AVAILABLE_ROLES}
                value={value}
                onChange={(_event, newValue) => {
                    handleChange(newValue)
                }}
                renderInput={(params) => (
                    <TextField {...params} />
                )}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option}>
                            {option}
                        </li>
                    )
                }}
                renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                        <Chip
                            {...getTagProps({index})}
                            key={option}
                            label={option}
                            disabled={fixedRoles.indexOf(option) !== -1}
                        />
                    ))
                }}
                sx={{width: '100%'}}
            />
        </div>
        {
            patchRolesMutation.isPending ?
                <IconButton iconName={''} loading={true} className={'no-shadow top-right'}/> : null
        }
    </div>

}
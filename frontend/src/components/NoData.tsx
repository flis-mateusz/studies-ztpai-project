interface Props {
    text?: string
}

export const NoData = (props: Props) => {
    return <div className='no-data'>{
        props.text || 'Nie znaleziono danych spełniających podane kryteria'
    }</div>
}
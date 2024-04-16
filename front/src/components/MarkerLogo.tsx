interface Props {
    color: string
    content: string
    handler: Function
    index: string
    markerType: string
}

const MarkerLogo: React.FC<Props> = ({color, content, handler, index, markerType}) => {

    const classList = `rounded-full w-6 h-6 ${color} flex justify-center items-center hover:w-8 hover:h-8 hover:cursor-pointer`

    return (
        <div className={classList} onClick={() => handler(index, markerType)}>
            <p>{content}</p>
        </div>
    )
}

export default MarkerLogo
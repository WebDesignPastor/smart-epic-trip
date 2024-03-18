interface Props {
    color: string
    content: string
}

const MarkerLogo: React.FC<Props> = ({color, content}) => {

    const classList = `rounded-full w-5 h-5 ${color} flex justify-center items-center`

    return (
        <div className={classList}>
            <p>{content}</p>
        </div>
    )
}

export default MarkerLogo
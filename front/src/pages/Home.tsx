import { useState } from "react"
import { RootState } from "../redux/index"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addIssue } from "../slices/store"

const HomePage = () => {

    const dispatch = useDispatch()
    const issueList = useSelector((state: RootState) => state.issue.issues)
    const [textInput, setTextInput] = useState('')
    const handleTextInput = (e:any) => {
        setTextInput(e.target.value)
    }
    const handleClick = () => {
        dispatch(addIssue(textInput))
    }

    return (
        <div>
            <input onChange={handleTextInput} value={textInput} />
            <button onClick={handleClick} className="text-red-500">Submit</button>
            <div>
                {
                    issueList?.map((issue: string) => {
                        return(
                            <>
                                <span>{issue}</span>
                                <br/>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HomePage
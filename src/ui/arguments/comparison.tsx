import {Argument} from "../../models/FileInput";
import {FC} from "react";

interface GlobalLocalArgProps {
    globalArguments: Argument[]
}

const ArgumentComparison: FC<GlobalLocalArgProps> = ({globalArguments}) => {
    return (
        <div className='container'>
            <div className='text-center'>
                <h2>Global / Local arguments</h2>
            </div>
            <div className='row'>
                <div className='col-6 card'>
                    <h3>Global Arguments</h3>
                    {globalArguments.map((argument: Argument, index: number) => <div className='card-body'>
                        <h4 className='card-text'>{argument.text}</h4>
                        <span className='card-subtitle'>{argument.type}</span>
                    </div>)}
                </div>
                <div className='col-6 card'>
                    <h3>Local Arguments</h3>
                </div>
            </div>
        </div>
    )
}

export default ArgumentComparison;
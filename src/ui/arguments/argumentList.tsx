import {Argument} from "../../models/FileInput.ts";
import React from "react";

interface ArgumentListProps {
    argumentList: Argument[];
}

const ArgumentList: React.FC<ArgumentListProps> = ({argumentList}) => {
    return argumentList.map((arg, index) => <div className='card' key={`arg-${index}`}>
        <div className='card-body bg-body-secondary border-0' >
            <div className='card-text'>
                <h4>{arg.text}</h4>
                <p className='card-title fw-bold' style={{background: 'lightgoldenrodyellow'}}>{arg.type}</p>
                <p className='card-subtitle mt-1'>{arg.title}</p>
                {/*<p className='card-subtitle font-monospace'>({arg.start} - {arg.end})</p>*/}
            </div>
        </div>
    </div>)
}

export default ArgumentList
import {Argument, GlobalLocalInfo, ZoneLabel} from "../../models/FileInput";
import {FC, useState} from "react";

interface GlobalLocalArgProps {
    globalArguments: Argument[]
    globalZones: ZoneLabel[]
    globalLocalArgumentInfo: GlobalLocalInfo
}

interface LocalArgumentProps {
    localArguments: {argument: Argument, similarity: string}[];
}

const ArgumentComparison: FC<GlobalLocalArgProps> = ({globalArguments, globalZones, globalLocalArgumentInfo}) => {
    const [globalSelected, setGlobalSelected] = useState<boolean>(false)
    const [localInfo, setLocalInfo] = useState<{argument: Argument, similarity: string}[]>()

    const handleGlobalClick = (id: number) => {
        setGlobalSelected(true);
        setLocalInfo(globalLocalArgumentInfo[id]);
    }

    const getZoneColor = (label: string) => {
        let color = ''
        switch (label) {
            case 'METHODS':
                color = 'success';
                break;
            case 'CONCLUSIONS':
                color = 'primary';
                break;
            case 'RESULTS':
                color = 'danger';
                break;
            default:
                color = 'black';
                break;
        }

        return color;
    }

    return (
        <div className='container'>
            <div className='text-center mb-4'>
                <h2>Global / Local arguments</h2>
            </div>
            <div className='row'>
                <div className='col-5 card mx-3'>
                    <h3 className='text-primary'>Global Arguments</h3>
                    {/*{globalArguments.map((argument: Argument, index: number) =>*/}
                    {/*    <div className='card-body bg-body-secondary'>*/}
                    {/*        <h4 className='card-text'>{argument.text}</h4>*/}
                    {/*        <span className='card-subtitle'>{argument.type}</span>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {globalZones.map((zoneLabel: ZoneLabel, index: number) =>
                        <div className='card-body bg-body-secondary mb-3'>
                            <h5 className='card-text'>{zoneLabel.sentence}</h5>
                            <button className='btn btn-link' onClick={() => handleGlobalClick(index+1)}>
                                <span className={`card-subtitle text-${getZoneColor(zoneLabel.label)}`}>{zoneLabel.label}</span>
                            </button>
                        </div>
                    )}

                </div>
                <div className='col-5 card'>
                    <h3 className='text-warning'>Local Arguments</h3>
                    {globalSelected && localInfo ?  <LocalArgumentComp localArguments={localInfo} />
                        : <span className='text-center bg-body-tertiary'>No Global Argument Selected</span>}
                </div>
            </div>
        </div>
    )
}

const LocalArgumentComp: FC<LocalArgumentProps> = ({localArguments}) => {
    return localArguments.map((arg, index) =>
        <div className='card bg-light'>
            <div className='card-body'>
                <p>Zone Label: {arg.argument.zone}</p>
                <p>Argument Type: {arg.argument.type}</p>
                <p>Text: {arg.argument.text}</p>
                <p>Section: {arg.argument.title}</p>
                <p>Similarity: {arg.similarity}</p>
            </div>
        </div>
    )
}

export default ArgumentComparison;
import {Argument, GlobalLocalInfo, ZoneLabel} from "../../models/FileInput";
import {FC, useState} from "react";
import './arguments.css'

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
    const [selectedItem, setSelectedItem] = useState<number>();

    const handleGlobalClick = (id: number) => {
        setSelectedItem(id)
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
                        <div className={`card-body bg-body-secondary mb-3 global-zone ${selectedItem === index + 1 ? 'active' : ''} shadow-sm border-opacity-50`}>
                            <h5 className='card-text'>{zoneLabel.sentence}</h5>
                            <button className='btn btn-link no-link' onClick={() => handleGlobalClick(index+1)}>
                                {/*<span className={`card-subtitle text-${getZoneColor(zoneLabel.label)}`}>{zoneLabel.label}</span>*/}
                                <span className={`card-subtitle tag-${zoneLabel.label.toLowerCase()}`}>{zoneLabel.label}</span>
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
    localArguments.sort((curr,next) => parseFloat(next.similarity) - parseFloat(curr.similarity))

    if (localArguments.length === 0) {
        return <div className='text-center text-warning'>No Local Argument(s) Found.</div>
    }
    return localArguments.map((arg, index) =>
        <div className='card mb-2 box-shadow'>
            <div className='card-header local-zone-header'>
                <div className='card-title fw-semibold'>{arg.argument.title}</div>
                <span className='arg-tag'>{arg.argument.type}</span>
            </div>
            <div className='card-body'>
                <p className='card-text'>{arg.argument.text}</p>
            </div>
            <div className='card-footer local-zone-footer'>
                <span className={`tag-${arg.argument.zone.toLowerCase()}`}>{arg.argument.zone}</span>
                <span className='similarity-tag'>{arg.similarity}</span>
            </div>
        </div>
    )
}

export default ArgumentComparison;
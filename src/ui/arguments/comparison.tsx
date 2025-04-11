import {Argument, ZoneLabel} from "../../models/FileInput";
import {FC} from "react";

interface GlobalLocalArgProps {
    globalArguments: Argument[]
    globalZones: ZoneLabel[]
}

const ArgumentComparison: FC<GlobalLocalArgProps> = ({globalArguments, globalZones}) => {
    const getZoneColor = (label: string) => {
        let color = ''
        console.log(`label: ${label}`)
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
                            <span className={`card-subtitle text-${getZoneColor(zoneLabel.label)}`}>{zoneLabel.label}</span>
                        </div>
                    )}

                </div>
                <div className='col-5 card'>
                    <h3 className='text-warning'>Local Arguments</h3>
                </div>
            </div>
        </div>
    )
}

export default ArgumentComparison;
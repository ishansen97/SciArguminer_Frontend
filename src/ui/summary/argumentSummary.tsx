import {SummaryInfo} from "../../models/FileInput.ts";
import {FC} from "react";

interface ArgumentSummaryProps {
	argumentInfo: SummaryInfo;
	relations: SummaryInfo;
}

function getInfo(summaryInfo: SummaryInfo, title: string): JSX.Element  {
	return (
		<div className='card' key={title}>
			<div className='card-header bg-light'>
				<h3 className={`card-title text-${title === 'Arguments' ? 'success' : 'danger'}`}>{title}</h3>
			</div>
			<div className='card-body align-items-start'>
				{Object.keys(summaryInfo).map((item, _) => <div className='row'>
					{item === 'totalCount' && <span className='mt-2'></span>}
					<div key={`label-${title}-${item}`} className='col-8'>
						<span>{item === 'totalCount' ? 'total count' : item}</span>
					</div>
					<div key={`item-${title}-${item}`}  className='col-4'>
						<span>{summaryInfo[item]}</span>
					</div>
				</div>)}
			</div>
		</div>
	)
}

const ArgumentSummary: FC<ArgumentSummaryProps> = ({argumentInfo, relations}) => {
	return (
		<>
			{getInfo(argumentInfo, 'Arguments')}
			{getInfo(relations, 'Relations')}
		</>
	)
}

export default ArgumentSummary;
import {FC} from "react";

interface ReportProps {
	reportName: string;
	authorNames: string;
	setReportName: (name: string) => void;
	setAuthorName: (name: string) => void;
	onSave: (isSave: boolean) => void;
}

const SaveReport: FC<ReportProps> = ({reportName, authorNames, setReportName, setAuthorName, onSave}) => {
	return (
		<div className="container mt-2">
			<div className="mb-3">
				<label htmlFor="ReportName" className="form-label">Report Name</label>
				<input
					type="text"
					className="form-control"
					id="reportField"
					value={reportName}
					onChange={(e) => setReportName(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="AuthorNames" className="form-label">AuthorNames</label>
				<input
					type="text"
					className="form-control"
					id="authorField"
					value={authorNames}
					onChange={(e) => setAuthorName(e.target.value)}
				/>
			</div>

			<div className='mt-2 float-end d-flex gap-2'>
				<button type='button' className='btn btn-success' onClick={() => onSave(true)}>Save</button>
				<button type='button' className='btn btn-danger' onClick={() => onSave(false)}>Cancel</button>
			</div>
		</div>
	)
}

export default SaveReport;
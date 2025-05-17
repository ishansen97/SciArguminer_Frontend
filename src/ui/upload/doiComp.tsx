import React, {FC, useState} from "react";
import {DOIInputRequest, DOIInputResponse, DOIProcessRequest} from "../../models/DOIInput.ts";
import {DOIAPI} from "../../service/doiAPI.ts";
import RedLoader from '../../assets/images/red_loader.svg'
import pdfIcon from "../../assets/images/pdf-icon.svg";
import {FileInputResponse} from "../../models/FileInput.ts";
import {useNavigate} from "react-router-dom";

interface DoiCompProps {
	onDoiError: () => void;
}

const DoiComp: FC<DoiCompProps> = ({onDoiError}) => {
	const navigate = useNavigate();
	const [doiUrl, setDoiUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [doiResponse, setDOIResponse] = useState<DOIInputResponse | null>(null)

	const handleDoiEnter = async() => {
		const request: DOIInputRequest = {
			doiUrl: doiUrl
		}
		setLoading(true);
		const response: DOIInputResponse = await DOIAPI.getDoiFileInfo(request);
		setLoading(false);
		setDOIResponse(response)
	}

	const handleDoiProcess = async() => {
		const request: DOIProcessRequest = {
			fileName: doiResponse!.filePath
		}

		try {
			setLoading(true);
			setDOIResponse(null);
			const response: FileInputResponse = await DOIAPI.processDoiFile(request);
			if (response.status === 200) {
				navigateToArguments(response);
			}
			else {
				onDoiError();
			}
		} catch (error) {
			onDoiError();
		}
	}

	const navigateToArguments = (response: FileInputResponse) => {
		navigate('/arguments', {
		  state: {
			sections: response.sections,
			argumentList: response.arguments,
			relations: response.relations,
			summary: response.summary,
			globalArguments: response.globalArguments,
			globalZones: response.globalZones,
			globalLocalArgumentInfo: response.globalLocalArgumentInfo,
			globalLocalArgumentInfoSentences: response.globalLocalArgumentInfoSentences,
		  }
		})
	  }

	return (
		<div className='container'>
			<div className='form-group'>
				<label htmlFor="txtDOI" className='form-label'>Enter DOI Url</label>
				<input type="text"
					   id='txtDOI'
					   className='form-control'
					   placeholder="Enter DOI Url"
					   onChange={(e) => setDoiUrl(e.target.value)}
					   readOnly={doiResponse !== null}/>
				<button className='form-control mt-2 btn btn-primary'
						onClick={handleDoiEnter}
						disabled={doiResponse !== null}>Enter</button>
			</div>
			{/*loader*/}
			<div className='text-center'>
				{loading && <img src={RedLoader} alt="Loader"/>}
			</div>
			{!loading && doiResponse && <div className='row mt-4'>
				<div className='col-4'>
					<img src={pdfIcon} width='100' height='100' alt="PDF Logo"/>
				</div>
				<div className='col-8'>
					<p><span className='fw-bold'>Name:</span> {doiResponse && doiResponse.filePath}</p>
				</div>
			</div>}
			{!loading && doiResponse && <div className='row mt-4'>
				<div className='col-6'>
					<button className='btn btn-secondary'>Download</button>
				</div>
				<div className='col-6'>
					<button className='btn btn-success' onClick={handleDoiProcess}>Process</button>
				</div>
			</div>}
		</div>
	)
}

export default DoiComp;
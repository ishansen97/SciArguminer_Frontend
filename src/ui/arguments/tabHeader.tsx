import {useState} from "react";
import ArgumentResults from "./arguments.tsx";
import ArgumentRelations from "./relations.tsx";
import ArgumentComparison from "./comparison.tsx";
import ArgumentList from "./argumentList.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Summary} from "../../models/FileInput.ts";
import ArgumentSummary from "../summary/argumentSummary.tsx";
import {ReportApi} from "../../service/reportApi.ts";
import ReactModal from "../../common/modals/reactModal.tsx";
import SaveReport from "../prompts/saveReport.tsx";

type TabProps = {
    tabIndex?: number;
}

const SummaryData: Summary = {
    arguments: {totalCount: 12, background_claim: 3, own_claim: 6, data: 3},
    relations: {totalCount: 12, supports: 5, contradicts: 7},
};

const TabHeaders: React.FC<TabProps> = ({tabIndex}) => {
    // State to manage the selected tab index
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(tabIndex ?? 0);
    const [modalOpen, setModalOpen] = useState(false);
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [reportName, setReportName] = useState("");
    const [authorNames, setAuthorNames] = useState("");
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const location = useLocation();

    // const obj = {
    //     sections: [],
    //     argumentList: [],
    //     relations: [],
    //     summary: {}
    // }

    const { sections, argumentList, relations, summary, globalArguments, globalZones, globalLocalArgumentInfo } = location.state;
    // const { sections, argumentList, relations, summary } = obj;

    // Define the tab headings
    const tabs = ["Sections", "Arguments", "Relations", "Global / Local Arguments"];

    // Function to change the active tab
    const handleTabClick = (index: number) => {
        setSelectedTab(index);
    };

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }

    const handleSaveReport = async() => {
        const confirmation = confirm('Once you save the results, it will be publicly accessible. Are you sure you want to continue?');

        if (confirmation) {
            setSaveModalOpen(true);
        }
    }

    const handleDownloadReport = async() => {
        setButtonsDisabled(true);
        await ReportApi.downloadProcessedReport({
            reportName: '',
            authorNames: '',
            arguments: argumentList,
            relations: relations,
            summary: summary,
        })
        setButtonsDisabled(false);
    }

    const onSaveReport = async (shouldSave: boolean) => {
        if (shouldSave) {
            setButtonsDisabled(true);
            const response = await ReportApi.saveReport({
                reportName: reportName,
                authorNames: authorNames,
                arguments: argumentList,
                relations: relations,
                summary: summary,
            })

            if (response.status === 200) {
                setButtonsDisabled(false);
                navigate('/upload')
            }
        }

        setSaveModalOpen(false);
    }

    return (
        <div className='container'>
            <div className='text-center mt-2'>
                <h1>SciArguminer - Results</h1>
            </div>
            {/* Render Tab Buttons */}
            <nav style={{display: "flex", borderBottom: "2px solid #ccc"}}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        style={{
                            padding: "10px 20px",
                            cursor: "pointer",
                            backgroundColor: selectedTab === index ? "#007bff" : "#fff",
                            color: selectedTab === index ? "#fff" : "#000",
                            border: "none",
                            borderBottom: selectedTab === index ? "2px solid #007bff" : "none",
                        }}
                    >
                        {tab}
                    </button>
                ))}

            </nav>
            <nav className='text-center mt-3'>
                <button className='btn btn-success m-1' onClick={handleModalOpen}>View Summary</button>
                <button className='btn btn-primary m-1' onClick={handleSaveReport} disabled={buttonsDisabled}>Save Report</button>
                <button className='btn btn-secondary m-1' onClick={handleDownloadReport} disabled={buttonsDisabled}>Download Report</button>
                {/*<div className='btn-group'>*/}
                {/*</div>*/}
            </nav>

            {/* Render the content based on the active tab */}
            <div style={{padding: "10px"}}>
                {selectedTab === 0 && <ArgumentResults propSections={sections}/>}
                {selectedTab === 1 && <ArgumentList argumentList={argumentList}/>}
                {selectedTab === 2 && <ArgumentRelations relations={relations}/>}
                {selectedTab === 3 && <ArgumentComparison globalArguments={globalArguments}
                                                          globalZones={globalZones}
                                                          globalLocalArgumentInfo={globalLocalArgumentInfo}  />}
            </div>

            <ReactModal isOpen={modalOpen} title={'Argument Summary'} onClose={() => setModalOpen(false)}>
                <ArgumentSummary argumentInfo={summary.arguments} relations={summary.relations} zones={summary.zoneLabels} />
            </ReactModal>

            <ReactModal isOpen={saveModalOpen} title={'Save Report'} onClose={() => setSaveModalOpen(false)}>
                <SaveReport reportName={reportName}
                            authorNames={authorNames}
                            setReportName={setReportName}
                            setAuthorName={setAuthorNames}
                            onSave={onSaveReport}
                />
            </ReactModal>
        </div>
    )
}

// <h3 className="text-xl font-semibold mb-4">Summary</h3>
// <p className="text-gray-700">
//     This is the summary of the extracted argument structure.
// </p>
// <div className="mt-6 flex justify-end">
//     <button
//         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         onClick={() => setModalOpen(false)}
//     >
//         Close
//     </button>
// </div>

export default TabHeaders;
import {useState} from "react";
import ArgumentResults from "./arguments.tsx";
import ArgumentRelations from "./relations.tsx";
import ArgumentComparison from "./comparison.tsx";
import ArgumentList from "./argumentList.tsx";
import {useLocation} from "react-router-dom";

type TabProps = {
    tabIndex?: number;
}

const TabHeaders: React.FC<TabProps> = ({tabIndex}) => {
    // State to manage the selected tab index
  const [selectedTab, setSelectedTab] = useState(tabIndex ?? 0);
  const location = useLocation();
  const { sections, argumentList, relations } = location.state;

  // Define the tab headings
  const tabs = ["Sections", "Arguments", "Relations", "Global / Local Arguments"];

  // Function to change the active tab
  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

    return (
        <div className='container'>
            <div className='text-center'>
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

            {/* Render the content based on the active tab */}
            <div style={{padding: "20px"}}>
                {selectedTab === 0 && <ArgumentResults propSections={sections} />}
                {selectedTab === 1 && <ArgumentList argumentList={argumentList} />}
                {selectedTab === 2 && <ArgumentRelations relations={relations} />}
                {selectedTab === 3 && <ArgumentComparison/>}
            </div>
        </div>
    )
}

export default TabHeaders;
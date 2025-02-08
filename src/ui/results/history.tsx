import React, { useState } from "react";
import SortAscIcon from '../../assets/images/sort_asc.png'
import SortDescIcon from '../../assets/images/sort_desc.png'
import ReportIcon from '../../assets/images/business-report.png'

interface SampleResult {
    id: number;
    title: string;
    date: string
}

const PastResults: React.FC = () => {
  // Sample data
  const results: SampleResult[] = [
    { id: 1, title: "Result 1", date: "2025-01-01" },
    { id: 2, title: "Result 2", date: "2024-12-23" },
    { id: 3, title: "Result 3", date: "2024-12-20" },
    { id: 4, title: "Result 4", date: "2024-12-12" },
  ];
  // const results = []

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortIcon, setSortIcon] = useState(SortAscIcon);
  const [ascending, setAscending] = useState(false);
  const [items, setItems] = useState<SampleResult[]>(results)

  const handleSortIcon = () => {
      setAscending(!ascending);
      let predicate = null;
      if (ascending) {
          predicate = (a: SampleResult, b: SampleResult) => a.id - b.id
          setSortIcon(SortAscIcon)
      }
      else {
          predicate = (a: SampleResult, b: SampleResult) => b.id - a.id
          setSortIcon(SortDescIcon)
      }
      setItems(prevResults => prevResults.sort(predicate))
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 container">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-6 mt-4">View Past Results</h2>

      {/* Date Filter Section */}
      <div className="flex items-center justify-content-between gap-5 mb-6">
        <label className="text-gray-700">From</label>
        <input
          type="date"
          className="border border-gray-300 rounded p-2 mx-2"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label className="text-gray-700">To</label>
        <input
          type="date"
          className="border border-gray-300 rounded p-2 mx-2"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button className="ml-2 text-gray-200 hover:text-gray-800 float-end border-black" onClick={handleSortIcon}>
          {/*&#x2630; /!* Filter icon *!/*/}
            <img src={sortIcon} alt="Sort Icon" width='28px' height='28px'/>
        </button>
        <button className="bg-primary text-white mx-4 py-2 rounded float-end">
          Filter
        </button>
      </div>

      {/* Showing results count */}
      {items.length && <p className="text-center text-gray-600 mb-4">Showing {items.length} result(s)</p>}

      {/* Results List */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {items.map((result) => (
            <div key={result.id} className="card-body justify-between items-center p-4 border-bottom">
                <span className="fw-bold">
                  {result.title} <span className="text-gray-600">({result.date})</span>
                </span>
                {/* Centered Report Button */}
                <button
                    className="bg-white float-end border border-black p-2 flex items-center justify-center h-full flex-shrink-0">
                    <img src={ReportIcon} alt="Report icon" width="30px" height="30px"/>
                </button>
            </div>
        ))}
      </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
            <button className="px-3 py-1 bg-primary text-white rounded mr-2">{"<"}</button>
        <button className="px-3 py-1 bg-primary text-white rounded mx-1">1</button>
        <button className="px-3 py-1 bg-primary text-white rounded mx-1">2</button>
        <button className="px-3 py-1 bg-primary text-white rounded mx-1">3</button>
        <button className="px-3 py-1 bg-primary text-white rounded ml-2">{">"}</button>
      </div>
    </div>
  );
};

export default PastResults;

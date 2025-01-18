import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useLocation} from "react-router-dom";
import {Section} from "../../models/FileInput.ts"; // Ensure Bootstrap is installed in your project
// import "./upload_pdf.css"; // Replace with the correct path to your CSS file

// Define the types for the argument data
interface Argument {
  title: string;
  body: string;
  inferenced: string;
}

interface ArgumentResultsProps {
  propSections?: Argument[];
}

const ArgumentResults: React.FC<ArgumentResultsProps> = ({ propSections }) => {
    const location = useLocation();
    const { sections } = location.state;

    const resultArguments = propSections ?? sections;

    console.log(`sections: ${JSON.stringify(resultArguments)}`);
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Argument Results</h1>
      <div className="row">
        {resultArguments && resultArguments.map((argument: Section, index: number) => (
          <div className="col-md-6 col-12 mb-4" key={index}>
            <div className="card text-center">
              <h2 className="card-header">{argument.title}</h2>
              <div className="card-body">
                <div className="card-text">
                  <p className="text-center">{argument.body}</p>
                  {/*<p>Inference: {argument.inferenced}</p>*/}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArgumentResults;

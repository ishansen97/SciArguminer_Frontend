import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useLocation} from "react-router-dom";
import {Section, Argument as MainArgument} from "../../models/FileInput.ts";
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
    // const location = useLocation();
    // const { sections } = location.state;
    const sections: Argument[] = []
    const resultArguments = propSections ?? sections;
    // const resultArguments = SectionData;
  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Argument Results</h1>
      <div className="row">
        {resultArguments && resultArguments.map((argument: Section, index: number) => (
          <div className="col-md-6 col-12 mb-4 overflow-scroll" key={index} style={{height: '600px', width: '600px'}}>
            <div className="card text-center">
              <h2 className="card-header">{argument.title}</h2>
              <div className="card-body">
                <div className="card-text">
                  {/*<p className="text-center justify-content-evenly">{argument.body}</p>*/}
                  {/*<p className='text-center'>{argument.inferenced_text}</p>*/}
                    <p className='text-center'>{formatBodyWithStyles(argument.body, argument.arguments)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to process the body with styled spans
const formatBodyWithStyles = (
  body: string,
  argumentComps: MainArgument[]
): JSX.Element[] => {
  const fragments: JSX.Element[] = [];
  let currentIndex = 0;

  console.log(argumentComps)
  const validArgumentComps = argumentComps.filter(comp => comp.start > -1 && comp.end > -1)

  validArgumentComps.forEach(({ start, end, type }, index) => {
    // Capture the text before the current span
    if (currentIndex < start) {
      fragments.push(
        <span key={`text-${index}-before`}>
          {body.slice(currentIndex, start)}
        </span>
      );
    }

    const getStyle = () => {
      const trimmed_type = type.trim()
      if (trimmed_type === "background_claim") {
        return { color: "green", fontWeight: 'bold' }; // Green for background_claim
      }
      if (trimmed_type === "own_claim") return { color: "red", fontWeight: 'bold' }; // Yellow for own_claim
      if (trimmed_type === "data") return { color: "blue", fontWeight: 'bold' }; // Blue for data
      return {};
    }

    // Add the styled span
    fragments.push(
      <span className='ishan' key={`text-${index}-styled`} style={getStyle()} title={type}>
        {(start > -1 && end > -1) ? body.slice(start, end) : body}
      </span>
    );

    // Update the current index
    currentIndex = end;
  });

  // Capture any remaining text after the last styled span
  if (currentIndex < body.length) {
    fragments.push(
      <span key="text-after-last">
        {body.slice(currentIndex, body.length)}
      </span>
    );
  }

  return fragments;
};

export default ArgumentResults;

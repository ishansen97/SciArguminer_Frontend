import {Relation} from "../../models/FileInput.ts";
import React from "react";

interface RelationProps {
    relations: Relation[];
}

const ArgumentRelations: React.FC<RelationProps> = ({relations}) => {

    const getStyle = (function () {
      return function (type: string): { color?: string; fontWeight?: string } {
        const trimmedType = type.trim();

        return trimmedType === "supports"
          ? { color: "green", fontWeight: "bold" }
          : trimmedType === "contradicts"
          ? { color: "yellow", fontWeight: "bold" }
          : trimmedType === "semantically_same"
          ? { color: "blue", fontWeight: "bold" }
          : {}; // Default empty object
      };
    })();

    return <div>
        <h3 className='text-danger'>Relations</h3>
        {relations.map((relation, index) => (<div className='card' key={`relation-${index}`}>
            <div className='card-body bg-body-secondary'>
                <div className='card-text'>
                    <h4 style={getStyle(relation.relation)}>{relation.head.text}</h4>
                    <span className='card-subtitle'>{relation.relation}</span>
                    <p className='card-subtitle font-monospace'>({relation.tail.text})</p>
                </div>
            </div>
        </div>))}
    </div>
}

export default ArgumentRelations;
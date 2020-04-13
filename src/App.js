import React from "react";
import { CollapseTransition } from "./CollapseTransition";
import "./styles.css";

export default function App() {
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);

  const expandingBoxRef = React.useRef(null);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Column</th>
            <th>Column</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{ cursor: "pointer" }}
            onClick={() => setExpanded1(p => !p)}
          >
            <td>Data1</td>
            <td>Data2</td>
            <td>Data3</td>
          </tr>
          <ExpandableRow
            expanded={expanded1}
            expandingBoxRef={expandingBoxRef}
          />

          <tr
            style={{ cursor: "pointer" }}
            onClick={() => setExpanded2(p => !p)}
          >
            <td>Data1</td>
            <td>Data2</td>
            <td>Data3</td>
          </tr>
          <ExpandableRow
            expanded={expanded2}
            expandingBoxRef={expandingBoxRef}
          />

          <tr
            style={{ cursor: "pointer" }}
            onClick={() => setExpanded3(p => !p)}
          >
            <td>Data1</td>
            <td>Data2</td>
            <td>Data3</td>
          </tr>
          <ExpandableRow
            expanded={expanded3}
            expandingBoxRef={expandingBoxRef}
          />

          <tr
            style={{ cursor: "pointer" }}
            onClick={() => setExpanded4(p => !p)}
          >
            <td>Data1</td>
            <td>Data2</td>
            <td>Data3</td>
          </tr>
          <ExpandableRow
            expanded={expanded4}
            expandingBoxRef={expandingBoxRef}
          />
        </tbody>
      </table>
      <div ref={expandingBoxRef} className="expanding-box" />
    </div>
  );
}

function ExpandableRow({ expanded, expandingBoxRef }) {
  return (
    <tr className="child-row">
      <td colSpan="3" style={{ padding: 0 }}>
        <CollapseTransition
          expanded={expanded}
          onEnter={node => {
            const childRow = node.closest("tr");
            const clickedRow = childRow.previousElementSibling;
            const rect1 = clickedRow.getBoundingClientRect();
            const rect2 = childRow.getBoundingClientRect();

            expandingBoxRef.current.style.height =
              rect1.height + rect2.height + -1 + "px";
            expandingBoxRef.current.style.top = clickedRow.offsetTop + "px";
            expandingBoxRef.current.classList.add("expanding-box--animation");
          }}
          onExiting={() => {
            expandingBoxRef.current.classList.remove(
              "expanding-box--animation"
            );
          }}
        >
          <div
            style={{
              width: "100%",
              padding: 5,
              overflow: "hidden"
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                height: 70
              }}
            />
          </div>
        </CollapseTransition>
      </td>
    </tr>
  );
}

import React, { useState, useContext, useEffect, use } from "react";
import { FixedSizeList as List } from "react-window";
import { MyContext } from "@/context/context";
interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: { project: string; selected: boolean }[];
  onCheckboxChange: (name: string, checked: boolean) => void;
}

const Row: React.FC<RowProps> = ({ index, style, data, onCheckboxChange }) => {
  return (
    <div style={style} className="flex mx-auto items-center">
      <input
        type="checkbox"
        onChange={(e) =>
          onCheckboxChange(data[index].project, e.target.checked)
        }
        checked={data[index].selected}
        className="mr-2"
      />
      <p className="ms-1 text-xs text-slate-600 ">{data[index].project}</p>
    </div>
  );
};

export default function Projects() {
  const {
    projects,
    selectedprojects,
    setSelectedprojects,
   
  } = useContext(MyContext);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter streets based on search query
  const filteredProjects = projects.filter((project) =>
    project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemData = filteredProjects.map((project) => ({
    project,
    selected: selectedprojects.includes(project) ? true : false,
  }));

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (checked) {
      setSelectedprojects((prev) => [...prev, name]);
    } else {
      setSelectedprojects((prev) => prev.filter((name) => name !== name));
    }
  };

  return (

    <section className="overflow-hidden">
      <div className="h-full bg-white overflow-auto min-w-[150px]">
        <input
          type="text"
          className="mb-2 w-full h-3 border-0 rounded-none focus:outline-none px-3 py-1 text-sm"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="pb-1 px-2 text-xsm">
          <List
            height={220}
            itemCount={itemData.length}
            itemSize={40}
            width="100%"
            itemData={itemData} // Pass combined data to the Row component
          >
            {(props) => (
              <Row {...props} onCheckboxChange={handleCheckboxChange} />
            )}
          </List>
        </div>
      </div>
    </section>
  );
}

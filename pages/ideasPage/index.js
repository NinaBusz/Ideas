import { useState, useEffect, useRef } from "react";
import IdeasList from "../../components/IdeasList";

export default function IdeasPage({ projects, handleProjects }) {
  const [ideas, setIdeas] = useState([]);
  const [isMovingIdea, setIsMovingIdea] = useState(false);
  const [selectedProjectForIdea, setSelectedProjectForIdea] = useState("");
  const initialRender = useRef(true);

  useEffect(() => {
    const savedIdeas = JSON.parse(localStorage.getItem("ideasData"));
    if (savedIdeas) {
      setIdeas(savedIdeas);
    }
  }, []);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem("ideasData", JSON.stringify(ideas));
  }, [ideas]);

  const deleteIdea = (id) => {
    const savedIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(savedIdeas);
  };

  const handleMoveIdeaToggle = (id) => {
    setIsMovingIdea((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleSelectedProjectForIdea = (projectID) => {
    setSelectedProjectForIdea(projectID);
  };
  const handleAddIdeaToProject = (idea) => {
    if (selectedProjectForIdea) {
      const updatedProjects = projects.map((project) => {
        if (project.id === selectedProjectForIdea) {
          const updatedProject = { ...project };
          if (updatedProject.ideas) {
            updatedProject.ideas = [...updatedProject.ideas, idea];
          } else {
            updatedProject.ideas = [idea];
          }
          return updatedProject;
        } else {
          return project;
        }
      });
      handleProjects(updatedProjects);
      setSelectedProjectForIdea("");
      setIsMovingIdea(false);
      localStorage.setItem("projectsData", JSON.stringify(updatedProjects));
    }
  };

  return (
    <IdeasList
      ideas={ideas}
      projects={projects}
      isMovingIdea={isMovingIdea}
      handleDeleteIdea={deleteIdea}
      handleMoveIdeaToggle={handleMoveIdeaToggle}
      selectedProjectForIdea={selectedProjectForIdea}
      handleSelectedProjectForIdea={handleSelectedProjectForIdea}
      handleAddIdeaToProject={handleAddIdeaToProject}
    />
  );
}

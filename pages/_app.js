import GlobalStyle from "../styles";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const initialRender = useRef(true);

  useEffect(() => {
    const projectsFromLocalStorage = JSON.parse(
      localStorage.getItem("projects")
    );
    if (projectsFromLocalStorage) {
      setProjects(projectsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = () => {
    const newProject = {
      id: nanoid(),
      title: "Neues Projekt",
      src: "https://images2.imgbox.com/02/af/4KCd8NDB_o.png",
      description: "",
      ideas: [],
    };

    setProjects([...projects, newProject]);
  };

  const handleProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem("projects", JSON.stringify(newProjects));
  };

  const handleDeleteProject = (id) => {
    handleProjects(projects.filter((project) => project.id !== id));
  };

  const handleSaveProject = (updatedProject) => {
    const allowedWebsites = [
      "images.pexels.com/*",
      "images.unsplash.com/*",
      "media.istockphoto.com/*",
      "images2.imgbox.com/*",
      "thumbs2.imgbox.com/*",
    ];
    const regex = new RegExp(
      `^(https?:\\/\\/)?(www\\.)?(${allowedWebsites.join("|")})`,
      "i"
    );

    if (!regex.test(updatedProject.src)) {
      alert(
        "Invalid image URL. Please enter an URL from the allowed websites. If you uploaded your image on imgbox.com, please right click on the image and copy/paste the image-link!"
      );
      return;
    }

    const newProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(newProjects);
    localStorage.setItem("projects", JSON.stringify(newProjects));
    router.push("/projects");
  };

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Ideas App</title>
      </Head>
      <StyledHeader>
        <Heading />
        <Navbar />
      </StyledHeader>
      <Component
        {...pageProps}
        projects={projects}
        handleProjects={handleProjects}
        handleCreateProject={handleCreateProject}
        handleDeleteProject={handleDeleteProject}
        handleSaveProject={handleSaveProject}
      />
      <StyledFooter />
    </>
  );
}
const StyledHeader = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledFooter = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  color: white;
`;

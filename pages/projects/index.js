import Link from "next/link";
import Image from "next/image";

export default function Projekte({ projects, handleCreateProject }) {
  return (
    <section>
      <ul className="projectsarea">
        {projects.map((project) => (
          <li key={project.id}>
            <article>
              <Link href={`/projects/${project.id}`}>
                <Image
                  width="200"
                  height="200"
                  style={{
                    objectFit: "cover",
                  }}
                  src={project.src ? project.src : placeholder}
                  alt="Projekt-Vorschau-Bild"
                  className="projectsarea__listObject"
                ></Image>
              </Link>
              <h2>{project.title}</h2>
            </article>
          </li>
        ))}
        <li>
          <article>
            <button
              className="projects__newButton"
              type="submit"
              onClick={() => handleCreateProject()}
            >
              Neues Projekt erstellen!
            </button>
          </article>
        </li>
      </ul>
    </section>
  );
}
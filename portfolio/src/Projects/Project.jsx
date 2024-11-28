"use client"; 
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./projectSlider.css"


export default function ClientSideProjects({project, index, activeProject}) {
  const router = useRouter();

  const handleProjectClick = (slug) => {
    router.push(`/project/${slug}`);
  };

  return (
        <div
            key={index}
            className="item">
            <div className="sideContent">
                <Image className="sideContentImage" src={project.image} alt={project.title} width={100} height={100} />
                <h3 className="sideContentTitle">{project.title}</h3>
            </div>
            {project.title == activeProject ?
            <div className="content">
                <div className="imageContainer">
                    <Image src={project.image} alt={project.title} height={700} width={400} priority/>
                </div>
                <h3>{project.title}</h3>
                <p onClick={() => handleProjectClick(project.slug)}>Learn More</p>
                <div className="technologies">
                    {project.technologies.map((tech, idx) => (
                    <span key={idx} style={{ color: tech.color }}>
                        {tech.icon}
                    </span>
                    ))}
                </div>
            </div> : false}
        </div>
  );
}

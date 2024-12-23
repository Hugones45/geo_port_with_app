import { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles"
import { experiences } from "../constants"
import { SectionWrapper } from "../hoc"
import { textVariant } from "../utils/motion";
import { certificates } from "../constants"
import CertificateCard from "./CertificateCard";


const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      data={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[73%] h-[73%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p className="text-secondary text-[16px]" style={{ margin: 0 }}>{experience.company_name}</p>
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((item, index) =>
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {item}
            </li>
          )}

        </ul>
      </div>


    </VerticalTimelineElement>
  )
}

const Experience = () => {

  const [language, setLanguage] = useState('en');

  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleDownload = () => {
    const resumePath = language === 'en' ? '/resume/Curriculum Vitae - Hugo Morais.pdf' : '/resume/Curriculum Vitae - Hugo Morais pt.pdf';

    const link = document.createElement('a');
    link.href = resumePath;

    link.download = `Curriculum Vitae - Hugo Morais ${language.toUpperCase()}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Professional Experience</h2>
      </motion.div>

      <motion.div
        variants={textVariant()}
        className="inline-flex gap-14 border-2 border-white p-4 mt-2 rounded"
      >
        <div className="flex gap-3 flex-col items-center mr-[-15px] ml-6">
          <p>Choose the language</p>

          <select value={language} onChange={(e) => handleChangeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
          </select>

        </div >


        <button
          style={{
            marginRight: '30px',
            fontSize: '20px',
            cursor: 'pointer',
            border: 'solid 1px #fff',
            padding: '0px 10px',
            marginBottom: '10px',
            borderRadius: '10px'
          }}
          onClick={handleDownload}
          className="hover:bg-blue-600 hover:text-white"
        >Download Resume</button>
      </motion.div>

      {/* <div className="flex flex-row flex-wrap gap-6 mt-10">
        {certificates.map((certificate, index) => (
          <CertificateCard key={index} certificate={certificate} />
        ))}
      </div> */}

      <div className="mt-20 flex flex-col">

        <VerticalTimeline>
          {experiences.map((item, index) =>
            <ExperienceCard key={index} experience={item} />
          )}

        </VerticalTimeline>


      </div>
    </>
  )
}

export default SectionWrapper(Experience, "experience")
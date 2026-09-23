import React from 'react';
import './skillscomponent.css';
import { useLanguage } from '../../i18n/LanguageContext';
import useReveal from '../../hooks/useReveal';

const workflow = [
    { number: '01', key: 'structure', tools: ['HTML5', 'CSS3'], className: 'workflow-foundation' },
    { number: '02', key: 'interface', tools: ['JavaScript', 'React', 'C++'], className: 'workflow-interface' },
    { number: '03', key: 'platforms', tools: ['WordPress'], className: 'workflow-platforms' },
    { number: '04', key: 'automation', tools: ['Python', 'Claude Code'], className: 'workflow-automation' },
];

const SkillsComponent = () => {
    const { t } = useLanguage();
    const headRef = useReveal();
    const workflowRef = useReveal({ threshold: 0.12 });

    return (
        <section className="skills-container" id="Competences">
            <div className="skills-head reveal-on-scroll" ref={headRef}>
                <span className="workflow-kicker">{t.skills.kicker}</span>
                <h2 className="section-title">{t.skills.title}</h2>
                <p className="section-subtitle">{t.skills.subtitle}</p>
            </div>

            <div className="workflow-track reveal-on-scroll" ref={workflowRef}>
                <div className="workflow-connector" aria-hidden="true"><span /></div>
                {workflow.map((stage) => (
                    <article className={`workflow-stage ${stage.className}`} key={stage.key}>
                        <div className="workflow-stage-heading">
                            <span className="workflow-number">{stage.number}</span>
                            <h3>{t.skills.stages[stage.key]}</h3>
                        </div>
                        <div className="workflow-tools">
                            {stage.tools.map((tool) => <span className="workflow-tool" key={tool}>{tool}</span>)}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default SkillsComponent;

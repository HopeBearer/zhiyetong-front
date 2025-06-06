import React, { useState } from 'react';
import ResumeEvaluation from '../components/resume/ResumeEvaluation';
import ResumeGeneration from '../components/resume/ResumeGeneration';
import '../styles/Resume.css';

const ResumePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'evaluation' | 'generation'>('evaluation');

  return (
    <div className="resume-page container mx-auto px-4 py-12">
      <h1 className="muzli-hero-title text-center mb-4">AI简历助手</h1>
      <p className="muzli-hero-desc text-center mb-8">智能分析简历，定制专业改进建议，助力求职成功</p>
      
      <div className="resume-tab-navigation flex justify-center mb-6">
        <button 
          className={`resume-tab-btn ${activeTab === 'evaluation' ? 'active' : ''}`}
          onClick={() => setActiveTab('evaluation')}
        >
          简历评价与优化
        </button>
        <button 
          className={`resume-tab-btn ${activeTab === 'generation' ? 'active' : ''}`}
          onClick={() => setActiveTab('generation')}
        >
          AI生成简历
        </button>
      </div>
      
      <div className="resume-tab-content">
        {activeTab === 'evaluation' ? <ResumeEvaluation /> : <ResumeGeneration />}
      </div>
    </div>
  );
};

export default ResumePage; 
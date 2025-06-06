import React, { useState } from 'react';
import { marked } from 'marked';

// 简化处理方式，使用marked的选项而不是自定义渲染器
const ResumeEvaluation: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFeedback(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    try {
      // 示例代码，实际实现中应替换为API调用
      // 模拟文件上传和AI分析过程
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // 模拟AI分析过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 使用结构化的Markdown格式，确保布局清晰
      setFeedback(`
## 简历评价结果

### 整体印象

您的简历整体结构清晰，但内容可以更加精炼和有针对性。

### 优势

- 教育背景陈述简洁明了
- 技能列表全面
- 项目经历描述详细

### 需要改进的地方

- 个人介绍部分过于冗长，建议控制在3-5行内
- 工作经历缺乏量化的成果展示
- 技术栈部分可以更有层次感，按熟练程度分类

### 改进建议

1. 为每段工作/项目经历添加具体的成果数据
2. 精简个人介绍，突出最相关的技能和特点
3. 调整排版，增加留白，提高可读性
4. 针对目标职位定制关键词
      `);
      
      setIsAnalyzing(false);
    } catch (error) {
      console.error('上传或分析过程中出错:', error);
      setIsUploading(false);
      setIsAnalyzing(false);
      setFeedback('很抱歉，处理您的简历时出现错误，请稍后再试。');
    }
  };

  return (
    <div className="resume-evaluation">
      <div className="text-center mb-8">
        <h2 className="resume-section-title">简历评价与优化建议</h2>
        <p className="resume-section-subtitle">上传您的简历，AI将分析并提供专业的改进建议</p>
      </div>

      <div className="upload-resume-container">
        <form onSubmit={handleSubmit} className="resume-form">
          <div className="file-upload-container text-center">
            <input
              type="file"
              id="resume-file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="custom-file-input"
            />
            <label 
              htmlFor="resume-file"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <div className="upload-text">
                <p className="text-lg font-medium text-gray-700">点击或拖拽上传简历</p>
                <p className="text-sm text-gray-500 mt-1">支持 PDF, DOC, DOCX 格式</p>
              </div>
            </label>
            {file && (
              <div className="selected-file">
                已选择文件: <span className="font-medium">{file.name}</span>
              </div>
            )}
          </div>

          <div className="button-container">
            <button
              type="submit"
              disabled={!file || isUploading || isAnalyzing}
              className={`resume-btn ${
                !file || isUploading || isAnalyzing ? 'disabled' : ''
              }`}
            >
              {isUploading ? '上传中...' : isAnalyzing ? '正在分析...' : '获取评价与建议'}
            </button>
          </div>
        </form>
      </div>

      {feedback && (
        <div className="feedback-container">
          <div className="feedback-wrapper">
            <h3 className="feedback-title">AI评价结果</h3>
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: marked(feedback) }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeEvaluation; 
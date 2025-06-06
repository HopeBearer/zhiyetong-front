import React, { useState } from 'react';
import { marked } from 'marked'; // 需要安装marked依赖

type FormFields = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  objective: string;
  education: string;
  workExperience: string;
  projects: string;
  skills: string;
  blogUrl: string;
  githubUrl: string;
  additionalInfo: string;
  gender: string;
  birthYear: string;
};

const initialFormState: FormFields = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  objective: '',
  education: '',
  workExperience: '',
  projects: '',
  skills: '',
  blogUrl: '',
  githubUrl: '',
  additionalInfo: '',
  gender: '',
  birthYear: '',
};

// 示例数据
const sampleData: FormFields = {
  fullName: '庄义普',
  email: '2754375139@qq.com',
  phone: '17803803708',
  location: '河南省洛阳市',
  objective: '在学校期间担任团支书，有较好的团队协作能力和沟通能力。在2024年开始接触前端，对编程保持热情。',
  education: '河南科技学院/计算机科学与技术\n本科/2026年毕业/团员',
  workExperience: `暂无工作经验`,
  projects: `**记账App**\nVue2.0  axios  Element\n- 负责页面构建、登录注册、记账等主要逻辑。\n- 采用了ES6+的语法，采用axios请求统一处理。\n- 基于localStorage的缓存组件开发，可以设置有效时长，适用于Webapp。\n- 开发Loading，Alert，Confirm等组件。`,
  skills: `- 熟练掌握HTML/CSS，能够编写语义化HTML和响应式布局，熟悉 CSS 预处理器（如 Sass）。\n- 熟练掌握JavaScript，熟练运用 ES6+的特性，理解原型链、异步编程等核心机制。能够使用 TypeScript进行类型标注、规范代码结构，提升代码可读性和可维护性。\n- 熟练掌握 Vue2、Vue3框架，熟悉组件化开发、组件通信、Vuex/Pinia状态管理、Router路由、生命周期等。\n- 熟练使用 Git，能够进行版本回退、分支管理、代码冲突解决，熟悉gitflow工作流程。\n- 熟悉构建工具，掌握 Vite 和 Webpack 打包工具使用。\n- 了解jQuery语法以及BootStrap框架。\n- 了解node语法与npm的基本使用。`,
  blogUrl: 'https://blog.csdn.net/qq_74114417',
  githubUrl: 'https://github.com/hua1995116',
  additionalInfo: '',
  gender: '男',
  birthYear: '2004.06',
};

const ResumeGeneration: React.FC = () => {
  const [formData, setFormData] = useState<FormFields>(initialFormState);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<'preview' | 'markdown'>('preview');
  const [resumeHtml, setResumeHtml] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fillSampleData = () => {
    setFormData(sampleData);
  };

  const generateModernResume = (data: FormFields) => {
    const personalInfo = `${data.fullName}/${data.gender || ''}${data.birthYear ? '/' + data.birthYear : ''}`;
    
    // 创建HTML模板
    return `
      <div class="modern-resume">
        <header class="resume-header">
          <div class="header-main">
            <h1>${data.fullName} - 前端开发</h1>
            <div class="header-line"></div>
            <div class="personal-info">
              <div class="info-left">
                <p>${personalInfo}</p>
                <p>${data.education.split('\n')[0]}</p>
                <p>${data.education.split('\n')[1] || ''}</p>
              </div>
              <div class="info-right">
                ${data.blogUrl ? `<p><span class="icon">○</span> <a href="${data.blogUrl}" target="_blank">${data.blogUrl}</a></p>` : ''}
                ${data.githubUrl ? `<p><span class="icon">○</span> <a href="${data.githubUrl}" target="_blank">${data.githubUrl}</a></p>` : ''}
                ${data.email ? `<p><span class="icon">✉</span> ${data.email}</p>` : ''}
                ${data.phone ? `<p><span class="icon">☎</span> ${data.phone}</p>` : ''}
              </div>
            </div>
          </div>
        </header>
        
        <main class="resume-content">
          <section class="resume-section">
            <div class="section-title">介绍</div>
            <div class="section-content">
              <p>${data.objective}</p>
            </div>
          </section>
          
          ${data.projects ? `
          <section class="resume-section">
            <div class="section-title">项目</div>
            <div class="section-content">
              ${marked(data.projects)}
            </div>
          </section>
          ` : ''}
          
          ${data.skills ? `
          <section class="resume-section">
            <div class="section-title">技能</div>
            <div class="section-content">
              ${marked(data.skills)}
            </div>
          </section>
          ` : ''}
          
          ${data.workExperience && data.workExperience !== '暂无工作经验' ? `
          <section class="resume-section">
            <div class="section-title">工作经历</div>
            <div class="section-content">
              ${marked(data.workExperience)}
            </div>
          </section>
          ` : ''}
          
          ${data.additionalInfo ? `
          <section class="resume-section">
            <div class="section-title">其他信息</div>
            <div class="section-content">
              ${marked(data.additionalInfo)}
            </div>
          </section>
          ` : ''}
        </main>
      </div>
    `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // 示例代码，实际实现中应替换为API调用
      // 模拟AI生成简历过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 生成Markdown格式简历
      const markdownResume = `
# ${formData.fullName} - 前端开发

${formData.fullName}/${formData.gender || ''}${formData.birthYear ? '/' + formData.birthYear : ''}
${formData.education.split('\n')[0]}
${formData.education.split('\n')[1] || ''}

${formData.blogUrl ? `博客: ${formData.blogUrl}` : ''}
${formData.githubUrl ? `GitHub: ${formData.githubUrl}` : ''}
${formData.email ? `邮箱: ${formData.email}` : ''}
${formData.phone ? `电话: ${formData.phone}` : ''}

## 介绍
${formData.objective}

## 项目
${formData.projects}

## 技能
${formData.skills}

${formData.workExperience && formData.workExperience !== '暂无工作经验' ? `## 工作经历\n${formData.workExperience}` : ''}

${formData.additionalInfo ? `## 其他信息\n${formData.additionalInfo}` : ''}
      `;
      
      // 生成HTML格式简历
      const htmlResume = generateModernResume(formData);
      
      setGeneratedResume(markdownResume);
      setResumeHtml(htmlResume);
      setIsGenerating(false);
    } catch (error) {
      console.error('生成简历过程中出错:', error);
      setIsGenerating(false);
      alert('生成简历时出现错误，请稍后再试');
    }
  };

  const handleDownload = () => {
    if (!generatedResume) return;
    
    const blob = new Blob([generatedResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName || 'generated'}_resume.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleHtmlDownload = () => {
    if (!resumeHtml) return;
    
    // 添加CSS样式到HTML文件
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${formData.fullName}的简历</title>
        <style>
          body {
            font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
          }
          .modern-resume {
            max-width: 800px;
            margin: 20px auto;
            background-color: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .resume-header {
            background-color: #333;
            color: white;
            padding: 30px;
          }
          .header-main h1 {
            margin: 0 0 20px;
            font-size: 28px;
            font-weight: 600;
          }
          .header-line {
            height: 2px;
            background-color: #ccc;
            margin-bottom: 20px;
          }
          .personal-info {
            display: flex;
            justify-content: space-between;
          }
          .info-left, .info-right {
            flex: 1;
          }
          .info-right {
            text-align: right;
          }
          .personal-info p {
            margin: 8px 0;
          }
          .personal-info a {
            color: white;
            text-decoration: none;
          }
          .personal-info a:hover {
            text-decoration: underline;
          }
          .resume-content {
            padding: 20px 30px;
          }
          .resume-section {
            margin-bottom: 25px;
            position: relative;
          }
          .section-title {
            text-align: center;
            background-color: #f0f0f0;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 20px;
            font-weight: 600;
          }
          .section-content {
            padding: 0 10px;
          }
          .section-content p {
            margin: 8px 0;
            line-height: 1.6;
          }
          .section-content ul {
            margin: 8px 0;
            padding-left: 20px;
          }
          .section-content li {
            margin-bottom: 8px;
            list-style-type: square;
          }
          .icon {
            margin-right: 5px;
          }
          strong {
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        ${resumeHtml}
      </body>
      </html>
    `;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName || 'generated'}_resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="resume-generation">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">AI生成简历</h2>
        <p className="text-gray-600">填写您的信息，AI将为您生成专业的简历</p>
      </div>

      {!generatedResume ? (
        <form onSubmit={handleSubmit} className="resume-form space-y-6">
          <div className="flex justify-end mb-4">
            <button 
              type="button" 
              onClick={fillSampleData} 
              className="sample-data-btn"
            >
              填充示例数据
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1">
                姓名
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="例如：张三"
                required
              />
            </div>

            <div>
              <label className="block mb-1">
                邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="例如：example@email.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1">
                电话
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="例如：138XXXXXXXX"
              />
            </div>

            <div>
              <label className="block mb-1">
                所在地
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="例如：北京市"
              />
            </div>

            <div>
              <label className="block mb-1">
                性别
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="例如：男/女"
              />
            </div>

            <div>
              <label className="block mb-1">
                出生年份
              </label>
              <input
                type="text"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                placeholder="例如：1995.01"
              />
            </div>

            <div>
              <label className="block mb-1">
                个人博客
              </label>
              <input
                type="url"
                name="blogUrl"
                value={formData.blogUrl}
                onChange={handleChange}
                placeholder="博客网址（可选）"
              />
            </div>

            <div>
              <label className="block mb-1">
                GitHub
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="GitHub 网址（可选）"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">
              个人简介
            </label>
            <textarea
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              rows={3}
              placeholder="简要描述您的专业背景和能力"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              教育背景
            </label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows={3}
              placeholder="例如：学校名称/专业名称&#10;本科/毕业年份/其他信息"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              项目经验
            </label>
            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              rows={5}
              placeholder="详细描述您参与的项目，包括项目名称、技术栈、职责和成就&#10;支持Markdown格式"
            />
          </div>

          <div>
            <label className="block mb-1">
              技术技能
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={5}
              placeholder="列出您掌握的技术技能，如编程语言、框架、工具等&#10;支持Markdown格式的列表"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              工作经历
            </label>
            <textarea
              name="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
              rows={5}
              placeholder="详细描述您的工作经历，包括公司、职位、时间段、职责和成就&#10;支持Markdown格式"
            />
          </div>

          <div>
            <label className="block mb-1">
              额外信息
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
              placeholder="其他想要补充的信息"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className={`resume-btn ${isGenerating ? 'disabled' : ''}`}
          >
            {isGenerating ? '正在生成...' : '生成简历'}
          </button>
        </form>
      ) : (
        <div className="generated-resume">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">生成的简历</h3>
            <div className="flex">
              <button
                onClick={() => setGeneratedResume(null)}
                className="return-btn mr-2"
              >
                返回编辑
              </button>
              <button
                onClick={handleHtmlDownload}
                className="download-btn mr-2"
              >
                下载简历 (HTML)
              </button>
              <button
                onClick={handleDownload}
                className="download-btn"
              >
                下载简历 (Markdown)
              </button>
            </div>
          </div>
          
          <div className="resume-preview-tabs flex mb-4">
            <button 
              className={`resume-preview-tab ${activePreviewTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActivePreviewTab('preview')}
            >
              简历预览
            </button>
            <button 
              className={`resume-preview-tab ${activePreviewTab === 'markdown' ? 'active' : ''}`}
              onClick={() => setActivePreviewTab('markdown')}
            >
              Markdown源码
            </button>
          </div>
          
          {activePreviewTab === 'preview' ? (
            <div className="modern-resume-preview">
              <div 
                className="resume-html-preview"
                dangerouslySetInnerHTML={{ __html: resumeHtml }}
              />
            </div>
          ) : (
            <div className="markdown-preview">
              <pre className="resume-markdown-code">
                {generatedResume}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeGeneration; 
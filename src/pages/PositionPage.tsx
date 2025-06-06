import React, { useState, useEffect } from 'react';
import '../styles/Position.css';

interface Position {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchRate: number;
  requirements: string[];
  description: string;
  logo: string;
}

const PositionPage: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile] = useState({
    skills: ['React', 'TypeScript', 'Node.js', '前端开发', 'UI设计'],
    interests: ['互联网', '产品设计', '用户体验'],
    testResults: {
      technical: 85,
      communication: 92,
      problemSolving: 88
    }
  });

  useEffect(() => {
    // 模拟从API获取数据
    const fetchPositions = async () => {
      setLoading(true);
      try {
        // 这里应该是真实的API调用
        // 模拟API响应
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockPositions: Position[] = [
          {
            id: 1,
            title: '高级前端开发工程师',
            company: '腾讯科技',
            location: '深圳',
            salary: '25K-35K',
            matchRate: 95,
            requirements: ['React', 'TypeScript', 'Redux', '3年以上经验'],
            description: '负责公司核心产品的前端开发，优化用户体验，提升产品性能。',
            logo: 'https://img.alicdn.com/tfs/TB1_ZXuNcfpK1RjSZFOXXa6nFXa-492-154.jpg'
          },
          {
            id: 2,
            title: '资深UI/UX设计师',
            company: '阿里巴巴',
            location: '杭州',
            salary: '30K-40K',
            matchRate: 88,
            requirements: ['UI设计', 'Figma', 'Adobe XD', '用户研究'],
            description: '参与产品从概念到发布的整个设计过程，创造优秀的用户体验。',
            logo: 'https://img.alicdn.com/tfs/TB1XZXuNcfpK1RjSZFOXXa6nFXa-492-154.jpg'
          },
          {
            id: 3,
            title: '产品经理',
            company: '字节跳动',
            location: '北京',
            salary: '25K-40K',
            matchRate: 82,
            requirements: ['产品设计', '用户研究', '数据分析', 'B端产品经验'],
            description: '负责公司核心产品的规划和设计，推动产品的持续优化和创新。',
            logo: 'https://sf3-ttcdn-tos.pstatp.com/img/ttfe/0/7a55306954074cef9ce31de1c5c953d6~noop.image'
          },
          {
            id: 4,
            title: '全栈开发工程师',
            company: '百度',
            location: '上海',
            salary: '30K-45K',
            matchRate: 78,
            requirements: ['Node.js', 'React', 'MongoDB', 'DevOps'],
            description: '负责公司核心系统的全栈开发，参与架构设计和技术选型。',
            logo: 'https://www.baidu.com/img/flexible/logo/pc/result.png'
          },
          {
            id: 5,
            title: '前端架构师',
            company: '华为',
            location: '深圳',
            salary: '40K-60K',
            matchRate: 75,
            requirements: ['前端架构设计', 'React', 'Node.js', '微前端'],
            description: '负责公司前端架构设计与规划，制定技术标准和最佳实践。',
            logo: 'https://www-file.huawei.com/-/media/corporate/images/home/logo/huawei_logo.png'
          }
        ];
        
        setPositions(mockPositions);
      } catch (error) {
        console.error('获取岗位数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const renderMatchRate = (rate: number) => {
    const color = rate > 90 ? '#10b981' : rate > 80 ? '#3b82f6' : rate > 70 ? '#f59e0b' : '#ef4444';
    
    return (
      <div className="match-rate-container">
        <div className="match-rate-circle" style={{ background: `conic-gradient(${color} ${rate}%, #f3f4f6 0)` }}>
          <div className="match-rate-inner">
            <span>{rate}%</span>
          </div>
        </div>
        <span className="match-label">匹配度</span>
      </div>
    );
  };

  return (
    <div className="position-page">
      <div className="position-header">
        <h1 className="position-title">个性化岗位推荐</h1>
        <p className="position-subtitle">基于您的技能、测试结果和兴趣，为您推荐最匹配的岗位</p>
      </div>

      <div className="position-user-profile">
        <h2>您的个人画像</h2>
        <div className="profile-cards">
          <div className="profile-card">
            <h3>技能标签</h3>
            <div className="skill-tags">
              {userProfile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="profile-card">
            <h3>兴趣方向</h3>
            <div className="interest-tags">
              {userProfile.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>
          <div className="profile-card">
            <h3>能力评估</h3>
            <div className="test-results">
              <div className="test-result-item">
                <span className="result-label">技术能力</span>
                <div className="result-bar-container">
                  <div className="result-bar" style={{ width: `${userProfile.testResults.technical}%`, backgroundColor: '#3b82f6' }}></div>
                </div>
                <span className="result-value">{userProfile.testResults.technical}</span>
              </div>
              <div className="test-result-item">
                <span className="result-label">沟通能力</span>
                <div className="result-bar-container">
                  <div className="result-bar" style={{ width: `${userProfile.testResults.communication}%`, backgroundColor: '#10b981' }}></div>
                </div>
                <span className="result-value">{userProfile.testResults.communication}</span>
              </div>
              <div className="test-result-item">
                <span className="result-label">解决问题</span>
                <div className="result-bar-container">
                  <div className="result-bar" style={{ width: `${userProfile.testResults.problemSolving}%`, backgroundColor: '#f59e0b' }}></div>
                </div>
                <span className="result-value">{userProfile.testResults.problemSolving}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="position-recommendations">
        <h2>推荐岗位</h2>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>正在分析您的数据，匹配最适合您的岗位...</p>
          </div>
        ) : (
          <div className="position-cards">
            {positions.map(position => (
              <div key={position.id} className="position-card">
                <div className="position-card-header">
                  <img src={position.logo} alt={position.company} className="company-logo" />
                  <div className="position-meta">
                    <h3 className="position-name">{position.title}</h3>
                    <p className="company-name">{position.company}</p>
                    <div className="position-tags">
                      <span className="position-location">{position.location}</span>
                      <span className="position-salary">{position.salary}</span>
                    </div>
                  </div>
                  {renderMatchRate(position.matchRate)}
                </div>
                <div className="position-card-body">
                  <div className="position-requirements">
                    <h4>岗位要求</h4>
                    <ul>
                      {position.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="position-description">
                    <h4>职位描述</h4>
                    <p>{position.description}</p>
                  </div>
                  <button className="apply-button">立即申请</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="position-suggestions">
        <h2>提升匹配度建议</h2>
        <div className="suggestion-card">
          <div className="suggestion-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div className="suggestion-content">
            <h3>技能提升建议</h3>
            <p>根据您的兴趣和目前的技能水平，建议您可以考虑以下方向提升自己：</p>
            <ul>
              <li>深入学习React的高级特性和性能优化</li>
              <li>加强对TypeScript类型系统的理解</li>
              <li>了解前端架构设计和微前端相关知识</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionPage; 
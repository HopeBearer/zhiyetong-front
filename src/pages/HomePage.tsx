import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const mockCards = [
  {
    title: '前端学习路线',
    desc: '系统掌握HTML、CSS、JS与主流框架，打造高效前端能力。',
    tag: '适合热爱交互与视觉的同学',
    features: ['React', 'Vue', '工程化', '项目实战'],
    color: 'card-blue',
  },
  {
    title: '后端-Python',
    desc: '深入Python开发，掌握Django/Flask与数据库实战。',
    tag: '适合喜欢逻辑与数据的同学',
    features: ['Web后端', '数据分析', 'AI基础'],
    color: 'card-green',
  },
  {
    title: '后端-Java',
    desc: '精通Java主流技术栈，企业级后端开发不再难。',
    tag: '适合追求高并发与大厂技术的同学',
    features: ['Spring全家桶', '微服务', '分布式'],
    color: 'card-pink',
  },
  {
    title: 'AI能力提升',
    desc: 'AI基础、算法与大模型应用，紧跟前沿技术。',
    tag: '适合对AI与创新有热情的同学',
    features: ['机器学习', '深度学习', '大模型实战'],
    color: 'card-yellow',
  },
  {
    title: '产品经理成长',
    desc: '掌握产品设计、需求分析与项目管理，成为懂技术的产品人。',
    tag: '适合善于沟通与规划的同学',
    features: ['需求分析', '原型设计', '项目管理'],
    color: 'card-purple',
  },
  {
    title: '算法与竞赛',
    desc: '算法基础、数据结构、编程竞赛，提升逻辑与思维能力。',
    tag: '适合热爱挑战与算法的同学',
    features: ['数据结构', '算法竞赛', 'LeetCode'],
    color: 'card-orange',
  },
];

const feedbacks = [
  {
    name: '王同学',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    content: '“平台的学习路线非常清晰，帮助我快速梳理了知识体系，推荐！”',
    stars: 5,
  },
  {
    name: '李同学',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
    content: '“面试题和视频模拟很实用，真实提升了我的面试能力。”',
    stars: 5,
  },
  {
    name: '赵同学',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
    content: '“岗位推荐很精准，找实习更有方向感了！”',
    stars: 4,
  },
  {
    name: '陈同学',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=5',
    content: '“平台内容丰富，学习氛围浓厚，结识了很多志同道合的朋友！”',
    stars: 5,
  },
  {
    name: '孙同学',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=6',
    content: '“关卡式测试很有趣，帮助我查漏补缺，提升了自信！”',
    stars: 4,
  },
  {
    name: '周同学',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=7',
    content: '“视频面试模拟让我提前适应了真实场景，推荐给大家！”',
    stars: 5,
  },
];

// 更新核心功能数据，添加背景图片
const coreFeatures = [
  {
    id: 'interview',
    title: 'AI模拟面试',
    description: '模拟真实面试环境，提供即时反馈和分析，帮助你熟悉面试流程，提升应对能力。',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8H17M7 12H11M12 20L8 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H16L12 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    benefits: [
      '模拟真实面试流程与问题',
      '提供专业、详细的反馈与建议',
      '支持视频录制，回顾分析自己的表现',
      '覆盖各类热门岗位的经典面试题'
    ],
    color: 'feature-blue',
    route: '/interview',
    bgImage: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'resume',
    title: 'AI简历助手',
    description: '智能生成专业简历，针对不同岗位优化内容，突出个人优势，提高简历通过率。',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    benefits: [
      '一键生成专业标准简历',
      'AI评估简历优缺点与改进建议',
      '针对目标岗位定制简历内容',
      '多种精美模板与下载格式'
    ],
    color: 'feature-green',
    route: '/resume',
    bgImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'path',
    title: 'AI个性化路线',
    description: '根据个人兴趣和目标，定制专属学习路径，阶段性测试检验学习成果，确保高效进步。',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 20L3 17V4L9 7M9 20V7M9 20L15 17M9 7L15 4M15 17V4M15 17L21 20V7L15 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    benefits: [
      '根据个人基础与目标定制学习路线',
      '分阶段学习内容与测验',
      '实时更新的技术知识图谱',
      '行业专家定期更新的优质资源'
    ],
    color: 'feature-yellow',
    route: '/choose',
    bgImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'position',
    title: '个性化岗位推荐',
    description: '分析你的技能、学习记录和测试结果，匹配最适合的岗位，提供精准就业指导。',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 13.2554C18.2207 14.3805 15.1827 15 12 15C8.8173 15 5.7793 14.3805 3 13.2554M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 19H8.21252C7.83009 19 7.51726 18.7542 7.44443 18.3787L7 17L10 16L12 17L14 16L17 17L16.5556 18.3787C16.4827 18.7542 16.1699 19 15.7875 19H12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    benefits: [
      '基于个人能力画像推荐最匹配岗位',
      '提供岗位详情与匹配度分析',
      '针对性的能力提升建议',
      '热门企业的最新招聘信息'
    ],
    color: 'feature-purple',
    route: '/position',
    bgImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800'
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  
  // 自动轮播的时间间隔（毫秒）
  const autoSlideInterval = 5000;
  
  const nextFeature = useCallback(() => {
    setActiveFeature((prev) => (prev + 1) % coreFeatures.length);
  }, []);
  
  const prevFeature = useCallback(() => {
    setActiveFeature((prev) => (prev - 1 + coreFeatures.length) % coreFeatures.length);
  }, []);
  
  // 添加自动轮播效果
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextFeature();
    }, autoSlideInterval);
    
    // 当用户与轮播图交互时清除自动轮播
    return () => clearInterval(intervalId);
  }, [nextFeature]);
  
  return (
    <div className="muzli-home">
      <section className="muzli-hero">
        <h1 className="muzli-hero-title">大学生就业学习与精准匹配平台</h1>
        <div className="muzli-hero-sub">用AI助力你的职业成长</div>
        <div className="muzli-hero-desc">智能学习路线 · 关卡式测试 · 视频面试 · 岗位精准推荐</div>
        <button className="muzli-hero-btn" onClick={()=>navigate('/choose')}>
          立即体验
        </button>
      </section>

      <section className="muzli-cards">
        {mockCards.map((card, idx) => (
          <div className={`muzli-card ${card.color}`} key={idx}>
            <div className="muzli-card-title">{card.title}</div>
            <div className="muzli-card-desc">{card.desc}</div>
            <div className="muzli-card-info">
              <span className="muzli-card-tag">{card.tag}</span>
            </div>
            <div className="muzli-card-tags">
              {card.features.map(f => (
                <span className="muzli-feature-tag" key={f}>{f}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 产品介绍区块 */}
      <section className="product-section">
        <div className="product-intro">
          <div className="product-intro-text">
            <h2>抢先掌握最新的职业成长趋势</h2>
            <p>平台聚合AI学习路线、关卡式测试、视频面试、岗位推荐等功能，助力大学生高效成长，紧跟行业前沿。</p>
          </div>
          <div className="product-intro-imgs">
            <div className="product-img-card product-img-main" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80')"}} />
            <div className="product-img-card product-img-side" style={{backgroundImage: "url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80')"}} />
          </div>
        </div>
      </section>
      
      {/* 新增产品介绍区块2（图片在左，文字在右，右下角为半遮挡小图片） */}
      <section className="product-section">
        <div className="product-intro product-intro-reverse-imgs">
          <div className="product-intro-imgs">
            <div className="product-img-card product-img-main" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80')", zIndex: 2, position: 'relative'}} />
            <div className="product-img-card product-img-side" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80')", marginLeft: '-60px', zIndex: 1, position: 'relative'}} />
          </div>
          <div className="product-intro-text">
            <h2>智能岗位推荐，助你精准就业</h2>
            <p>通过AI算法分析你的学习轨迹与能力画像，智能匹配最适合你的实习与就业岗位，提升求职成功率。</p>
          </div>
        </div>
      </section>

      {/* 修改：功能展示区域 - 改为带背景图片的轮播图形式 */}
      <section className="feature-carousel-section">
        <div className="feature-carousel-container">
          <h2 className="feature-carousel-title">助力多款明星产品实现创新功能</h2>
          
          <div className="feature-carousel">
            <div 
              className="feature-carousel-content"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 57, 198, 0.85), rgba(0, 161, 255, 0.85)), url(${coreFeatures[activeFeature].bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease-in-out',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <div className="feature-carousel-phone" onClick={() => navigate(coreFeatures[activeFeature].route)}>
                <div className="phone-mockup">
                  <div className="phone-screen">
                    {/* 手机界面模拟 */}
                    <div className="phone-app-interface">
                      <div className="phone-app-header">
                        <div className="phone-app-back"></div>
                        <div className="phone-app-title">{coreFeatures[activeFeature].title}</div>
                        <div className="phone-app-more"></div>
                      </div>
                      <div className="phone-app-content">
                        <div className="phone-app-icon-wrapper">
                          {coreFeatures[activeFeature].icon}
                        </div>
                        
                        {/* 添加骨架屏元素 */}
                        <div className="phone-skeleton-elements">
                          <div className="skeleton-line skeleton-line-1"></div>
                          <div className="skeleton-line skeleton-line-2"></div>
                          <div className="skeleton-circle"></div>
                          <div className="skeleton-line skeleton-line-3"></div>
                          <div className="skeleton-line skeleton-line-4"></div>
                        </div>
                      </div>
                      
                      {/* 添加底部导航栏 */}
                      <div className="phone-app-bottom-nav">
                        <div className="bottom-nav-item bottom-nav-active"></div>
                        <div className="bottom-nav-item"></div>
                        <div className="bottom-nav-item"></div>
                        <div className="bottom-nav-item"></div>
                      </div>
                    </div>
                  </div>
                  {/* 添加手机装饰元素 */}
                  <div className="phone-decorations">
                    <div className="phone-decoration phone-decoration-1"></div>
                    <div className="phone-decoration phone-decoration-2"></div>
                    <div className="phone-decoration phone-decoration-3"></div>
                  </div>
                  
                  {/* 添加提示文本 */}
                  <div className="phone-click-hint">点击体验{coreFeatures[activeFeature].title}</div>
                </div>
                {/* 添加悬浮装饰元素 */}
                <div className="floating-elements">
                  <div className="floating-circle floating-circle-1"></div>
                  <div className="floating-circle floating-circle-2"></div>
                  <div className="floating-dot floating-dot-1"></div>
                  <div className="floating-dot floating-dot-2"></div>
                  <div className="floating-dot floating-dot-3"></div>
                  <div className="floating-square"></div>
                </div>
              </div>
              
              <div className="feature-carousel-text">
                <h3 className="feature-carousel-item-title">{coreFeatures[activeFeature].title}</h3>
                <p className="feature-carousel-description">{coreFeatures[activeFeature].description}</p>
                <ul className="feature-carousel-benefits">
                  {coreFeatures[activeFeature].benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
                <button 
                  className="feature-carousel-btn" 
                  onClick={() => navigate(coreFeatures[activeFeature].route)}
                >
                  {coreFeatures[activeFeature].title}服务
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="feature-carousel-controls">
              <button 
                className="feature-carousel-arrow feature-carousel-prev" 
                onClick={prevFeature}
                aria-label="上一个功能"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="feature-carousel-indicators">
                {coreFeatures.map((_, index) => (
                  <button 
                    key={index}
                    className={`feature-carousel-indicator ${index === activeFeature ? 'active' : ''}`}
                    onClick={() => setActiveFeature(index)}
                    aria-label={`切换到第${index + 1}个功能`}
                  />
                ))}
              </div>
              <button 
                className="feature-carousel-arrow feature-carousel-next" 
                onClick={nextFeature}
                aria-label="下一个功能"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="feature-carousel-pagination">
              {activeFeature + 1} / {coreFeatures.length}
            </div>
          </div>
        </div>
      </section>

      {/* 用户评价区块 */}
      <section className="feedback-section">
        <h2 className="feedback-title">加入众多同学，享受职路通带来的成长</h2>
        <div className="feedback-list">
          {feedbacks.map(fb => (
            <div className="feedback-card" key={fb.name}>
              <img className="feedback-avatar" src={fb.avatar} alt={fb.name} />
              <div className="feedback-content">{fb.content}</div>
              <div className="feedback-user feedback-user-bottom">
                <span className="feedback-name">{fb.name}</span>
                <span className="feedback-stars">{'★'.repeat(fb.stars)}{'☆'.repeat(5-fb.stars)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="muzli-footer">
        <div className="footer-main">
          <div className="footer-col footer-brand">
            <div className="footer-logo">职路通</div>
            <div className="footer-desc">职路通致力于为大学生提供就业导向型学习与精准岗位匹配服务，聚合AI学习、测试、面试与推荐于一体，助力每一位同学高效成长。</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">产品</div>
            <div className="footer-link">学习路线</div>
            <div className="footer-link">关卡测试</div>
            <div className="footer-link">视频面试</div>
            <div className="footer-link">岗位推荐</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">关注我们</div>
            <div className="footer-link">微信公众号</div>
            <div className="footer-link">B站</div>
            <div className="footer-link">知乎</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">公司</div>
            <div className="footer-link">关于我们</div>
            <div className="footer-link">隐私政策</div>
            <div className="footer-link">服务条款</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">联系我们</div>
            <div className="footer-link">邮箱：career@zhilutong.com</div>
            <div className="footer-link">意见反馈</div>
          </div>
        </div>
        <div className="footer-bottom">© 2025 职路通 CareerPath. 保留所有权利。</div>
      </footer>
    </div>
  );
};

export default HomePage; 
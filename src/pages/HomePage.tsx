import React from 'react';
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
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
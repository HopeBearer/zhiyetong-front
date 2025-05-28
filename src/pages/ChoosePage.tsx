import React, { useState, useEffect } from 'react';
import { GRADES, DIRECTIONS, ROUTES } from '../constants/data';
import { useNavigate } from 'react-router-dom';

const ChoosePage: React.FC = () => {
  const navigate = useNavigate();
  const [grade, setGrade] = useState(GRADES[0]);
  const [direction, setDirection] = useState(DIRECTIONS[0].value);
  const [showRoute, setShowRoute] = useState(false);
  // 展开/收起状态
  const [openStages, setOpenStages] = useState<{ [idx: number]: boolean }>({});
  // 添加高亮状态
  const [activeStage, setActiveStage] = useState<number | null>(null);
  // 显示悬浮导航
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  // 用户学习进度
  const [userProgress, setUserProgress] = useState<string>('');
  const [showProgressInput, setShowProgressInput] = useState(false);

  // 导航到测试页面
  const navigateToTest = (testId: string) => {
    navigate(`/test/${grade}`, { state: { testId, direction } });
  };

  const handleSubmit = () => {
    setShowRoute(true);
    // 默认展开第一个阶段
    setOpenStages({ 0: true });
    // 滚动到结果区域
    setTimeout(() => {
      const resultElement = document.getElementById('learning-route-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const routeKey = `${grade}-${direction}`;
  const routeData = ROUTES[routeKey] || [];

  const toggleStage = (idx: number) => {
    setOpenStages(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleStageMouseEnter = (idx: number) => {
    setActiveStage(idx);
  };

  const handleStageMouseLeave = () => {
    setActiveStage(null);
  };

  // 处理滚动事件，显示/隐藏悬浮导航
  useEffect(() => {
    const handleScroll = () => {
      const routeElement = document.getElementById('learning-route-result');
      if (routeElement) {
        const routeTop = routeElement.getBoundingClientRect().top;
        setShowFloatingNav(routeTop < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动到指定阶段
  const scrollToStage = (idx: number) => {
    const stageElement = document.getElementById(`stage-${idx}`);
    if (stageElement) {
      stageElement.scrollIntoView({ behavior: 'smooth' });
      // 自动展开该阶段
      setOpenStages(prev => ({
        ...prev,
        [idx]: true
      }));
    }
  };

  return (
    <div className="muzli-home" style={{ minHeight: 'calc(100vh - 200px)', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px 48px 24px' }}>
      {/* 大标题区 */}
      <section className="muzli-hero">
        <h1 className="muzli-hero-title">定制你的专属学习路线</h1>
        <div className="muzli-hero-sub">选择年级与方向，开启AI驱动的高效成长</div>
        <div className="muzli-hero-desc">智能推荐 · 动态路线 · 关卡式测试 · 面试模拟</div>
      </section>
      {/* 选择区 */}
      <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 10, textAlign: 'center' }}>年级</div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, justifyContent: 'center' }}>
        {GRADES.map(g => (
          <button
            key={g}
            className={g === grade ? 'choose-btn choose-btn-active' : 'choose-btn'}
            style={{ padding: '10px 28px', borderRadius: 18, border: g === grade ? '2px solid #2563eb' : '1px solid #e0e7ff', background: g === grade ? '#e0e7ff' : '#f7fafd', color: '#222', fontWeight: 700, fontSize: '1.08rem', cursor: 'pointer', transition: 'all 0.18s' }}
            onClick={() => setGrade(g)}
          >
            {g}
          </button>
        ))}
      </div>
      <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 10, textAlign: 'center' }}>学习方向</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24, justifyContent: 'center' }}>
        {DIRECTIONS.map(d => (
          <button
            key={d.value}
            className={d.value === direction ? 'choose-btn choose-btn-active' : 'choose-btn'}
            style={{ padding: '10px 28px', borderRadius: 18, border: d.value === direction ? '2px solid #2563eb' : '1px solid #e0e7ff', background: d.value === direction ? '#e0e7ff' : '#f7fafd', color: '#222', fontWeight: 700, fontSize: '1.08rem', cursor: 'pointer', transition: 'all 0.18s' }}
            onClick={() => setDirection(d.value)}
          >
            {d.label}
          </button>
        ))}
      </div>
      
      {/* 学习进度选择区 */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>学习进度</div>
          <div 
            style={{ 
              cursor: 'pointer', 
              color: '#2563eb', 
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              background: '#e0e7ff',
              padding: '2px 8px',
              borderRadius: 12
            }}
            onClick={() => setShowProgressInput(!showProgressInput)}
          >
            <span style={{ marginRight: 4 }}>
              {showProgressInput ? '隐藏' : '填写'}
            </span>
            <span style={{ fontSize: '0.8rem' }}>
              {showProgressInput ? '▲' : '▼'}
            </span>
          </div>
        </div>
        
        {showProgressInput && (
          <div style={{ 
            maxWidth: 600, 
            margin: '0 auto', 
            padding: 16, 
            background: '#f8faff', 
            borderRadius: 12,
            border: '1px solid #e0e7ff',
            marginBottom: 16
          }}>
            <div style={{ marginBottom: 8, fontSize: '0.9rem', color: '#666', textAlign: 'left' }}>
              <span style={{ fontWeight: 600, color: '#2563eb', marginRight: 4 }}>提示：</span>
              请描述你当前的学习进度（可选），例如："已学习HTML/CSS基础，正在学习JavaScript"
            </div>
            <textarea
              value={userProgress}
              onChange={(e) => setUserProgress(e.target.value)}
              placeholder="我的学习进度（选填）"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                minHeight: 80,
                resize: 'vertical',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>
        )}
        
        {!showProgressInput && (
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            marginBottom: 16,
            padding: '6px 12px',
            background: '#f0f4ff',
            borderRadius: 8,
            display: 'inline-block'
          }}>
            默认为零基础，点击"填写"可自定义学习进度（可选）
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <button className="muzli-hero-btn" style={{ width: 260, marginTop: 8 }} onClick={handleSubmit}>
          生成学习路线
        </button>
      </div>
      {/* 推荐学习路线区 */}
      {showRoute && (
        <section id="learning-route-result" style={{ margin: '0 auto', marginTop: 32, maxWidth: 1100, background: '#fff', borderRadius: 24, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)', padding: 36, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#2563eb', marginBottom: 18, width: '100%', textAlign: 'left' }}>为你定制的学习路线</div>
          
          {/* 用户进度展示区 */}
          {userProgress && (
            <div style={{ 
              width: '100%', 
              marginBottom: 16, 
              padding: '12px 18px', 
              background: '#f0f7ff', 
              borderRadius: 12,
              border: '1px solid #d3e2ff',
              borderLeft: '4px solid #2563eb'
            }}>
              <div style={{ fontWeight: 600, marginBottom: 4, color: '#2563eb' }}>你的当前学习进度：</div>
              <div style={{ color: '#333' }}>{userProgress}</div>
            </div>
          )}

          {/* 快速浏览区域 */}
          {routeData.length > 0 && (
            <div style={{ 
              width: '100%', 
              marginBottom: 24, 
              padding: '16px 20px', 
              background: '#f8faff', 
              borderRadius: 16,
              border: '1px solid #e0e7ff'
            }}>
              <div style={{ 
                fontWeight: 700, 
                fontSize: '1.05rem', 
                marginBottom: 12, 
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span style={{ 
                  background: '#e0e7ff', 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  lineHeight: '1',
                  fontSize: '0.8rem'
                }}>👁</span>
                快速浏览
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 'normal',
                  color: '#666',
                  marginLeft: 8,
                  background: '#f0f4ff',
                  padding: '2px 8px',
                  borderRadius: 12
                }}>
                  鼠标悬停或点击可高亮对应阶段
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 8
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  marginBottom: 8
                }}>
                  下方按钮对应学习路线的各个阶段，点击可快速导航：
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginBottom: 8
                }}>
                  {routeData.map((stage, idx) => (
                    <div 
                      key={idx}
                      onClick={() => scrollToStage(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 16px',
                        background: activeStage === idx ? '#e0e7ff' : '#fff',
                        border: '1px solid #d1d5db',
                        borderRadius: 20,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: activeStage === idx ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                      }}
                      onMouseEnter={() => handleStageMouseEnter(idx)}
                      onMouseLeave={handleStageMouseLeave}
                    >
                      <span style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: activeStage === idx ? '#2563eb' : '#e0e7ff',
                        color: activeStage === idx ? '#fff' : '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        lineHeight: '1'
                      }}>
                        {idx + 1}
                      </span>
                      <span style={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: activeStage === idx ? '#2563eb' : '#333'
                      }}>
                        {stage.title}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: '#666',
                  padding: '8px 12px',
                  background: '#f0f4ff',
                  borderRadius: 8,
                  marginTop: 4
                }}>
                  点击阶段名称可快速跳转到对应内容，学习路线共 {routeData.length} 个阶段
                </div>
              </div>
            </div>
          )}

          {/* 悬浮导航 */}
          {showFloatingNav && (
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              background: 'rgba(255,255,255,0.95)', 
              zIndex: 100,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              padding: '12px 0',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{ 
                display: 'flex', 
                gap: 8,
                maxWidth: 1100,
                overflow: 'auto',
                padding: '0 16px'
              }}>
                {routeData.map((stage, idx) => (
                  <button
                    key={idx}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: activeStage === idx ? '2px solid #2563eb' : '1px solid #d1d5db',
                      background: activeStage === idx ? '#e0e7ff' : '#fff',
                      color: activeStage === idx ? '#2563eb' : '#666',
                      fontWeight: 700,
                      cursor: 'pointer',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1'
                    }}
                    onClick={() => scrollToStage(idx)}
                    onMouseEnter={() => handleStageMouseEnter(idx)}
                    onMouseLeave={handleStageMouseLeave}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 学习路径 */}
          <div style={{ width: '100%' }}>
            {routeData.length > 0 ? (
              routeData.map((stage, idx) => (
                <div
                  id={`stage-${idx}`}
                  key={idx}
                  style={{
                    marginBottom: 20,
                    border: '1px solid #e5e7eb',
                    borderRadius: 16,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: activeStage === idx ? '0 4px 20px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={() => handleStageMouseEnter(idx)}
                  onMouseLeave={handleStageMouseLeave}
                >
                  <div
                    style={{
                      padding: '16px 24px',
                      background: openStages[idx] ? '#f0f7ff' : '#f7fafd',
                      borderBottom: openStages[idx] ? '1px solid #e5e7eb' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onClick={() => toggleStage(idx)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: openStages[idx] ? '#2563eb' : '#e0e7ff',
                          color: openStages[idx] ? '#fff' : '#2563eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          lineHeight: '1'
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{stage.title}</div>
                      {stage.studyPeriod && (
                        <div
                          style={{
                            fontSize: '0.85rem',
                            color: '#666',
                            background: '#f0f0f0',
                            padding: '2px 10px',
                            borderRadius: 12
                          }}
                        >
                          {stage.studyPeriod}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <span style={{ 
                        transform: openStages[idx] ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        fontSize: '0.8rem'
                      }}>
                        ▼
                      </span>
                    </div>
                  </div>

                  {openStages[idx] && (
                    <div style={{ padding: '20px 24px', background: '#fff' }}>
                      {/* 技能收获 */}
                      {stage.skills && stage.skills.length > 0 && (
                        <div style={{ marginBottom: 24 }}>
                          <div style={{ fontWeight: 700, marginBottom: 12, color: '#2563eb', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ 
                              background: '#e0e7ff', 
                              width: 24, 
                              height: 24, 
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              lineHeight: '1',
                              fontSize: '0.8rem'
                            }}>✓</span>
                            <span>技能收获</span>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {stage.skills.map((skill, skillIdx) => (
                              <div
                                key={skillIdx}
                                style={{
                                  padding: '8px 16px',
                                  background: '#f7fafd',
                                  borderRadius: 8,
                                  border: '1px solid #e0e7ff',
                                  fontSize: '0.95rem'
                                }}
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 关键技术清单 */}
                      {stage.techs && stage.techs.length > 0 && (
                        <div>
                          <div style={{ fontWeight: 700, marginBottom: 16, color: '#2563eb', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ 
                              background: '#e0e7ff', 
                              width: 24, 
                              height: 24, 
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              lineHeight: '1',
                              fontSize: '0.8rem'
                            }}>⚙</span>
                            <span>关键技术清单</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {stage.techs.map((tech, techIdx) => (
                              <div
                                key={techIdx}
                                style={{
                                  padding: '16px',
                                  background: '#f8faff',
                                  borderRadius: 12,
                                  border: '1px solid #e5e7eb'
                                }}
                              >
                                <div style={{ fontWeight: 700, marginBottom: 8, color: '#333' }}>{tech.name}</div>
                                <div style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>{tech.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 要点 */}
                      {stage.points && stage.points.length > 0 && (
                        <div style={{ marginTop: 24 }}>
                          <div style={{ fontWeight: 700, marginBottom: 12, color: '#2563eb', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ 
                              background: '#e0e7ff', 
                              width: 24, 
                              height: 24, 
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              lineHeight: '1',
                              fontSize: '0.8rem'
                            }}>•</span>
                            <span>要点</span>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {stage.points.map((point, pointIdx) => (
                              <div
                                key={pointIdx}
                                style={{
                                  padding: '8px 16px',
                                  background: '#f0f7ff',
                                  borderRadius: 8,
                                  fontSize: '0.95rem'
                                }}
                              >
                                {point}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 添加阶段测试按钮 */}
                      {stage.interviewTestId && (
                        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                          <button
                            onClick={() => navigateToTest(stage.interviewTestId!)}
                            style={{
                              padding: '10px 20px',
                              background: '#2563eb',
                              color: 'white',
                              borderRadius: '8px',
                              border: 'none',
                              fontWeight: 600,
                              fontSize: '1rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#1d4ed8';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.35)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#2563eb';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.25)';
                            }}
                          >
                            <span style={{ fontSize: '1.2rem' }}>📝</span>
                            阶段面试题测试
                          </button>
                        </div>
                      )}
                      {!stage.interviewTestId && (
                        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                          <button
                            onClick={() => navigateToTest(`${grade}-${direction}-${idx+1}`)}
                            style={{
                              padding: '10px 20px',
                              background: '#2563eb',
                              color: 'white',
                              borderRadius: '8px',
                              border: 'none',
                              fontWeight: 600,
                              fontSize: '1rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#1d4ed8';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.35)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#2563eb';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.25)';
                            }}
                          >
                            <span style={{ fontSize: '1.2rem' }}>📝</span>
                            阶段面试题测试
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>暂无相关学习路线</div>
                <div>请选择其他方向或年级组合</div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ChoosePage;
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { DIRECTIONS, QUESTIONS, STAGE_QUESTIONS } from '../constants/data';

const TestPage: React.FC = () => {
  const { grade } = useParams<{ grade: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(DIRECTIONS[0].value);
  const [testId, setTestId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  
  // 从location.state中获取传递过来的参数
  useEffect(() => {
    if (location.state) {
      const { testId: stateTestId, direction: stateDirection } = location.state as { testId: string, direction: string };
      if (stateTestId) setTestId(stateTestId);
      if (stateDirection) setDirection(stateDirection);
    }
  }, [location.state]);

  // 获取当前方向的显示名称
  const getDirectionLabel = () => {
    const dir = DIRECTIONS.find(d => d.value === direction);
    return dir ? dir.label : direction;
  };

  // 处理答案变更
  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  // 获取当前阶段的测试题
  const getCurrentQuestions = () => {
    if (testId && STAGE_QUESTIONS[testId]) {
      return STAGE_QUESTIONS[testId];
    }
    return QUESTIONS[`${grade}-${direction}`] || [];
  };

  // 返回学习路线
  const handleBackToRoute = () => {
    navigate('/choose');
  };

  // 提交答案
  const handleSubmit = () => {
    // 这里可以添加答案提交逻辑
    alert('答案已提交！');
  };

  const questions = getCurrentQuestions();

  return (
    <div className="muzli-home" style={{ minHeight: 'calc(100vh - 200px)', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px 48px 24px' }}>
      <section className="muzli-hero" style={{ marginBottom: 24 }}>
        <h1 className="muzli-hero-title">{grade} 面试题测试</h1>
        <div className="muzli-hero-sub">检验你的学习成果，提升面试能力</div>
      </section>

      <div style={{ 
        background: '#fff', 
        borderRadius: 24, 
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)', 
        padding: '32px 36px',
        marginBottom: 32
      }}>
        {testId && (
          <div style={{
            marginBottom: 24,
            padding: '16px 20px',
            background: '#f0f7ff',
            borderRadius: 12,
            border: '1px solid #d3e2ff',
            borderLeft: '4px solid #2563eb'
          }}>
            <div style={{ fontWeight: 600, marginBottom: 8, color: '#2563eb', fontSize: '1.1rem' }}>
              阶段面试题测试
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <span style={{
                padding: '6px 12px',
                background: '#e0e7ff',
                borderRadius: 16,
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#4338ca'
              }}>
                测试ID: {testId}
              </span>
              <span style={{
                padding: '6px 12px',
                background: '#e0e7ff',
                borderRadius: 16,
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#4338ca'
              }}>
                方向: {getDirectionLabel()}
              </span>
              <span style={{
                padding: '6px 12px',
                background: '#e0e7ff',
                borderRadius: 16,
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#4338ca'
              }}>
                年级: {grade}
              </span>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
            学习方向：
            <select 
              value={direction} 
              onChange={e => setDirection(e.target.value)}
              style={{
                marginLeft: 12,
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            >
              {DIRECTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 32 }}>
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
            }}>📝</span>
            <span>面试题列表</span>
          </div>

          {questions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '20px 24px',
                    background: '#f8faff',
                    borderRadius: 12,
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 12, fontSize: '1.05rem' }}>
                    {idx + 1}. {q}
                  </div>
                  <textarea
                    value={answers[idx] || ''}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    placeholder="请输入你的答案..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      minHeight: 120,
                      resize: 'vertical',
                      fontSize: '1rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              padding: '32px 24px', 
              textAlign: 'center',
              color: '#666',
              background: '#f8faff',
              borderRadius: 12,
              border: '1px solid #e0e7ff'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 12 }}>暂无面试题</div>
              <div>该学习方向或阶段的面试题正在完善中，请尝试其他方向或阶段</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button
            onClick={handleBackToRoute}
            style={{
              padding: '10px 24px',
              background: '#f0f7ff',
              color: '#2563eb',
              borderRadius: '8px',
              border: '1px solid #2563eb',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e0e7ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f0f7ff';
            }}
          >
            返回学习路线
          </button>
          
          {questions.length > 0 && (
            <button
              onClick={handleSubmit}
              style={{
                padding: '10px 24px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
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
              提交答案
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage; 
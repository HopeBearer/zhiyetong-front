import React, { useState, useEffect, useRef } from 'react';
import Modal from '../components/Modal';

// 添加类型声明
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEventResult {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionEventResult;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal?: boolean;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

// 面试题库
const interviewQuestions = {
  basic: [
    '请简单介绍一下你自己和你的职业背景。',
    '你为什么对我们公司的这个职位感兴趣？',
    '描述一下你过去工作中遇到的一个挑战，以及你是如何解决的？',
    '你认为你的哪些技能和经验最适合这个职位？',
    '你对未来的职业发展有什么规划？',
    '你如何处理工作中的压力和挑战？',
    '请描述一下你与团队成员发生冲突的经历，以及你是如何解决的？',
    '你最大的优点和缺点是什么？',
    '你如何看待加班？',
    '你对我们公司了解多少？',
    '你为什么离开上一家公司？',
    '你如何适应新的工作环境？',
    '你如何保持自己的专业知识和技能更新？',
    '你如何处理多任务和截止日期压力？',
    '你如何评价自己的沟通能力？'
  ],
  advanced: [
    '请详细描述一个你主导的项目，包括你的角色、遇到的挑战以及最终结果。',
    '你如何处理与同事或上级的意见分歧？请举例说明。',
    '描述一次你犯错的经历，以及你从中学到了什么？',
    '你如何确保项目按时完成并达到质量标准？',
    '你如何看待工作与生活的平衡？',
    '你如何处理客户或团队成员的负面反馈？',
    '你认为领导力的关键要素是什么？',
    '你如何激励团队成员？',
    '你如何处理工作中的失败和挫折？',
    '你如何适应快速变化的工作环境？',
    '你如何确保自己的工作符合公司的价值观和目标？',
    '你如何处理工作中的道德困境？',
    '你如何评估和改进团队的工作流程？',
    '你如何看待创新和冒险在职业发展中的作用？',
    '你认为什么是良好的团队合作？'
  ],
  expert: [
    '描述一个你解决的复杂业务问题，以及你的解决方案如何影响了公司的业绩。',
    '你如何在资源有限的情况下优先处理任务和项目？',
    '你如何看待行业的未来发展趋势，以及你如何适应这些变化？',
    '你如何处理团队成员表现不佳的情况？',
    '你如何在组织中推动变革？',
    '你如何评估一个项目的成功与失败？',
    '你如何平衡短期目标和长期战略？',
    '你如何处理高压环境下的决策制定？',
    '你如何确保团队成员的专业发展？',
    '你如何看待风险管理在项目中的作用？',
    '你如何处理与其他部门的协作挑战？',
    '你如何看待数据在决策中的作用？',
    '你如何处理组织变革带来的不确定性？',
    '你如何确保项目或产品的质量？',
    '你如何看待自己在组织中的领导角色？'
  ]
};

// 公司特定面试题
const companySpecificQuestions = {
  '阿里巴巴': [
    '请分享一个你使用数据驱动决策的例子。',
    '你如何理解阿里的"客户第一"价值观？',
    '你如何看待阿里巴巴的全球化战略？',
    '你如何理解电子商务的未来发展趋势？',
    '你如何在工作中体现创新精神？'
  ],
  '腾讯': [
    '你如何看待用户体验在产品开发中的重要性？',
    '你如何理解腾讯的"连接"战略？',
    '你如何看待游戏行业的发展趋势？',
    '你如何处理产品迭代中的用户反馈？',
    '你如何看待社交网络的未来？'
  ],
  '百度': [
    '你如何看待人工智能在搜索引擎中的应用？',
    '你如何理解百度的技术驱动文化？',
    '你如何看待自动驾驶技术的发展前景？',
    '你如何处理大规模数据分析的挑战？',
    '你如何看待搜索技术的未来发展？'
  ],
  '字节跳动': [
    '你如何看待短视频平台的发展趋势？',
    '你如何理解字节跳动的全球化战略？',
    '你如何看待算法在内容推荐中的作用？',
    '你如何处理快速增长带来的组织挑战？',
    '你如何看待内容创作与传播的未来？'
  ],
  '华为': [
    '你如何看待技术创新在企业发展中的作用？',
    '你如何理解华为的"狼性"文化？',
    '你如何看待5G技术的应用前景？',
    '你如何处理国际化经营中的文化差异？',
    '你如何看待企业的长期发展战略？'
  ]
};

// 技术面试题（根据不同职位可以扩展）
const technicalQuestions = {
  '前端开发': [
    '请解释React中的虚拟DOM及其工作原理。',
    '你如何优化前端应用的性能？',
    '请解释CSS盒模型及其在布局中的应用。',
    '你如何处理前端应用中的状态管理？',
    '请解释JavaScript中的闭包及其应用场景。',
    '你如何确保前端应用的跨浏览器兼容性？',
    '请解释RESTful API及其设计原则。',
    '你如何处理前端应用中的安全问题？',
    '请解释响应式设计及其实现方法。',
    '你如何看待前端框架的发展趋势？'
  ],
  '后端开发': [
    '请解释数据库索引及其优化策略。',
    '你如何设计高并发系统？',
    '请解释分布式系统中的CAP理论。',
    '你如何处理系统中的事务一致性问题？',
    '请解释微服务架构及其优缺点。',
    '你如何确保API的安全性？',
    '请解释缓存策略及其应用场景。',
    '你如何处理系统中的性能瓶颈？',
    '请解释消息队列及其应用场景。',
    '你如何看待后端技术的发展趋势？'
  ],
  '产品经理': [
    '你如何确定产品的优先级和路线图？',
    '你如何收集和分析用户需求？',
    '请解释产品生命周期及其管理策略。',
    '你如何与设计师和开发人员协作？',
    '请解释A/B测试及其在产品决策中的应用。',
    '你如何衡量产品的成功？',
    '请解释用户故事及其编写方法。',
    '你如何处理产品发布中的风险？',
    '请解释产品市场契合度及其评估方法。',
    '你如何看待产品管理的发展趋势？'
  ],
  '数据分析': [
    '你如何处理和清洗大规模数据集？',
    '请解释数据可视化及其最佳实践。',
    '你如何使用数据支持业务决策？',
    '请解释统计显著性及其在数据分析中的应用。',
    '你如何处理数据中的异常值和缺失值？',
    '请解释机器学习模型评估指标。',
    '你如何确保数据分析的准确性和可靠性？',
    '请解释数据挖掘技术及其应用场景。',
    '你如何处理数据隐私和安全问题？',
    '你如何看待数据分析的发展趋势？'
  ]
};

const InterviewPage: React.FC = () => {
  // 基本状态
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [interviewComplete, setInterviewComplete] = useState(false);
  
  // 新增状态
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('basic');
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<string[]>([]);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  
  // 摄像头和录制相关状态
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [isMirroredView, setIsMirroredView] = useState(true); // 默认为自拍镜像模式
  
  // 弹框状态
  const [showRecordingConfirmModal, setShowRecordingConfirmModal] = useState(false);
  const [showRecordingStartModal, setShowRecordingStartModal] = useState(false);
  const [showRecordingCompleteModal, setShowRecordingCompleteModal] = useState(false);
  const [showRecordingErrorModal, setShowRecordingErrorModal] = useState(false);
  const [recordingErrorMessage, setRecordingErrorMessage] = useState('');
  const [showDownloadErrorModal, setShowDownloadErrorModal] = useState(false);
  const [downloadErrorMessage, setDownloadErrorMessage] = useState('');
  const [showBrowserSupportModal, setShowBrowserSupportModal] = useState(false);
  
  // Refs
  const setupVideoRef = useRef<HTMLVideoElement>(null);
  const interviewVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  
  // 语音合成和识别
  const speechSynthesis = window.speechSynthesis;
  
  // 启用摄像头
  const enableCamera = async (targetRef: React.RefObject<HTMLVideoElement | null>) => {
    try {
      // 如果已有流，先停止
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      const constraints = {
        video: { facingMode: "user" }, // 使用前置摄像头
        audio: false
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (targetRef && targetRef.current) {
        targetRef.current.srcObject = stream;
        targetRef.current.play().catch(err => console.error('视频播放失败:', err));
        streamRef.current = stream;
        setCameraEnabled(true);
        setCameraPermissionDenied(false);
      }
    } catch (err) {
      console.error('获取摄像头权限失败:', err);
      setCameraPermissionDenied(true);
    }
  };
  
  // 禁用摄像头
  const disableCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (setupVideoRef.current) {
      setupVideoRef.current.srcObject = null;
    }
    
    if (interviewVideoRef.current) {
      interviewVideoRef.current.srcObject = null;
    }
    
    setCameraEnabled(false);
  };
  
  // 切换摄像头
  const toggleCamera = () => {
    if (cameraEnabled) {
      disableCamera();
    } else {
      const targetRef = interviewStarted ? interviewVideoRef : setupVideoRef;
      enableCamera(targetRef);
    }
  };
  
  // 添加切换视角的函数
  const toggleCameraView = () => {
    setIsMirroredView(!isMirroredView);
  };
  
  // 初始化语音识别
  useEffect(() => {
    // 检查浏览器支持
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        speechRecognition.current = new SpeechRecognitionAPI();
        if (speechRecognition.current) {
          speechRecognition.current.continuous = true;
          speechRecognition.current.interimResults = true;
          speechRecognition.current.lang = 'zh-CN';
          
          speechRecognition.current.onresult = (event: SpeechRecognitionEvent) => {
            try {
              const transcript = Array.from(event.results)
                .map((result: SpeechRecognitionResult) => result[0])
                .map((result: SpeechRecognitionAlternative) => result.transcript)
                .join('');
              
              setUserInput(transcript);
            } catch (error) {
              console.error('处理语音识别结果时出错:', error);
            }
          };
          
          speechRecognition.current.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('语音识别错误:', event.error);
            setIsRecording(false);
          };
        }
      }
    }
    
    // 自动尝试初始化摄像头
    if (!cameraEnabled && !cameraPermissionDenied) {
      const targetRef = interviewStarted ? interviewVideoRef : setupVideoRef;
      enableCamera(targetRef).catch(err => {
        console.error('自动初始化摄像头失败:', err);
      });
    }
  }, [cameraEnabled, cameraPermissionDenied, interviewStarted]);
  
  // 修改清理资源的useEffect
  useEffect(() => {
    return () => {
      // 停止所有媒体流
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // 停止语音合成
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
      
      // 停止录音
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        try {
          mediaRecorderRef.current.stop();
        } catch (err) {
          console.error('停止录制失败:', err);
        }
      }
      
      // 释放录制的视频URL
      if (recordedVideo) {
        URL.revokeObjectURL(recordedVideo);
      }
    };
  }, [recordedVideo]);
  
  // 修改处理函数，使用简单录制方法
  const handleStartScreenRecording = () => {
    // 确保摄像头在录制前已经初始化
    if (cameraEnabled && interviewVideoRef.current && !interviewVideoRef.current.srcObject) {
      // 如果摄像头启用但视频元素没有流，重新初始化摄像头
      enableCamera(interviewVideoRef).catch(err => {
        console.error('录制前初始化摄像头失败:', err);
      });
    }
    
    // 显示确认弹框
    setShowRecordingConfirmModal(true);
  };
  
  // 确认开始录制
  const confirmStartRecording = () => {
    setShowRecordingConfirmModal(false);
    startSimpleScreenRecording().catch(err => {
      console.error('录制启动失败:', err);
      setRecordingErrorMessage('录制启动失败: ' + (err instanceof Error ? err.message : '未知错误'));
      setShowRecordingErrorModal(true);
    });
  };
  
  // 取消录制
  const cancelRecording = () => {
    setShowRecordingConfirmModal(false);
  };
  
  // 简化屏幕录制方法
  const startSimpleScreenRecording = async () => {
    try {
      // 先获取麦克风音频，确保在请求屏幕共享前已获得麦克风权限
      let micStream: MediaStream | null = null;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          },
          video: false
        });
        console.log('麦克风权限获取成功，音频轨道数量:', micStream.getAudioTracks().length);
      } catch (micErr) {
        console.warn('无法获取麦克风权限:', micErr);
        setRecordingErrorMessage('无法获取麦克风权限，录制将不包含您的声音。请检查浏览器麦克风权限设置。');
        setShowRecordingErrorModal(true);
      }

      // 创建一个简单的屏幕录制流
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'monitor', // 优先选择整个屏幕
        },
        audio: true // 尝试捕获系统声音
      });
      
      // 创建一个新的MediaStream来合并所有轨道
      const combinedStream = new MediaStream();
      
      // 添加屏幕视频轨道
      displayStream.getVideoTracks().forEach(track => {
        combinedStream.addTrack(track);
      });
      
      // 添加系统音频轨道
      displayStream.getAudioTracks().forEach(track => {
        combinedStream.addTrack(track);
      });
      
      // 添加麦克风音频轨道
      if (micStream && micStream.getAudioTracks().length > 0) {
        micStream.getAudioTracks().forEach(track => {
          combinedStream.addTrack(track);
          console.log('已添加麦克风音轨到合并流');
        });
      }
      
      // 检查合并后的流中的轨道
      console.log('合并后的流包含视频轨道:', combinedStream.getVideoTracks().length);
      console.log('合并后的流包含音频轨道:', combinedStream.getAudioTracks().length);
      
      // 添加错误处理和用户取消处理
      const videoTrack = combinedStream.getVideoTracks()[0];
      if (!videoTrack) {
        throw new Error('没有获取到视频轨道');
      }
      
      // 创建MediaRecorder实例，使用更兼容的编码格式
      let mediaRecorder;
      const mimeTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm;codecs=h264,opus',
        'video/webm',
        'video/mp4'
      ];
      
      // 检查浏览器支持的MIME类型
      let selectedMimeType = '';
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          console.log('使用录制格式:', selectedMimeType);
          break;
        }
      }
      
      // 创建MediaRecorder
      if (selectedMimeType) {
        mediaRecorder = new MediaRecorder(combinedStream, {
          mimeType: selectedMimeType,
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000
        });
      } else {
        mediaRecorder = new MediaRecorder(combinedStream);
        console.warn('使用默认录制格式');
      }
      
      mediaRecorderRef.current = mediaRecorder;
      
      // 收集录制的数据
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      // 录制完成时的处理
      mediaRecorder.onstop = () => {
        if (chunks.length > 0) {
          const blob = new Blob(chunks, {
            type: selectedMimeType || 'video/webm'
          });
          
          const url = URL.createObjectURL(blob);
          setRecordedVideo(url);
          
          // 显示录制完成弹框
          setShowRecordingCompleteModal(true);
        } else {
          setRecordingErrorMessage('录制失败：未捕获到任何数据');
          setShowRecordingErrorModal(true);
        }
        
        setIsScreenRecording(false);
        
        // 释放所有流
        combinedStream.getTracks().forEach(track => track.stop());
        displayStream.getTracks().forEach(track => track.stop());
        if (micStream) {
          micStream.getTracks().forEach(track => track.stop());
        }
      };
      
      // 开始录制
      mediaRecorder.start(1000); // 每秒收集一次数据
      setIsScreenRecording(true);
      setRecordedVideo(null); // 重置之前的录制视频
      
      // 监听录制停止事件
      videoTrack.addEventListener('ended', () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      });
      
      // 显示录制已开始的提示
      setShowRecordingStartModal(true);
      
    } catch (err: unknown) {
      console.error('开始录制失败:', err);
      
      // 更详细的错误处理
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setRecordingErrorMessage('录制权限被拒绝，请在浏览器提示中同时允许屏幕录制和麦克风权限');
        } else if (err.name === 'NotFoundError') {
          setRecordingErrorMessage('未找到可用的录制设备');
        } else if (err.name === 'AbortError') {
          console.log('用户取消了录制请求');
          // 用户取消不需要显示错误
          return;
        } else {
          setRecordingErrorMessage(`录制启动失败: ${err.message || '未知错误'}`);
        }
      } else {
        setRecordingErrorMessage('录制启动失败：未知错误');
      }
      
      setShowRecordingErrorModal(true);
      setIsScreenRecording(false);
    }
  };
  
  // 生成面试问题
  const generateInterviewQuestions = () => {
    let questionPool = [...interviewQuestions[selectedDifficulty as keyof typeof interviewQuestions]];
    
    // 添加公司特定问题
    if (selectedCompany && companySpecificQuestions[selectedCompany as keyof typeof companySpecificQuestions]) {
      questionPool = [
        ...questionPool,
        ...companySpecificQuestions[selectedCompany as keyof typeof companySpecificQuestions]
      ];
    }
    
    // 添加职位特定问题
    if (selectedPosition && technicalQuestions[selectedPosition as keyof typeof technicalQuestions]) {
      questionPool = [
        ...questionPool,
        ...technicalQuestions[selectedPosition as keyof typeof technicalQuestions]
      ];
    }
    
    // 随机选择问题
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, questionCount);
  };
  
  // 开始面试
  const startInterview = () => {
    const generatedQuestions = generateInterviewQuestions();
    setQuestions(generatedQuestions);
    setInterviewStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    
    // 重新初始化摄像头
    if (cameraEnabled) {
      // 先关闭现有摄像头
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // 延迟一点重新打开摄像头，确保DOM已更新
      setTimeout(() => {
        enableCamera(interviewVideoRef).catch(err => {
          console.error('面试开始时重新初始化摄像头失败:', err);
        });
      }, 300);
    }
    
    // 语音朗读第一个问题
    speakQuestion(generatedQuestions[0]);
  };
  
  // AI语音朗读问题
  const speakQuestion = (question: string) => {
    if (speechSynthesis) {
      // 停止当前正在播放的语音
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.lang = 'zh-CN';
      utterance.rate = 1;
      utterance.pitch = 1;
      
      utterance.onstart = () => {
        setIsAiSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsAiSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };
  
  // 开始录音
  const handleStartRecording = () => {
    if (speechRecognition.current) {
      speechRecognition.current.start();
      setIsRecording(true);
    } else {
      setShowBrowserSupportModal(true);
    }
  };
  
  // 停止录音
  const handleStopRecording = () => {
    if (speechRecognition.current) {
      speechRecognition.current.stop();
      setIsRecording(false);
    }
  };
  
  // 提交答案
  const handleSubmitAnswer = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = userInput;
    setAnswers(newAnswers);
    setUserInput('');
    
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      
      // 语音朗读下一个问题
      speakQuestion(questions[nextQuestion]);
    } else {
      // 面试结束，生成反馈
      setInterviewComplete(true);
      generateFeedback();
      
      // 如果正在录制，停止录制
      if (isScreenRecording) {
        stopScreenRecording();
      }
    }
  };
  
  // 生成反馈
  const generateFeedback = () => {
    // 这里可以实现AI反馈生成逻辑
    // 模拟AI生成反馈
    setTimeout(() => {
      const companySpecificFeedback = selectedCompany 
        ? `\n\n针对${selectedCompany}的面试表现：\n- 对公司文化和价值观的理解较为到位\n- 对公司业务领域的了解可以进一步加深\n- 回答问题时可以更多地结合公司的具体情况`
        : '';
        
      const positionSpecificFeedback = selectedPosition
        ? `\n\n针对${selectedPosition}职位的表现：\n- 专业技能展示较为充分\n- 可以进一步强调解决实际问题的经验\n- 对行业趋势的理解可以更加深入`
        : '';
        
      setFeedback(`
        面试表现评估：
        - 自我介绍清晰有条理，展示了相关的职业背景
        - 对问题的理解准确，回答条理清晰
        - 在描述过去经历时，可以更加突出解决问题的具体步骤和结果
        - 技能匹配度较高，但可以更加具体地结合职位要求
        - 职业规划合理，展示了持续学习的意愿
        
        语言表达：
        - 语速适中，表达流畅
        - 专业术语使用恰当
        - 回答问题时可以更加简洁，突出重点
        
        肢体语言：
        - 保持良好的眼神交流
        - 手势使用自然，增强表达效果
        - 整体姿态自信，给人留下积极印象${companySpecificFeedback}${positionSpecificFeedback}
        
        建议改进：
        - 回答问题时可以使用STAR法则（情境、任务、行动、结果）
        - 准备更多具体的工作成果数据和案例
        - 提问环节可以准备更有深度的问题
        - 对公司和行业的研究可以更加深入
        - 在回答中可以更多地展示自己的思考过程
      `);
    }, 2000);
  };
  
  // 重新开始面试
  const restartInterview = () => {
    setInterviewStarted(false);
    setInterviewComplete(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setUserInput('');
    setFeedback(null);
    setQuestions([]);
    setRecordedVideo(null);
    
    // 停止所有语音
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };
  
  // 重新朗读当前问题
  const repeatQuestion = () => {
    if (questions[currentQuestion]) {
      speakQuestion(questions[currentQuestion]);
    }
  };
  
  // 修改录制预览组件，添加事件处理
  const RecordingPreview = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    // 视频播放结束后重新初始化摄像头
    const handleVideoEvents = () => {
      if (cameraEnabled && interviewVideoRef.current && !interviewVideoRef.current.srcObject) {
        enableCamera(interviewVideoRef).catch(err => {
          console.error('视频播放后重新初始化摄像头失败:', err);
        });
      }
    };
    
    return (
      <div className="recording-preview">
        <h4>录制预览</h4>
        <video 
          ref={videoRef}
          src={recordedVideo || ''}
          controls
          className="recording-preview-video"
          onEnded={handleVideoEvents}
          onPause={handleVideoEvents}
        ></video>
        <div className="recording-preview-actions">
          <button 
            className="preview-recording-btn"
            onClick={downloadRecordedVideo}
          >
            下载录制
          </button>
          <button 
            className="preview-recording-btn preview-recording-btn-secondary"
            onClick={() => {
              setRecordedVideo(null);
              // 重新初始化摄像头
              if (cameraEnabled) {
                enableCamera(interviewVideoRef).catch(err => {
                  console.error('删除录制后重新初始化摄像头失败:', err);
                });
              }
            }}
          >
            删除录制
          </button>
        </div>
      </div>
    );
  };
  
  // 停止屏幕录制
  const stopScreenRecording = () => {
    if (mediaRecorderRef.current && isScreenRecording) {
      try {
        // 确保录制器处于录制状态
        if (mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      } catch (err) {
        console.error('停止录制失败:', err);
        setIsScreenRecording(false);
      }
    }
  };
  
  // 下载录制的视频
  const downloadRecordedVideo = () => {
    if (recordedVideo) {
      try {
        const a = document.createElement('a');
        a.href = recordedVideo;
        const dateStr = new Date().toLocaleString().replace(/[/\s:]/g, '-');
        a.download = `面试录像-${selectedCompany || '通用'}-${selectedPosition || '职位'}-${dateStr}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        console.error('下载录制视频失败:', err);
        setDownloadErrorMessage('下载录制视频失败，请重试');
        setShowDownloadErrorModal(true);
      }
    } else {
      setDownloadErrorMessage('没有可下载的录制视频');
      setShowDownloadErrorModal(true);
    }
  };
  
  return (
    <div className="muzli-interview">
      <div className="interview-container">
        <h1 className="interview-title">AI模拟面试助手</h1>
        <p className="interview-subtitle">提升面试技巧，增强自信表达，助您在求职路上脱颖而出</p>
        
        {!interviewStarted ? (
          <div className="interview-setup">
            <div className="setup-card">
              <h2 className="setup-title">设置您的面试</h2>
              
              <div className="setup-form">
                <div className="form-group">
                  <label htmlFor="company">目标公司</label>
                  <select 
                    id="company" 
                    value={selectedCompany} 
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="setup-select"
                  >
                    <option value="">通用面试</option>
                    <option value="阿里巴巴">阿里巴巴</option>
                    <option value="腾讯">腾讯</option>
                    <option value="百度">百度</option>
                    <option value="字节跳动">字节跳动</option>
                    <option value="华为">华为</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="position">目标职位</label>
                  <select 
                    id="position" 
                    value={selectedPosition} 
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="setup-select"
                  >
                    <option value="">通用职位</option>
                    <option value="前端开发">前端开发</option>
                    <option value="后端开发">后端开发</option>
                    <option value="产品经理">产品经理</option>
                    <option value="数据分析">数据分析</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="difficulty">面试难度</label>
                  <select 
                    id="difficulty" 
                    value={selectedDifficulty} 
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="setup-select"
                  >
                    <option value="basic">基础面试</option>
                    <option value="advanced">进阶面试</option>
                    <option value="expert">专家面试</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="questionCount">问题数量</label>
                  <select 
                    id="questionCount" 
                    value={questionCount} 
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="setup-select"
                  >
                    <option value="5">5题（约15分钟）</option>
                    <option value="10">10题（约30分钟）</option>
                    <option value="15">15题（约45分钟）</option>
                    <option value="20">20题（约60分钟）</option>
                  </select>
                </div>
              </div>
              
              <div className="camera-preview-container">
                <h3 className="camera-title">开启摄像头预览</h3>
                <div className="camera-preview">
                  <video 
                    key="setup-camera"
                    ref={setupVideoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`camera-video ${cameraEnabled ? 'active' : ''} ${isMirroredView ? 'mirrored' : ''}`}
                  ></video>
                  
                  {!cameraEnabled && !cameraPermissionDenied && (
                    <div className="camera-placeholder">
                      <div className="camera-icon">📷</div>
                      <p>开启摄像头可以帮助您更好地模拟真实面试环境</p>
                    </div>
                  )}
                  
                  {cameraPermissionDenied && (
                    <div className="camera-placeholder camera-error">
                      <div className="camera-icon">⚠️</div>
                      <p>无法访问摄像头，请检查浏览器权限设置</p>
                    </div>
                  )}
                  
                  {cameraEnabled && (
                    <button 
                      className="camera-view-toggle"
                      onClick={toggleCameraView}
                      title={isMirroredView ? "切换到面试官视角" : "切换到自拍视角"}
                    >
                      {isMirroredView ? "自拍视角" : "面试官视角"}
                    </button>
                  )}
                </div>
                
                <button 
                  className="camera-toggle-btn"
                  onClick={toggleCamera}
                >
                  {cameraEnabled ? '关闭摄像头' : '开启摄像头'}
                </button>
                
                <button 
                  className="muzli-hero-btn interview-start-btn"
                  onClick={startInterview}
                >
                  开始模拟面试
                </button>
              </div>
              
              <div className="setup-tips">
                <p>提示：</p>
                <ul>
                  <li>选择目标公司和职位可以获得更针对性的面试问题</li>
                  <li>面试过程中将使用AI语音提问，请确保您的设备支持音频播放</li>
                  <li>您可以使用文字或语音回答问题</li>
                  <li>开启摄像头可以帮助您更好地注意自己的表情和姿态</li>
                  <li>您可以录制整个面试过程，方便后续复盘</li>
                  <li>面试结束后，AI将为您提供详细的反馈和改进建议</li>
                </ul>
              </div>
            </div>
          </div>
        ) : !interviewComplete ? (
          <div className="interview-session">
            <div className="interview-header">
              <div className="interview-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${(currentQuestion / questions.length) * 100}%`}}
                  ></div>
                </div>
                <div className="progress-text">
                  问题 {currentQuestion + 1} / {questions.length}
                </div>
              </div>
            </div>
            
            <p className="interview-session-subtitle">沉着应对，展现最佳的自己</p>
            
            <div className="interview-content">
              <div className="interview-main">
                <div className="interview-question-card">
                  <div className="question-header">
                    <h3 className="question-title">
                      面试官提问：
                      {isAiSpeaking && <span className="speaking-indicator">AI正在说话...</span>}
                    </h3>
                    <button 
                      className="repeat-btn" 
                      onClick={repeatQuestion}
                      title="重新朗读问题"
                    >
                      🔊
                    </button>
                  </div>
                  
                  <p className="question-text">{questions[currentQuestion]}</p>
                  
                  <div className="answer-area">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="在这里输入您的回答..."
                      rows={6}
                      className="answer-input"
                    />
                    
                    <div className="record-controls">
                      <button 
                        className={`record-btn ${isRecording ? 'recording' : ''}`}
                        onClick={isRecording ? handleStopRecording : handleStartRecording}
                      >
                        {isRecording ? '停止录音' : '开始录音'}
                      </button>
                      <span className="record-tip">
                        {isRecording ? '正在录音...' : '或使用语音回答'}
                      </span>
                    </div>
                    
                    <div className="timer-display">
                      <div className="timer-icon">⏱️</div>
                      <div className="timer-text">建议回答时间：2-3分钟</div>
                    </div>
                    
                    <button 
                      className="muzli-hero-btn interview-submit-btn"
                      onClick={handleSubmitAnswer}
                      disabled={!userInput.trim()}
                    >
                      {currentQuestion < questions.length - 1 ? '提交并继续' : '完成面试'}
                    </button>
                  </div>
                </div>
              </div>
              
              {cameraEnabled && (
                <div className="interview-sidebar">
                  <div className="camera-container">
                    <video 
                      key="interview-camera"
                      ref={interviewVideoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className={`camera-video active ${isMirroredView ? 'mirrored' : ''}`}
                    ></video>
                    <div className="camera-label">您的摄像头</div>
                    <button 
                      className="camera-view-toggle"
                      onClick={toggleCameraView}
                      title={isMirroredView ? "切换到面试官视角" : "切换到自拍视角"}
                    >
                      {isMirroredView ? "自拍视角" : "面试官视角"}
                    </button>
                  </div>
                  
                  <div className="interview-tips">
                    <h4>面试提示</h4>
                    <ul>
                      <li>保持自然的表情和眼神交流</li>
                      <li>注意坐姿端正，展现自信</li>
                      <li>使用适当的手势增强表达</li>
                      <li>语速适中，表达清晰</li>
                    </ul>
                  </div>
                  
                  <div className="recording-controls">
                    <button 
                      className={`record-screen-btn ${isScreenRecording ? 'recording' : ''}`}
                      onClick={isScreenRecording ? stopScreenRecording : handleStartScreenRecording}
                    >
                      {isScreenRecording ? '停止录制' : '录制面试（含音频）'}
                    </button>
                    
                    {!isScreenRecording && !recordedVideo && (
                      <div className="recording-guide">
                        <p>录制提示：</p>
                        <ul>
                          <li>点击"录制面试（含音频）"后，请<strong>同时允许屏幕共享和麦克风权限</strong></li>
                          <li>请在弹出的权限对话框中勾选"共享音频"选项</li>
                          <li>请确保您的麦克风未静音，并且说话声音足够大</li>
                          <li>录制过程中摄像头会保持开启，方便您看到自己的表现</li>
                          <li>录制完成后可以直接在页面上预览和下载录像</li>
                        </ul>
                      </div>
                    )}
                    
                    {isScreenRecording && (
                      <div className="recording-indicator">
                        <div className="recording-dot"></div>
                        <span>正在录制中...</span>
                      </div>
                    )}
                    
                    {recordedVideo && !isScreenRecording && <RecordingPreview />}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="interview-feedback">
            {feedback ? (
              <>
                <p className="interview-session-subtitle">分析您的表现，持续提升面试能力</p>
                <div className="feedback-card interview-result">
                  <h3 className="feedback-title">AI面试反馈</h3>
                  <pre className="feedback-content">{feedback}</pre>
                  
                  <div className="feedback-summary">
                    <div className="rating-item">
                      <span className="rating-label">整体表现</span>
                      <div className="rating-stars">★★★★☆</div>
                    </div>
                    <div className="rating-item">
                      <span className="rating-label">专业能力</span>
                      <div className="rating-stars">★★★★☆</div>
                    </div>
                    <div className="rating-item">
                      <span className="rating-label">沟通表达</span>
                      <div className="rating-stars">★★★☆☆</div>
                    </div>
                    <div className="rating-item">
                      <span className="rating-label">问题解决</span>
                      <div className="rating-stars">★★★★☆</div>
                    </div>
                  </div>
                </div>
                
                {recordedVideo && (
                  <div className="recorded-video-container">
                    <h3 className="recorded-video-title">面试录像回放</h3>
                    <video 
                      src={recordedVideo} 
                      controls 
                      className="recorded-video"
                    ></video>
                    <button 
                      className="download-video-btn"
                      onClick={downloadRecordedVideo}
                    >
                      下载面试录像
                    </button>
                  </div>
                )}
                
                <div className="feedback-actions">
                  <button 
                    className="muzli-hero-btn interview-restart-btn"
                    onClick={restartInterview}
                  >
                    重新设置面试
                  </button>
                </div>
              </>
            ) : (
              <div className="feedback-loading">
                <div className="loading-spinner"></div>
                <p>AI正在分析您的面试表现...</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* 录制确认弹框 */}
      <Modal
        isOpen={showRecordingConfirmModal}
        title="开始录制"
        content={
          <div>
            <p>即将开始录制面试，请确保您将同时允许:</p>
            <ul>
              <li>屏幕共享权限</li>
              <li>麦克风权限</li>
            </ul>
            <p>这样才能同时录制画面和您的声音。准备好了吗？</p>
          </div>
        }
        onConfirm={confirmStartRecording}
        onCancel={cancelRecording}
        confirmText="开始录制"
        cancelText="取消"
      />
      
      {/* 录制开始提示弹框 */}
      <Modal
        isOpen={showRecordingStartModal}
        title="录制已开始"
        content={
          <div>
            <p>录制已开始！请注意以下事项：</p>
            <ul>
              <li>请确保您在说话时声音足够大</li>
              <li>确认麦克风未静音</li>
              <li>保持自然的表情和姿态</li>
            </ul>
          </div>
        }
        onConfirm={() => setShowRecordingStartModal(false)}
        onCancel={() => setShowRecordingStartModal(false)}
        confirmText="我知道了"
        cancelText="关闭"
      />
      
      {/* 录制完成弹框 */}
      <Modal
        isOpen={showRecordingCompleteModal}
        title="录制完成"
        content={
          <div>
            <p>录制已完成！您可以在页面下方预览并下载录制的视频。</p>
            <p>如果视频中没有您的声音，请检查:</p>
            <ul>
              <li>是否允许了麦克风权限</li>
              <li>麦克风是否静音</li>
              <li>说话声音是否足够大</li>
            </ul>
          </div>
        }
        onConfirm={() => setShowRecordingCompleteModal(false)}
        onCancel={() => setShowRecordingCompleteModal(false)}
        confirmText="我知道了"
        cancelText="关闭"
      />
      
      {/* 录制错误弹框 */}
      <Modal
        isOpen={showRecordingErrorModal}
        title="录制出错"
        content={
          <div>
            <p>{recordingErrorMessage}</p>
            <p>您可以尝试以下解决方法：</p>
            <ul>
              <li>检查浏览器权限设置</li>
              <li>确保麦克风正常工作</li>
              <li>尝试使用其他浏览器（推荐Chrome或Firefox）</li>
            </ul>
          </div>
        }
        onConfirm={() => setShowRecordingErrorModal(false)}
        onCancel={() => setShowRecordingErrorModal(false)}
        confirmText="我知道了"
        cancelText="关闭"
      />
      
      {/* 下载错误弹框 */}
      <Modal
        isOpen={showDownloadErrorModal}
        title="下载失败"
        content={
          <div>
            <p>{downloadErrorMessage}</p>
          </div>
        }
        onConfirm={() => setShowDownloadErrorModal(false)}
        onCancel={() => setShowDownloadErrorModal(false)}
        confirmText="我知道了"
        cancelText="关闭"
      />
      
      {/* 浏览器兼容性弹框 */}
      <Modal
        isOpen={showBrowserSupportModal}
        title="浏览器兼容性提示"
        content={
          <div>
            <p>您的浏览器不支持语音识别功能。</p>
            <p>请尝试使用以下浏览器：</p>
            <ul>
              <li>Google Chrome (推荐)</li>
              <li>Microsoft Edge</li>
              <li>Firefox (新版本)</li>
            </ul>
            <p>或者您可以直接使用文本输入来回答问题。</p>
          </div>
        }
        onConfirm={() => setShowBrowserSupportModal(false)}
        onCancel={() => setShowBrowserSupportModal(false)}
        confirmText="我知道了"
        cancelText="关闭"
      />
    </div>
  );
};

export default InterviewPage; 
import { useState, useRef, useEffect } from 'react';

import '../styles/home.css';
import logo from '../assets/logo.png';

// Базовый URL твоего R2
const VIDEO_BASE_URL = 'https://pub-d90782a2cc9c4ef6903dbc26fa37ea43.r2.dev/';

const months = [
  {
    id: 1,
    name: 'Январь',
    short: 'Янв',
    video: 'jan.mp4',
    title: 'Январь в Кыргызстане',
    description: 'Зимняя сказка с снегом и лыжами в Караколе. Теплые юрты, замерзшие озера. Температуры: -5°C до 3°C.'
  },
  {
    id: 2,
    name: 'Февраль',
    short: 'Фев',
    video: 'feb.mp4',
    title: 'Февраль в Кыргызстане',
    description: 'Сердце зимы: пушистый снег, горнолыжные курорты. Уютные кафе с горячим чаем. Температуры: -3°C до 5°C.'
  },
  {
    id: 3,
    name: 'Март',
    short: 'Мар',
    video: 'mar.mp4',
    title: 'Март в Кыргызстане',
    description: 'Весна пробуждается: первые цветы, праздник Навруз. Прогулки по природе. Температуры: 5°C до 12°C.'
  },
  {
    id: 4,
    name: 'Апрель',
    short: 'Апр',
    video: 'apr.mp4',
    title: 'Апрель в Кыргызстане',
    description: 'Тепло и зелень: цветущие луга, полноводные реки. Первые походы. Температуры: 10°C до 18°C.'
  },
  {
    id: 5,
    name: 'Май',
    short: 'Май',
    video: 'may.mp4',
    title: 'Май в Кыргызстане',
    description: 'Начало лета: сухая погода, трекинг и пикники. Номадские традиции. Температуры: 15°C до 23°C.'
  },
  {
    id: 6,
    name: 'Июнь',
    short: 'Июн',
    video: 'jun.mp4',
    title: 'Июнь в Кыргызстане',
    description: 'Солнечное лето: пляжи Иссык-Куля, конные прогулки. Фестивали. Температуры: 20°C до 28°C.'
  },
  {
    id: 7,
    name: 'Июль',
    short: 'Июл',
    video: 'jul.mp4',
    title: 'Июль в Кыргызстане',
    description: 'Пик сезона: юрты, спелые фрукты, трекинг в Тянь-Шане. Температуры: 22°C до 30°C.'
  },
  {
    id: 8,
    name: 'Август',
    short: 'Авг',
    video: 'aug.mp4',
    title: 'Август в Кыргызстане',
    description: 'Золотая пора: походы к озерам, сбор урожая. Фестивали. Температуры: 20°C до 28°C.'
  },
  {
    id: 9,
    name: 'Сентябрь',
    short: 'Сен',
    video: 'sep.mp4',
    title: 'Сентябрь в Кыргызстане',
    description: 'Золотая осень: трекинг, осенние базары. Меньше туристов. Температуры: 15°C до 25°C.'
  },
  {
    id: 10,
    name: 'Октябрь',
    short: 'Окт',
    video: 'oct.mp4',
    title: 'Октябрь в Кыргызстане',
    description: 'Яркая осень: цветные листья, спокойные прогулки. Температуры: 10°C до 18°C.'
  },
  {
    id: 11,
    name: 'Ноябрь',
    short: 'Ноя',
    video: 'nov.mp4',
    title: 'Ноябрь в Кыргызстане',
    description: 'Переход к зиме: первые снега, городские экскурсии. Температуры: 2°C до 10°C.'
  },
  {
    id: 12,
    name: 'Декабрь',
    short: 'Дек',
    video: 'dec.mp4',
    title: 'Декабрь в Кыргызстане',
    description: 'Новогодняя магия: снег, фестивали, катание на коньках. Температуры: -3°C до 5°C.'
  },
];

function Home() {
  const [currentMonth, setCurrentMonth] = useState(months[0]);
  const [previousMonth, setPreviousMonth] = useState<typeof months[0] | null>(null);
  const [isFading, setIsFading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const currentVideoRef = useRef<HTMLVideoElement>(null);

  // Исправляем 100vh на мобильных (особенно iOS)
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // Изменение месяца с плавным cross-fade
  const handleMonthChange = (month: typeof months[0]) => {
    if (month.id === currentMonth.id) return;
    setPreviousMonth(currentMonth);
    setIsFading(true);
    setCurrentMonth(month);
    setTimeout(() => {
      setPreviousMonth(null);
      setIsFading(false);
    }, 2000);
  };

  // Авто-переключение на следующий месяц по окончании видео
  const handleVideoEnded = () => {
    let nextId = currentMonth.id + 1;
    if (nextId > 12) nextId = 1;
    const nextMonth = months.find(m => m.id === nextId)!;
    handleMonthChange(nextMonth);
  };

  // Прогресс скролла
  useEffect(() => {
    const elem = scrollRef.current;
    if (!elem) return;
    const updateProgress = () => {
      const { scrollLeft, scrollWidth, clientWidth } = elem;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
      elem.classList.toggle('scrolled-to-end', scrollLeft + clientWidth >= scrollWidth - 10);
    };
    elem.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => elem.removeEventListener('scroll', updateProgress);
  }, []);

  // Mouse parallax effect (only for non-touch)
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    let targetX = 0, targetY = 0, targetScale = 1;
    let currentX = 0, currentY = 0, currentScale = 1;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      let x = (e.clientX - rect.left) / rect.width - 0.5;
      let y = (e.clientY - rect.top) / rect.height - 0.5;
      const dist = Math.sqrt(x * x + y * y);
      const curveFactor = 1 + dist * 0.5;
      x *= curveFactor;
      y *= curveFactor;
      targetX = x * 45;
      targetY = y * 45;
      targetScale = 1 + dist * 0.12;
    };
    const handleMouseLeave = () => {
      targetX = targetY = 0;
      targetScale = 1;
    };
    let rafId: number | null = null;
    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      currentScale += (targetScale - currentScale) * 0.15;
      container.querySelectorAll('.hero-video').forEach((video) => {
        (video as HTMLElement).style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
        (video as HTMLElement).style.transition = 'transform 0.1s ease-out';
      });
      rafId = requestAnimationFrame(animate);
    };
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    animate();
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Прелоад видео
  useEffect(() => {
    const preloadVideo = (videoName: string) => {
      const url = `${VIDEO_BASE_URL}${videoName}`;
      const v = document.createElement('video');
      v.preload = 'auto';
      v.src = url;
    };
    preloadVideo(currentMonth.video);
    const nextIndex = (currentMonth.id % months.length);
    preloadVideo(months[nextIndex].video);
  }, [currentMonth]);

  return (
    <>
      <header className="header">
        <div className="logo-wrapper">
          <img src={logo} alt="Кыргызстан" className="logo" />
        </div>
      </header>
      <main className="hero">
        <div className="video-container" ref={videoContainerRef}>
          {previousMonth && (
            <video
              className={`hero-video video-previous ${isFading ? 'fade-out' : ''}`}
              autoPlay
              muted
              playsInline
              preload="auto"
              key={`prev-${previousMonth.id}`}
            >
              <source src={`${VIDEO_BASE_URL}${previousMonth.video}`} type="video/mp4" />
            </video>
          )}
          <video
            ref={currentVideoRef}
            className={`hero-video video-current ${previousMonth ? 'fade-in' : ''}`}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            key={`curr-${currentMonth.id}`}
          >
            <source src={`${VIDEO_BASE_URL}${currentMonth.video}`} type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" />
        <div className="title-corner">
          {previousMonth && (
            <div className={`title-group title-previous ${isFading ? 'fade-out' : ''}`}>
              <h1 className="main-title">{previousMonth.title}</h1>
              <p className="subtitle">Горы. Озёра. Традиции.</p>
              <p className="description">{previousMonth.description}</p>
            </div>
          )}
          <div className={`title-group title-current ${previousMonth ? 'fade-in' : ''}`}>
            <h1 className="main-title">{currentMonth.title}</h1>
            <p className="subtitle">Горы. Озёра. Традиции.</p>
            <p className="description">{currentMonth.description}</p>
          </div>
        </div>
        <nav className="months-bar">
          <div className="months-scroll" ref={scrollRef}>
            {months.map((month) => (
              <button
                key={month.id}
                className={`month-btn ${currentMonth.id === month.id ? 'active' : ''}`}
                onClick={() => handleMonthChange(month)}
              >
                <span className="full-name">{month.name}</span>
                <span className="short-name">{month.short}</span>
              </button>
            ))}
            <div className="scroll-hint">
              <svg viewBox="0 0 24 24" className="scroll-arrow">
                <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-progress" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
        </nav>
      </main>
    </>
  );
}

export default Home;
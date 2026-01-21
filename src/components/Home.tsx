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
    description: 'Зимняя сказка окутывает Кыргызстан снежным покрывалом. В это время идеально кататься на лыжах в Караколе, наслаждаться тишиной замерзших озер и теплом гостеприимных юрт. Холодно, но волшебно – температуры от -5°C до 3°C, снежные пейзажи манят любителей зимних приключений!'
  },
  {
    id: 2,
    name: 'Февраль',
    short: 'Фев',
    video: 'feb.mp4',
    title: 'Февраль в Кыргызстане',
    description: 'Февраль – сердце зимы с пушистым снегом и свежим воздухом. Горнолыжные курорты в полном разгаре, а в городах уютные кафе с горячим чаем. Температуры от -3°C до 5°C, отличное время для спокойного отдыха и фото заснеженных гор.'
  },
  {
    id: 3,
    name: 'Март',
    short: 'Мар',
    video: 'mar.mp4',
    title: 'Март в Кыргызстане',
    description: 'Весна пробуждается! Снег тает, расцветают первые цветы, а 21 марта отмечают Навруз – праздник обновления с песнями, танцами и вкусными угощениями. Температуры от 5°C до 12°C, идеально для прогулок по просыпающейся природе и культурных фестивалей.'
  },
  {
    id: 4,
    name: 'Апрель',
    short: 'Апр',
    video: 'apr.mp4',
    title: 'Апрель в Кыргызстане',
    description: 'Апрель приносит тепло и зелень. Горные луга покрываются цветами, реки полноводны, а дожди освежают воздух. Температуры от 10°C до 18°C – время для первых походов, посещения каньонов и наслаждения расцветающей красотой Кыргызстана.'
  },
  {
    id: 5,
    name: 'Май',
    short: 'Май',
    video: 'may.mp4',
    title: 'Май в Кыргызстане',
    description: 'Май – начало лета с теплыми днями и сухой погодой. Высокогорья становятся доступны, меньше туристов, а природа в полном расцвете. Температуры от 15°C до 23°C, perfekt для трекинга, пикников у озер и знакомства с номадскими традициями.'
  },
  {
    id: 6,
    name: 'Июнь',
    short: 'Июн',
    video: 'jun.mp4',
    title: 'Июнь в Кыргызстане',
    description: 'Июнь – солнечное лето с фестивалями и пляжами на Иссык-Куле. Тепло, мало дождей, горные тропы открыты. Температуры от 20°C до 28°C – время для конных прогулок, купания в озерах и посещения ярмарок с свежими фруктами.'
  },
  {
    id: 7,
    name: 'Июль',
    short: 'Июл',
    video: 'jul.mp4',
    title: 'Июль в Кыргызстане',
    description: 'Пик сезона! Юрты на пастбищах, спелые фрукты, теплые ночи. Температуры от 22°C до 30°C, все аттракции доступны – трекинг в Тянь-Шане, фестивали, купание. Идеально для активного отдыха и погружения в кочевую культуру.'
  },
  {
    id: 8,
    name: 'Август',
    short: 'Авг',
    video: 'aug.mp4',
    title: 'Август в Кыргызстане',
    description: 'Август – золотая пора с отличной погодой и множеством событий. Горячие дни, прохладные вечера в горах. Температуры от 20°C до 28°C – время для походов к озерам Сон-Куль и Кель-Суу, фестивалей и сбора урожая.'
  },
  {
    id: 9,
    name: 'Сентябрь',
    short: 'Сен',
    video: 'sep.mp4',
    title: 'Сентябрь в Кыргызстане',
    description: 'Осень окрашивает пейзажи в золотые тона. Меньше туристов, приятная прохлада. Температуры от 15°C до 25°C – идеально для трекинга, фото осенних гор и посещения базаров с осенними дарами природы.'
  },
  {
    id: 10,
    name: 'Октябрь',
    short: 'Окт',
    video: 'oct.mp4',
    title: 'Октябрь в Кыргызстане',
    description: 'Октябрь – яркая осень с прохладным воздухом и красивыми видами. Листья меняют цвет, горы в тумане. Температуры от 10°C до 18°C – время для спокойных прогулок, сбора грибов и наслаждения тишиной природы.'
  },
  {
    id: 11,
    name: 'Ноябрь',
    short: 'Ноя',
    video: 'nov.mp4',
    title: 'Ноябрь в Кыргызстане',
    description: 'Ноябрь – переход к зиме, первые снега в горах. Уютные вечера, подготовка к праздникам. Температуры от 2°C до 10°C – подходит для городских экскурсий, музеев и теплых встреч с местными.'
  },
  {
    id: 12,
    name: 'Декабрь',
    short: 'Дек',
    video: 'dec.mp4',
    title: 'Декабрь в Кыргызстане',
    description: 'Декабрь – новогодняя магия с снегом и огнями. Зимние фестивали, катание на коньках. Температуры от -3°C до 5°C – время для праздничного настроения, горячих напитков и сказочных пейзажей.'
  },
];

function Home() {
  const [currentMonth, setCurrentMonth] = useState(months[0]);
  const [previousMonth, setPreviousMonth] = useState<typeof months[0] | null>(null);
  const [isFading, setIsFading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);

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
              loop
              playsInline
              preload="auto"
              key={`prev-${previousMonth.id}`}
            >
              <source src={`${VIDEO_BASE_URL}${previousMonth.video}`} type="video/mp4" />
            </video>
          )}
          <video
            className={`hero-video video-current ${previousMonth ? 'fade-in' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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
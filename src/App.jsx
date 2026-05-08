import { useEffect, useState } from 'react'
import './App.css'
import MainCanvas from './3D/mainCanvas'
import BgMusic from './music/BgMusic'
import About from './Page/About'
import Work from './Page/Work.jsx'
import UIHelp from './components/UIHelp'
import Contact from './Page/Contact.jsx'
import Loading from './Page/Loading.jsx'
import PhoneMin from './PhoneMin.jsx'
import EasterEgg01 from './Page/EasterEgg01.jsx'

function App() {
  const [page, setPage] = useState('scene')
  const [lang, setLang] = useState('En')
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  // 1. 新增手機端偵測狀態
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 偵測函式
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 初始化與監聽
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative w-screen h-screen bg-pink-100 transition-opacity duration-1000">

          {/* 2. 條件渲染：手機端與桌機端分流 */}
          {isMobile ? (
            <PhoneMin lang={lang} setPage={setPage} />
          ) : (
            <MainCanvas
              onEnterAbout={() => setPage('about')}
              onEnterWork={() => setPage('work')}
              onEnterContact={() => setPage('contact')}
              onEnterEasterEgg={() => setPage('easter-egg')}
              isPaused={page !== 'scene'}

            />
          )}

          {/* 彈窗內容：不論手機或桌機都共用這套邏輯 */}
          {page === 'about' && (
            <About onBack={() => setPage('scene')} lang={lang} />
          )}

          {page === 'work' && (
            <Work onBack={() => setPage('scene')} lang={lang} />
          )}

          {page === 'contact' && (
            <Contact onBack={() => setPage('scene')} lang={lang} />
          )}
          {page === 'easter-egg' && (
            <EasterEgg01 onBack={() => setPage('scene')} lang={lang} />
          )}

          <BgMusic isMuted={isMuted} />
          <UIHelp
            lang={lang}
            setLang={setLang}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
        </div>
      )}
    </>
  )
}

export default App
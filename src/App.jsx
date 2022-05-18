import React, {useEffect, useState,useMemo} from 'react'
import {
  Route,
  Routes,
    useLocation
} from "react-router-dom"
import {ConfigProvider} from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import NavBar from "@/components/NavBar";
import routes from '@/router'
function App() {
    const location = useLocation()
    const {pathname} = location
    const needNav = ['/','/data','/user']
    let [showNav,setShowNav] = useState(false)

    // useEffect(()=>{
    //     setShowNav(needNav.includes(pathname))
    // },[pathname])
    showNav = useMemo(
        () => needNav.includes(pathname),
        [pathname]
    )
  return <>
    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
        <Routes>
          {
            routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component/>} />)
          }
        </Routes>
    </ConfigProvider>
      <NavBar showNav={showNav}/>
  </>
}

export default App
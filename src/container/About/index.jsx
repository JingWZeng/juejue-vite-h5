import React from "react";
import Header from '@/components/Header'
import s from './style.module.less'
const About = ()=>{
    return<div className={s.about}>
        <Header title="关于我"/>
        <a href="https://myblog-six.vercel.app/">there is my Blog</a>
    </div>

}
export default About
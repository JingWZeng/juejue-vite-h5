import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'
import PropTypes from 'prop-types'
import { Icon,Popup } from 'zarm'
// import {Popup} from "@nutui/nutui-react";
// import '@nutui/nutui-react/dist/style.css'
import cx from 'classnames'
import { get } from '@/utils'

import s from './style.module.less'

// forwardRef 用于拿到父组件传入的 ref 属性，这样在父组件便能通过 ref 控制子组件。
const PopupType = forwardRef(({ onSelect }, ref) => {
    const [visible, setVisible] = useState(false); // 组件的显示和隐藏
    const [active, setActive] = useState('all'); // 激活的 type
    const [expense, setExpense] = useState([]); // 支出类型标签
    const [income, setIncome] = useState([]); // 收入类型标签

    useEffect( (x)=> {
        // 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
        get('/type/list').then(res=>{
            setExpense(res?.data?.list.filter(i => i.type === 1))
            setIncome(res?.data?.list.filter(i => i.type === 2))
        })
    }, [])


    useImperativeHandle(ref,()=>({
        show: () => {
            setVisible(true);
        },
        close: () => {
            setVisible(false);
        }
    }))

    // 选择类型回调
    const choseType = (item) => {
        setActive(item.id)
        setVisible(false)
        // 父组件传入的 onSelect，为了获取类型
        onSelect(item)
    };

    return<Popup
        visible={visible}
        direction="bottom"
        onMaskClick={() => setVisible(false)}
        destroy={false}
        mountContainer={() => document.body}
    >
        <div className={s.popupType}>
            <div className={s.header}>
                请选择类型
                <Icon type="wrong" className={s.cross} onClick={() => setVisible(false)} />
            </div>
            <div className={s.content}>
                <div onClick={() => choseType({ id: 'all' })} className={cx({ [s.all]: true, [s.active]: active == 'all' })}>全部类型</div>
                <div className={s.title}>支出</div>
                <div className={s.expenseWrap}>
                    {
                        expense.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
                    }
                </div>
                <div className={s.title}>收入</div>
                <div className={s.incomeWrap}>
                    {
                        income.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
                    }
                </div>
            </div>
        </div>
    </Popup>
});

PopupType.propTypes = {
    onSelect: PropTypes.func
}

export default PopupType;
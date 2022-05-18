import React, {forwardRef, useImperativeHandle, useState} from 'react'
import PropTypes from 'prop-types'
import { Popup, DatePicker  } from 'zarm'
import dayjs from 'dayjs'

const PopupDate = forwardRef(({ onSelect, mode = 'date' }, ref) => {
    const [visible, setVisible] = useState(false)
    const [now, setNow] = useState(new Date())

    const choseMonth = (item) => {
        setNow(item)
        setVisible(false)
        if (mode == 'month') {
            onSelect(dayjs(item).format('YYYY-MM'))
        } else if (mode == 'date') {
            onSelect(dayjs(item).format('YYYY-MM-DD'))
        }
    }

    useImperativeHandle(ref,()=>({
        show: () => {
            setVisible(true);
        },
        close: () => {
            setVisible(false);
        }
    }))
    return <Popup
        visible={visible}
        direction="bottom"
        onMaskClick={() => setVisible(false)}
        destroy={false}
        mountContainer={() => document.body}
    >
        <div>
            <DatePicker
                visible={visible}
                value={now}
                mode={mode}
                onOk={choseMonth}
                onCancel={() => setVisible(false)}
            />
        </div>
    </Popup>
});

PopupDate.propTypes = {
    mode: PropTypes.string, // 日期模式
    onSelect: PropTypes.func, // 选择后的回调
}

export default PopupDate;
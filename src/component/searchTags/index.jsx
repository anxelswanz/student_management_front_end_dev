/**
 * Component Name: searchTags
 * Description: It is used to implement a dynamic label selection function, 
 * which is usually used to search and select labels, in this case, course modules. 
 * The user can enter text in the text box and the component will dynamically display a list of matching module names based on the input, 
 * from which the user can select one or more modules, and the selected modules will be displayed as labels below the text box.
 * Author: Qianfeng Zhang
 * Created Date: 2024-04-25
 * Modified By: Ronghui Zhong
 * Last Modified: 2024-04-26
 */


import { TextField } from '@mui/material';
import { useState } from 'react';
import { Tag } from 'antd';
import "./index.scss"
const arr = [
    { id: "EM00001", name: "Engineering Mathematics and Systems Modelling" },
    { id: "FP00002", name: "Foundations of Programming" },
    { id: "EC00003", name: "Electrical Circuits and Machines" },
    { id: "MS00004", name: "Statics and Structures" },
    { id: "EA00005", name: "Electronic Circuits and Applications" },
    { id: "T100006", name: "Thermofluids" }
]

const SearchTags = (props) => {
    const [targs, setTargs] = useState({
        data: [],
        val: ""
    });
    const [seleList, setList] = useState({
        showList: [],
        showState: false
    })

    const handleChange = (event, one = false) => {
        let value = one ? event : event.target.value;
        let regex = new RegExp(value, "i");
        const newList = arr.filter(item => item.name.match(regex));
        setTargs({ ...targs, val: value });
        setList({ ...seleList, showList: newList, showState: true })
        console.log(targs)
    };
    //点击添加标签
    const addTag = (data) => {
        console.log(2)
        if (targs.data.length) {
            let existence = targs.data.some(item => item.id === data.id);
            if (existence) return;
        }
        let tg = [...targs.data];
        tg.push(data)
        setTargs({ ...targs, data: tg });
        switchList(false)
        props.setTags(tg)
    }
    //点击删除标签
    const delTag = (id) => {
        const temp = targs.data.filter(item => item.id !== id);
        setTargs({ ...targs, data: temp });
        props.setTags(temp)
    }
    const switchList = (state) => {
        setList({ ...seleList, showState: state })
    }
    const blur = (e) => {
        setTimeout(() => {
            switchList(false);
        }, 320)
    }
    const focus = () => {
        switchList(true);
        handleChange(targs.val, true)
    }
    return (
        <div className='SearchTags'>
            {
                !seleList.showState ? '' : <ul className="search-box">

                    {seleList.showList.map((item, index) => {
                        return (
                            <li key={item.id} onClick={() => addTag(item)}>{item.name}</li>
                        )
                    })}
                </ul>
            }
            <TextField
                margin="normal"
                required
                fullWidth
                id="ModuleId"
                label="Module ID"
                name="ModuleId"
                value={targs.val}
                onChange={handleChange}
                onBlur={blur}
                onFocus={focus}
            />
            {
                !targs.data.length ? '' : (
                    <div className="targs">
                        {
                            targs.data.map(item => {
                                return (
                                    <Tag key={item.id} closable={true} onClose={() => delTag(item.id)}>{item.name}</Tag>
                                )
                            })
                        }

                    </div>
                )
            }

        </div>
    )
}


export default SearchTags;



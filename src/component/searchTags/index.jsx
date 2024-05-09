/**
 * Component Name: searchTags
 * Description: It is used to implement a dynamic label selection function, 
 * which is usually used to search and select labels, in this case, course modules. 
 * The user can enter text in the text box and the component will dynamically display a list of matching module names based on the input, 
 * from which the user can select one or more modules, and the selected modules will be displayed as labels below the text box.
 * Author: Qianfeng Zhang
 * Created Date: 2024-04-30
 */

import { TextField } from '@mui/material';
import { useState } from 'react';
import { Tag } from 'antd';
import "./index.scss";

const arr = [
    //...array items
    { programme_id: "E01", programme_name: "Electronics Hardware" },
    { programme_id: "E02", programme_name: "Electromechanical" },
    { programme_id: "M01", programme_name: "Mechanical" },
    { programme_id: "P01", programme_name: "Postgraduate Year1" },
    { programme_id: "P02", programme_name: "Postgraduate Year2" },
    { programme_id: "S01", programme_name: "Software" },
    { programme_id: "U01", programme_name: "Undergraduate Year1" },
    { programme_id: "U02", programme_name: "Undergraduate Year2" }
];

const SearchTags = (props) => {
    const [targs, setTargs] = useState({
        data: [],
        val: ""
    });
    const [seleList, setList] = useState({
        showList: [],
        showState: false
    });

    const handleChange = (event, one = false) => {
        let value = one ? event : event.target.value;
        let regex = new RegExp(value, "i");
        const newList = arr.filter(item => item.programme_name.match(regex));
        setTargs({ ...targs, val: value });
        setList({ ...seleList, showList: newList, showState: true });
    };

    //Click to add tags
    const addTag = (data) => {
        if (targs.data.length) {
            let existence = targs.data.some(item => item.programme_id === data.programme_id);
            if (existence) return;
        }
        let tg = [...targs.data];
        tg.push(data);
        setTargs({ ...targs, data: tg });
        switchList(false);
        props.setTags(tg);
    };

    //Click to remove the label
    const delTag = (programme_id) => {
        const temp = targs.data.filter(item => item.programme_id !== programme_id);
        setTargs({ ...targs, data: temp });
        props.setTags(temp);
    };

    const switchList = (state) => {
        setList({ ...seleList, showState: state });
    };

    const blur = () => {
        setTimeout(() => {
            switchList(false);
        }, 320);
    };

    const focus = () => {
        switchList(true);
        handleChange(targs.val, true);
    };

    return (
        <div className='SearchTags'>
            {seleList.showState && (
                <ul className="search-box">
                    {seleList.showList.map(item => (
                        <li key={item.programme_id} onClick={() => addTag(item)}>
                            {item.programme_id}. {item.programme_name} 
                        </li>
                    ))}
                </ul>
            )}
            <TextField
                //...TextField Properties
                margin="normal"
                required
                fullWidth
                id="ProgrammeID"
                label="Programme ID"
                name="ProgrammeID"
                value={targs.val}
                onChange={handleChange}
                onBlur={blur}
                onFocus={focus}
            />
            {targs.data.length > 0 && (
                <div className="targs">
                    {targs.data.map(item => (
                        <Tag key={item.programme_id} closable onClose={() => delTag(item.programme_id)}>
                            {item.programme_id}: {item.programme_name} 
                        </Tag>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchTags;

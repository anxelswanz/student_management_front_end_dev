/**
 * Component Name: Login_register
 * Description: This component can be used on an application's login or registration page, and can be flexibly adapted to different scenarios by modifying the content passed in by the children.
 * Author: Qianfeng Zhang
 * Created Date: 2024-04-17
 */

import './index.scss';
import "./loginAndReg.scss"

const Login_register = ({bgimg,children }) => {
    console.log(bgimg)
    return (
        <div className='main'>
            <div className="inner">
                <div className="containter">
                    <div className={'img'} style={{backgroundImage:`url(${bgimg})`}}>
                       <div className={'log'}></div>
                    </div>
                    <div className="right-content">
                    {children}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login_register;
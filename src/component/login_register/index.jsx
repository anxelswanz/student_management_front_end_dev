/**
 * Component Name: Login_register
 * Description: A layout component for displaying login and registration pages. This component takes two arguments: bgimg and children..
 * Author: Qianfeng Zhang
 * Created Date: 2024-04-25
 * Modified By: Ronghui Zhong
 * Last Modified: 2024-04-26
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
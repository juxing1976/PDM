// src/components/NavButton.tsx
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
// import './NavButton.css'
 
// 定义组件的 props 类型
interface NavButtonProps extends LinkProps {
    children: React.ReactNode; // 子元素类型
}
 
// 定义组件
const NavButton: React.FC<NavButtonProps> = ({ to, children }) => {
    return (
        <Link to={to} className="common-button nav-button">
            {children}
        </Link>
    );
};
 
export default NavButton;
import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css";
import styles from "./SideNav.module.css";
import icons from "../icons"

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        const { 
            speed, speedActive, 
            male, maleActive, people,
        } = icons;
        
        this.navList = [];
        this.navList.push({
            icon: speed,
            activeIcon: speedActive,
            text: "Dashboard",
            exact: true,
            href: "/",
            id: 1,
        });

        if ( window._frontConfig.DEBUG ) {
            // Development
            this.navList.push({
                icon: male,
                activeIcon: maleActive,
                text: "API Dev",
                href: "/apidev",
                id: 5,
            });
        }
            
        this.navList.push({
            icon: people,
            text: 'LogOut',
            click: this.props.onLogOut,
            id: 4,
        });
    }

    render(){
        return (
            <div className={`${styles.sidenav} sidebar-nav-wrapper`}>

                <div className={`${styles.logoContainer} logo-container`}>
                    <img className={styles.logoImg} src="/logo.png" alt="Snj SPA" />
                </div>

                <div className="flex-column">
                    {
                        this.navList.map((navItem) => {
                            const { icon, activeIcon, text, exact, href, click, id } = navItem;
                            return (
                                href
                                ?
                                <div className={styles.navItem} key={id}>
                                    <NavLink 
                                        to={href} 
                                        exact={exact}
                                        activeClassName="selected" 
                                        className={`${styles.linkWrapper} side-nav-item`}
                                        >
                                        <i className={`${styles.icon} nav-icon`}>
                                            {icon}
                                        </i>
                                        <i className={`${styles.icon} nav-active-icon`}>
                                                {activeIcon || icon}
                                        </i>
                                        {text}
                                    </NavLink>
                                </div>
                                :
                                <div className={styles.navItem} key={id}>
                                    <div onClick={click || (() => {})} className={`${styles.linkWrapper} side-nav-link`}>
                                        <i className={styles.icon}>
                                            {icon}
                                        </i>
                                        {text}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>

                <div onClick={() => document.body.classList.toggle('sidebar-collapsed')} className={`${styles.collapse} collapseBtn`}>
                    <i>{icons.arrowDown}</i>
                </div>

            </div>
        );
    }
}

export default SideNav;

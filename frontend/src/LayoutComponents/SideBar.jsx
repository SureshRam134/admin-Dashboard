import LOGO from '../assets/logo.png'
import { useState } from "react";
import '../style/SideBar.css'
import { NavLink, useNavigate } from "react-router-dom";
const SideBar = () => {
    const navigate = useNavigate()

    const [toggle, setToggle] = useState(false)
    const toggleHandleFunction = () => {
        setToggle(!toggle)
    }

    const [navItem, setNavItems] = useState([
        {
            title: "Home",
            icons: (isActive) => (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 4.08975L15.75 10.371V17.25H11.25V12.75H6.75V17.25H2.25V10.371L9 4.08975ZM18 8.361L9 0L0 8.34975L1.02075 9.4485L9 2.0475L16.9792 9.45975L18 8.361Z" fill={isActive ? "#6E39CB" : "#000000"} />
                </svg>
            ),
            navs: [
                {
                    name: "Dashbord",
                    link: "/admin/",
                },
                {
                    name: "User",
                    link: "/admin/user",
                },
            ]

        },
        {
            title: "Pages",
            icons: (isActive) => (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.308 6C10.308 6 11.4495 0 7.80675 0H1.5V18H16.5V8.25C16.5 5.68575 12.5648 5.44125 10.308 6ZM13.5 14.25H4.5V13.5H13.5V14.25ZM13.5 12H4.5V11.25H13.5V12ZM13.5 9.75H4.5V9H13.5V9.75ZM10.926 0.05625C12.5775 0.93675 15.3795 3.7185 16.5 5.217C15.5355 4.542 13.467 3.97425 11.9318 4.33275C12.0983 3.23175 11.793 0.93225 10.926 0.05625Z" fill={isActive ? "#6E39CB" : "#000000"} />
                </svg>
            ),

            navs: [
                {
                    name: "Product",
                    link: "/admin/product",
                },
                {
                    name: "Payment",
                    link: "/admin/payment",
                },
            ]
        },
        {
            title: "Pages",
            icons: (isActive) => (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.308 6C10.308 6 11.4495 0 7.80675 0H1.5V18H16.5V8.25C16.5 5.68575 12.5648 5.44125 10.308 6ZM13.5 14.25H4.5V13.5H13.5V14.25ZM13.5 12H4.5V11.25H13.5V12ZM13.5 9.75H4.5V9H13.5V9.75ZM10.926 0.05625C12.5775 0.93675 15.3795 3.7185 16.5 5.217C15.5355 4.542 13.467 3.97425 11.9318 4.33275C12.0983 3.23175 11.793 0.93225 10.926 0.05625Z" fill={isActive ? "#6E39CB" : "#000000"} />
                </svg>
            ),

            navs: [
                {
                    name: "About",
                    link: "/admin/about",
                },
                {
                    name: "Contact",
                    link: "/admin/contact",
                },
            ]
        },
        {
            title: "Pages",
            icons: (isActive) => (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.308 6C10.308 6 11.4495 0 7.80675 0H1.5V18H16.5V8.25C16.5 5.68575 12.5648 5.44125 10.308 6ZM13.5 14.25H4.5V13.5H13.5V14.25ZM13.5 12H4.5V11.25H13.5V12ZM13.5 9.75H4.5V9H13.5V9.75ZM10.926 0.05625C12.5775 0.93675 15.3795 3.7185 16.5 5.217C15.5355 4.542 13.467 3.97425 11.9318 4.33275C12.0983 3.23175 11.793 0.93225 10.926 0.05625Z" fill={isActive ? "#6E39CB" : "#000000"} />
                </svg>
            ),

            navs: [
                {
                    name: "Purchase",
                    link: "/admin/purchase",
                },
                {
                    name: "Pure",
                    link: "",
                },
                
            ]
        },
    ])
    // const [navIndex, setNavIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const downArrowFunction = (item, index) => {
        setActiveIndex(activeIndex === index ? null : index)
        console.log(index, "index9879");
        if (index < 1) {
            navigate(`${item.navs[0].link}`, { state: { title: item.navs[0].name } })
          
        }else{
            navigate(`${item.navs[0].link}`, { state: { title: item.navs[0].name } })
        }
    }
    const currentPageNavgation = (nav) => {
        navigate(`${nav.link}`, { state: { title: nav.name } })
    
    }




    return (

        <>

            <div className="w-[218px] h-[100vh] py-[50px] bg-primary-light relative">
                <button className='absolute top-15 right-5.5'
                onClick={toggleHandleFunction}
                >

                    {toggle ?
                        <svg width="14" height="14" viewBox="0 0 14 14">
                            <g transform="rotate(-90 7 7)">
                                <path d="M0 4.27583L1.65025 2.625L7.00233 8.07275L12.3497 2.625L14 4.27583L7.00233 11.375L0 4.27583Z" fill="#3A3541" />
                            </g>
                        </svg> :
                        <svg width="14" height="14" viewBox="0 0 14 14">
                            <g transform="rotate(90 7 7)">
                                <path d="M0 4.27583L1.65025 2.625L7.00233 8.07275L12.3497 2.625L14 4.27583L7.00233 11.375L0 4.27583Z" fill="#6E39CB" />
                            </g>
                        </svg>
                    }
                </button>
                <img src={LOGO} className='w-[78px] h-[53.65px] mx-auto mb-[50px]' alt="app logo" />

                <div className="pe-[12px] ms-[25px]">
                    {
                        navItem.map((item, index) => (
                            <div key={index}>
                                <p
                                    onClick={() => { downArrowFunction(item, index) }}
                                    className={`${activeIndex === index ? "home-side-box text-primary-violet bg-secondary-violet" : "text-primary-dark bg-primary-light"} flex items-center relative text-[14.22px] font-semibold px-[8px] py-[11.5px] mb-[10px] rounded-[8px]`}
                                >
                                    <span className="pe-[8px]">
                                        {item.icons(activeIndex === index)}
                                    </span>

                                    {item.title}

                                    <span className="absolute right-[8px] "
                                    >
                                        {
                                            activeIndex === index ?
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 9.72417L1.65025 11.375L7.00233 5.92725L12.3497 11.375L14 9.72417L7.00233 2.625L0 9.72417Z" fill="#6E39CB" />
                                                </svg>
                                                :
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 4.27583L1.65025 2.625L7.00233 8.07275L12.3497 2.625L14 4.27583L7.00233 11.375L0 4.27583Z" fill="#3A3541" />
                                                </svg>
                                        }
                                    </span>
                                </p>


                                {
                                    activeIndex === index &&
                                    <ul className="ml-6 my-5 flex flex-col gap-2">
                                        {
                                            item.navs?.map((nav, i) => (
                                                <li
                                                    className={location.pathname === nav.link ? "text-primary-violet" : "text-primary-dark"}
                                                    key={i} onClick={() => { currentPageNavgation(nav, i) }}>{nav.name}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                }
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default SideBar;
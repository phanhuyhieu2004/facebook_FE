import React, { useEffect, useState  } from "react";
import "./HomeHeader.css";
import {Link,  useNavigate} from "react-router-dom";

import {Avatar} from "@mui/material";
import {useAuth} from "../../AuthContext";
function HomeHeader() {
    const { user ,logout} = useAuth();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState('home');
    const [profileDown, setProfileDown] = useState(false);



    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
    };
    const renderNotifications = () => {
        if (notificationsOpen) {
            setNotificationsOpen(false)
            document.getElementsByClassName('dropdown-content2')[0].classList.remove('block')
        } else {
            setNotificationsOpen(true)

            document.getElementsByClassName('dropdown-content2')[0].classList.add('block');
        }
    }
    const renderProfile = () => {
        if (profileDown) {
            setProfileDown(false)
            document.getElementsByClassName('dropdown-content')[0].classList.remove('block');
        } else {
            setProfileDown(true);
            setNotificationsOpen(false)
            document.getElementsByClassName('dropdown-content2')[0].classList.remove('block');
            document.getElementsByClassName('dropdown-content')[0].classList.add('block');
        }
    }
    const handleLogout = () => {
        logout();
    }
    return (
        <div className="homeHeader">
            <div className="homeHeaderLogoAndSearch">
                <Link to="/">
                    <img src="https://i.ibb.co/72dN4JJ/Facebook-icon-2019-1.png" class="homeHeader__logo"/>
                </Link>

                <div className="homeHeader__search">
                    <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                    <input type="text" className="searchBox" placeholder="Search Facebook" style={{paddingLeft: "40px"}}
                    />
                </div>



            </div>
            <div className="homeHeader__pages">
                <div className="home" onClick={() => handleIconClick('home')}>
                    <Link to="/home">
                        <svg viewBox="0 0 28 28" className={`PagesIcon ${selectedIcon === 'home' && "selected"}`}
                             height="28" width="28">
                            <path
                                d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path>
                        </svg>
                    </Link>
                </div>
                <div className="friends" onClick={() => handleIconClick('friends')}>
                    <Link to="/friends">
                        <svg viewBox="0 0 28 28" className={`PagesIcon ${selectedIcon === 'friends' && "selected"}`}
                             height="28" width="28">
                            <path
                                d="M12.496 5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5zm-3 5a3 3 0 0 1 3-3h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1zm12-9.5a5.04 5.04 0 0 0-.37.014 1 1 0 0 0 .146 1.994c.074-.005.149-.008.224-.008h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-3.398a1 1 0 1 0 0 2h3.398a3 3 0 0 0 3-3 5 5 0 0 0-5-5H14.5z"></path>
                        </svg>

                    </Link>
                </div>
                <div className="watch" onClick={() => handleIconClick('watch')}>
                    <Link to="/watch">
                        <svg viewBox="0 0 28 28" className={`PagesIcon ${selectedIcon === 'watch' && "selected"}`}
                             height="28" width="28">
                            <path
                                d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.163 11.654C17.612 11.924 17.612 12.575 17.163 12.846ZM21.75 20.25C22.992 20.25 24 19.242 24 18L24 6.5C24 5.258 22.992 4.25 21.75 4.25L6.25 4.25C5.008 4.25 4 5.258 4 6.5L4 18C4 19.242 5.008 20.25 6.25 20.25L21.75 20.25ZM21.75 21.75 6.25 21.75C4.179 21.75 2.5 20.071 2.5 18L2.5 6.5C2.5 4.429 4.179 2.75 6.25 2.75L21.75 2.75C23.821 2.75 25.5 4.429 25.5 6.5L25.5 18C25.5 20.071 23.821 21.75 21.75 21.75Z"></path>
                        </svg>
                    </Link>
                </div>
                <div className="market" onClick={() => handleIconClick('market')}>
                    <Link to="/market">
                        <svg viewBox="0 0 28 28" className={`PagesIcon ${selectedIcon === 'market' && "selected"}`}
                             height="28" width="28">
                            <path
                                d="M17.5 23.75 21.75 23.75C22.164 23.75 22.5 23.414 22.5 23L22.5 14 22.531 14C22.364 13.917 22.206 13.815 22.061 13.694L21.66 13.359C21.567 13.283 21.433 13.283 21.34 13.36L21.176 13.497C20.591 13.983 19.855 14.25 19.095 14.25L18.869 14.25C18.114 14.25 17.382 13.987 16.8 13.506L16.616 13.354C16.523 13.278 16.39 13.278 16.298 13.354L16.113 13.507C15.53 13.987 14.798 14.25 14.044 14.25L13.907 14.25C13.162 14.25 12.439 13.994 11.861 13.525L11.645 13.35C11.552 13.275 11.419 13.276 11.328 13.352L11.155 13.497C10.57 13.984 9.834 14.25 9.074 14.25L8.896 14.25C8.143 14.25 7.414 13.989 6.832 13.511L6.638 13.351C6.545 13.275 6.413 13.275 6.32 13.351L5.849 13.739C5.726 13.84 5.592 13.928 5.452 14L5.5 14 5.5 23C5.5 23.414 5.836 23.75 6.25 23.75L10.5 23.75 10.5 17.5C10.5 16.81 11.06 16.25 11.75 16.25L16.25 16.25C16.94 16.25 17.5 16.81 17.5 17.5L17.5 23.75ZM3.673 8.75 24.327 8.75C24.3 8.66 24.271 8.571 24.238 8.483L23.087 5.355C22.823 4.688 22.178 4.25 21.461 4.25L6.54 4.25C5.822 4.25 5.177 4.688 4.919 5.338L3.762 8.483C3.729 8.571 3.7 8.66 3.673 8.75ZM24.5 10.25 3.5 10.25 3.5 12C3.5 12.414 3.836 12.75 4.25 12.75L4.421 12.75C4.595 12.75 4.763 12.69 4.897 12.58L5.368 12.193C6.013 11.662 6.945 11.662 7.59 12.193L7.784 12.352C8.097 12.609 8.49 12.75 8.896 12.75L9.074 12.75C9.483 12.75 9.88 12.607 10.194 12.345L10.368 12.2C11.01 11.665 11.941 11.659 12.589 12.185L12.805 12.359C13.117 12.612 13.506 12.75 13.907 12.75L14.044 12.75C14.45 12.75 14.844 12.608 15.158 12.35L15.343 12.197C15.989 11.663 16.924 11.663 17.571 12.197L17.755 12.35C18.068 12.608 18.462 12.75 18.869 12.75L19.095 12.75C19.504 12.75 19.901 12.606 20.216 12.344L20.38 12.208C21.028 11.666 21.972 11.666 22.62 12.207L23.022 12.542C23.183 12.676 23.387 12.75 23.598 12.75 24.097 12.75 24.5 12.347 24.5 11.85L24.5 10.25ZM24 14.217 24 23C24 24.243 22.993 25.25 21.75 25.25L6.25 25.25C5.007 25.25 4 24.243 4 23L4 14.236C2.875 14.112 2 13.158 2 12L2 9.951C2 9.272 2.12 8.6 2.354 7.964L3.518 4.802C4.01 3.563 5.207 2.75 6.54 2.75L21.461 2.75C22.793 2.75 23.99 3.563 24.488 4.819L25.646 7.964C25.88 8.6 26 9.272 26 9.951L26 11.85C26 13.039 25.135 14.026 24 14.217ZM16 23.75 16 17.75 12 17.75 12 23.75 16 23.75Z"></path>
                        </svg>
                    </Link>
                </div>
                <div className="groups" onClick={() => handleIconClick('groups')}>
                    <Link to="/groups">
                        <svg viewBox="0 0 28 28" className={`PagesIcon ${selectedIcon === 'groups' && "selected"}`}
                             height="28" width="28">
                            <path
                                d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.274 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.878 19L21.364 19C21.139 19 20.97 18.802 20.997 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.667 15.491 20.067 14.591 19.899 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.441 13.5 12.828 13.5L15.172 13.5ZM16.75 9C16.75 10.655 15.517 12 14 12 12.484 12 11.25 10.655 11.25 9 11.25 7.15 12.304 6 14 6 15.697 6 16.75 7.15 16.75 9Z"></path>
                        </svg>
                    </Link>
                </div>
            </div>

            <div className="homeHeader__otherIcons">

                <div className="round">
                    <svg viewBox="0 0 28 28" alt="" className="messengerIcon" height="20" width="20">
                        <path
                            d="  M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5
                    1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0
                    21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0
                    5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0
                    0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0
                    0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5
                    0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0
                    5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0
                    13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0
                    13.5 9h-3z"></path>
                    </svg>

                </div>

                <div className="round">
                    <svg viewBox="0 0 28 28" alt="" className="messengerIcon" height="20" width="20">
                        <path
                            d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path>
                    </svg>
                </div>

                <div className="round" onClick={renderNotifications}>
                    <svg viewBox="0 0 28 28" alt="" className={`notificationsIcon ${notificationsOpen && "blue"}`}
                         height="20" width="20">
                        <path
                            d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path>
                    </svg>
                </div>
                <div className="dropdown-content2">
                    <h1>Notifications</h1>


                </div>
                <div class="round" onClick={renderProfile}>
                    {/*<a href={`/${user.username}/${user.id}`}>*/}
                    <Avatar className="ProfileAvatar"
                            src={user.avatar}/>

                    {/*</a>*/}
                    <div class="dropdown-content">
                        <a href="#">
                            <div class="optionDrop">
                                <img src={user.avatar}
                                     class="Avatar"/>
                                <div class="sideinfoDropAvatar">
                                    <h1>{user?.username}</h1>
                                    <p>See your profile</p>
                                </div>
                            </div>
                        </a>
                        <div class="hr"/>
                        <a href="#">
                            <div class="optionDrop">
                                <div class="iconDrop">
                                    <i className="fa-regular fa-message"></i>
                                </div>
                                <div class="sideinfoDrop">
                                    <h1>Give Feedback</h1>

                                </div>
                            </div>
                        </a>
                        <div class="hr"/>
                        <a href="#">
                            <div class="optionDrop">
                                <div class="iconDrop">
                                    <i class="fa-solid fa-gear"></i></div>
                                <h1>Settings & Privacy</h1>
                            </div>
                        </a>
                        <a href="#">
                            <div class="optionDrop">
                                <div class="iconDrop">
                                    <i className="fa-solid fa-circle-info"></i></div>
                                <h1>Help & Support</h1>
                            </div>
                        </a>
                        <a href="#">
                            <div class="optionDrop">
                                <div class="iconDrop">
                                    <i className="fa-solid fa-toggle-off"></i>
                                </div>
                                <h1>Dark Mode</h1>
                            </div>
                        </a>
                        <a href="#">
                            <div onClick={handleLogout} class="optionDrop">
                                <div class="iconDrop">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </div>
                                <h1>Log out</h1>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
        ;
}

export default HomeHeader;
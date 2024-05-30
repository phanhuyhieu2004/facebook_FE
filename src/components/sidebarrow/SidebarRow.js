import "./SidebarRow.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function SidebarRow({ ImageLink, title, dropdown, avatar }) {
    return (
        <div className={`sidebarRow`}>
            <img src={ImageLink} alt="" className={`sidebarRow__icon ${avatar && "avatar"} ${dropdown && 'vanish'}`} />
            <div className={`dropdownDiv ${dropdown && "display"}`}>
                <ArrowDropDownIcon className={`dropdown ${dropdown && "display"}`} />
            </div>
            <h2 className={`sidebarRow__title`}>{title}</h2>
        </div >
    )
}

export default SidebarRow
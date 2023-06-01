import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const { pathname } = useLocation();
    const menu = [
        {
            title: 'Teams',
            icon: 'bi bi-flag',
            path: '/teams',
            active: pathname === '/teams',
        },
        {
            title: 'Members',
            icon: 'bi bi-people',
            path: '/members',
            active: pathname.endsWith('/members'),
        },
        {
            title: 'Games',
            icon: 'bi bi-calendar-week',
            path: '/games',
            active: pathname === '/games',
        },
        {

            title: 'Votes',
            icon: 'bi bi-clipboard-data',
            path: '/votes',
            active: pathname.endsWith('/votes'),
        },
    ];
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className='position-sticky pt-3 sidebar-sticky'>
                <ul className="nav flex-column">
                    {menu.map((item, index) => <li key={index} className="nav-item">
                        <NavLink
                            className={() => item.active ? 'active nav-link' : 'nav-link'} aria-current="page"
                            to={item.path}
                        >
                            <i className={item.icon} style={{ fontSize: 18, marginRight: 6 }}></i>
                            <span style={{ fontSize: 18 }}>{item.title}</span>
                        </NavLink>
                    </li>)}
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                    <span>Saved reports</span>
                    <i className="bi bi-plus-circle"></i>
                    <a className="link-secondary" href="#" aria-label="Add a new report">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> */}
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-file-earmark-text" style={{marginRight: 8}}></i>
                            <span>Current Month</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
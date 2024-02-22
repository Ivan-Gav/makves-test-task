import "./sidebar.scss";
import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: true,
      active: 0,
    };
  }

  toggleSidebar = () => {
    this.setState((state) => ({ isOpened: !state.isOpened }));
  };

  goToRoute = (path) => {
    console.log(`going to "${path}"`);
    const active = [...routes, ...bottomRoutes].findIndex(
      (route) => route.path === path
    );
    if (active !== -1) {
      this.setState(() => ({ active }));
    }
  };

  render() {
    const { isOpened, active } = this.state;
    const containerClassnames = classnames("sidebar", { opened: isOpened });

    return (
      <div className={containerClassnames}>
        <div className={classnames("logo", { opened: isOpened })}>
          <img src={logo} alt="TensorFlow logo" />
          <span>TensorFlow</span>
          <button
            className={classnames("open-btn", { opened: isOpened })}
            onClick={this.toggleSidebar}
          >
            <FontAwesomeIcon icon="angle-right" />
            <span className="btn-tip">SHRINK</span>
          </button>
        </div>

        <div className={classnames("nav", "top-nav")}>
          {routes.map((route, i) => (
            <div
              key={route.title}
              className={classnames("nav-item", {
                opened: isOpened,
                active: active === i,
              })}
              onClick={() => this.goToRoute(route.path)}
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.title}</span>
            </div>
          ))}
        </div>

        <div className='nav'>
          {bottomRoutes.map((route, i) => (
            <div
              key={route.title}
              className={classnames("nav-item", {
                opened: isOpened,
                active: active === i + routes.length,
              })}
              onClick={() => this.goToRoute(route.path)}
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

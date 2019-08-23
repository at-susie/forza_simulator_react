import React from "react";
import { NavLink } from "react-router-dom";

class MainMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedmenu: "toppage",
        }
    }

    handleTouchEnd(e) {

        this.props.history.push(e.currentTarget.getAttribute('href'));

    }

    render() {
        return (
            <div className={"wrapper"}>
                <div className="toppage_container">
                    <div className="welcome">
                        <h1>zigzag auto</h1>
                    </div>
                    <div className="main_area">
                        <div className="section section_input">
                            <h3>INPUT</h3>
                            <div className="grids">
                                <div className="griditem touchpad">
                                    <NavLink to="/Input/TouchPad" onClick={this.handleMenuStateController} onTouchEnd={(e) => this.handleTouchEnd(e)}>
                                        <div className="t_menu_item"><div className="menu_name">Touch Pad</div></div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="section section_output">
                            <h3>OUTPUT</h3>
                            <div className="grids">
                                <div className="griditem maindisplay">
                                    <NavLink to="/MainDisplay/CenterMonitor" onClick={this.handleMenuStateMainDisplay} onTouchEnd={this.handleTouchEnd}>
                                        <div className="t_menu_item"><div className="menu_name">Main Display</div></div>
                                    </NavLink>
                                </div>
                                <div className="griditem cluster">
                                    <NavLink to="/Cluster/Cluster" onClick={this.handleMenuStateController}>
                                        <div className="t_menu_item"><div className="menu_name">Cluster Meter</div></div>
                                    </NavLink>
                                </div>
                                <div className="griditem hud">
                                    <NavLink to="/ComponentList" onClick={this.handleMenuStateController}>
                                        <div className="t_menu_item"><div className="menu_name">Component List</div></div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenu
import React, { Component } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { config } from "../../utils/common";
import Next from "../../components/Next";

export default class Style extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            style: this.props.steps.style || []
        };
    }

    handleClick(e, index) {
        e.preventDefault();
        let item = config.style[index];
        let stateIndex = this.state.style.indexOf(item.label);
        if (stateIndex >= 0) {
            // remove this key
            this.state.style.splice(stateIndex, 1);
        } else {
            this.state.style.push(item.label);
        }
        this.setState(this.state);
    }

    render() {
        const getClass = item => {
            let found = this.state.style.indexOf(item.label) >= 0;

            return found ? "selected" : "";
        };
        return (
            <div>
                <Header
                    stepNo={this.props.stepNo}
                    title="What's your style"
                    subtitle="( Select all relevant options )"
                />
                <div className="content">
                    <div className="grid">
                        {config.style.map((item, idx) => {
                            let image = this.props.getImage(item);
                            let style = {
                                backgroundImage: `url("${image}")`
                            };
                            let classes = getClass(item);

                            return (
                                <Link
                                    key={idx}
                                    className={classes}
                                    to="#"
                                    onClick={e => this.handleClick(e, idx)}
                                >
                                    <div
                                        className="grid-item label-bottom"
                                        style={style}
                                    >
                                        <span className="item-label">
                                            {item.label}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                {this.state.style.length > 0 && (
                    <Next
                        saveStepData={this.props.saveStepData}
                        state={this.state}
                    />
                )}
            </div>
        );
    }
}

Style.defaultProps = {
    steps: {
        style: []
    }
};

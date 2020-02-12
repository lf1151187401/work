import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
function mapStateToProps(state) {
    return {
        list: state.AllData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getList(data) {
            dispatch({
                type: "ADD_DATA",
                list: data
            })
        }
    };
}

class home extends Component {
    state = {
        ind: 0,
        callback: item => true,
        topList: [
            {
                type: "全部",
                callback: item => true
            }, {
                type: "正在进行",
                callback: item => item.deadline > new Date().getTime()
            }, {
                type: "已结束",
                callback: item => item.deadline <= new Date().getTime()

            }
        ]
    }
    componentDidMount = async () => {
        let res = await this.$http('get', "/api/allVote")
        console.log(res, "res");
        if (res.data.code === 0) {
            this.props.getList(res.data.data)
        }
    }
    tab = (index, cbk) => {
        this.setState({
            ind: index,
            callback: cbk
        })
    }
    jump = () => {
        this.props.history.push({ pathname: "/ticket" })
    }
    render() {
        return (
            <div className="home">
                <header className="header">
                    <div className="home_left">《</div>
                    <div className="home_mid">投票</div>
                    <div className="home_right" onClick={() => { this.jump() }}>发起投票</div>
                </header>
                <main className="main">
                    <div className="content">
                        <div className="home_main_top">
                            {
                                this.state.topList.map((item, index) => {
                                    return <span key={index} onClick={() => {
                                        this.tab(index, item.callback)
                                    }} className={this.state.ind === index ? "active" : ""}>{item.type}</span>
                                })
                            }
                        </div>
                        <div className="home_main_main">
                            <ul className="ul">
                                {
                                    this.props.list.filter(this.state.callback).map((item, index) => {
                                        return <li key={index}>
                                            <div className="li_left">


                                            </div>
                                            <div className="li_right">
                                                <div className="li_top">
                                                    <span>{item.name}</span>
                                                    <span>{item.deadline}111</span>
                                                </div>
                                                <div className="li_bottom">
                                                    <span>{item.title}</span>
                                                    <span>{item.isRadio === 1 ? "多选" : "单选"}</span>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(home));
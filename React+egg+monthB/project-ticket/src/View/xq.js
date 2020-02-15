import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import { Radio, Checkbox } from 'antd';
import Title from 'antd/lib/skeleton/Title';
function mapStateToProps(state) {
    return {
        titleData: state.titleDATA,
        DaanData: state.DaanData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        AddTowList(title, daan) {
            dispatch({
                type: "ADD_TOW_DATA",
                titleData: title,
                DaanData: daan
            })
        }
    };
}

class xq extends Component {
    componentDidMount = () => {
        this.initData()
    }
    state = {
        value: 0,
        count: 0,
        idArr: [],
        Radio: "",
        OptionID: 0,
        TitleSrc: ""
    }
    initData = async () => {
        let title = this.props.location.title;
        let id = this.props.location.id || localStorage.getItem("id");
        let res = await this.$http("post", "/api/getlist", { title, id })
        console.log(res, "xq")
        if (res.data.code === 0) {
            this.props.AddTowList(res.data.data, res.data.daan)
        }
        this.setState({
            OptionID: id,
            TitleSrc: title
        })
        // console.log(this.state.OptionID, this.state.TitleSrc, "102030405060")
    }
    onChange = (e, ite) => {
        // console.log('radio checked', e.target.value);
        console.log(e.target.checked, "radio checked")
        this.setState({
            value: e.target.value,
        });
        if (e.target.checked) {
            this.setState({
                count: this.state.count += 1
            })
            let flag = this.state.idArr.some((item, index) => {
                return item.id === ite.id
            })
            if (!flag) {
                this.state.idArr.push(ite);
                this.setState({
                    idArr: this.state.idArr
                })
            }
            console.log(this.state.idArr)
        }

    };
    checkbox = (e, ite) => {
        if (e.target.checked) {
            this.setState({
                count: this.state.count += 1
            })
            let flag = this.state.idArr.some((item, index) => {
                return item.id === ite.id
            })
            if (!flag) {
                this.state.idArr.push(ite);
                this.setState({
                    idArr: this.state.idArr
                })
                console.log(this.state.idArr)
            }

            // console.log(this.refs)
            // let Res = (this.refs.div.clientWidth / this.props.DaanData)
            // this.refs.span.style.width = `${Res * this.state.count}px`
        } else {
            this.setState({
                count: this.state.count -= 1
            })
            let index = this.state.idArr.findIndex((item, index) => {
                return item.id === ite.id
            })
            this.state.idArr.splice(index, 1)
            this.setState({
                idArr: this.state.idArr
            })
            console.log(this.state.idArr)
            // let Res = (this.refs.div.clientWidth / this.props.DaanData.length)
            // this.refs.span.style.width = `${Res * this.state.count}px`
        }

    }
    ok = async () => {
        let res = await this.$http("post", "/api/tp", { Data: this.state.idArr })
        console.log(res, "res")
        if (res.data.code === 0) {
            this.initData();
            alert(res.data.msg)
            localStorage.setItem("title", this.state.TitleSrc)
        }
    }
    statistic = () => {
        let { OptionID, TitleSrc } = this.state
        console.log(OptionID, "this.props.DaanData")
        this.props.history.push({ pathname: "/echarts", TitleSrc, OptionID })
    }
    render() {

        return (
            <div className="xq">
                <header className="xq_header">
                    <div className="xq_left" onClick={() => {
                        this.props.history.push({ pathname: "/home" })
                    }}>《</div>
                    <div className="xq_mid">投票详情</div>
                    <div className="xq_right" onClick={() => {
                        this.statistic()
                    }}>统计</div>
                </header>
                <main className="xq_main">
                    <div className="xq_main_main">
                        {
                            this.props.titleData.map((item, index) => {
                                return <div key={item.id} className="title">
                                    <div className="xq_top">
                                        <div className="Name">{item.name}</div>
                                        <div className="Time">{new Date(parseInt(item.deadline)).toLocaleString()}</div>
                                    </div>
                                    <div className="xq_bottom">
                                        <div className="Title">标题:{item.title}</div>
                                    </div>
                                    <div className="options">

                                        {
                                            this.props.DaanData.map((it, ind) => {
                                                return item.isRadio === 1 ?
                                                    <p key={it.id}>
                                                        <Radio.Group onChange={(e) => { this.onChange(e, it) }} value={this.state.value}>
                                                            <Radio value={it.option_name}>{it.option_name}</Radio>
                                                            <span>共投{it.count}票</span>
                                                        </Radio.Group>

                                                    </p>
                                                    : <p key={it.id}>
                                                        <Checkbox onChange={(e) => {
                                                            this.checkbox(e, it)
                                                        }} value={it.option_name}>{it.option_name}</Checkbox>
                                                        <span>共投{it.count}票</span>

                                                    </p>
                                            })
                                        }
                                        <div className="gray" ref="div">
                                            <span className="nei" ref="span"></span>
                                        </div>

                                    </div>
                                    <button className="ok" onClick={() => {
                                        this.ok()
                                    }}>完成</button>
                                </div>
                            })
                        }
                    </div>
                </main>
            </div >
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(xq));
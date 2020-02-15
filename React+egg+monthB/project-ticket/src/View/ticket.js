import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import { withRouter } from "react-router-dom"
function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class ticket extends Component {
    state = {
        isRadio: 1,
        anonymous: 1,
        title: "",
        description: "",
        option: [],
        deadline: null,
    }
    // 提交
    submit = async () => {
        if (this.state.title === "" || this.state.description === "") {
            alert("请填权信息！！");
            return
        }
        let res = await this.$http("post", "/api/add", this.state)
        console.log(this.state)
        console.log(res)
        if (res.data.code === 0) {
            alert(res.data.msg);
            return
        }
        if (res.data.code === 1) {
            alert(res.data.msg)
            return
        }
       
    }
    // 添加选项
    addInput = () => {
        if (this.refs.Values.value === "") {
            alert("请输入您的选项")
            return
        }
        let id = JSON.stringify(new Date().getTime())
        this.state.option.push({
            id: id.slice(-6),
            value: this.refs.Values.value
        })

        this.setState({ option: [...this.state.option] })
    }
    // 删除
    remover = (id) => {
        let index = this.state.option.findIndex(item => item.id === id)
        this.state.option.splice(index, 1)
        this.setState({
            option: this.state.option
        })
        if (this.state.option.length === 0) {
            this.refs.Values.value = ""
        }
    }
    // vant 日期 数据
    onChange = (date, dateString) => {
        console.log("data", date, "dataste", dateString);
        let time = new Date(date).getTime()
        this.setState({
            deadline: time
        })
    }
    render() {
        return (
            <div className="ticket">
                <header className="t_header">
                    <div onClick={() => {
                        this.props.history.push({ pathname: "/home" })
                    }}>《</div>
                    <div>发起投票</div>
                    <div>...</div>
                </header>
                <main className="t_main">
                    <div>标题:<input type="text" onChange={(e) => { this.setState({ title: e.target.value }) }} /></div>
                    <div>描述:<input type="text" onChange={(e) => { this.setState({ description: e.target.value }) }} /></div>
                    {
                        this.state.option.map((item, index) => {
                            return <div key={item.id} className="box"><span>选项:{index + 1}</span>{item.value}<span onClick={() => {
                                this.remover(item.id)
                            }}>删除</span></div>
                        })
                    }
                    <div>选项:<input type="text" ref="Values" /><span onClick={() => { this.addInput() }}>添加</span></div>
                    <div>  <DatePicker onChange={(this.onChange)} showTime={true} /></div>
                    <div>
                        <select value={this.state.isRadio} onChange={(e) => { this.setState({ isRadio: e.target.value }) }}>
                            <option value="1">单选</option>
                            <option value="0">多选</option>
                        </select>
                    </div>

                    <div>
                        <select value={this.state.anonymous} onChange={(e) => { this.setState({ anonymous: e.target.value }) }}>
                            <option value="1">匿名</option>
                            <option value="0">不匿名</option>
                        </select>
                    </div>
                    <button onClick={() => { this.submit() }}>提交</button>
                </main>

            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(ticket));
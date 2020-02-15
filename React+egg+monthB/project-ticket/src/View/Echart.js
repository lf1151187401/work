import React, { Component } from 'react'
import ReactEchats from "echarts-for-react"

export default class Echarts extends Component {
    state = {
        id: 0,
        title: "" || localStorage.getItem("title"),
        Data: [],
        count: []
    }
    componentDidMount = () => {
        this.getList()
    };
    getOtion = () => {
        let text = [];
        let num = [];
        console.log(this.state.Data, "DataDAta")
        this.state.Data.forEach((item, index) => {
            text.push(item.option_name);
            num.push(item.count);
        })
        console.log(text, num)
        return {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: text,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: num
                }
            ]
        };

    }
    getList = async () => {
        let id = this.props.location.OptionID
        // let title = this.props.location.TitleSrc
        this.setState({
            id: this.props.location.OptionID,
            title: this.props.location.TitleSrc || localStorage.getItem("title")
        })
        let res = await this.$http("post", "/api/getData", { id })
        if (res.data.code === 0) {
            this.setState({
                Data: res.data.data
            })
            console.log(this.state.Data, "Data")
        }
    }
    render() {
        return (
            <div className="Echart">
                <header className="header">
                    <span onClick={() => {
                        let id = localStorage.getItem("id")
                        this.props.history.push({ pathname: "/xq", id })
                    }}>《</span>
                </header>
                <main className="main">
                    <div className="top_name">
                        题目:{this.state.title}
                    </div>
                    <ReactEchats
                        option={this.getOtion()}
                        style={{ height: '350px', width: '375px' }}
                        className='react_for_echarts' />
                </main>
            </div>

        )
    }
}

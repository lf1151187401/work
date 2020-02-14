import React, { Component } from 'react'
import ReactEchats from "echarts-for-react"

export default class Echarts extends Component {

    getOtion = () => {
        const option = {
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

        return option;
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
                    <ReactEchats
                        option={this.getOtion()}
                        style={{ height: '350px', width: '375px' }}
                        className='react_for_echarts' />
                </main>
            </div>

        )
    }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    componentDidMount = async () => {
        console.log(this.props.location.title, this.props.location.id)
        let title = this.props.location.title;
        let id = this.props.location.id;
        let res = await this.$http("post", "/api/getlist", { title, id })
        console.log(res, "xq")
        if (res.data.code === 0) {
            this.props.AddTowList(res.data.data, res.data.daan)
        }
    }
    render() {
        return (
            <div className="xq">
                {
                    this.props.titleData.map((item, index) => {
                        return <div key={item.id}>
                            <span>{item.name}</span>
                            <span>{new Date(item.deadline * 1000).toLocaleString}</span>
                            <span>{item.title}</span>
                            {
                                this.props.DaanData.map((it, ind) => {
                                    return <div key={it.id}>
                                        <p><input type={item.isRadio === 1 ? "radio" : "checkbox"} />{it.option_name}</p>
                                    </div>
                                })
                            }
                        </div>
                    })
                }

            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(xq);
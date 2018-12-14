import React, { Component } from 'react'
import Task from './Task'
import { List,Tag } from 'antd';


export default class TaskList extends Component {
    render() {
        return (
            <div style={{margin: "20px"}}>
                <List
                    header={<div><Tag color="magenta">{this.props.status}</Tag></div>}
                    locale={{ emptyText: '暂无数据' }}
                    bordered
                    split={true}
                    dataSource={this.props.tasks}
                    renderItem={item => (<Task task={item} onStatusChange={this.props.onStatusChange} />)}
                />
            </div>

        )
    }
}
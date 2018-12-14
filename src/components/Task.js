import React from 'react';
import { List, Select } from 'antd';

const TASK_STATUSES = [
    'Unstarted',
    'In Progress',
    'Completed'
]

const Task = props => {
    function onStatusChange(e) {
        console.log(e)
        props.onStatusChange(props.task.id, {status: e})
    }
    return (
        <List.Item actions={[<Select value={props.task.status} onChange={onStatusChange} style={{ width: 120 }}>
            {TASK_STATUSES.map(status => (
                <Select.Option key={status} value={status}>{status}</Select.Option>
            ))}
        </Select>, <a href='#'>more</a>]}>
            <List.Item.Meta
                title={<a>{props.task.title}</a>}
                description={props.task.description}
            />
        </List.Item>
    );
}
export default Task
import React, { Component } from 'react'
import TaskList from './TaskList'
import { Icon, Button, Form, Input, Spin } from 'antd';


const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed']

class TasksPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewCardForm: false,
            title: '',
            description: '',
        }
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }
    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    }

    resetForm() {
        this.setState({
            showNewCardForm: false,
            title: '',
            description: '',
        })
    }

    onCreateTask = (e) => {
        e.preventDefault();
        if(this.state.title && this.state.description){
            this.props.onCreateTask({
                title: this.state.title,
                description: this.state.description,
            })
            this.resetForm()
        } else {
            console.log('please enter your content')
        }

    }

    toggleForm = () => {
        this.setState({ showNewCardForm: !this.state.showNewCardForm })
    }

    renderTaskLists() {
        const { tasks } = this.props;
        return TASK_STATUSES.map(status => {
            const statusTasks = tasks.filter(task => task.status === status)
            return <TaskList key={status} status={status} tasks={statusTasks} onStatusChange={this.props.onStatusChange} />
        })
    }


    render() {
        const ButtonGroup = Button.Group;

        return (
            <div style={{width: '800px', margin:'50px auto'}}>
                {this.props.isLoading &&
                <div><Spin/></div>
                }
                <div>
                    <ButtonGroup>
                        <Button type="primary" onClick={this.toggleForm}>
                            <Icon type="plus" />New task
                    </Button>
                    </ButtonGroup>
                </div>
                <br />
                {this.state.showNewCardForm && (
                    <Form onSubmit={this.onCreateTask}>
                        <Form.Item>
                            <Input prefix={<Icon type="bars" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="title" onChange={this.onTitleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="align-left" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="description" onChange={this.onDescriptionChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >ADD</Button>
                        </Form.Item>
                    </Form>
                )
                }
                <div>
                    {this.renderTaskLists()}
                </div>

            </div>
        )
    }
}
export default TasksPage



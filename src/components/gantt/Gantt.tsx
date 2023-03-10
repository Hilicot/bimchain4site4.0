import React from 'react';
import { Col, Row, Button } from 'antd';

import { DeleteTwoTone } from '@ant-design/icons';
import { FrappeGantt, Task } from 'frappe-gantt-react';
import '@app/components/gantt/chart.scss'
import { AddTaskModal } from './AddTaskModal';

interface GanttProps {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const Gantt: React.FC<GanttProps> = (props) => {    
    const [openAddTask, setOpenAddTask] = React.useState(false);

    return (
        <Row className="chart">
            <Col className="left" span={6}>
                <div className='labels'>
                    {props.tasks?.length ? (
                        props.tasks.map((t: Task, index: number) => {
                            return (
                                <div key={index} className="label">
                                    <span className='bold space-around'>{index}.....</span>
                                    <span className="bold space-around capitalize">{t.name}</span>
                                    <Button
                                        className="capitalize button"
                                        type="text"
                                        onClick={() => props.setTasks((old: Task[]) => old.filter((t2: Task) => t.id !== t2.id))}
                                    >
                                        <DeleteTwoTone twoToneColor='gray' />
                                    </Button>

                                </div>
                            );
                        })
                    ) : null}
                </div>
                <div className='add-task'>
                    <Button type='primary' onClick={() => setOpenAddTask(true)}>Add</Button>
                </div>
            </Col>
            <Col className="right" span={18}>
                {props.tasks?.length ? (
                    <>
                        {/*<Slider />*/}
                        <div className='gantt'>
                        <FrappeGantt
                            tasks={props.tasks}
                            onViewChange={v => console.log(v)}
                            onClick={task => console.log(task)}
                            onDateChange={(task, start, end) => console.log(task, start, end)}
                            onProgressChange={(task, progress) => console.log(task, progress)}
                            onTasksChange={tasks => console.log(tasks)}
                        />
                        </div>
                    </>
                ) : null}
            </Col>
            <AddTaskModal
                open={openAddTask}
                setOpen={setOpenAddTask}
                addTasks={(t:Task) => {props.setTasks((old:Task[]) => [...old, t])}}></AddTaskModal>
        </Row>
    )
}

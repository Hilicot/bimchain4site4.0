import React from 'react';
import { Row } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Task } from 'frappe-gantt-react';
import { Gantt } from '@app/components/gantt/Gantt';

const GanttPage: React.FC = () => {
    
    const [tasks, setTasks] = React.useState<Task[]>([
        new Task({
            id: 'Task 1',
            name: 'Redesign website',
            start: '2023-03-6',
            end: '2023-03-8',
            progress: 100,
            dependencies: '',
            //custom_class: 'bar-milestone' // optional
        }),
        new Task({
            id: 'Task 2',
            name: 'Redesign website 2',
            start: '2023-03-8',
            end: '2023-03-10',
            progress: 100,
            dependencies: 'Task 1',
            //custom_class: 'bar-milestone' // optional
        }),
        new Task({
            id: 'Task 3',
            name: 'Redesign website 3',
            start: '2023-03-11',
            end: '2023-03-14',
            progress: 100,
            dependencies: 'Task 2',
            //custom_class: 'bar-milestone' // optional
        }),
    ]);

    return (
        <>
            <PageTitle>Users</PageTitle>
            <Row>
                <Gantt tasks={tasks} setTasks={setTasks}/>
            </Row>
            
        </>
    );
};

export default GanttPage;
import React from 'react';
import { Row } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Task } from 'frappe-gantt-react';
import { Gantt } from '@app/components/gantt/Gantt';
import * as S from '@app/pages/UIComponentsPage.styles';

const GanttPage: React.FC = () => {
    const tasks = [
        new Task({
            id: 'Task 1',
            name: 'Redesign website',
            start: '2016-12-28',
            end: '2016-12-31',
            progress: 100,
            dependencies: '',
            //custom_class: 'bar-milestone' // optional
        }),
        new Task({
            id: 'Task 2',
            name: 'Redesign website 2',
            start: '2016-12-29',
            end: '2016-12-32',
            progress: 100,
            dependencies: 'Task 1',
            //custom_class: 'bar-milestone' // optional
        }),
        new Task({
            id: 'Task 3',
            name: 'Redesign website 3',
            start: '2016-12-30',
            end: '2016-12-33',
            progress: 100,
            dependencies: 'Task 2',
            //custom_class: 'bar-milestone' // optional
        }),
    ]
    return (
        <>
            <PageTitle>Users</PageTitle>
            <Row>
                <Gantt tasks={tasks} />
            </Row>
        </>
    );
};

export default GanttPage;
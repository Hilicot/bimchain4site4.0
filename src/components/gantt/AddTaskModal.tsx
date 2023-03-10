import { Button, Form, Input } from "antd"
import dayjs from "dayjs"
import { Task } from "frappe-gantt-react"
import { useTranslation } from "react-i18next"
import { Modal } from "../common/Modal/Modal"
import { DatePicker } from "../common/pickers/DatePicker"

interface AddTaskModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    addTasks: (tasks: Task) => void
}

interface AddTaskFormValues {
    name: string
    start: string
    end: string
    dependencies: string
}

export const AddTaskModal: React.FC<AddTaskModalProps> = (props) => {
    const { t } = useTranslation()
    const handleSubmit = (values: AddTaskFormValues) => {
        props.addTasks(new Task({
            id: values.name,
            name: values.name,
            start: dayjs(values.start).format("YYYY-MM-DD"),
            end: dayjs(values.end).format("YYYY-MM-DD"),
            progress: 100,
            //dependencies: values.dependencies,
        }))
        props.setOpen(false)
    }

    return (
        <Modal
            open={props.open}
            title="Add Task"
            onCancel={() => props.setOpen(false)}
            footer={[
                <Button form="add-task-form" key="submit" htmlType="submit" type="primary">
                    Add Task
                </Button>,
            ]}
        >
            <Form id="add-task-form" onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    label={t('common.name')}
                    rules={[{ required: true, message: 'Please input a name!' }]}
                >
                    <Input placeholder="task..." />
                </Form.Item>
                <Form.Item
                    name="start"
                    label={t('gantt.start')}
                    rules={[{ required: true, message: 'Please input a start date!' }]}
                >
                    <DatePicker format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item
                    name="end"
                    label={t('gantt.end')}
                    rules={[{ required: true, message: 'Please input an end date!' }]}
                >
                    <DatePicker format="DD-MM-YYYY" onChange={(date)=> console.log(date)}/>
                </Form.Item>
                <Form.Item
                    name="dependencies"
                    label={t('gantt.dependencies')}
                >
                    <Input placeholder="dependencies..." />
                </Form.Item>
            </Form>
        </Modal>
    )
}
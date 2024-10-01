import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Popconfirm, Table, Button, Space, Input, Form } from 'antd';
import { isEmpty } from "lodash";

const DataTable = () => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingKey, setEditingKey] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
        setGridData(response.data);
        setLoading(false);
    };

    const handleDelete = (value) => {
        const dataSource = [...modifiedData];
        const filteredData = dataSource.filter(item => item.id !== value.id);
        setGridData(filteredData);
    };

    const modifiedData = gridData.map(({ body, ...item }) => ({
        ...item, key: item.id,
        comment: isEmpty(body) ? item.comment : body,
    }));
    
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ name: "", email: "", comment: "", ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...gridData];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setGridData(newData);
                setEditingKey("");
            }
        } catch (error) {
            console.log("Validation Failed:", error);
        }
    };

    const EditableCell = ({
        editing, dataIndex, title, record, children, ...restProps }) => {
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please input ${title}`,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const columns = [
        { title: "ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name", align: "center", editable: true },
        { title: "Email", dataIndex: "email", align: "center", editable: true },
        { title: "Comment", dataIndex: "comment", align: "center", editable: true },
        {
            title: "Action",
            dataIndex: "action",
            align: "center",
            render: (_, record) => {
                const editable = isEditing(record);
                return modifiedData.length >= 1 ? (
                    <Space>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record)}
                        >
                            <button type="button" disabled={editable} className="btn btn-outline-danger">
                                Delete
                            </button>
                        </Popconfirm>
                        {editable ? (
                            <Space size="middle">
                                <Button onClick={() => save(record.key)} type="primary" style={{ marginRight: 8 }}>
                                    Save
                                </Button>
                                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                    <Button>Cancel</Button>
                                </Popconfirm>
                            </Space>
                        ) : (
                            <Button onClick={() => edit(record)} type="primary">
                                Edit
                            </Button>
                        )}
                    </Space>
                ) : null;
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                columns={mergedColumns}
                dataSource={modifiedData}
                bordered
                loading={loading}
            />
        </Form>
    );
};

export default DataTable;

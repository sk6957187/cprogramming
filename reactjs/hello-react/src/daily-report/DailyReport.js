import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Popconfirm, Table, Button, Space, Input, Form } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

const DataTable = () => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchCol, setSearchCol] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // Attempt to fetch data
            const response = await axios.get("https://jsonplaceholder.typicode.com/comments", { timeout: 15000 }); // added 5s timeout
            const formattedData = response.data.map((item, index) => ({
                key: index, id: item[0], date: item[1], user: item[2], type: item[3] || "N/A",
                action: item[4], category: item[5], completed: item[6], createdAt: item[7], updatedAt: item[8],
            }));
            setGridData(formattedData);
        } catch (error) {
            // Handle and log the error
            console.error("Error fetching data:", error.message || error);
            alert("Network error occurred. Please check your server and try again.");
        } finally {
            setLoading(false);
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div>
                <Input
                    placeholder={`Search ${dataIndex}`} value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
                />
                <Space>
                    <Button
                        type="primary" onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />} size="small">Search</Button>
                    <Button onClick={() => setSearchText("")} size="small">Reset</Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) => searchCol === dataIndex ? (
            <Highlighter highlightStyle={{ backgroundColor: "#ffc069" }} searchWords={[searchText]} textToHighlight={text.toString()} />
        ) : text,
    });

    const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchCol(dataIndex);
    };

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({ name: "", ...record });
        setEditingKey(record.key);
    };
    const cancel = () => setEditingKey("");

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...gridData];
            const index = newData.findIndex((item) => key === item.id);
            if (index > -1) {
                newData.splice(index, 1, { ...newData[index], ...row });
                setGridData(newData);
                setEditingKey("");
            }
        } catch (error) {
            console.log("Validation Failed:", error);
        }
    };

    const handleDelete = (record) => setGridData(gridData.filter((item) => item.id !== record.id));

    const columns = [
        { title: "ID", dataIndex: "id", ...getColumnSearchProps("id") },
        { title: "Date", dataIndex: "date", ...getColumnSearchProps("date") },
        { title: "User", dataIndex: "user", ...getColumnSearchProps("user") },
        { title: "Type", dataIndex: "type" },
        { title: "Action", dataIndex: "action" },
        {
            title: "Action", render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button onClick={() => save(record.key)} type="primary">Save</Button>
                        <Popconfirm title="Cancel?" onConfirm={cancel}><Button>Cancel</Button></Popconfirm>
                    </Space>
                ) : (
                    <Space>
                        <Button onClick={() => edit(record)} type="primary">Edit</Button>
                        <Popconfirm title="Delete?" onConfirm={() => handleDelete(record)}><Button>Delete</Button></Popconfirm>
                    </Space>
                );
            },
        },
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input placeholder="Search text" value={searchText} onChange={(e) => setSearchText(e.target.value)} allowClear />
                <Button onClick={loadData} type="primary">Refresh</Button>
            </Space>
            <Form form={form} component={false}>
                <Table
                    components={{ body: { cell: (props) => <EditableCell {...props} form={form} isEditing={isEditing} /> } }}
                    columns={columns}
                    dataSource={gridData}
                    loading={loading}
                    rowClassName="editable-row"
                    pagination={{ pageSize: 5 }}
                />
            </Form>
        </div>
    );
};

const EditableCell = ({ editing, dataIndex, title, children, ...restProps }) => (
    <td {...restProps}>{editing ? <Form.Item name={dataIndex}><Input /></Form.Item> : children}</td>
);

export default DataTable;

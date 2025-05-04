import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Popconfirm, Table, Button, Space, Input, Form } from 'antd';
import { isEmpty } from "lodash";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

const DataTable = () => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingKey, setEditingKey] = useState("");
    const [form] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredInfo, setFilteredInfo] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [searchColText, setSearchColText] = useState("");
    const [searchCol, setSearchCol] = useState("");
    let [filteredData] = useState();

    useEffect(() => {
        loadData();
    }, [refreshKey]);

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
        info: `My name is ${item.email.split("@")[0]} and I am ${Math.floor(Math.random() * 6) + 20} years old`,

        comment: isEmpty(body) ? item.comment : body,
    }));

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 0 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 0, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleResetCol(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : "",
        render: (text) =>
            searchCol === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchColText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    

    const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchColText(selectedKeys[0])
        setSearchCol(dataIndex);
    };

    const handleResetCol = (clearFilters) => {
        clearFilters();
        setSearchColText("");
    }

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ name: "", email: "", comment: "", ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
        setFilteredInfo(filters);
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

    const clearAll = () => {
        setSortedInfo({});
        setSearchText("");
        loadData();
    };

    const columns = [
        { 
            title: "ID", dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            //sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
            ...getColumnSearchProps("id")
        },
        { 
            title: "Name", dataIndex: "name", align: "center", editable: true,
            sorter: (a, b) => a.name.localeCompare(b.name),
            //sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
            ...getColumnSearchProps("name")
        },
        { 
            title: "Email", dataIndex: "email", align: "center", editable: true,
            sorter: (a, b) => a.email.localeCompare(b.email),
            //sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
            ...getColumnSearchProps("email")
        },
        { 
            title: "Comment", dataIndex: "comment", align: "center", editable: true 
        },
        {
            title: "Action",
            dataIndex: "action",
            align: "center",
            render: (_, record) => {
                const editable = isEditing(record);
                return (
                <div>
                    <Space>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record)}
                        >
                            <button type="button" ClassName="btn btn-outline-danger"  disabled={editable}>
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
                    </div>
                );
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

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        if(e.target.value === ""){
            loadData();
        }
    };
    const globalSearch = () =>{
        filteredData = modifiedData.filter((value) => {
            return (
                value.name.toLowerCase().includes(searchText.toLowerCase()) || value.email.toLowerCase().includes(searchText.toLowerCase()) || value.id.toString().includes(searchText)
            );
        });
        setGridData(filteredData);
    };

    return (
        <div>
            <Space className="d-grid gap-2 d-md-flex justify-content-md-end"   style = {{marginBottom: 16}}>
                <Input placeholder="Enter Search Text" onChange={handleSearch} type="text" allowClear value={searchText} />
                <Button type="primary" onClick={globalSearch}>Search</Button>
                <Button type="primary" onClick={clearAll}>Clear All</Button>
            </Space>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    columns={mergedColumns}
                    expandable={{
                        expandedRowRender: (record) => (<p style={{margin: 0}}>{record.info}</p>),
                        rowExpandable: (record) => record.info !== "Not Expandable",
                    }}
                    dataSource={filteredData && filteredData.length ? filteredData : modifiedData}
                    bordered
                    loading={loading}
                    onChange={handleChange} 
                />
            </Form>
        </div>
    );
};

export default DataTable;


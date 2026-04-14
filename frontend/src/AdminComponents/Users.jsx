import { useEffect, useState } from "react";
import axiosURL from "../api/AxiosURL";
import { useOutletContext } from "react-router-dom";
import { Space, Table, Button, Modal, Form, Input } from "antd";
import LOGO from '../assets/logo.png'



const Users = () => {
    const { search, userPopup, setUserPopup, loading, setLoading } = useOutletContext();
    const [form] = Form.useForm();

    const initial = {
        name: "",
        email: "",
        password: "",
        roleId: "",
        active: "",
    }
    const [currentUsers, setCurrentUsers] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [addUser, setAddUser] = useState(initial)
    const [addUserErr, setAddUserErr] = useState(initial)
    const [edit, setEdit] = useState(null)

    const handleCancelPopup = async () => {
        setEdit(null)
        setUserPopup(false)
        form.resetFields()
    }

    const onFinish = async (values) => {
        const { name, email, password } = values

        try {

            if (edit) {
                const updateUser = {
                    name: name,
                    email: email,
                }
                const res = await axiosURL.put(`/user/updateuser/${edit}`, updateUser)
                alert(res.data.message)
                const modifyUser = res.data.result
                setCurrentUsers(pre => ({
                    ...pre, users: pre.users.map(item => item.id === edit ? modifyUser : item)
                }))
                setEdit(null)
                setUserPopup(false)
                form.resetFields()

            } else {
                const data = {
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    password: password.trim(),
                    roleId: 3,
                }
                const res = await axiosURL.post("/user/adduser", data)
               const newUser = res.data.result
                setCurrentUsers(pre => ({
                    ...pre, users: [...pre.users, newUser]
                }))
                setUserPopup(false)
            }

        } catch (error) {
            if (error.response.status === 400) alert(error.response.data.message)
            else if (error.response.status === 401) { alert(error.response.data.message) }
            else if (error.response.status === 403) { alert(error.response.data.message) }
            else if (error.response.status === 409) { alert(error.response.data.message) }
            else console.log("Server error: ", error);
        }
    }
    // const closePopupFunction = () => {
    //     setUserPopup(!userPopup)
    // }

    const userData = async () => {
        try {
            setLoading(true)
            const response = await axiosURL.get(`/user/getuser?page=${page}&limit=${pageSize}&search=${search}`)
            setCurrentUsers(response.data.result || {
                users: [],
                currentPage: 1,
                totalPage: 0
            });

        } catch (error) {
            if (error.response.status === 401) alert(error.response.data.message)
            else if (error.response.status === 403) alert(error.response.data.message)
            else console.log("server error: ", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        userData()
    }, [page, pageSize, search])

    const editHandle = (data) => {
        setEdit(data.id)
        setUserPopup(true)
        setTimeout(() => {
            form.setFieldsValue({
                name: data.name,
                email: data.email,
            })
        }, 0)
    }



    const deleteHandle = async (data) => {

        try {
            const userActive = {
                isActive: data.active ? false : true
            }
           const res = await axiosURL.patch(`/user/deleteuser/${data.id}`, userActive)
            alert(res.data.message)
            const status = res.data.result;
            setCurrentUsers(pre => ({
                ...pre, users: pre.users?.map((item) => item.id === data.id ? { ...item, active: status ? 1 : 0 } : item)

            }))

        } catch (error) {
            console.log('server error :', error);
        }
    }


    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            render: (text, record, index) => (page - 1) * pageSize + index + 1

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (value) => (!value ? "Active" : "InActive")
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => { editHandle(record) }}>Edit</Button>
                    <Button danger onClick={() => { deleteHandle(record) }}>Delete</Button>
                </Space>
            )
        },

    ]

    return (
        <>
            <div className="relative">
                <Table columns={columns} dataSource={currentUsers.users || []}
                    loading={loading}
                    pagination={{
                        current: currentUsers.currentPage,
                        pageSize: pageSize,
                        total: currentUsers.totalPage,
                        showSizeChanger: true,
                        pageSizeOptions: ['1', '5', '10', '20', '50'],
                        onChange: (page, pageSize) => {
                            setPage(page)
                            setPageSize(pageSize)
                        }
                    }}

                >

                </Table>

                <Modal
                    title={
                        <h1 className="text-lg font-bold text-primary-violet mb-[10px] flex gap-3 py-2">
                            <span>
                                <img className="W-7 h-7" src={LOGO} alt="logo" />
                            </span>
                            Add User Trackdo</h1>
                    }
                    footer={
                        <Button type="primary" onClick={handleCancelPopup}>
                            Cancel
                        </Button>
                    }
                    loading={loading}
                    open={userPopup}
                    onCancel={handleCancelPopup}
                    closable={true}
                >
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 400 }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter name' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter email' }]}
                        >
                            <Input />
                        </Form.Item>
                        {!edit && <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter password' }]}
                        >
                            <Input.Password />
                        </Form.Item>}

                        <Form.Item label={null}>
                            <Button type="primary"
                                htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>


            </div>
        </>
    )
}

export default Users;



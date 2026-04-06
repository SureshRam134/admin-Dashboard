import { useEffect, useState } from "react";
import axiosURL from "../api/AxiosURL";
import { Space, Table, Button } from "antd";





const Users = () => {

    const userData = async () => {
        try {
            const response = await axiosURL.get(`/user/getuser?page=${page}&limit=${limit}`)
            setUsers(response.data.result.users);
            console.log(response.data.result);


        } catch (error) {
            if (error.response.status === 401) alert(error.response.data.message)
            else if (error.response.status === 403) alert(error.response.data.message)
            else console.log("server error: ", error);

        }
    }
    useEffect(() => {
        userData()
    }, [])
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)


    const editHandle = () => {
        alert(89);

    }
    const deleteHandle = () => {

    }


    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            render: (text, record, index) => (index + 1)

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
                    <Button danger onClick={() => { deleteHandle(record.id) }}>Delete</Button>
                </Space>
            )
        },

    ]
    return (
        <>
            <div>
                <Table columns={columns} dataSource={users}
                    Pagination={{
                        current: page,
                        pageSize: limit,
                    }}


                // currentPage: 1
                // nextPage:0
                // prePage:0
                // totalPage:1
                // totalUser:3
                />
            </div>
        </>
    )
}

export default Users;


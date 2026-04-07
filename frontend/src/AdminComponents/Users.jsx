import { useEffect, useState } from "react";
import axiosURL from "../api/AxiosURL";
import { Space, Table, Button } from "antd";


const Users = () => {

    const [currentUsers, setCurrentUsers] = useState([])
    const [pagination, setPagination] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)
    
    const userData = async () => {
        try {
            const response = await axiosURL.get(`/user/getuser?page=${page}&limit=${pageSize}`)
            console.log(response.data.result);
            setCurrentUsers(response.data.result || []);
        } catch (error) {
            if (error.response.status === 401) alert(error.response.data.message)
            else if (error.response.status === 403) alert(error.response.data.message)
            else console.log("server error: ", error);

        }
    }
    
    useEffect(() => {
        userData()
    }, [page, pageSize])
    


    const editHandle = () => {
        alert(89);

    }
    const deleteHandle = () => {

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
                    <Button danger onClick={() => { deleteHandle(record.id) }}>Delete</Button>
                </Space>
            )
        },

    ]

    console.log(pagination, 2);
    return (
        <>
            <div>
                <Table columns={columns} dataSource={currentUsers.users || []}
                    pagination={{
                        current:currentUsers.currentPage,
                        pageSize: pageSize,
                        total: currentUsers.totalPage,
                        showSizeChanger:true,
                        pageSizeOptions: ['1','5', '10', '20', '50'],
                        onChange: (page, pageSize) => {
                            setPage(page)
                            setPageSize(pageSize)
                        }
                    }}



                ></Table>

            </div>
        </>
    )
}

export default Users;



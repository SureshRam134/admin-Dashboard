import { useEffect, useState } from "react";
import axiosURL from "../api/AxiosURL";
import { Space, Table, Button } from "antd";
import { useOutletContext } from "react-router-dom";
import LOGO from '../assets/logo.png'


const Users = () => {
    const { search, userPopup, setUserPopup } = useOutletContext();

    const initial = {
        name: "",
        email: "",
        password: "",
        roleId: "",
        active: "",
    }
    const [currentUsers, setCurrentUsers] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)
    const [loading, setLoading] = useState(false)
    const [addUser, setAddUser] = useState(initial)
    const [addUserErr, setAddUserErr] = useState(initial)
    const [edit, setEdit] = useState(null)

    const inputHandleFun = (e) => {
        const { name, value } = e.target;
        setAddUser({ ...addUser, [name]: value })
        setAddUserErr({ ...addUserErr, [name]: '' })
    }

    const userSubmitFunction = async (e) => {
        e.preventDefault();
        const { name, email, password } = addUser;
        const addUserErr = {}
        if (!name) addUserErr.name = "Add User Name"
        if (!email) addUserErr.email = "Add User Email"
        if (!password) addUserErr.password = "Add User Password"

        if (Object.keys(addUserErr).length > 0) {
            setAddUserErr(addUserErr)
            return;
        }
        try {

            if (edit) {
                const updateUser = addUser
                const res = await axiosURL.put(`/user/updateuser${edit}`, updateUser)
                alert(res.data.message)
            } else {
                const data = {
                    name: addUser.name.trim(),
                    email: addUser.email.trim().toLowerCase(),
                    password: addUser.password.trim(),
                    roleId: 3,
                }
                const res = await axiosURL.post("/user/register", data)
                alert(res.data.message)
                setAddUser(initial)
                setAddUserErr(initial)
            }

        } catch (error) {
            if (error.response.status === 400) alert(error.response.data.message)
            else if (error.response.status === 401) { alert(error.response.data.message) }
            else if (error.response.status === 403) { alert(error.response.data.message) }
            else if (error.response.status === 409) { alert(error.response.data.message) }
            else console.log("Server error: ", error);
        }
    }
    const closePopupFunction = () => {
        setUserPopup(!userPopup)
    }

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
        setUserPopup(true)
        setEdit(data.id)
        setAddUser(data)
    }

    const deleteHandle = async (data) => {

        try {
            const userActive = {
                isActive: data.active ? false : true
            }
            const res = await axiosURL.patch(`/user/deleteuser${data.id}`, userActive)
            const updateActive = res.data.result;
            // console.log(
            //     setCurrentUsers(pre => ({
            //         ...pre users?.map((item) => item.id === data.id ? {...item, active:updateActive ? 1 : 0} : item)

            //     }))
            // );
            
            
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
                {
                    userPopup &&
                    <div className="absolute right-0 z-10 bg-secondary-violet w-[280px] px-3 py-5 rounded-lg shadow-xl">
                        <h1 className="text-lg font-bold text-primary-violet mb-[10px] flex gap-3 py-2">
                            <span>
                                <img className="W-7 h-7" src={LOGO} alt="logo" />
                            </span>
                            Add User Trackdo</h1>
                        <form action="" onSubmit={userSubmitFunction}>
                            <div className='relative flex flex-col'>
                                <input
                                    className='w-full text-[14.22px] px-[15px] py-[13px] mb-[16px] md:text-[13px] md:px-[12px] md:py-[10px] md:mb-[17px] lg:mb[20px]  xl:text-[14.22px] xl:px-[15px] xl:py-[11px] xl:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none border-none focus:ring-1 focus:ring-blue-500'
                                    id='name'
                                    type="text"
                                    placeholder='Add user name'
                                    name='name'
                                    value={addUser.name}
                                    onChange={inputHandleFun} />
                                {addUserErr && <span className='absolute text-primary-Err text-xs top-[39px] md:text-[11px] md:top-[39px] lg:top-[39px]  xl:top-[43px]'>{addUserErr.name}</span>}
                            </div>
                            <div className='relative flex flex-col'>
                                <input
                                    className='w-full text-[14.22px] px-[15px] py-[13px] mb-[16px] md:text-[13px] md:px-[12px] md:py-[10px] md:mb-[17px] lg:mb[20px]  xl:text-[14.22px] xl:px-[15px] xl:py-[11px] xl:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none border-none focus:ring-1 focus:ring-blue-500'
                                    id='email'
                                    type="text"
                                    placeholder='Add user email'
                                    name='email'
                                    value={addUser.email}
                                    onChange={inputHandleFun} />
                                {addUserErr && <span className='absolute text-primary-Err text-xs top-[39px] md:text-[11px] md:top-[39px] lg:top-[39px]  xl:top-[43px]'>{addUserErr.email}</span>}
                            </div>
                            <div className='relative flex flex-col'>
                                <input
                                    className='w-full text-[14.22px] px-[15px] py-[13px] mb-[16px] md:text-[13px] md:px-[12px] md:py-[10px] md:mb-[17px] lg:mb[20px]  xl:text-[14.22px] xl:px-[15px] xl:py-[11px] xl:mb-[20px] rounded-lg border-[1px] border-secondary-gray bg-secondary-light text-secondary-light-gray font-lato outline-none border-none focus:ring-1 focus:ring-blue-500'
                                    id='password'
                                    type="text"
                                    placeholder='Add user password'
                                    name='password'
                                    value={addUser.password}
                                    onChange={inputHandleFun} />
                                {addUserErr && <span className='absolute text-primary-Err text-xs top-[39px] md:text-[11px] md:top-[39px] lg:top-[39px]  xl:top-[43px]'>{addUserErr.password}</span>}
                            </div>

                            <button
                                type="submit"
                                className='text-sm py-[12px] mb-[20px] md:text-[13px] md:py-[10px] md:mb-[17px] xl:text-[16px] xl:py-[12px] xl:mt-[6px] xl:mb-[6px]  w-full text-primary-light bg-primary-violet font-lato font-medium rounded-lg '
                            >{edit ? "Edit User" : "Add User"}</button>
                            <button className="w-full py-2">
                                <span
                                    onClick={closePopupFunction}
                                    type="submit"
                                    className='text-sm  md:text-[13px] xl:text-[16px] text-primary-violet font-lato font-medium rounded-lg '
                                >Close</span>
                            </button>



                        </form>
                    </div>
                }
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

                ></Table>

            </div>
        </>
    )
}

export default Users;



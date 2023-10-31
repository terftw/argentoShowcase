'use client'

import React from 'react';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { PATH } from '@/client/AppRouting';

export default function AppNav() {
    const router = useRouter();

    return (
        <Menu
            onClick={({ key }) => {
                const path = key;
                router.push(path);
            }}
            style={{ width: 64, height: '100vh' }}
            mode="inline"
            theme="dark"
            inlineCollapsed
            items={[
                { key: PATH.VIEW_CLIENTS, icon: <UserOutlined /> },
                { key: PATH.EDIT_USER, icon: <EditOutlined /> }
            ]}
        />
    );
}
import React from 'react';

import ClientRoot from '@/client/ClientRoot';
import EditUserPage from '@/client/pages/EditUserPage';

export default async function UserEditPage() {
    return (
        <ClientRoot>
            <EditUserPage />
        </ClientRoot>
    )
}

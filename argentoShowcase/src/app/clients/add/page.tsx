import React from 'react';

import ClientRoot from '@/client/ClientRoot';
import AddClientPage from '@/client/pages/AddClientPage';

export default async function () {
    return (
        <ClientRoot>
            <AddClientPage />
        </ClientRoot>
    )
}

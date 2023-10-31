import React from 'react';

import ClientRoot from '@/client/ClientRoot';
import ClientsPage from '@/client/pages/ClientsPage';

export default async function () {
    return (
        <ClientRoot>
            <ClientsPage />
        </ClientRoot>
    )
}

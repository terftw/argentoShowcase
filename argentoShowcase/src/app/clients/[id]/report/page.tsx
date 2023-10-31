import React from 'react';

import ClientRoot from '@/client/ClientRoot';
import ClientReportPage from '@/client/pages/ClientReportPage';

export default async function ({ params }: { params: { id: string } }) {
    const id = params.id;

    return (
        <ClientRoot>
            <ClientReportPage id={id} />
        </ClientRoot>
    )
}

import React from "react";

import ClientRoot from "@/client/ClientRoot";
import EditClientPage from "@/client/pages/EditClientPage";

export default async function ({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <ClientRoot>
      <EditClientPage id={id} />
    </ClientRoot>
  );
}

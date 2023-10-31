'use client'

import { ConfigProvider, Spin, message } from 'antd';
import React, { createContext } from 'react';
import { MessageInstance } from 'antd/es/message/interface';
import { useRouter } from "next/navigation";

import theme from '@/theme';
import { ClientApp } from './ClientApp';
import { useLoadingTracker } from './loading/loading.utils';
import { AppRouting } from './AppRouting';

export interface ClientContext {
  app: ClientApp;
  routing?: AppRouting;
  page: {
    trackLoading: ReturnType<typeof useLoadingTracker>['trackLoading'];
    showMessage: (msg: string, type?: 'success' | 'info' | 'error') => void;
  }
}

const app = new ClientApp();

export const ClientContext = createContext<ClientContext>({
  app,
  page: {
    trackLoading: (x) => x,
    showMessage: () => null,
  }
});

export default function ClientRoot(props: { children: React.ReactNode }) {
  const { children } = props;
  const [messageApi, messageContextHolder] = message.useMessage();
  const router = useRouter();
  const { isLoading, trackLoading } = useLoadingTracker();

  const context = {
    app,
    routing: new AppRouting(router),
    page: {
      trackLoading,
      showMessage: buildShowMessage(messageApi),
    }
  }

  return (
    <ConfigProvider theme={theme}>
      {isLoading ? <AppLoadingIndicator /> : null}
      <ClientContext.Provider value={context}>
        {messageContextHolder}
        {children}
      </ClientContext.Provider>
    </ConfigProvider>
  )
}

function buildShowMessage(messageApi: MessageInstance): ClientContext['page']['showMessage'] {
  return async (msg, type) => {
    await messageApi.open({
      content: msg,
      type
    });
  };
}


function AppLoadingIndicator() {
  return <Spin size="large" style={{ right: 0, top: 0, position: 'fixed', margin: 16, zIndex: 2 }} />;
}
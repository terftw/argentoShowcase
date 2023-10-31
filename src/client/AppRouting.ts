import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export class AppRouting {
  private router: AppRouterInstance;

  constructor(router: AppRouterInstance) {
    this.router = router;
  }

  async goToAddClientPage() {
    this.router.push(PATH.ADD_CLIENT);
  }

  async goToViewClients() {
    this.router.push(PATH.VIEW_CLIENTS);
  }

  async goToViewClientReport({ id }: { id: string }) {
    this.router.push(PATH.VIEW_CLIENT_REPORT.replace('[id]', id));
  }

  async goToEditClient({ id }: { id: string }) {
    this.router.push(PATH.EDIT_CLIENT.replace('[id]', id));
  }

  async goToEditUser() {
    this.router.push(PATH.EDIT_USER);
  }
}

export const PATH = {
  ADD_CLIENT: '/clients/add',
  VIEW_CLIENTS: '/clients',
  VIEW_CLIENT_REPORT: "/clients/[id]/report",
  EDIT_CLIENT: "/clients/[id]/edit",
  EDIT_USER: "/user/edit",
};

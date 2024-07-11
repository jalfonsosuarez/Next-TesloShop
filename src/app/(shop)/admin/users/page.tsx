export const revalidate = 0;

import { getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";

import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function AdminUsers() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de Usuarios" />
      <UsersTable users={users} />
      <Pagination totalPages={1} />
      <div className="mb-10"></div>
    </>
  );
}

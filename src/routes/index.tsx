import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import useGetUsers from "@queries/useGetUsers";
import SearchUserForm from "@/forms/SearchUserForm";
import SingleUserAccordion from "@/components/SingleUserAccordion";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetUsers({ searchTerm });

  return (
    <div>
      <h3>Github Viewer</h3>
      <SearchUserForm setSearchTerm={setSearchTerm}/>
      {data?.map((user) => (
        <SingleUserAccordion login={user.login} key={user.id} />
      ))}
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});

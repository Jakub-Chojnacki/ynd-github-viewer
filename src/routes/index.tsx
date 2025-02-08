import { createFileRoute } from "@tanstack/react-router";

import MainView from "@/components/MainView";

const Index = () => {
  return <MainView />;
};

export const Route = createFileRoute("/")({
  component: Index,
});
